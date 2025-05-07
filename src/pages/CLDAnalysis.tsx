import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CLDDiagram from '../components/CLDDiagram';

const CLDAnalysis: React.FC = () => {
  return (
    <>
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h1 className="text-primary mb-4">Causal Loop Diagram Analysis</h1>
              <p className="lead mb-0">
                Exploring the systemic factors behind rural healthcare workforce shortage through causal loop diagrams.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="section-title">System Dynamics Approach</h2>
              <p className="mb-4">
                We use causal loop diagrams (CLDs) to visualize and analyze the complex interrelationships 
                between various factors affecting healthcare workforce distribution in rural India. This 
                systems thinking approach helps us identify reinforcing and balancing feedback loops, delays, 
                and leverage points where interventions may be most effective.
              </p>
              
              <div className="mb-5">
                <Card className="p-4 mb-4 shadow-sm">
                  <h3 className="mb-3 text-center">Healthcare Workforce Distribution CLD</h3>
                  <div className="mb-3">
                    <CLDDiagram />
                  </div>
                  <small className="text-muted">
                    This causal loop diagram illustrates the interconnected factors affecting healthcare workforce distribution in rural India.
                    Arrows with an "S" indicate that variables change in the same direction, while arrows with an "O" indicate opposite changes.
                    Parallel lines on arrows indicate significant delays in the relationship.
                  </small>
                </Card>
              </div>
              
              <h3 className="mb-4">Key Feedback Loops in the Diagram</h3>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">R1: Urban Attraction Reinforcing Loop</h4>
                  <p>
                    As the number of rural healthcare workers decreases, workload per worker increases, 
                    leading to reduced job satisfaction and increased migration to urban areas, which further 
                    decreases the number of rural healthcare workers. This creates a reinforcing cycle of rural 
                    workforce shortage.
                  </p>
                </Card.Body>
              </Card>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">R2: Career Growth & Job Satisfaction Loop</h4>
                  <p>
                    Limited infrastructure quality and lack of career growth opportunities in rural areas 
                    negatively affect job satisfaction. Lower job satisfaction leads to increased migration to 
                    urban areas, resulting in fewer rural healthcare workers, worse health outcomes, and decreased 
                    community trust. This reinforces the cycle by further limiting investment in infrastructure.
                  </p>
                </Card.Body>
              </Card>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">R3: Health Outcomes & Trust Loop</h4>
                  <p>
                    As the number of rural healthcare workers decreases, health outcomes worsen, reducing 
                    community trust. With diminished trust, fewer locals pursue healthcare careers and local 
                    hiring decreases, further reducing the number of rural healthcare workers.
                  </p>
                </Card.Body>
              </Card>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">R4: Living Conditions & Retention Loop</h4>
                  <p>
                    Poor rural living conditions (including limited basic amenities and mental health support) 
                    reduce job satisfaction, increasing migration to urban areas and further decreasing the 
                    rural healthcare workforce. This makes it harder to develop and maintain basic services in 
                    rural areas.
                  </p>
                </Card.Body>
              </Card>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">R5: Community Trust & Engagement Loop</h4>
                  <p>
                    As community trust increases, local engagement in healthcare initiatives grows, improving 
                    health outcomes, which further builds trust. This virtuous cycle can be leveraged to improve 
                    rural healthcare workforce retention.
                  </p>
                </Card.Body>
              </Card>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">B1: Financial Incentives Balancing Loop</h4>
                  <p>
                    As rural healthcare workforce decreases, government financial incentives increase to 
                    attract more workers. These incentives, when effective, help increase the number of rural 
                    healthcare workers, creating a balancing effect. However, delays in implementation and 
                    structural limitations often reduce its effectiveness.
                  </p>
                </Card.Body>
              </Card>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">B2: Recruitment Policies Balancing Loop</h4>
                  <p>
                    Workforce shortages trigger new recruitment policies, which aim to increase the rural 
                    healthcare workforce. However, the effectiveness of these policies is limited by implementation 
                    efficiency and the presence of delays between policy creation and actual workforce increases.
                  </p>
                </Card.Body>
              </Card>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">B3: Training Availability Balancing Loop</h4>
                  <p>
                    Recognizing rural workforce shortages leads to increased training availability in rural areas, 
                    which should increase local hiring and the number of rural healthcare workers. This loop is meant to
                    balance the system, but significant delays in educational program development and training 
                    completion reduce its immediate effectiveness.
                  </p>
                </Card.Body>
              </Card>
              
              <h3 className="mb-4">System Archetypes Identified</h3>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">1. Success to the Successful</h4>
                  <p>
                    The urban-rural divide exemplifies this archetype. Urban areas attract more healthcare professionals, 
                    creating better healthcare outcomes, which attracts both patients and more healthcare workers. Meanwhile, 
                    rural areas struggle to maintain adequate staffing, leading to poorer outcomes and further difficulty in 
                    attracting and retaining qualified professionals.
                  </p>
                </Card.Body>
              </Card>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">2. Fixes that Fail</h4>
                  <p>
                    Financial incentives and compulsory rural service policies demonstrate this archetype. While they 
                    temporarily increase rural healthcare workers, they fail to address underlying issues of infrastructure, 
                    professional development, and quality of life. The symptom (workforce shortage) is temporarily addressed, 
                    but the fundamental problem persists or worsens.
                  </p>
                </Card.Body>
              </Card>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">3. Shifting the Burden</h4>
                  <p>
                    Relying on quick-fix solutions like increased financial incentives shifts the burden from addressing 
                    fundamental structural issues (infrastructure, career development, social amenities) to simply 
                    compensating for hardships. This approach creates dependency on incentives without building sustainable 
                    solutions.
                  </p>
                </Card.Body>
              </Card>
              
              <h3 className="mb-4">Key Leverage Points</h3>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <ol className="mb-0">
                    <li className="mb-2">
                      <strong>Improving rural infrastructure and basic amenities</strong> - This addresses multiple reinforcing 
                      loops simultaneously, breaking the cycle of dissatisfaction and migration
                    </li>
                    <li className="mb-2">
                      <strong>Establishing career development pathways</strong> - Creating opportunities for professional growth 
                      while remaining in rural practice
                    </li>
                    <li className="mb-2">
                      <strong>Enhancing local training and recruitment</strong> - Focusing on training people from rural communities 
                      who are more likely to return and stay
                    </li>
                    <li className="mb-2">
                      <strong>Building community trust and engagement</strong> - Leveraging the R5 reinforcing loop to create 
                      positive feedback for healthcare outcomes and workforce retention
                    </li>
                    <li className="mb-2">
                      <strong>Improving policy implementation efficiency</strong> - Reducing delays between policy creation and 
                      actual impact on the ground
                    </li>
                  </ol>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CLDAnalysis;
