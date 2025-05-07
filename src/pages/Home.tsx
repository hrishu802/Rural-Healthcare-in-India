import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getHealthcareWorkforceData, getHealthIndicators } from '../api/healthcareAPI';
import { HealthcareWorker, HealthIndicator } from '../models/types';

const Home: React.FC = () => {
  const [workforceData, setWorkforceData] = useState<HealthcareWorker[]>([]);
  const [healthIndicators, setHealthIndicators] = useState<HealthIndicator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const workforce = await getHealthcareWorkforceData();
        const indicators = await getHealthIndicators();
        
        setWorkforceData(workforce);
        setHealthIndicators(indicators);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Calculate quick stats for hero section
  const getDoctorShortageData = () => {
    const ruralDoctors = workforceData.find(w => w.type === 'doctor' && w.rural)?.count || 0;
    const urbanDoctors = workforceData.find(w => w.type === 'doctor' && !w.rural)?.count || 0;
    
    return {
      ruralDoctors,
      urbanDoctors,
      ratio: ruralDoctors > 0 && urbanDoctors > 0 ? (urbanDoctors / ruralDoctors).toFixed(1) : 'N/A'
    };
  };
  
  const getHealthcareAccessGap = () => {
    const ruralAccess = healthIndicators.find(h => h.rural && h.state === 'All India')?.accessToHealthcare || 0;
    const urbanAccess = healthIndicators.find(h => !h.rural && h.state === 'All India')?.accessToHealthcare || 0;
    
    return {
      ruralAccess,
      urbanAccess,
      gap: Math.abs(urbanAccess - ruralAccess)
    };
  };
  
  const doctorData = getDoctorShortageData();
  const accessData = getHealthcareAccessGap();
  
  return (
    <>
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Health Workforce Shortage in Rural India</h1>
              <p className="fs-5 mb-4">
                Exploring why rural India continues to face a shortage of trained doctors, nurses, and healthcare workers despite government efforts and incentives.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Button variant="light" size="lg" href="/research">
                  Explore Research
                </Button>
                <Button variant="outline-light" size="lg" href="/dashboard">
                  View Data Dashboard
                </Button>
              </div>
            </Col>
            <Col lg={5}>
              <div className="p-4 bg-white rounded shadow-sm">
                <h3 className="text-primary mb-4">Quick Stats</h3>
                {loading ? (
                  <p>Loading statistics...</p>
                ) : (
                  <>
                    <div className="mb-3">
                      <h5>Doctor Distribution</h5>
                      <p className="mb-0">
                        <strong>{doctorData.ratio}x</strong> more doctors in urban areas than rural areas
                      </p>
                    </div>
                    <div className="mb-3">
                      <h5>Healthcare Access Gap</h5>
                      <p className="mb-0">
                        <strong>{accessData.gap}%</strong> difference in healthcare access between urban and rural areas
                      </p>
                    </div>
                    <div>
                      <small className="text-muted data-source">
                        Source: Ministry of Health and Family Welfare, Govt. of India (2022-23)
                      </small>
                    </div>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="section bg-light">
        <Container>
          <h2 className="section-title">Understanding the Problem</h2>
          <Row>
            <Col lg={8} className="mb-4 mb-lg-0">
              <p>
                Despite being home to 17% of the world's population, India faces a severe shortage of healthcare professionals, particularly in rural areas. 
                The World Health Organization recommends a doctor-population ratio of 1:1000, but India's rural areas often see ratios as low as 1:10,000 in some regions.
              </p>
              <p>
                This platform explores the systemic factors behind this persistent challenge, analyzes current policies, and proposes data-driven solutions through system dynamics modeling.
              </p>
            </Col>
          </Row>
          
          <Row className="mt-5">
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <div className="mb-3 fs-1 text-primary">📊</div>
                  <Card.Title>Data Dashboard</Card.Title>
                  <Card.Text>
                    Explore real-time data on healthcare workforce distribution, facilities, and health outcomes across rural and urban India.
                  </Card.Text>
                  <Button variant="primary" href="/dashboard">View Dashboard</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <div className="mb-3 fs-1 text-primary">🔄</div>
                  <Card.Title>System Dynamics Analysis</Card.Title>
                  <Card.Text>
                    Visualize the complex interactions between policies, incentives, education, and healthcare outcomes through causal loop diagrams.
                  </Card.Text>
                  <Button variant="primary" href="/cld-analysis">View CLD Analysis</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <div className="mb-3 fs-1 text-primary">💡</div>
                  <Card.Title>Policy Recommendations</Card.Title>
                  <Card.Text>
                    Explore policy solutions and interventions based on leverage points identified in the system dynamics analysis.
                  </Card.Text>
                  <Button variant="primary" href="/eps-analysis">View Solutions</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="section-title">Key Challenges</h2>
              <ul className="fs-5">
                <li className="mb-2">Inadequate infrastructure in rural healthcare facilities</li>
                <li className="mb-2">Limited career growth opportunities for professionals in rural settings</li>
                <li className="mb-2">Social isolation and difficult living conditions</li>
                <li className="mb-2">Urban-centric medical education system</li>
                <li className="mb-2">Complex policy implementation at local levels</li>
              </ul>
              <Button variant="accent" href="/research" className="mt-3">
                Read the Research
              </Button>
            </Col>
            <Col lg={6}>
              <img 
                src="/images/rural-healthcare.jpg"
                alt="Rural healthcare in India" 
                className="img-fluid rounded shadow"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home; 