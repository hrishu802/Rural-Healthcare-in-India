// Healthcare workforce types
export interface HealthcareWorker {
  id: string;
  type: 'doctor' | 'nurse' | 'paramedic' | 'community-health-worker' | 'specialist' | 'other';
  count: number;
  year: number;
  region: string;
  stateCode?: string;
  districtCode?: string;
  rural: boolean;
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'phc' | 'chc' | 'sub-center' | 'district-hospital' | 'aiims' | 'other';
  location: {
    state: string;
    district: string;
    rural: boolean;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  staffCount: {
    doctors: number;
    nurses: number;
    specialists: number;
    paramedics: number;
    other: number;
  };
  bedsAvailable: number;
  hasEmergencyServices: boolean;
  servicesOffered: string[];
}

export interface PopulationData {
  year: number;
  state: string;
  district?: string;
  rural: boolean;
  population: number;
  populationDensity?: number;
}

export interface HealthIndicator {
  year: number;
  state: string;
  district?: string;
  rural: boolean;
  infantMortalityRate?: number;
  maternalMortalityRate?: number;
  lifeExpectancy?: number;
  accessToHealthcare?: number; // percentage
  diseasePrevalence?: {
    [disease: string]: number;
  };
}

// Types for CLD (Causal Loop Diagram)
export interface CLDNode {
  id: string;
  label: string;
  description?: string;
  category?: string;
  x?: number;
  y?: number;
}

export interface CLDLink {
  id: string;
  source: string;
  target: string;
  polarity: 'positive' | 'negative';
  delay?: boolean;
  strength?: 'weak' | 'medium' | 'strong';
}

export interface CausalLoopDiagram {
  id: string;
  name: string;
  description?: string;
  nodes: CLDNode[];
  links: CLDLink[];
}

// EPS (Evaluation of Policy Solutions)
export interface PolicySolution {
  id: string;
  name: string;
  description: string;
  category: string;
  implementationCost: 'low' | 'medium' | 'high';
  timeFrame: 'short-term' | 'medium-term' | 'long-term';
  impactLevel: 'low' | 'medium' | 'high';
  stakeholders: string[];
  challenges: string[];
  benefits: string[];
}

export interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
}

export interface PolicyEvaluation {
  policyId: string;
  criteriaId: string;
  score: number; // 1-10
  notes?: string;
} 