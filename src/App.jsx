import Header from "./components/global/Header";
import Login from "./pages/Login";
import Footer from "./components/global/Footer";
import Profile from "./pages/CreateProfile";
import CalendarBooking from "./pages/CalendarBooking";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default App;
