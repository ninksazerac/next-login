import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
const NavbarComponent: React.FC = () => {
    return (
      <Navbar expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#">DashBoard</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard/provider">Provider</Nav.Link>
              <Nav.Link href="/dashboard/service">Service</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  
  export default NavbarComponent;
  