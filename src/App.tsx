import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ForgotPasswordPage from "./pages/ForgotPassword";
import DashboardPage from "./pages/Dashboard";
import ShipmentListPage from "./pages/ShipmentList";
import ShipmentDetailPage from "./pages/ShipmentDetail";
import CreateShipmentPage from "./pages/CreateShipment";
import VehicleListPage from "./pages/VehicleList";
import VehicleDetailPage from "./pages/VehicleDetail";
import DriverListPage from "./pages/DriverList";
import DriverDetailPage from "./pages/DriverDetail";
import CustomerListPage from "./pages/CustomerList";
import InvoiceListPage from "./pages/InvoiceList";
import InvoiceDetailPage from "./pages/InvoiceDetail";
import LiveMapPage from "./pages/LiveMap";
import SettingsPage from "./pages/Settings";
import AnalyticsPage from "./pages/Analytics";
import DriverMobilePage from "./pages/DriverMobile";
import OnboardingPage from "./pages/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/shipments" element={<ShipmentListPage />} />
          <Route path="/shipments/new" element={<CreateShipmentPage />} />
          <Route path="/shipments/:id" element={<ShipmentDetailPage />} />
          <Route path="/fleet/vehicles" element={<VehicleListPage />} />
          <Route path="/fleet/vehicles/:id" element={<VehicleDetailPage />} />
          <Route path="/fleet/drivers" element={<DriverListPage />} />
          <Route path="/fleet/drivers/:id" element={<DriverDetailPage />} />
          <Route path="/customers" element={<CustomerListPage />} />
          <Route path="/billing/invoices" element={<InvoiceListPage />} />
          <Route path="/billing/invoices/:id" element={<InvoiceDetailPage />} />
          <Route path="/map" element={<LiveMapPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/driver" element={<DriverMobilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
