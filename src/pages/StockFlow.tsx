import { useState, useEffect, useCallback } from 'react';
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
  netWorkforceChange: number;
  netHealthChange: number;
  netTrustChange: number;
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
    populationServed: 10000,
    simulationSpeed: 500 // Added simulation speed control (ms)
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
  
  // Slider interaction state
  const [speedDragging, setSpeedDragging] = useState(false);
  const [speedTooltipPosition, setSpeedTooltipPosition] = useState(0);
  
  // Calculate speed percentage for the simulation speed slider
  const speedPercentage = 100 - ((params.simulationSpeed - 100) / 9);
  
  // Update speed tooltip position when speed changes
  useEffect(() => {
    const newSpeedPercentage = 100 - ((params.simulationSpeed - 100) / 9);
    setSpeedTooltipPosition(newSpeedPercentage);
  }, [params.simulationSpeed]);

  // Reset simulation
  const resetSimulation = useCallback(() => {
    setTimeStep(0);
    setIsRunning(false);
    setSimulationData([]);
    setStocks({
      workers: params.initialWorkers,
      trust: params.initialTrust,
      health: params.initialHealth
    });
  }, [params.initialWorkers, params.initialTrust, params.initialHealth]);

  // Handle parameter changes
  const handleParamChange = useCallback((param: string, value: string) => {
    setParams(prev => ({
      ...prev,
      [param]: parseFloat(value)
    }));
  }, []);

  // Apply parameter changes that require simulation reset
  useEffect(() => {
    resetSimulation();
  }, [
    params.initialWorkers, 
    params.initialTrust, 
    params.initialHealth,
    params.simulationYears,
    resetSimulation
  ]);

  // Calculate model rates and update stocks
  const calculateStep = useCallback(() => {
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
      netWorkforceChange: Math.round((hiringRate - migrationRate) * 10) / 10,
      netHealthChange: Math.round((healthImprovement - healthDecline) * 10) / 10,
      netTrustChange: Math.round((trustGain - trustLoss) * 10) / 10,
    }]);

    // Increment time
    setTimeStep(prev => prev + 1);
  }, [timeStep, stocks, params]);

  // Run simulation until time limit
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning && timeStep < params.simulationYears) {
      interval = setInterval(calculateStep, params.simulationSpeed);
    } else if (timeStep >= params.simulationYears) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeStep, params.simulationYears, params.simulationSpeed, calculateStep]);

  // Create parameter slider component to reduce repetition
  const ParameterSlider = ({ label, param, min, max, step = 1 }: { label: string, param: string, min: string, max: string, step?: number }) => {
    // Calculate percentage for the colored progress bar
    const percentage = ((params[param as keyof typeof params] as number - parseFloat(min)) / (parseFloat(max) - parseFloat(min))) * 100;
    
    // State to track if the slider is being dragged
    const [isDragging, setIsDragging] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState(0);
    
    // Update tooltip position when slider value changes
    useEffect(() => {
      const currentValue = params[param as keyof typeof params] as number;
      const minValue = parseFloat(min);
      const maxValue = parseFloat(max);
      const newPercentage = ((currentValue - minValue) / (maxValue - minValue)) * 100;
      setTooltipPosition(newPercentage);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param, min, max, params[param as keyof typeof params]]);
    
    // Determine color based on parameter type or value
    const getSliderColor = () => {
      // Color mapping based on parameter type
      const colorMap: {[key: string]: string} = {
        'initialWorkers': '#0d6efd', // primary blue
        'initialTrust': '#198754',   // success green
        'initialHealth': '#dc3545',  // danger red
        'infrastructureQuality': '#6610f2', // purple
        'trainingAvailability': '#fd7e14', // orange
        'careerGrowthOpportunities': '#0dcaf0', // info blue
        'publicPrivateGap': '#6c757d', // gray
        'baseHiringRate': '#20c997', // teal
        'baseMigrationRate': '#ffc107', // yellow
        'populationServed': '#0d6efd', // primary blue
        'simulationYears': '#198754', // success green
      };
      
      return colorMap[param] || '#0d6efd'; // default to primary blue
    };
    
    // Get impact description for each parameter
    const getImpactDescription = () => {
      const impactMap: {[key: string]: {description: string, positive: boolean}} = {
        'initialWorkers': {
          description: 'Workforce',
          positive: true
        },
        'initialTrust': {
          description: 'Community trust',
          positive: true
        },
        'initialHealth': {
          description: 'Health outcomes',
          positive: true
        },
        'infrastructureQuality': {
          description: 'Retention rate & job satisfaction',
          positive: true
        },
        'trainingAvailability': {
          description: 'Hiring rate',
          positive: true
        },
        'careerGrowthOpportunities': {
          description: 'Retention rate',
          positive: true
        },
        'publicPrivateGap': {
          description: 'Migration to urban areas',
          positive: false
        },
        'populationServed': {
          description: 'Workload per worker',
          positive: false
        },
        'simulationYears': {
          description: 'Simulation length',
          positive: true
        },
      };
      
      return impactMap[param] || {description: '', positive: true};
    };
    
    const impact = getImpactDescription();
    const color = getSliderColor();
    
    return (
      <Form.Group className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <Form.Label className="small text-muted mb-0">{label}</Form.Label>
          <span className={`small fw-medium ${isDragging ? 'text-primary' : ''}`} style={{ width: "3rem", textAlign: "right" }}>
            {Math.round(params[param as keyof typeof params] as number)}
          </span>
        </div>
        <div className="position-relative" style={{ height: isDragging ? '40px' : '30px' }}>
          {isDragging && (
            <div 
              className="position-absolute slider-tooltip" 
              style={{ 
                left: `calc(${tooltipPosition}% - 15px)`, 
                top: '-28px',
                backgroundColor: color,
                color: 'white',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: 2,
                transition: 'left 0.1s ease-out'
              }}
            >
              {Math.round(params[param as keyof typeof params] as number)}
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: '-4px', 
                  left: '50%', 
                  marginLeft: '-4px',
                  width: '8px', 
                  height: '8px', 
                  backgroundColor: color,
                  transform: 'rotate(45deg)'
                }}
              />
            </div>
          )}
          <Form.Range
            min={min}
            max={max}
            step={step}
            value={params[param as keyof typeof params]}
            onChange={(e) => handleParamChange(param, e.target.value)}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className={`parameter-slider ${isDragging ? 'active-slider' : ''}`}
          />
          <div 
            className="progress position-absolute top-0 start-0 rounded-pill" 
            style={{ 
              height: '0.25rem', 
              width: '100%', 
              marginTop: '12px',
              pointerEvents: 'none',
              backgroundColor: '#e9ecef',
              zIndex: -1
            }}
          >
            <div 
              className="progress-bar" 
              style={{ 
                width: `${percentage}%`, 
                backgroundColor: color,
                transition: isDragging ? 'none' : 'width 0.3s ease-in-out'
              }}
            ></div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <small className="text-muted">{min}</small>
          <small className="text-muted">{max}</small>
        </div>
        {impact.description && (
          <div className="mt-1 d-flex align-items-center" style={{ height: '18px' }}>
            <small className="text-muted">Affects: </small>
            <small className={`ms-1 ${impact.positive ? 'text-success' : 'text-danger'}`}>
              {impact.description} 
              <span className="ms-1">
                {impact.positive ? '↑' : '↓'}
              </span>
            </small>
          </div>
        )}
      </Form.Group>
    );
  };

  // Calculate key insights
  const getInsights = () => {
    if (simulationData.length < 2) return null;
    
    const latest = simulationData[simulationData.length - 1];
    const netWorkforceChange = latest.hiringRate - latest.migrationRate;
    
    let workforceStatus = "stable";
    if (netWorkforceChange > 1) workforceStatus = "growing";
    if (netWorkforceChange < -1) workforceStatus = "declining";
    
    return (
      <div className="mb-3">
        <p className="fw-medium">Key Insights:</p>
        <ul className="ps-4 mb-0">
          <li>Workforce is <span className={`fw-medium ${netWorkforceChange > 0 ? 'text-success' : netWorkforceChange < 0 ? 'text-danger' : 'text-primary'}`}>
            {workforceStatus}</span> ({netWorkforceChange > 0 ? '+' : ''}{latest.netWorkforceChange}/year)
          </li>
          <li>Health outcomes are <span className={`fw-medium ${latest.netHealthChange > 0 ? 'text-success' : 'text-danger'}`}>
            {latest.netHealthChange > 0 ? 'improving' : 'deteriorating'}</span> ({latest.netHealthChange > 0 ? '+' : ''}{latest.netHealthChange}/year)
          </li>
          <li>Average workload: <span className="fw-medium">{latest.workloadPerWorker}</span> patients per worker</li>
          <li>Current job satisfaction: <span className={`fw-medium ${latest.jobSatisfaction > 60 ? 'text-success' : latest.jobSatisfaction < 40 ? 'text-danger' : 'text-warning'}`}>
            {latest.jobSatisfaction}%</span></li>
        </ul>
      </div>
    );
  };

  // Render the model UI
  return (
    <Container className="py-4">
      <h1 className="display-5 fw-bold mb-4">Rural Healthcare Workforce System Dynamics Model</h1>
      
      <Row className="mb-4">
        <Col md={4} className="mb-4">
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
        
        <Col md={4} className="mb-4">
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
                          <div className="fs-5 fw-bold">{simulationData[simulationData.length-1].jobSatisfaction}%</div>
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
        
        <Col md={4} className="mb-4">
          <Card className="h-100 bg-warning bg-opacity-10">
            <Card.Body>
              <h2 className="h4 mb-3">Simulation Controls</h2>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <Button 
                  onClick={() => setIsRunning(!isRunning)} 
                  variant={isRunning ? "danger" : "success"}
                  size="sm"
                  className="px-3"
                >
                  {isRunning ? 'Pause' : 'Run'} Simulation
                </Button>
                <Button 
                  onClick={() => calculateStep()} 
                  disabled={isRunning || timeStep >= params.simulationYears}
                  variant="primary"
                  size="sm"
                  className="px-3"
                >
                  Step Forward
                </Button>
                <Button 
                  onClick={resetSimulation} 
                  variant="secondary"
                  size="sm"
                  className="px-3"
                >
                  Reset
                </Button>
              </div>

              <Form.Group>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <Form.Label className="small text-muted mb-0">Simulation Speed</Form.Label>
                  <span className={`small fw-medium ${speedDragging ? 'text-primary' : ''}`} style={{ width: "3rem", textAlign: "right" }}>
                    {Math.round(speedPercentage)}%
                  </span>
                </div>
                <div className="position-relative" style={{ height: speedDragging ? '40px' : '30px' }}>
                  {speedDragging && (
                    <div 
                      className="position-absolute slider-tooltip" 
                      style={{ 
                        left: `calc(${speedTooltipPosition}% - 15px)`, 
                        top: '-28px',
                        backgroundColor: '#6610f2',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        zIndex: 2,
                        transition: 'left 0.1s ease-out'
                      }}
                    >
                      {Math.round(speedPercentage)}%
                      <div 
                        style={{ 
                          position: 'absolute', 
                          bottom: '-4px', 
                          left: '50%', 
                          marginLeft: '-4px',
                          width: '8px', 
                          height: '8px', 
                          backgroundColor: '#6610f2',
                          transform: 'rotate(45deg)'
                        }}
                      />
                    </div>
                  )}
                  <Form.Range
                    min="100"
                    max="1000"
                    step="100"
                    value={params.simulationSpeed}
                    onChange={(e) => handleParamChange('simulationSpeed', e.target.value)}
                    onMouseDown={() => setSpeedDragging(true)}
                    onMouseUp={() => setSpeedDragging(false)}
                    onMouseLeave={() => setSpeedDragging(false)}
                    onTouchStart={() => setSpeedDragging(true)}
                    onTouchEnd={() => setSpeedDragging(false)}
                    className={`parameter-slider ${speedDragging ? 'active-slider' : ''}`}
                  />
                  <div 
                    className="progress position-absolute top-0 start-0 rounded-pill" 
                    style={{ 
                      height: '0.25rem', 
                      width: '100%', 
                      marginTop: '12px',
                      pointerEvents: 'none',
                      backgroundColor: '#e9ecef',
                      zIndex: -1
                    }}
                  >
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${speedPercentage}%`, 
                        backgroundColor: '#6610f2',
                        transition: speedDragging ? 'none' : 'width 0.3s ease-in-out'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <small className="text-muted">Slow</small>
                  <small className="text-muted">Fast</small>
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col lg={6} className="mb-4">
          <h2 className="h4 mb-3">Results (Year {timeStep} of {params.simulationYears})</h2>
          
          <Card className="mb-4">
            <Card.Body>
              <h3 className="h5 mb-3">Stock Trends</h3>
              <div style={{ height: "300px" }}>
                {simulationData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={simulationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="workers" stroke="#0d6efd" name="Healthcare Workers" strokeWidth={2} />
                      <Line type="monotone" dataKey="trust" stroke="#198754" name="Community Trust" strokeWidth={2} />
                      <Line type="monotone" dataKey="health" stroke="#dc3545" name="Health Outcomes" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-100 d-flex align-items-center justify-content-center text-muted">Run simulation to see results</div>
                )}
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <h3 className="h5 mb-3">Flow Trends</h3>
              <div style={{ height: "300px" }}>
                {simulationData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={simulationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="hiringRate" stroke="#6610f2" name="Hiring Rate" strokeWidth={2} />
                      <Line type="monotone" dataKey="migrationRate" stroke="#fd7e14" name="Migration Rate" strokeWidth={2} />
                      <Line type="monotone" dataKey="jobSatisfaction" stroke="#0dcaf0" name="Job Satisfaction" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-100 d-flex align-items-center justify-content-center text-muted">Run simulation to see results</div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <h2 className="h4 mb-3">Model Parameters</h2>
          
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col sm={12}>
                  <h3 className="h5 mb-3 text-primary">Initial Stocks</h3>
                </Col>
                <Col sm={6}>
                  <ParameterSlider label="Initial Workers" param="initialWorkers" min="50" max="200" />
                </Col>
                <Col sm={6}>
                  <ParameterSlider label="Initial Trust" param="initialTrust" min="10" max="90" />
                </Col>
                <Col sm={6}>
                  <ParameterSlider label="Initial Health" param="initialHealth" min="20" max="80" />
                </Col>
                
                <Col sm={12}>
                  <h3 className="h5 mb-3 mt-3 text-primary">System Factors</h3>
                </Col>
                <Col sm={6}>
                  <ParameterSlider label="Infrastructure Quality" param="infrastructureQuality" min="10" max="90" />
                </Col>
                <Col sm={6}>
                  <ParameterSlider label="Training Availability" param="trainingAvailability" min="10" max="90" />
                </Col>
                <Col sm={6}>
                  <ParameterSlider label="Career Opportunities" param="careerGrowthOpportunities" min="10" max="90" />
                </Col>
                <Col sm={6}>
                  <ParameterSlider label="Public-Private Gap" param="publicPrivateGap" min="10" max="90" />
                </Col>
                
                <Col sm={12}>
                  <h3 className="h5 mb-3 mt-3 text-primary">Simulation Settings</h3>
                </Col>
                <Col sm={6}>
                  <ParameterSlider label="Population (thousands)" param="populationServed" min="5000" max="20000" step={1000} />
                </Col>
                <Col sm={6}>
                  <ParameterSlider label="Simulation Years" param="simulationYears" min="5" max="30" />
                </Col>
              </Row>
              
              <div className="mt-4 p-3 bg-light rounded">
                {simulationData.length > 0 ? getInsights() : (
                  <p className="small text-muted mb-0">Run the simulation to generate insights</p>
                )}
              </div>
            </Card.Body>
          </Card>
          
          <Card className="bg-light">
            <Card.Body>
              <h2 className="h4 mb-3">Model Explanation</h2>
              <p className="small mb-2">This system dynamics model simulates rural healthcare workforce trends over time, showing the relationships between:</p>
              <ul className="small ps-4 mb-2">
                <li><span className="fw-medium">Stocks</span>: Healthcare workers, community trust, and health outcomes</li>
                <li><span className="fw-medium">Flows</span>: Hiring rates, migration rates, trust changes, and health changes</li>
                <li><span className="fw-medium">Feedback loops</span>: Better health increases trust, which improves hiring; better infrastructure reduces migration</li>
              </ul>
              <p className="small">Experiment with different scenarios to explore how policy interventions might affect rural healthcare systems.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 