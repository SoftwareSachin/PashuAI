import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Shield, Lock, User } from "lucide-react";
import logoImage from "@assets/Untitled_1759746112310.png";

const loginSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginForm) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Login failed");
      }

      if (!result.user.isAdmin) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have admin privileges",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Logged in as admin successfully!",
      });

      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });

      setLocation("/admin/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to login",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md shadow-2xl border-emerald-200 dark:border-emerald-800/30 bg-white dark:bg-slate-900">
        <CardHeader className="space-y-6 text-center pb-8">
          <div className="flex justify-center">
            <img 
              src={logoImage} 
              alt="Pashu AI" 
              className="h-24 w-auto object-contain"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="h-20 w-20 text-emerald-500/10 dark:text-emerald-500/20" />
            </div>
            <div className="relative flex justify-center mb-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Admin Access</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Secure administrator login for Pashu AI
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="emailOrPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300">Email or Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          {...field}
                          placeholder="Enter admin credentials"
                          disabled={isLoading}
                          className="pl-10 border-slate-300 dark:border-slate-600 focus:border-emerald-500 dark:focus:border-emerald-400"
                          data-testid="input-admin-emailOrPhone"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter admin password"
                          disabled={isLoading}
                          className="pl-10 border-slate-300 dark:border-slate-600 focus:border-emerald-500 dark:focus:border-emerald-400"
                          data-testid="input-admin-password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 dark:shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/40"
                disabled={isLoading}
                data-testid="button-admin-login"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Admin Sign In
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 pb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Lock className="h-3 w-3" />
            <span>Authorized personnel only</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © 2025 Pashu AI by Verdant. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
