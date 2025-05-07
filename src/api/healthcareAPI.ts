import axios from 'axios';
import {
  HealthcareWorker,
  HealthcareFacility,
  PopulationData,
  HealthIndicator,
  PolicySolution
} from '../models/types';

// Base URLs for different APIs
const WHO_API = 'https://ghoapi.azureedge.net/api';
const INDIA_HEALTH_API = 'https://api.data.gov.in/resource';
const MOCK_API = 'https://mocki.io/v1'; // Mock API for demo purposes

// API Key for Data.gov.in
const API_KEY = 'YOUR_API_KEY'; // Replace with actual key in production

// Use mock data for demo purposes since actual APIs may require registration
const useMockData = true;

// Helper function to handle API errors
const handleApiError = (error: any) => {
  console.error('API Error:', error);
  if (error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
  }
  throw error;
};

// Healthcare Workforce API
export const getHealthcareWorkforceData = async (
  year?: number,
  state?: string,
  rural?: boolean
): Promise<HealthcareWorker[]> => {
  try {
    if (useMockData) {
      // Mock data for demonstration
      return [
        { id: '1', type: 'doctor', count: 145000, year: 2023, region: 'India', rural: false },
        { id: '2', type: 'doctor', count: 45000, year: 2023, region: 'India', rural: true },
        { id: '3', type: 'nurse', count: 220000, year: 2023, region: 'India', rural: false },
        { id: '4', type: 'nurse', count: 120000, year: 2023, region: 'India', rural: true },
        { id: '5', type: 'community-health-worker', count: 90000, year: 2023, region: 'India', rural: true }
      ];
    }
    
    const params = {
      api_key: API_KEY,
      format: 'json',
      limit: 1000,
      ...(year && { year }),
      ...(state && { state }),
      ...(rural !== undefined && { rural: rural ? 'true' : 'false' })
    };
    
    const response = await axios.get(`${INDIA_HEALTH_API}/healthcare_workforce`, { params });
    return response.data.records;
  } catch (error) {
    return handleApiError(error);
  }
};

// Healthcare Facilities API
export const getHealthcareFacilities = async (
  state?: string,
  district?: string,
  rural?: boolean,
  facilityType?: string
): Promise<HealthcareFacility[]> => {
  try {
    if (useMockData) {
      // Mock data for demonstration
      return [
        {
          id: '1',
          name: 'District Hospital Jaipur',
          type: 'district-hospital',
          location: { state: 'Rajasthan', district: 'Jaipur', rural: false },
          staffCount: { doctors: 120, nurses: 300, specialists: 50, paramedics: 80, other: 150 },
          bedsAvailable: 500,
          hasEmergencyServices: true,
          servicesOffered: ['Surgery', 'Pediatrics', 'Orthopedics', 'Gynecology']
        },
        {
          id: '2',
          name: 'Sikar Community Health Center',
          type: 'chc',
          location: { state: 'Rajasthan', district: 'Sikar', rural: true },
          staffCount: { doctors: 8, nurses: 16, specialists: 2, paramedics: 10, other: 20 },
          bedsAvailable: 30,
          hasEmergencyServices: true,
          servicesOffered: ['General Medicine', 'Maternal Care', 'First Aid']
        },
        {
          id: '3',
          name: 'Ganganagar PHC',
          type: 'phc',
          location: { state: 'Rajasthan', district: 'Ganganagar', rural: true },
          staffCount: { doctors: 2, nurses: 4, specialists: 0, paramedics: 3, other: 5 },
          bedsAvailable: 10,
          hasEmergencyServices: false,
          servicesOffered: ['Basic Healthcare', 'Maternal Care', 'Child Health']
        }
      ];
    }
    
    const params = {
      api_key: API_KEY,
      format: 'json',
      limit: 1000,
      ...(state && { state }),
      ...(district && { district }),
      ...(rural !== undefined && { rural: rural ? 'true' : 'false' }),
      ...(facilityType && { facility_type: facilityType })
    };
    
    const response = await axios.get(`${INDIA_HEALTH_API}/healthcare_facilities`, { params });
    return response.data.records;
  } catch (error) {
    return handleApiError(error);
  }
};

// Population Data API
export const getPopulationData = async (
  year?: number,
  state?: string,
  rural?: boolean
): Promise<PopulationData[]> => {
  try {
    if (useMockData) {
      // Mock data for demonstration
      return [
        { year: 2022, state: 'All India', rural: true, population: 900000000 },
        { year: 2022, state: 'All India', rural: false, population: 500000000 },
        { year: 2022, state: 'Maharashtra', rural: true, population: 70000000 },
        { year: 2022, state: 'Maharashtra', rural: false, population: 50000000 },
        { year: 2022, state: 'Uttar Pradesh', rural: true, population: 150000000 },
        { year: 2022, state: 'Uttar Pradesh', rural: false, population: 60000000 }
      ];
    }
    
    const params = {
      api_key: API_KEY,
      format: 'json',
      limit: 1000,
      ...(year && { year }),
      ...(state && { state }),
      ...(rural !== undefined && { rural: rural ? 'true' : 'false' })
    };
    
    const response = await axios.get(`${INDIA_HEALTH_API}/population_data`, { params });
    return response.data.records;
  } catch (error) {
    return handleApiError(error);
  }
};

