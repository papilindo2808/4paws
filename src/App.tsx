import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddAnimalForm from "./pages/AddAnimalForm";
import AnimalDetails from "./pages/AnimalDetail";
import Stories from "./pages/Stories";
import Communities from "./pages/Communities";
import CommunityDetail from "./pages/CommunityDetail";
import CreatePost from "./pages/CreatePost";
import CreateCommunity from "./pages/CreateCommunity";
import { AnimalProvider } from "./context/AnimalContext";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import { CommunityProvider } from "./context/CommunityContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AnimalProvider>
          <CommunityProvider>
            <PostProvider>
              <Router>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/stories" element={<Stories />} />
                  <Route path="/communities" element={<Communities />} />
                  <Route path="/community/:id" element={<CommunityDetail />} />
                  <Route path="/community/:communityId/create-post" element={<CreatePost />} />
                  <Route 
                    path="/create-community" 
                    element={
                      <ProtectedRoute>
                        <CreateCommunity />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/animal/:id" 
                    element={
                      <ProtectedRoute>
                        <AnimalDetails />
                      </ProtectedRoute>
                    } 
                  />
                  <Route
                    path="/add-animal"
                    element={
                      <ProtectedRoute>
                        <AddAnimalForm />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                <Toaster />
              </Router>
            </PostProvider>
          </CommunityProvider>
        </AnimalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App; 