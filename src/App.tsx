import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  Routes, Route,useParams} from "react-router-dom";
import Index from "./pages/Index";
import {Header} from "@/components/Header"
import Guest from "@/components/Guest"
import Host from "@/components/Host"
import {Footer} from "@/components/Footer"
import RetreatCenters from "./components/RetreatCenters";
import NotFound from "./pages/NotFound";
import SignUpAsHost from "@/components/SignUpAsHost";
import Admin from "@/components/Admin";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSelected from "./components/ProfileSelected";
import CreateGuest from "./components/CreateGuest";
import ListARetreat from "./components/ListARetreat";
import RetreatDetails from "./components/RetreatDetails";
import GuideDetails from "./components/GuideDetails";
import Guides from "@/components/Guides";
import GuideSignUp from "@/components/GuideSignUp";
import Airways from "@/components/Airways";

const queryClient = new QueryClient();
const App = () => (
  // ... inside your component

  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <Header/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/retreatcenters" element={<RetreatCenters/>}/>
          <Route path="/guest" element={<Guest/>}/>
          <Route path="/host" element={<Host/>}/>
          <Route path="/signupasHost" element={<SignUpAsHost/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/hosts/:userId" element={<ProfileSelected/>}/>

          <Route path="/profile/:userId" element={<ProfileDetails/>}/>
          <Route path="/list/:userId" element={<ListARetreat/>}/>
          <Route path="/retreatdetails/:id" element={<RetreatDetails/>}/>
          <Route path="/guides" element={<Guides/>}/>
          <Route path="/guides/:id" element={<GuideDetails/>}/>
          <Route path="/createguest" element={<CreateGuest/>}/>
          <Route path="/guidesignup" element={<GuideSignUp/>}/>
          <Route path="/airlines" element={<Airways/>}/>
            
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
