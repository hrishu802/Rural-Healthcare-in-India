import React from 'react';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';

const Research: React.FC = () => {
  return (
    <>
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h1 className="text-primary mb-4">Problem Framing & Research</h1>
              <p className="lead mb-0">
                Investigating the multidimensional factors behind the persistent shortage of healthcare workers in rural India.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <h2 className="section-title">Problem Statement</h2>
              <p className="mb-4">
                Despite numerous government initiatives, financial incentives, and policy interventions over several decades, 
                rural India continues to face a severe shortage of trained healthcare professionals. This persistent gap suggests 
                that the issue is systemic and requires a deeper understanding of the interconnected factors at play.
              </p>
              
              <h3 className="h4 text-primary mt-5 mb-3">Key Research Questions</h3>
              <ol className="mb-5">
                <li className="mb-2">What are the systemic factors that perpetuate the rural healthcare workforce shortage despite policy interventions?</li>
                <li className="mb-2">How do education, training, career development, and compensation systems interact to influence healthcare workforce distribution?</li>
                <li className="mb-2">What social, cultural and infrastructural factors affect healthcare professionals' willingness to work in rural areas?</li>
                <li className="mb-2">Why have previous policy interventions failed to create sustainable change?</li>
                <li className="mb-2">What leverage points exist within the system that could lead to meaningful improvement?</li>
              </ol>
              
              <h2 className="section-title mt-5">Research Methodology</h2>
              <p className="mb-4">
                Our analysis combines quantitative data from government sources, qualitative insights from literature review, 
                and system dynamics modeling to identify the complex feedback loops and structures perpetuating the problem.
              </p>
              
              <Card className="shadow-sm border-0 mb-4">
                <Card.Body>
                  <h3 className="h5 text-primary">Data Sources</h3>
                  <ul>
                    <li>Ministry of Health and Family Welfare (MoHFW), Government of India</li>
                    <li>National Health Mission (NHM) reports</li>
                    <li>World Health Organization (WHO) Global Health Workforce Statistics</li>
                    <li>National Sample Survey Office (NSSO) data</li>
                    <li>Academic research papers and case studies</li>
                    <li>Interviews with healthcare professionals and policy experts</li>
                  </ul>
                </Card.Body>
              </Card>
              
              <h2 className="section-title mt-5">Literature Review Highlights</h2>
              
              <Accordion defaultActiveKey="0" className="mb-5">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <strong>Current Healthcare Workforce Distribution</strong>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      India faces a significant rural-urban disparity in healthcare workforce distribution. Despite approximately 
                      65% of the Indian population residing in rural areas, these regions are served by only about 30% of the 
                      country's doctors. The doctor-to-population ratio in urban areas is approximately 1:2000, whereas in rural 
                      areas it can be as low as 1:10,000 in some states.
                    </p>
                    <p className="mb-0">
                      According to the National Health Profile 2022, India has 1.3 million registered modern medicine doctors, 
                      but there's a 76% shortfall of specialists at Community Health Centers (CHCs) in rural areas, with states 
                      like Bihar, Uttar Pradesh, and Madhya Pradesh facing the most severe shortages.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <strong>Policy Interventions and Their Limitations</strong>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      The Government of India has implemented numerous policies to address rural healthcare workforce shortages:
                    </p>
                    <ul>
                      <li>
                        <strong>Compulsory Rural Service Bonds:</strong> Medical graduates from government institutions are required 
                        to serve in rural areas for a specified period. However, many choose to pay the bond penalty rather than fulfill 
                        the service obligation.
                      </li>
                      <li>
                        <strong>Financial Incentives:</strong> Higher salaries, hardship allowances, and additional benefits for rural service. 
                        Research shows these have had limited long-term impact as they don't address non-financial concerns.
                      </li>
                      <li>
                        <strong>Educational Reforms:</strong> Reservation of medical seats for students from rural backgrounds and establishment 
                        of medical colleges in underserved areas. Initial results are promising but scalability remains a challenge.
                      </li>
                      <li>
                        <strong>National Rural Health Mission (NRHM):</strong> Launched in 2005 to strengthen rural healthcare infrastructure 
                        and workforce. While it has improved infrastructure, attracting and retaining qualified professionals remains difficult.
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <strong>Factors Influencing Healthcare Professionals' Choices</strong>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>Research identifies multiple interconnected factors influencing healthcare professionals' reluctance to work in rural areas:</p>
                    
                    <h6 className="mt-3">Professional Factors:</h6>
                    <ul>
                      <li>Limited opportunities for professional growth and specialization</li>
                      <li>Professional isolation and lack of peer support</li>
                      <li>Heavy workload due to staff shortages</li>
                      <li>Limited access to medical equipment and supplies</li>
                    </ul>
                    
                    <h6 className="mt-3">Personal and Social Factors:</h6>
                    <ul>
                      <li>Concerns about children's education in rural areas</li>
                      <li>Limited employment opportunities for spouses</li>
                      <li>Perceived lower social status compared to urban practice</li>
                      <li>Distance from family and social networks</li>
                    </ul>
                    
                    <h6 className="mt-3">Infrastructural Factors:</h6>
                    <ul>
                      <li>Inadequate housing and basic amenities</li>
                      <li>Poor transport connectivity</li>
                      <li>Unreliable electricity and water supply</li>
                      <li>Limited access to internet and communication facilities</li>
                    </ul>
                    
                    <h6 className="mt-3">Educational Factors:</h6>
                    <ul>
                      <li>Urban-centric medical education with limited exposure to rural healthcare challenges</li>
                      <li>Lack of emphasis on primary healthcare and public health in medical curricula</li>
                      <li>Limited training in managing healthcare with resource constraints</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    <strong>International Comparative Analysis</strong>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Several countries have successfully addressed rural healthcare workforce shortages through comprehensive approaches:
                    </p>
                    
                    <h6 className="mt-3">Thailand:</h6>
                    <p>
                      Implemented the "One District, One Doctor" program that recruits students from rural areas, 
                      provides them with medical education, and requires them to return to their communities. 
                      The program has successfully increased rural doctor retention rates to over 80%.
                    </p>
                    
                    <h6 className="mt-3">Australia:</h6>
                    <p>
                      Established Rural Clinical Schools and provides significant financial incentives for rural practice. 
                      Additionally, they've implemented telehealth programs to support rural practitioners and reduce isolation.
                    </p>
                    
                    <h6 className="mt-3">Brazil:</h6>
                    <p>
                      The "Mais Médicos" (More Doctors) program recruited both domestic and international doctors 
                      for rural service while simultaneously investing in rural healthcare infrastructure and 
                      community health worker training.
                    </p>
                    
                    <h6 className="mt-3">Canada:</h6>
                    <p className="mb-0">
                      Focused on establishing medical schools in rural regions and developing specific rural medicine 
                      training programs. They also implemented comprehensive support systems for rural practitioners, 
                      including professional networks and continuing education opportunities.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
              <Button variant="primary" href="/cld-analysis" className="mt-3">
                Explore System Dynamics Analysis →
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Research;
