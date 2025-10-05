import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Loader2, ImagePlus, X, Mic, MicOff } from "lucide-react";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Conversation, Message } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
  { code: "bho", name: "Bhojpuri", nativeName: "भोजपुरी" },
  { code: "mag", name: "Magahi", nativeName: "मगही" },
  { code: "mai", name: "Maithili", nativeName: "मैथिली" },
  { code: "raj", name: "Rajasthani", nativeName: "राजस्थानी" },
  { code: "chhg", name: "Chhattisgarhi", nativeName: "छत्तीसगढ़ी" },
  { code: "sd", name: "Sindhi", nativeName: "سنڌي" },
  { code: "ks", name: "Kashmiri", nativeName: "كٲشُر" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्" },
  { code: "kok", name: "Konkani", nativeName: "कोंकणी" },
  { code: "mni", name: "Manipuri", nativeName: "ꯃꯩꯇꯩꯂꯣꯟ" },
  { code: "sat", name: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ" },
];

export default function Chat() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages", conversationId],
    enabled: !!conversationId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      let currentConvId = conversationId;
      
      if (!currentConvId) {
        const convRes = await apiRequest("POST", "/api/conversations", {
          language: selectedLanguage,
        });
        const conv = await convRes.json() as Conversation;
        currentConvId = conv.id;
        setConversationId(currentConvId);
      }

      const messageRes = await apiRequest("POST", "/api/chat", {
        conversationId: currentConvId,
        message,
        language: selectedLanguage,
      });

      return await messageRes.json() as Message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages", conversationId] });
      setInput("");
    },
  });

  const sendImageMutation = useMutation({
    mutationFn: async ({ image, message }: { image: File; message: string }) => {
      let currentConvId = conversationId;
      
      if (!currentConvId) {
        const convRes = await apiRequest("POST", "/api/conversations", {
          language: selectedLanguage,
        });
        const conv = await convRes.json() as Conversation;
        currentConvId = conv.id;
        setConversationId(currentConvId);
      }

      const formData = new FormData();
      formData.append('image', image);
      formData.append('conversationId', currentConvId);
      formData.append('message', message || 'Please analyze this image');
      formData.append('language', selectedLanguage);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Failed to analyze image';
        try {
          const cloned = response.clone();
          const error = await cloned.json();
          errorMessage = error.error || errorMessage;
        } catch {
          try {
            const text = await response.text();
            errorMessage = text || `Server error: ${response.status}`;
          } catch {
            errorMessage = `Server error: ${response.status}`;
          }
        }
        throw new Error(errorMessage);
      }

      return await response.json() as Message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages", conversationId] });
      setInput("");
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (selectedImage) {
      if (sendImageMutation.isPending) return;
      sendImageMutation.mutate({ image: selectedImage, message: input });
    } else {
      if (!input.trim() || sendMessageMutation.isPending) return;
      sendMessageMutation.mutate(input);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 10MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Voice input is not supported in your browser. Please try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    
    const languageMap: Record<string, string> = {
      en: 'en-US',
      hi: 'hi-IN',
      bn: 'bn-IN',
      te: 'te-IN',
      mr: 'mr-IN',
      ta: 'ta-IN',
      ur: 'ur-PK',
      gu: 'gu-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      or: 'or-IN',
      pa: 'pa-IN',
      as: 'as-IN',
      ne: 'ne-NP',
    };
    
    recognition.lang = languageMap[selectedLanguage] || 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setInput(prev => prev + finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      
      if (event.error === 'no-speech') {
        toast({
          title: "No Speech Detected",
          description: "Please try speaking again.",
          variant: "destructive",
        });
      } else if (event.error !== 'aborted') {
        toast({
          title: "Error",
          description: "Voice recognition failed. Please try again.",
          variant: "destructive",
        });
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsRecording(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="shrink-0 border-b border-border bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/10 flex items-center justify-center">
                <span className="text-base font-semibold text-primary">PA</span>
              </div>
              <div>
                <h1 className="text-base font-semibold text-foreground">PashuAI</h1>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            </div>
          </div>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-[130px]" data-testid="select-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          {messages.length === 0 && !sendMessageMutation.isPending && (
            <div className="text-center py-16">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/10 mb-6">
                <span className="text-2xl font-semibold text-primary">PA</span>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Welcome to PashuAI
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base">
                Your AI agricultural assistant. Ask me about crop management, livestock care, disease detection, or market prices. I'm here to help you make informed farming decisions.
              </p>
            </div>
          )}

          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`message-${message.role}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted border border-border"
                  }`}
                >
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
            ))}

            {(sendMessageMutation.isPending || sendImageMutation.isPending) && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-muted border border-border">
                  <div className="flex items-center gap-2.5">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <p className="text-[15px] text-muted-foreground">
                      {sendImageMutation.isPending ? "Analyzing your image..." : "Analyzing your question..."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          {imagePreview && (
            <div className="mb-3 relative inline-block">
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img 
                  src={imagePreview} 
                  alt="Selected" 
                  className="max-h-32 object-contain"
                  data-testid="image-preview"
                />
                <Button
                  onClick={handleRemoveImage}
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-7 w-7 rounded-full"
                  data-testid="button-remove-image"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Add a message (optional) or send to analyze
              </p>
            </div>
          )}
          <div className="flex gap-2 items-end">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              data-testid="input-file"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              size="icon"
              variant="outline"
              className="h-11 w-11 rounded-lg shrink-0"
              disabled={sendMessageMutation.isPending || sendImageMutation.isPending || isRecording}
              data-testid="button-upload-image"
            >
              <ImagePlus className="h-5 w-5" />
            </Button>
            <Button
              onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
              size="icon"
              variant={isRecording ? "default" : "outline"}
              className={`h-11 w-11 rounded-lg shrink-0 ${
                isRecording ? 'bg-red-500 hover:bg-red-600' : ''
              }`}
              disabled={sendMessageMutation.isPending || sendImageMutation.isPending}
              data-testid="button-voice-input"
            >
              {isRecording ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={selectedImage ? "Add description (optional)..." : "Ask me about crops, livestock, weather, or market prices..."}
              className="resize-none min-h-[44px] rounded-lg text-[15px]"
              rows={1}
              data-testid="input-message"
            />
            <Button
              onClick={handleSend}
              disabled={(selectedImage ? false : !input.trim()) || sendMessageMutation.isPending || sendImageMutation.isPending}
              size="icon"
              className="h-11 w-11 rounded-lg shrink-0 bg-primary hover:bg-primary/90"
              data-testid="button-send"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
