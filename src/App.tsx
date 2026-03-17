import { useState } from "react";
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

import { saveOrder } from "@/utils/saveOrder";

const queryClient = new QueryClient();

const App = () => {

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    package_name: "",
    persons: 1,
    total_price: 0,
    status: "pending"
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    saveOrder(form);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>

          <Router>

            {/* ORDER FORM FLOATING */}
            <div
              style={{
                position: "fixed",
                bottom: "120px",
                right: "20px",
                zIndex: 999999,
                background: "white",
                padding: "12px",
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                width: "220px"
              }}
            >

              <input
                name="customer_name"
                placeholder="Name"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "6px", padding: "6px" }}
              />

              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "6px", padding: "6px" }}
              />

              <input
                name="package_name"
                placeholder="Package"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "6px", padding: "6px" }}
              />

              <input
                name="persons"
                type="number"
                placeholder="Persons"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "8px", padding: "6px" }}
              />

              <button
                onClick={handleSubmit}
                style={{
                  width: "100%",
                  background: "#ff6b00",
                  color: "white",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: "600"
                }}
              >
                Submit
              </button>

            </div>

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu/:slug" element={<MenuDetailPage />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <MobileBottomNav />

          </Router>

        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
