import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-auto py-3">
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <h5>Rural Healthcare India</h5>
            <p className="mb-0">
              Analyzing the health workforce shortage in rural India and proposing systemic solutions.
            </p>
          </Col>
          <Col md={3}>
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li><a href="https://nhm.gov.in/" target="_blank" rel="noopener noreferrer" className="text-light">National Health Mission</a></li>
              <li><a href="https://main.mohfw.gov.in/" target="_blank" rel="noopener noreferrer" className="text-light">Ministry of Health</a></li>
              <li><a href="https://www.who.int/india" target="_blank" rel="noopener noreferrer" className="text-light">WHO India</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact</h5>
            <p className="mb-0">
              <a href="mailto:contact@ruralhealthcare.org" className="text-light">contact@ruralhealthcare.org</a>
            </p>
          </Col>
        </Row>
        <hr className="my-3 border-light" />
        <div className="text-center">
          <small>&copy; {new Date().getFullYear()} Rural Healthcare India. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 