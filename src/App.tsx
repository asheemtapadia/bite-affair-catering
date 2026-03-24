import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";

import MobileBottomNav from "@/components/MobileBottomNav";

import Index from "./pages/Index";
import MenuDetailPage from "./pages/MenuDetailPage";
import Packages from "./pages/Packages";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import LiteMeal from "./pages/LiteMeal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary>

        <Router>

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu/:slug" element={<MenuDetailPage />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/lite-meal" element={<LiteMeal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <MobileBottomNav />

        </Router>

      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
