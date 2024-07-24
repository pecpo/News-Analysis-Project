import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20"><Outlet /></div>
      <Footer />
    </>
  );
};

export default MainLayout;
