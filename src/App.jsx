import Header from "./components/global/Header";
import Login from "./pages/Login";
import Footer from "./components/global/Footer";
import Profile from "./pages/CreateProfile";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};

export default App;
