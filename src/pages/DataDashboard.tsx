import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Table } from 'react-bootstrap';
import { getHealthcareWorkforceData, getHealthIndicators, getHealthcareFacilities, getPopulationData } from '../api/healthcareAPI';
import { HealthcareWorker, HealthIndicator, HealthcareFacility, PopulationData } from '../models/types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataDashboard: React.FC = () => {
  const [workforceData, setWorkforceData] = useState<HealthcareWorker[]>([]);
  const [healthIndicators, setHealthIndicators] = useState<HealthIndicator[]>([]);
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [population, setPopulation] = useState<PopulationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedState, setSelectedState] = useState<string>("All India");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const workforce = await getHealthcareWorkforceData();
        const indicators = await getHealthIndicators();
        const facilitiesData = await getHealthcareFacilities();
        const populationData = await getPopulationData();
        
        setWorkforceData(workforce);
        setHealthIndicators(indicators);
        setFacilities(facilitiesData);
        setPopulation(populationData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Calculate statistics
  const getWorkforceStats = () => {
    if (workforceData.length === 0) return { doctors: 0, nurses: 0, ratio: 0 };
    
    const filteredData = selectedState === "All India" 
      ? workforceData 
      : workforceData.filter(w => w.region === selectedState || w.stateCode === selectedState);
    
    const doctors = filteredData.find(w => w.type === 'doctor')?.count || 0;
    const nurses = filteredData.find(w => w.type === 'nurse')?.count || 0;
    const ratio = doctors > 0 ? (nurses / doctors).toFixed(1) : 'N/A';
    
    return { doctors, nurses, ratio };
  };
  
  const getAccessStats = () => {
    if (healthIndicators.length === 0) return { rural: 0, urban: 0, gap: 0 };
    
    const relevantIndicators = selectedState === "All India" 
      ? healthIndicators.filter(h => h.state === "All India") 
      : healthIndicators.filter(h => h.state === selectedState);
    
    const ruralAccess = relevantIndicators.find(h => h.rural)?.accessToHealthcare || 0;
    const urbanAccess = relevantIndicators.find(h => !h.rural)?.accessToHealthcare || 0;
    const gap = Math.abs(urbanAccess - ruralAccess);
    
    return { rural: ruralAccess, urban: urbanAccess, gap };
  };
  
  const getRuralUrbanPopulation = () => {
    if (population.length === 0) return { rural: 0, urban: 0, totalRural: 0 };
    
    const relevantPopulation = selectedState === "All India" 
      ? population.filter(p => p.state === "All India") 
      : population.filter(p => p.state === selectedState);
    
    const ruralPop = relevantPopulation.find(p => p.rural)?.population || 0;
    const urbanPop = relevantPopulation.find(p => !p.rural)?.population || 0;
    const totalRural = ((ruralPop / (ruralPop + urbanPop)) * 100).toFixed(1);
    
    return { rural: ruralPop, urban: urbanPop, totalRural };
  };
  
  const getFacilityStats = () => {
    if (facilities.length === 0) return { rural: 0, urban: 0 };
    
    const relevantFacilities = selectedState === "All India" 
      ? facilities 
      : facilities.filter(f => f.location.state === selectedState);
    
    const ruralFacilities = relevantFacilities.filter(f => f.location.rural).length;
    const urbanFacilities = relevantFacilities.filter(f => !f.location.rural).length;
    
    return { rural: ruralFacilities, urban: urbanFacilities };
  };
  
  // Prepare chart data
  const getWorkforceChartData = () => {
    if (workforceData.length === 0) return null;
    
    const filteredData = selectedState === "All India" 
      ? workforceData 
      : workforceData.filter(w => w.region === selectedState || w.stateCode === selectedState);
    
    // Group by type and sum counts
    const typeMap = new Map<string, number>();
    filteredData.forEach(worker => {
      const currentCount = typeMap.get(worker.type) || 0;
      typeMap.set(worker.type, currentCount + worker.count);
    });
    
    // Prepare data for pie chart
    return {
      labels: Array.from(typeMap.keys()).map(type => {
        // Convert type ids to readable names
        switch(type) {
          case 'doctor': return 'Doctors';
          case 'nurse': return 'Nurses';
          case 'community-health-worker': return 'CHWs';
          case 'specialist': return 'Specialists';
          case 'paramedic': return 'Paramedics';
          default: return type.charAt(0).toUpperCase() + type.slice(1);
        }
      }),
      datasets: [
        {
          data: Array.from(typeMap.values()),
          backgroundColor: [
            'rgba(56, 101, 163, 0.8)', // primary
            'rgba(99, 163, 117, 0.8)', // secondary
            'rgba(237, 107, 91, 0.8)', // accent
            'rgba(108, 117, 125, 0.8)', // gray
            'rgba(255, 193, 7, 0.8)'   // yellow
          ],
          borderColor: [
            'rgba(56, 101, 163, 1)',
            'rgba(99, 163, 117, 1)',
            'rgba(237, 107, 91, 1)',
            'rgba(108, 117, 125, 1)',
            'rgba(255, 193, 7, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };
  };
  
  const getHealthIndicatorsChartData = () => {
    if (healthIndicators.length === 0) return null;
    
    const relevantIndicators = selectedState === "All India" 
      ? healthIndicators.filter(h => h.state === "All India") 
      : healthIndicators.filter(h => h.state === selectedState);
    
    const rural = relevantIndicators.find(h => h.rural);
    const urban = relevantIndicators.find(h => !h.rural);
    
    if (!rural || !urban) return null;
    
    return {
      labels: ['Healthcare Access', 'Infant Mortality Rate', 'Maternal Mortality Rate', 'Life Expectancy'],
      datasets: [
        {
          label: 'Rural',
          data: [
            rural.accessToHealthcare || 0,
            rural.infantMortalityRate || 0,
            rural.maternalMortalityRate || 0,
            rural.lifeExpectancy || 0
          ],
          backgroundColor: 'rgba(99, 163, 117, 0.6)',
          borderColor: 'rgba(99, 163, 117, 1)',
          borderWidth: 1
        },
        {
          label: 'Urban',
          data: [
            urban.accessToHealthcare || 0,
            urban.infantMortalityRate || 0,
            urban.maternalMortalityRate || 0,
            urban.lifeExpectancy || 0
          ],
          backgroundColor: 'rgba(56, 101, 163, 0.6)',
          borderColor: 'rgba(56, 101, 163, 1)',
          borderWidth: 1
        }
      ]
    };
  };
  
  const workforceStats = getWorkforceStats();
  const accessStats = getAccessStats();
  const populationStats = getRuralUrbanPopulation();
  const facilityStats = getFacilityStats();
  const workforceChartData = getWorkforceChartData();
  const healthIndicatorsChartData = getHealthIndicatorsChartData();
  
  // Bar chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  // Get unique states for filter
  const getUniqueStates = (): string[] => {
    const states = new Set<string>();
    states.add("All India");
    
    workforceData.forEach(w => {
      if (w.region && w.region !== "All India") states.add(w.region);
    });
    
    healthIndicators.forEach(h => {
      if (h.state && h.state !== "All India") states.add(h.state);
    });
    
    return Array.from(states).sort();
  };
  
  return (
    <>
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h1 className="text-primary mb-4">Healthcare Data Dashboard</h1>
              <p className="lead mb-0">
                Exploring the real-time statistics on healthcare workforce distribution across rural and urban India.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row className="mb-4">
            <Col md={6} lg={4} className="mx-auto">
              <Form.Group>
                <Form.Label><strong>Select State/UT:</strong></Form.Label>
                <Form.Select 
                  value={selectedState} 
                  onChange={(e) => setSelectedState(e.target.value)}
                  disabled={loading}
                >
                  {getUniqueStates().map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          {loading ? (
            <div className="text-center my-5">
              <p className="lead">Loading data...</p>
            </div>
          ) : (
            <>
              <Row className="mb-4">
                <Col md={6} lg={3} className="mb-4 mb-lg-0">
                  <Card className="h-100 stat-card">
                    <Card.Body className="d-flex flex-column">
                      <h5 className="card-title">Doctors</h5>
                      <h2 className="mt-2 mb-0 text-primary">{workforceStats.doctors.toLocaleString()}</h2>
                      <div className="mt-auto pt-3">
                        <small className="text-muted data-source">Source: MoHFW, India</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3} className="mb-4 mb-lg-0">
                  <Card className="h-100 stat-card">
                    <Card.Body className="d-flex flex-column">
                      <h5 className="card-title">Nurses</h5>
                      <h2 className="mt-2 mb-0 text-primary">{workforceStats.nurses.toLocaleString()}</h2>
                      <div className="mt-auto pt-3">
                        <small className="text-muted data-source">Source: MoHFW, India</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3} className="mb-4 mb-lg-0">
                  <Card className="h-100 stat-card">
                    <Card.Body className="d-flex flex-column">
                      <h5 className="card-title">Nurse-Doctor Ratio</h5>
                      <h2 className="mt-2 mb-0 text-primary">{workforceStats.ratio}</h2>
                      <div className="mt-auto pt-3">
                        <small className="text-muted data-source">WHO recommends 3:1</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3} className="mb-4 mb-lg-0">
                  <Card className="h-100 stat-card">
                    <Card.Body className="d-flex flex-column">
                      <h5 className="card-title">Rural Population</h5>
                      <h2 className="mt-2 mb-0 text-primary">{populationStats.totalRural}%</h2>
                      <div className="mt-auto pt-3">
                        <small className="text-muted data-source">Source: Census of India</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <Row className="mb-5">
                <Col lg={12}>
                  <Card className="shadow-sm border-0">
                    <Card.Body>
                      <h4 className="mb-4">Rural vs Urban Healthcare Distribution</h4>
                      <Table striped bordered responsive className="mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th>Indicator</th>
                            <th className="text-center">Rural</th>
                            <th className="text-center">Urban</th>
                            <th className="text-center">Gap</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Healthcare Access (%)</td>
                            <td className="text-center">{accessStats.rural}%</td>
                            <td className="text-center">{accessStats.urban}%</td>
                            <td className="text-center">{accessStats.gap}%</td>
                          </tr>
                          <tr>
                            <td>Healthcare Facilities</td>
                            <td className="text-center">{facilityStats.rural}</td>
                            <td className="text-center">{facilityStats.urban}</td>
                            <td className="text-center">-</td>
                          </tr>
                          <tr>
                            <td>Population (millions)</td>
                            <td className="text-center">{(populationStats.rural / 1000000).toFixed(1)}</td>
                            <td className="text-center">{(populationStats.urban / 1000000).toFixed(1)}</td>
                            <td className="text-center">-</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <Row>
                <Col lg={6} className="mb-4">
                  <Card className="shadow-sm border-0 h-100">
                    <Card.Body>
                      <h4 className="mb-4">Healthcare Workforce by Type</h4>
                      <div className="bg-light p-4 rounded" style={{ height: '300px' }}>
                        {workforceChartData ? (
                          <Pie data={workforceChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        ) : (
                          <div className="d-flex justify-content-center align-items-center h-100">
                            <p className="text-muted">No data available</p>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6} className="mb-4">
                  <Card className="shadow-sm border-0 h-100">
                    <Card.Body>
                      <h4 className="mb-4">Key Health Indicators</h4>
                      <div className="bg-light p-4 rounded" style={{ height: '300px' }}>
                        {healthIndicatorsChartData ? (
                          <Bar 
                            data={healthIndicatorsChartData} 
                            options={barChartOptions} 
                          />
                        ) : (
                          <div className="d-flex justify-content-center align-items-center h-100">
                            <p className="text-muted">No data available</p>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default DataDashboard;
