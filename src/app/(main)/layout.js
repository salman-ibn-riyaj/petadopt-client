import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Toast } from "@heroui/react";

const Mainlayout = ({ children }) => {
  return (
    <div>
      <Toast.Provider />
     
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Mainlayout;
