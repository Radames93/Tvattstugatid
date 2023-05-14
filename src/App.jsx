import Header from "./components/global/Header";
import Login from "./pages/Login";
import Footer from "./components/global/Footer";
import Profile from "./pages/CreateProfile";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
