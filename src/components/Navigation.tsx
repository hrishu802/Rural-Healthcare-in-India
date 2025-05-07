import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <Navbar expand="lg" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span className="me-2">🏥</span>
          Rural Healthcare India
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/research" 
              active={location.pathname === '/research'}
            >
              Research
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              active={location.pathname === '/dashboard'}
            >
              Data Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/cld-analysis" 
              active={location.pathname === '/cld-analysis'}
            >
              CLD Analysis
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/eps-analysis" 
              active={location.pathname === '/eps-analysis'}
            >
              EPS Analysis
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/stock-flow" 
              active={location.pathname === '/stock-flow'}
            >
              Stock Flow Model
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation; 