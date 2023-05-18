import Header from "./components/global/Header";
import Login from "./pages/Login";
import Footer from "./components/global/Footer";
import Profile from "./pages/CreateProfile";
import CalendarBooking from "./pages/CalendarBooking";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <>
      <Header />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<CalendarBooking />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </>
  );
};

export default App;
