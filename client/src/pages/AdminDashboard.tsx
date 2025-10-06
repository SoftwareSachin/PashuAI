import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Users, MessageSquare, TrendingUp, LogOut, Shield } from "lucide-react";
import { format } from "date-fns";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="border-b bg-white dark:bg-slate-900 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Pashu AI Management Console</p>
            </div>
          </div>
          <Button onClick={logout} variant="outline" data-testid="button-admin-logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {statsLoading ? (
          <div className="text-center py-12">Loading statistics...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card data-testid="card-total-users">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.users?.totalUsers || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {stats?.users?.adminUsers || 0} admins, {stats?.users?.regularUsers || 0} users
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-total-conversations">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalConversations || 0}</div>
                <p className="text-xs text-muted-foreground">Active chats</p>
              </CardContent>
            </Card>

            <Card data-testid="card-total-messages">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.messages?.totalMessages || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {stats?.messages?.userMessages || 0} user, {stats?.messages?.assistantMessages || 0} AI
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users" data-testid="tab-users">Users</TabsTrigger>
            <TabsTrigger value="conversations" data-testid="tab-conversations">Conversations</TabsTrigger>
            <TabsTrigger value="queries" data-testid="tab-queries">User Queries</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
                <CardDescription>View all users and their details</CardDescription>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="text-center py-8">Loading users...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users?.map((user: any) => (
                        <TableRow key={user.id} data-testid={`user-row-${user.id}`}>
                          <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
                          <TableCell>{user.email || "N/A"}</TableCell>
                          <TableCell>{user.phone || "N/A"}</TableCell>
                          <TableCell>
                            {user.isAdmin ? (
                              <Badge variant="destructive">Admin</Badge>
                            ) : (
                              <Badge variant="secondary">User</Badge>
                            )}
                          </TableCell>
                          <TableCell>{format(new Date(user.createdAt), "MMM d, yyyy")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Conversations</CardTitle>
                <CardDescription>Track user conversations and activity</CardDescription>
              </CardHeader>
              <CardContent>
                {conversationsLoading ? (
                  <div className="text-center py-8">Loading conversations...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {conversations?.map((conv: any) => (
                        <TableRow key={conv.id} data-testid={`conversation-row-${conv.id}`}>
                          <TableCell className="font-medium">
                            {conv.user?.name || conv.user?.email || conv.user?.phone || "Unknown"}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{conv.language}</Badge>
                          </TableCell>
                          <TableCell>{format(new Date(conv.createdAt), "MMM d, yyyy HH:mm")}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{conv.id.slice(0, 8)}...</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Queries</CardTitle>
                <CardDescription>Complete query history from all users</CardDescription>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="text-center py-8">Loading queries...</div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {messages?.filter((msg: any) => msg.role === 'user').map((msg: any) => (
                      <div
                        key={msg.id}
                        className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800"
                        data-testid={`query-${msg.id}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="secondary">User Query</Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(msg.createdAt), "MMM d, yyyy HH:mm")}
                          </span>
                        </div>
                        <p className="text-sm mt-2">{msg.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">
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
