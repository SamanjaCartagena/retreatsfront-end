import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  Routes, Route,useParams} from "react-router-dom";
import Index from "./pages/Index";
import {Header} from "@/components/Header"
import Guest from "@/components/Guest"
import Host from "@/components/hosts/Host"
import {Footer} from "@/components/Footer"
import RetreatCenters from "@/components/centers/RetreatCenters";
import NotFound from "./pages/NotFound";
import SignUpAsHost from "@/components/hosts/SignUpAsHost";
import Admin from "@/components/admin/Admin";
import ProfileDetails from "./components/hosts/ProfileDetails";
import ListARetreat from "./components/ListARetreat";
import RetreatDetails from "./components/retreats/RetreatDetails";
import GuideDetails from "./components/guides/GuideDetails";
import Guides from "@/components/guides/Guides";
import GuideSignUp from "@/components/guides/GuideSignUp";
import Airways from "@/components/Airways";
import Success from "@/components/Success";
import GuideAdmin from "./components/guides/GuideAdmin";
import Guests from "./components/guests/Guests";

import RetreatCenterDetails from "@/components/centers/RetreatCenterDetails";
import AdminPage from "@/components/admin/AdminPage"
import ListARetreatCenter from "./components/centers/ListARetreatCenter";

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
          <Route path="/retreatcenterdetails/:id" element={<RetreatCenterDetails/>}/>
          <Route path="/guests" element={<Guests/>}/>
          {/***Host Account */}
          <Route path="/host" element={<Host/>}/>
          <Route path="/host/:id" element={<ProfileDetails/>}/>

                            {/**Admin Page */}
          <Route path="/adminpage/:userId/signupasHost" element={<SignUpAsHost/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/adminpage/:userId" element={<AdminPage/>}/>
          <Route path="/adminpage/:userId/guidedetails" element={<GuideDetails/>}/>
          <Route path="/adminpage/:userId/guidesignup" element={<GuideSignUp/>}/>
          <Route path="/adminpage/:userId/guideadmin" element={<GuideAdmin/>}/>
          <Route path="/adminpage/:id/hostdetails" element={<ProfileDetails/>}/>
          <Route path="/adminpage/:userId/signupashost" element={<SignUpAsHost/>}/>
          <Route path="/adminpage/:userid/guests" element={<Guests/>}/>
          <Route path="/adminpage/:userid/retreatcenters" element={<RetreatCenters/>}/>
                          {/**List a Retreat Center */}
          <Route path="adminpage/:id/listacenter" element={<ListARetreatCenter/>}/>
          

          <Route path="/success" element={<Success/>}/>
          <Route path="/guidedetails" element={<GuideDetails/>}/>
          <Route path="/guideadmin/:userId" element={<GuideAdmin/>}/>
          <Route path="/list/:userId" element={<ListARetreat/>}/>
          <Route path="/retreatdetails/:id" element={<RetreatDetails/>}/>
          <Route path="/guides" element={<Guides/>}/>
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
