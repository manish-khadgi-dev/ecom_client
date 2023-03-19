import React from "react";
import Container from "react-bootstrap/esm/Container";
import { SideBar } from "../../components/sidebar/SideBar";
import Footer from "./Footer";
import { Header } from "./Header";

const Dashobardlayout = ({ children }) => {
  return (
    <div>
      <Header />
      <SideBar />
      <Container>
        <div className="main">{children}</div>
      </Container>
      <Footer />
    </div>
  );
};

export default Dashobardlayout;
