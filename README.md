# Rural Healthcare India Platform

A web platform exploring the health workforce shortage in rural India, analyzing why rural areas continue to face a shortage of trained doctors, nurses, and healthcare workers despite government efforts and incentives.

## Overview

This platform offers comprehensive analysis and data visualization on rural healthcare workforce challenges in India through:

- **Real-time data integration** via APIs for key healthcare workforce variables
- **Problem framing and research** on systemic factors affecting healthcare distribution
- **Causal Loop Diagram (CLD)** analysis and system narratives
- **Evaluation of Policy Solutions (EPS)** with leverage points and system archetypes

## Features

1. **Home Page**: Overview of the rural healthcare workforce issue with key statistics
2. **Research Page**: Comprehensive literature review and problem framing
3. **Data Dashboard**: Interactive visualization of healthcare workforce distribution data
4. **CLD Analysis**: System dynamics visualization showing interconnected factors
5. **EPS Analysis**: Evaluation of policy interventions and recommendations

## Technology Stack

- React.js with TypeScript
- React Router for navigation
- React Bootstrap for UI components
- Axios for API integration
- Chart.js for data visualization
- D3.js for system dynamics diagrams

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rural-healthcare-platform.git
   cd rural-healthcare-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Data Sources

The platform integrates (or mocks for demonstration) data from:

- Ministry of Health and Family Welfare (MoHFW), Government of India
- National Health Mission (NHM) reports
- World Health Organization (WHO) Global Health Workforce Statistics
- National Sample Survey Office (NSSO)

## System Dynamics Approach

The platform employs a system dynamics methodology to:
1. Identify key variables affecting rural healthcare workforce
2. Map causal relationships between these variables
3. Identify feedback loops (reinforcing and balancing)
4. Recognize system archetypes at play
5. Find leverage points for effective intervention

## Project Structure

```
rural-healthcare-platform/
├── public/             # Static files
├── src/                # Source code
│   ├── api/            # API integration services
│   ├── components/     # Reusable components
│   ├── models/         # TypeScript interfaces and types
│   ├── pages/          # Main page components
│   ├── utils/          # Utility functions
│   └── assets/         # Images, icons, and other assets
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ministry of Health and Family Welfare, Government of India
- World Health Organization (WHO)
- National Health Mission (NHM)
- System Dynamics Society for methodological frameworks
