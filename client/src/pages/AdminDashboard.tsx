import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Users, MessageSquare, TrendingUp, LogOut, Shield, Activity, Database } from "lucide-react";
import { format } from "date-fns";
import logoImage from "@assets/image_1759850659010.png";

export default function AdminDashboard() {
  const { user, logout, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-slate-600 dark:text-slate-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    setLocation("/admin/login");
    return null;
  }

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
  });

  const { data: conversations, isLoading: conversationsLoading } = useQuery({
    queryKey: ["/api/admin/conversations"],
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["/api/admin/messages"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-md">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={logoImage} 
                alt="Pashu AI" 
                className="h-12 sm:h-16 w-auto object-contain"
              />
              <div className="border-l border-slate-300 dark:border-slate-600 pl-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Management Console</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name || "Admin"}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
              </div>
              <Button 
                onClick={logout} 
                variant="outline" 
                className="border-slate-300 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-800 transition-colors"
                data-testid="button-admin-logout"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {statsLoading ? (
          <div className="text-center py-12">
            <div className="h-12 w-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading statistics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-emerald-200 dark:border-emerald-800/30 shadow-lg hover:shadow-xl transition-shadow" data-testid="card-total-users">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Users</CardTitle>
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{(stats as any)?.users?.totalUsers || 0}</div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {(stats as any)?.users?.adminUsers || 0} admins • {(stats as any)?.users?.regularUsers || 0} users
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>Active community</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800/30 shadow-lg hover:shadow-xl transition-shadow" data-testid="card-total-conversations">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Conversations</CardTitle>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{(stats as any)?.totalConversations || 0}</div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Active chat sessions</p>
                <div className="mt-4 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                  <Activity className="h-3 w-3" />
                  <span>User engagement</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-800/30 shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1" data-testid="card-total-messages">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Messages</CardTitle>
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                  <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{(stats as any)?.messages?.totalMessages || 0}</div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {(stats as any)?.messages?.userMessages || 0} user • {(stats as any)?.messages?.assistantMessages || 0} AI responses
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>AI interactions</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <TabsTrigger value="users" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white" data-testid="tab-users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="conversations" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white" data-testid="tab-conversations">
              <MessageSquare className="h-4 w-4 mr-2" />
              Conversations
            </TabsTrigger>
            <TabsTrigger value="queries" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white" data-testid="tab-queries">
              <Database className="h-4 w-4 mr-2" />
              User Queries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card className="border-slate-200 dark:border-slate-700 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
                <CardTitle className="text-slate-900 dark:text-white">Registered Users</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">View all users and their details</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {usersLoading ? (
                  <div className="text-center py-8">
                    <div className="h-8 w-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading users...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">Email</TableHead>
                          <TableHead className="font-semibold">Phone</TableHead>
                          <TableHead className="font-semibold">Role</TableHead>
                          <TableHead className="font-semibold">Joined</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(users as any)?.map((user: any) => (
                          <TableRow key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30" data-testid={`user-row-${user.id}`}>
                            <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
                            <TableCell>{user.email || "N/A"}</TableCell>
                            <TableCell>{user.phone || "N/A"}</TableCell>
                            <TableCell>
                              {user.isAdmin ? (
                                <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Admin</Badge>
                              ) : (
                                <Badge variant="secondary">User</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-slate-600 dark:text-slate-400">{format(new Date(user.createdAt), "MMM d, yyyy")}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-4">
            <Card className="border-slate-200 dark:border-slate-700 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                <CardTitle className="text-slate-900 dark:text-white">All Conversations</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Track user conversations and activity</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {conversationsLoading ? (
                  <div className="text-center py-8">
                    <div className="h-8 w-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading conversations...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                          <TableHead className="font-semibold">User</TableHead>
                          <TableHead className="font-semibold">Language</TableHead>
                          <TableHead className="font-semibold">Created</TableHead>
                          <TableHead className="font-semibold">ID</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(conversations as any)?.map((conv: any) => (
                          <TableRow key={conv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30" data-testid={`conversation-row-${conv.id}`}>
                            <TableCell className="font-medium">
                              {conv.user?.name || conv.user?.email || conv.user?.phone || "Unknown"}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-400">{conv.language}</Badge>
                            </TableCell>
                            <TableCell className="text-slate-600 dark:text-slate-400">{format(new Date(conv.createdAt), "MMM d, yyyy HH:mm")}</TableCell>
                            <TableCell className="text-xs text-slate-500 dark:text-slate-500 font-mono">{conv.id.slice(0, 8)}...</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queries" className="space-y-4">
            <Card className="border-slate-200 dark:border-slate-700 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardTitle className="text-slate-900 dark:text-white">User Queries</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Complete query history from all users</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {messagesLoading ? (
                  <div className="text-center py-8">
                    <div className="h-8 w-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading queries...</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {(messages as any)?.filter((msg: any) => msg.role === 'user').map((msg: any) => (
                      <div
                        key={msg.id}
                        className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 hover:shadow-md transition-shadow"
                        data-testid={`query-${msg.id}`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">User Query</Badge>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {format(new Date(msg.createdAt), "MMM d, yyyy HH:mm")}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{msg.content}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-3 font-mono">
                          Conversation: {msg.conversationId.slice(0, 8)}...
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
