import { Navbar } from "@/components/Navbar";

const Mainlayout = ({ children }) => {
  return (
    <div>
        <Navbar></Navbar>
      <main>{children}</main>
    </div>
  );
};

export default Mainlayout;
