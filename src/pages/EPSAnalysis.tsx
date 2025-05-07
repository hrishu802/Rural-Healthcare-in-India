import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { getPolicySolutions } from '../api/healthcareAPI';
import { PolicySolution } from '../models/types';

const EPSAnalysis: React.FC = () => {
  const [policySolutions, setPolicySolutions] = useState<PolicySolution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const policies = await getPolicySolutions();
        setPolicySolutions(policies);
      } catch (error) {
        console.error('Error fetching policy solutions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const getBadgeColor = (value: string): string => {
    switch (value) {
      case 'high':
        return 'success';
      case 'medium':
        return 'warning';
      case 'low':
        return 'danger';
      case 'short-term':
        return 'info';
      case 'medium-term':
        return 'primary';
      case 'long-term':
        return 'secondary';
      default:
        return 'secondary';
    }
  };
  
  // Get actual color value from semantic level
  const getColorValue = (level: string): string => {
    switch (level) {
      case 'high':
        return '#198754'; // success green
      case 'medium':
        return '#ffc107'; // warning yellow
      case 'low':
        return '#dc3545'; // danger red
      case 'short-term':
        return '#0dcaf0'; // info blue
      case 'medium-term':
        return '#0d6efd'; // primary blue
      case 'long-term':
        return '#6c757d'; // secondary gray
      default:
        return '#6c757d'; // default to secondary
    }
  };
  
  // Calculate percentage for the data bar
  const calculatePercentage = (level: string): number => {
    switch (level) {
      case 'high':
        return 90;
      case 'medium':
        return 60;
      case 'low':
        return 30;
      case 'short-term':
        return 90;
      case 'medium-term':
        return 60;
      case 'long-term':
        return 30;
      default:
        return 50;
    }
  };
  
  // Data Bar Component
  const DataBar = ({ label, level, type }: { label: string, level: string, type: 'impact' | 'cost' | 'time' }) => {
    const percentage = calculatePercentage(level);
    const color = getColorValue(level);
    
    return (
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <label className="small text-muted mb-0">{label}</label>
          <span className="fw-medium">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
        </div>
        <div className="position-relative">
          <div 
            className="progress position-absolute top-0 start-0 rounded-pill" 
            style={{ 
              height: '6px', 
              width: '100%', 
              backgroundColor: '#e9ecef',
              zIndex: 1
            }}
          >
            <div 
              className="progress-bar" 
              style={{ 
                width: `${percentage}%`, 
                backgroundColor: color,
                transition: 'width 0.3s ease-in-out',
                borderRadius: '3px'
              }}
            ></div>
          </div>
          <div style={{ height: '6px' }}></div>
        </div>
        <div className="d-flex justify-content-between mt-1">
          <small className="text-muted">{type === 'impact' || type === 'cost' ? 'Low' : 'Long-term'}</small>
          <small className="text-muted">{type === 'impact' || type === 'cost' ? 'Medium' : 'Medium-term'}</small>
          <small className="text-muted">{type === 'impact' || type === 'cost' ? 'High' : 'Short-term'}</small>
        </div>
      </div>
    );
  };
  
  return (
    <>
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h1 className="text-primary mb-4">Policy Solutions Analysis</h1>
              <p className="lead mb-0">
                Evaluating potential interventions to address the healthcare workforce shortage in rural India.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="section-title">Leverage Points & Interventions</h2>
              <p className="mb-5">
                Based on our causal loop diagram analysis and identified system archetypes, we've determined key 
                leverage points where interventions could create meaningful change in the system. The following policy 
                solutions have been evaluated for their potential impact, implementation feasibility, and timeframe.
              </p>
              
              {loading ? (
                <p className="text-center">Loading policy solutions...</p>
              ) : (
                <>
                  <h3 className="mb-4">Policy Solutions Matrix</h3>
                  <Table responsive bordered className="mb-5">
                    <thead className="bg-light">
                      <tr>
                        <th>Policy</th>
                        <th>Category</th>
                        <th className="text-center">Impact</th>
                        <th className="text-center">Implementation Cost</th>
                        <th className="text-center">Timeframe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policySolutions.map(policy => (
                        <tr key={policy.id}>
                          <td><strong>{policy.name}</strong></td>
                          <td>{policy.category}</td>
                          <td className="text-center">
                            <Badge bg={getBadgeColor(policy.impactLevel)}>
                              {policy.impactLevel.charAt(0).toUpperCase() + policy.impactLevel.slice(1)}
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Badge bg={getBadgeColor(policy.implementationCost === 'low' ? 'high' : policy.implementationCost === 'high' ? 'low' : 'medium')}>
                              {policy.implementationCost.charAt(0).toUpperCase() + policy.implementationCost.slice(1)}
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Badge bg={getBadgeColor(policy.timeFrame)}>
                              {policy.timeFrame.charAt(0).toUpperCase() + policy.timeFrame.slice(1)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  
                  <h3 className="mb-4">Detailed Policy Analysis</h3>
                  {policySolutions.map(policy => (
                    <Card key={policy.id} className="mb-4 shadow-sm">
                      <Card.Body>
                        <h4 className="mb-3">{policy.name}</h4>
                        <p>{policy.description}</p>
                        
                        {/* Data Bar Section */}
                        <div className="row mt-4 mb-3">
                          <div className="col-md-4">
                            <DataBar 
                              label="Impact Level" 
                              level={policy.impactLevel} 
                              type="impact" 
                            />
                          </div>
                          <div className="col-md-4">
                            <DataBar 
                              label="Implementation Cost" 
                              level={policy.implementationCost} 
                              type="cost" 
                            />
                          </div>
                          <div className="col-md-4">
                            <DataBar 
                              label="Implementation Timeframe" 
                              level={policy.timeFrame} 
                              type="time" 
                            />
                          </div>
                        </div>
                        
                        <div className="row mt-4">
                          <div className="col-md-4 mb-3">
                            <h5 className="h6">Key Stakeholders</h5>
                            <ul className="mb-0 ps-3">
                              {policy.stakeholders.map((stakeholder, index) => (
                                <li key={index}>{stakeholder}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="col-md-4 mb-3">
                            <h5 className="h6">Benefits</h5>
                            <ul className="mb-0 ps-3">
                              {policy.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="col-md-4 mb-3">
                            <h5 className="h6">Challenges</h5>
                            <ul className="mb-0 ps-3">
                              {policy.challenges.map((challenge, index) => (
                                <li key={index}>{challenge}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </>
              )}
              
              <div className="mt-5">
                <h3 className="mb-4">Systems Approach to Implementation</h3>
                <Card className="shadow-sm">
                  <Card.Body>
                    <p>
                      Our analysis suggests that isolated policy interventions have limited effectiveness due to 
                      the complex nature of the healthcare workforce distribution system. Instead, we recommend a 
                      coordinated approach that addresses multiple leverage points simultaneously:
                    </p>
                    
                    <ol>
                      <li className="mb-2">
                        <strong>Breaking the Urban Success Reinforcing Loop:</strong> Implementing policies that channel resources 
                        more equitably between rural and urban healthcare facilities, such as differential funding formulas that 
                        favor rural development.
                      </li>
                      <li className="mb-2">
                        <strong>Strengthening Rural Training Pathways:</strong> Creating specialized rural medicine tracks in 
                        medical education with appropriate incentives and professional development opportunities.
                      </li>
                      <li className="mb-2">
                        <strong>Ecosystem Development:</strong> Addressing fundamental infrastructure, education, and social 
                        needs in rural areas to make them more attractive places to live and work.
                      </li>
                      <li className="mb-2">
                        <strong>Community Participation:</strong> Engaging local communities in healthcare planning and delivery 
                        to create solutions that are culturally appropriate and sustainable.
                      </li>
                      <li className="mb-2">
                        <strong>Technology as an Enabler:</strong> Leveraging telemedicine and digital health solutions to extend 
                        specialist reach while building local capacity.
                      </li>
                    </ol>
                    
                    <p className="mb-0">
                      By applying these interventions with careful attention to system feedback, delays, and unintended 
                      consequences, policy makers can work toward a more balanced and equitable healthcare workforce 
                      distribution between rural and urban India.
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default EPSAnalysis;
