import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navigation.css';

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
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/research" 
              active={location.pathname === '/research'}
              className={location.pathname === '/research' ? 'active' : ''}
            >
              Research
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              active={location.pathname === '/dashboard'}
              className={location.pathname === '/dashboard' ? 'active' : ''}
            >
              Data Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/cld-analysis" 
              active={location.pathname === '/cld-analysis'}
              className={location.pathname === '/cld-analysis' ? 'active' : ''}
            >
              CLD Analysis
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/eps-analysis" 
              active={location.pathname === '/eps-analysis'}
              className={location.pathname === '/eps-analysis' ? 'active' : ''}
            >
              EPS Analysis
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/stock-flow" 
              active={location.pathname === '/stock-flow'}
              className={`highlight-nav ${location.pathname === '/stock-flow' ? 'active' : ''}`}
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