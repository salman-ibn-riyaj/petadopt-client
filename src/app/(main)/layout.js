import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const Mainlayout = ({ children }) => {
  return (
    <div>
        <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Mainlayout;
