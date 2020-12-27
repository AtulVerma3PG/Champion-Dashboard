import React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../assets/championLogo.png";

const withLayout = (WrappedComponent, name) => {
  const WithLayout = (props) => (
    <div>
      <Navbar bg="dark" variant="dark">
        <img src={logo} alt="logo" className="logo" />
        <Navbar.Brand>My Champions Dashboard {name}</Navbar.Brand>

      </Navbar>
      <WrappedComponent {...props} />
      <p className="footer">Copyright © 2020 , All Rights Reserved.</p>
    </div>
  );
  return WithLayout;
};
export default withLayout;