// Health Indicators API
export const getHealthIndicators = async (
  year?: number,
  state?: string,
  rural?: boolean
): Promise<HealthIndicator[]> => {
  try {
    if (useMockData) {
      // Mock data for demonstration
      return [
        { 
          year: 2022, 
          state: 'All India', 
          rural: true, 
          infantMortalityRate: 40,
          maternalMortalityRate: 130,
          lifeExpectancy: 68,
          accessToHealthcare: 65
        },
        { 
          year: 2022, 
          state: 'All India', 
          rural: false, 
          infantMortalityRate: 25,
          maternalMortalityRate: 90,
          lifeExpectancy: 72,
          accessToHealthcare: 85
        },
        { 
          year: 2022, 
          state: 'Kerala', 
          rural: true, 
          infantMortalityRate: 10,
          maternalMortalityRate: 40,
          lifeExpectancy: 76,
          accessToHealthcare: 90
        },
        { 
          year: 2022, 
          state: 'Bihar', 
          rural: true, 
          infantMortalityRate: 55,
          maternalMortalityRate: 165,
          lifeExpectancy: 65,
          accessToHealthcare: 45
        }
      ];
    }
    
    const params = {
      api_key: API_KEY,
      format: 'json',
      limit: 1000,
      ...(year && { year }),
      ...(state && { state }),
      ...(rural !== undefined && { rural: rural ? 'true' : 'false' })
    };
    
    const response = await axios.get(`${INDIA_HEALTH_API}/health_indicators`, { params });
    return response.data.records;
  } catch (error) {
    return handleApiError(error);
  }
};

// Policy Solutions API
export const getPolicySolutions = async (): Promise<PolicySolution[]> => {
  try {
    if (useMockData) {
      // Mock data for demonstration
      return [
        {
          id: '1',
          name: 'Rural Service Allowance',
          description: 'Provide financial incentives for healthcare workers serving in rural areas',
          category: 'Financial Incentives',
          implementationCost: 'medium',
          timeFrame: 'short-term',
          impactLevel: 'medium',
          stakeholders: ['Ministry of Health', 'Healthcare Workers', 'Local Government'],
          challenges: ['Budget constraints', 'Consistent implementation'],
          benefits: ['Immediate attraction of healthcare workers', 'Improved rural healthcare access']
        },
        {
          id: '2',
          name: 'Telemedicine Infrastructure',
          description: 'Develop robust telemedicine infrastructure to connect rural patients with urban specialists',
          category: 'Technology',
          implementationCost: 'high',
          timeFrame: 'medium-term',
          impactLevel: 'high',
          stakeholders: ['Ministry of Health', 'Technology Providers', 'Healthcare Workers', 'Patients'],
          challenges: ['Internet connectivity', 'Equipment maintenance', 'Training requirements'],
          benefits: ['Extended specialist reach', 'Reduced travel burden for patients', 'Knowledge sharing']
        },
        {
          id: '3',
          name: 'Rural Medical Education Quota',
          description: 'Reserve medical seats for students from rural areas who commit to rural service post-graduation',
          category: 'Education',
          implementationCost: 'low',
          timeFrame: 'long-term',
          impactLevel: 'high',
          stakeholders: ['Ministry of Education', 'Medical Colleges', 'Students', 'Rural Communities'],
          challenges: ['Policy resistance', 'Enforcement of service commitments'],
          benefits: ['Culturally sensitive care', 'Long-term workforce development', 'Community trust']
        }
      ];
    }
    
    const response = await axios.get(`${INDIA_HEALTH_API}/policy_solutions`, {
      params: { api_key: API_KEY, format: 'json' }
    });
    return response.data.records;
  } catch (error) {
    return handleApiError(error);
  }
};

// WHO Data for international comparison
export const getWHOHealthWorkforceData = async (countryCode: string = 'IND'): Promise<any> => {
  try {
    if (useMockData) {
      // Mock WHO data for demonstration
      return {
        countryCode,
        countryName: countryCode === 'IND' ? 'India' : 'Unknown',
        doctorsPer1000: 0.9,
        nursesPer1000: 1.7,
        comparisons: [
          { country: 'China', doctorsPer1000: 2.0, nursesPer1000: 2.7 },
          { country: 'USA', doctorsPer1000: 2.6, nursesPer1000: 11.7 },
          { country: 'UK', doctorsPer1000: 2.8, nursesPer1000: 8.2 }
        ]
      };
    }
    
    const response = await axios.get(`${WHO_API}/GHO/HWF_0001,HWF_0002,HWF_0003`, {
      params: { $filter: `SpatialDim eq '${countryCode}'` }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}; 