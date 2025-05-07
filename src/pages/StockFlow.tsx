import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define types for the simulation data
interface SimulationDataPoint {
  year: number;
  workers: number;
  trust: number;
  health: number;
  hiringRate: number;
  migrationRate: number;
  jobSatisfaction: number;
  workloadPerWorker: number;
}

export default function RuralHealthcareModel() {
  // Model Parameters (Initial values and constants)
  const [params, setParams] = useState({
    initialWorkers: 100,
    initialTrust: 50,
    initialHealth: 60,
    infrastructureQuality: 50,
    trainingAvailability: 50,
    careerGrowthOpportunities: 40,
    publicPrivateGap: 60,
    baseHiringRate: 10,
    baseMigrationRate: 8,
    baseHealthImprovement: 5,
    baseHealthDecline: 3,
    baseTrustGain: 4,
    baseTrustLoss: 3,
    simulationYears: 10,
    populationServed: 10000
  });

  // State variables
  const [timeStep, setTimeStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationData, setSimulationData] = useState<SimulationDataPoint[]>([]);
  const [stocks, setStocks] = useState({
    workers: params.initialWorkers,
    trust: params.initialTrust,
    health: params.initialHealth
  });

  // Reset simulation
  const resetSimulation = () => {
    setTimeStep(0);
    setIsRunning(false);
    setSimulationData([]);
    setStocks({
      workers: params.initialWorkers,
      trust: params.initialTrust,
      health: params.initialHealth
    });
  };

  // Handle parameter changes
  const handleParamChange = (param: string, value: string) => {
    setParams(prev => ({
      ...prev,
      [param]: parseFloat(value)
    }));
    resetSimulation();
  };

  // Calculate model rates and update stocks
  const calculateStep = () => {
    // Auxiliary calculations
    const workloadPerWorker = params.populationServed / stocks.workers;
    const jobSatisfaction = Math.max(0, Math.min(100, 
      50 + 
      (params.infrastructureQuality - 50) * 0.3 + 
      (params.careerGrowthOpportunities - 50) * 0.3 - 
      (workloadPerWorker / 100 - 1) * 20
    ));

    // Flow calculations
    const hiringRate = params.baseHiringRate * 
      (params.trainingAvailability / 50) * 
      (stocks.trust / 50) * 
      (params.infrastructureQuality / 50) * 
      0.2;
    
    const migrationRate = params.baseMigrationRate * 
      ((100 - jobSatisfaction) / 50) * 
      (params.publicPrivateGap / 50) * 
      0.2;
    
    const trustGain = params.baseTrustGain * 
      (stocks.health / 60) * 
      (stocks.workers / params.initialWorkers) * 
      0.2;
    
    const trustLoss = params.baseTrustLoss * 
      ((100 - stocks.health) / 40) * 
      0.2;
    
    const healthImprovement = params.baseHealthImprovement * 
      (stocks.workers / params.initialWorkers) * 
      (params.infrastructureQuality / 50) * 
      (jobSatisfaction / 50) * 
      0.2;
    
    const healthDecline = params.baseHealthDecline * 
      ((100 - stocks.workers) / params.initialWorkers) * 
      0.2;

    // Update stocks
    const newWorkers = Math.max(10, stocks.workers + hiringRate - migrationRate);
    const newTrust = Math.max(0, Math.min(100, stocks.trust + trustGain - trustLoss));
    const newHealth = Math.max(0, Math.min(100, stocks.health + healthImprovement - healthDecline));

    // Update stocks
    setStocks({
      workers: newWorkers,
      trust: newTrust,
      health: newHealth
    });

    // Add data point for charts
    setSimulationData(prev => [...prev, {
      year: timeStep,
      workers: Math.round(newWorkers),
      trust: Math.round(newTrust),
      health: Math.round(newHealth),
      hiringRate: Math.round(hiringRate * 10) / 10,
      migrationRate: Math.round(migrationRate * 10) / 10,
      jobSatisfaction: Math.round(jobSatisfaction),
      workloadPerWorker: Math.round(workloadPerWorker),
    }]);

    // Increment time
    setTimeStep(timeStep + 1);
  };

  // Run simulation until time limit
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning && timeStep < params.simulationYears) {
      interval = setInterval(() => {
        calculateStep();
      }, 1000);
    } else if (timeStep >= params.simulationYears) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeStep, stocks, params, calculateStep]);

  // Render the model UI
  return (
    <Container className="py-4">
      <h1 className="display-5 fw-bold mb-4">Rural Healthcare Workforce System Dynamics Model</h1>
      
      <Row className="mb-4">
        <Col md={6} className="mb-4">
          <Card className="h-100 bg-light">
            <Card.Body>
              <h2 className="h4 mb-3">Stocks</h2>
              <Row>
                <Col sm={4}>
                  <Card className="mb-2">
                    <Card.Body className="p-3">
                      <div className="text-muted small">Healthcare Workers</div>
                      <div className="fs-4 fw-bold">{Math.round(stocks.workers)}</div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={4}>
                  <Card className="mb-2">
                    <Card.Body className="p-3">
                      <div className="text-muted small">Community Trust</div>
                      <div className="fs-4 fw-bold">{Math.round(stocks.trust)}</div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={4}>
                  <Card className="mb-2">
                    <Card.Body className="p-3">
                      <div className="text-muted small">Health Outcomes</div>
                      <div className="fs-4 fw-bold">{Math.round(stocks.health)}</div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card className="h-100 bg-light">
            <Card.Body>
              <h2 className="h4 mb-3">Latest Flows</h2>
              <Row>
                {simulationData.length > 0 ? (
                  <>
                    <Col sm={4}>
                      <Card className="mb-2">
                        <Card.Body className="p-3">
                          <div className="text-muted small">Hiring Rate</div>
                          <div className="fs-5 fw-bold">{simulationData[simulationData.length-1].hiringRate}</div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col sm={4}>
                      <Card className="mb-2">
                        <Card.Body className="p-3">
                          <div className="text-muted small">Migration Rate</div>
                          <div className="fs-5 fw-bold">{simulationData[simulationData.length-1].migrationRate}</div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col sm={4}>
                      <Card className="mb-2">
                        <Card.Body className="p-3">
                          <div className="text-muted small">Job Satisfaction</div>
                          <div className="fs-5 fw-bold">{simulationData[simulationData.length-1].jobSatisfaction}</div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </>
                ) : (
                  <Col className="text-center py-3">Run simulation to see data</Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="mb-4">
        <Card.Body>
          <h2 className="h4 mb-3">Simulation Controls</h2>
          <div className="d-flex flex-wrap gap-2 mb-4">
            <Button 
              onClick={() => setIsRunning(!isRunning)} 
              variant={isRunning ? "danger" : "success"}
              className="px-4"
            >
              {isRunning ? 'Pause' : 'Run'} Simulation
            </Button>
            <Button 
              onClick={() => calculateStep()} 
              disabled={isRunning}
              variant="primary"
              className="px-4"
            >
              Step Forward
            </Button>
            <Button 
              onClick={resetSimulation} 
              variant="secondary"
              className="px-4"
            >
              Reset
            </Button>
          </div>
          
          <Row>
            <Col md={4}>
              <h3 className="h5 mb-3">Initial Stocks</h3>
              <Form.Group className="mb-3">
                <Form.Label className="small text-muted">Initial Workers</Form.Label>
                <Form.Range
                  min="50"
                  max="200"
                  value={params.initialWorkers}
                  onChange={(e) => handleParamChange('initialWorkers', e.target.value)}
                />
                <div className="text-end small">{params.initialWorkers}</div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small text-muted">Initial Trust</Form.Label>
                <Form.Range
                  min="10"
                  max="90"
                  value={params.initialTrust}
                  onChange={(e) => handleParamChange('initialTrust', e.target.value)}
                />
                <div className="text-end small">{params.initialTrust}</div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small text-muted">Initial Health</Form.Label>
                <Form.Range
                  min="20"
                  max="80"
                  value={params.initialHealth}
                  onChange={(e) => handleParamChange('initialHealth', e.target.value)}
                />
                <div className="text-end small">{params.initialHealth}</div>
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <h3 className="h5 mb-3">Auxiliary Variables</h3>
              <Form.Group className="mb-3">
                <Form.Label className="small text-muted">Infrastructure Quality</Form.Label>
                <Form.Range
                  min="10"
                  max="90"
                  value={params.infrastructureQuality}
                  onChange={(e) => handleParamChange('infrastructureQuality', e.target.value)}
                />
                <div className="text-end small">{params.infrastructureQuality}</div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small text-muted">Training Availability</Form.Label>
                <Form.Range
                  min="10"
                  max="90"
                  value={params.trainingAvailability}
                  onChange={(e) => handleParamChange('trainingAvailability', e.target.value)}
                />
                <div className="text-end small">{params.trainingAvailability}</div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small text-muted">Career Growth Opportunities</Form.Label>
                <Form.Range
                  min="10"
                  max="90"
                  value={params.careerGrowthOpportunities}
                  onChange={(e) => handleParamChange('careerGrowthOpportunities', e.target.value)}
                />
                <div className="text-end small">{params.careerGrowthOpportunities}</div>
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <h3 className="h5 mb-3">Flow Parameters</h3>
              <Form.Group className="mb-3">
                <Form.Label className="small text-muted">Public-Private Gap</Form.Label>
                <Form.Range
                  min="10"
                  max="90"
                  value={params.publicPrivateGap}
                  onChange={(e) => handleParamChange('publicPrivateGap', e.target.value)}
                />
                <div className="text-end small">{params.publicPrivateGap}</div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small text-muted">Population Served (thousands)</Form.Label>
                <Form.Range
                  min="5000"
                  max="20000"
                  step="1000"
                  value={params.populationServed}
                  onChange={(e) => handleParamChange('populationServed', e.target.value)}
                />
                <div className="text-end small">{params.populationServed}</div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small text-muted">Simulation Years</Form.Label>
                <Form.Range
                  min="5"
                  max="30"
                  value={params.simulationYears}
                  onChange={(e) => handleParamChange('simulationYears', e.target.value)}
                />
                <div className="text-end small">{params.simulationYears}</div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card className="mb-4">
        <Card.Body>
          <h2 className="h4 mb-3">Results (Year {timeStep} of {params.simulationYears})</h2>
          
          <div className="mb-4">
            <h3 className="h5 mb-3">Stock Trends</h3>
            <div style={{ height: "400px", border: "1px solid #dee2e6", padding: "1rem" }}>
              {simulationData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={simulationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="workers" stroke="#0d6efd" name="Healthcare Workers" />
                    <Line type="monotone" dataKey="trust" stroke="#198754" name="Community Trust" />
                    <Line type="monotone" dataKey="health" stroke="#dc3545" name="Health Outcomes" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-100 d-flex align-items-center justify-content-center text-muted">Run simulation to see results</div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="h5 mb-3">Flow Trends</h3>
            <div style={{ height: "400px", border: "1px solid #dee2e6", padding: "1rem" }}>
              {simulationData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={simulationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="hiringRate" stroke="#6610f2" name="Hiring Rate" />
                    <Line type="monotone" dataKey="migrationRate" stroke="#fd7e14" name="Migration Rate" />
                    <Line type="monotone" dataKey="jobSatisfaction" stroke="#0dcaf0" name="Job Satisfaction" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-100 d-flex align-items-center justify-content-center text-muted">Run simulation to see results</div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
      
      <Card className="bg-light">
        <Card.Body>
          <h2 className="h4 mb-3">Model Insights</h2>
          <p className="mb-2">This system dynamics model simulates the rural healthcare workforce trends over time based on various factors.</p>
          <p className="mb-2">The model demonstrates how infrastructure quality, training availability, career growth opportunities, and the public-private gap influence healthcare worker retention, community trust, and health outcomes.</p>
          <p>Use the controls above to experiment with different scenarios and see how changes in policy or conditions might affect the rural healthcare system over time.</p>
        </Card.Body>
      </Card>
    </Container>
  );
} 