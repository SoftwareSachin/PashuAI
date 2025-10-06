import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Component />;
}

function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || user.isAdmin !== 1) {
    return <Redirect to="/admin/login" />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/chat">
        {() => <ProtectedRoute component={Chat} />}
      </Route>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard">
        {() => <AdminRoute component={AdminDashboard} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isChatPage = location === "/chat";
  const isAuthPage = location === "/login" || location === "/signup";
  const isAdminPage = location.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            {!isChatPage && !isAuthPage && !isAdminPage && <Header />}
            <main className={isChatPage || isAuthPage || isAdminPage ? "" : "flex-1"}>
              <Router />
            </main>
            {!isChatPage && !isAuthPage && !isAdminPage && <Footer />}
          </div>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
