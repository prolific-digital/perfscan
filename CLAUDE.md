# PerfScan Legacy Application Analysis

## Application Overview

PerfScan is a comprehensive performance monitoring and analysis application designed specifically for IBM Power Systems (including AS/400, iSeries, and modern IBM i systems). The application provides real-time and historical performance monitoring, capacity planning, and problem determination capabilities for enterprise-level IBM midrange systems.

## Purpose and Functionality

### Core Features

1. **Real-Time Monitoring**
   - Live performance metrics tracking
   - CPU, Memory, Disk, and Network utilization monitoring
   - Interactive Response Time (5250 terminal response) monitoring
   - Real-time job monitoring and analysis
   - WebSocket-based live data streaming

2. **Historical Data Analysis**
   - Time-series data collection and visualization
   - Trend analysis and performance insights
   - Executive summary reports
   - Customizable date ranges and filtering

3. **Period vs Period Comparison**
   - Compare performance metrics across different time periods
   - Identify performance trends and anomalies
   - Side-by-side metric comparisons

4. **What's Changed Analysis**
   - Track performance changes over time
   - Identify system modifications and their impact
   - Alert on significant performance deviations

5. **Problem Determination**
   - Detailed performance diagnostics
   - Top jobs analysis
   - Memory pool analysis
   - System resource utilization troubleshooting

6. **Capacity Planning**
   - CPW (Commercial Processing Workload) utilization analysis
   - Growth projections
   - System sizing recommendations
   - Automated and manual capacity planning modes

7. **Report Generation**
   - PDF report generation using @react-pdf/renderer
   - Customizable report templates with branding
   - Automated report scheduling
   - Multiple report formats (Historical, Period vs Period, Problem Determination, What's Changed)

## Technical Stack

### Frontend Technologies
- **React 17.0.2** - Core UI framework
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Apollo Client** - GraphQL client with WebSocket support
- **PrimeReact** - UI component library
- **ApexCharts** - Data visualization
- **SASS/SCSS** - Styling
- **Socket.io** - Real-time communication

### Key Dependencies
- GraphQL with WebSocket subscriptions for real-time data
- Axios for REST API calls
- React PDF for report generation
- Date-fns and Moment.js for date handling
- Lodash for utility functions

## Application Architecture

### Directory Structure

```
legacy-app/
├── public/              # Static assets, logos, report templates
├── src/
│   ├── app/
│   │   ├── components/  # Reusable UI components
│   │   │   ├── HistoricalData/
│   │   │   ├── PeriodVsPeriod/
│   │   │   ├── ProblemDetermination/
│   │   │   ├── RealTimeGraphs/
│   │   │   ├── CapacityPlanning/
│   │   │   └── common/
│   │   ├── pages/       # Main page components
│   │   └── hooks/       # Custom React hooks
│   ├── assets/          # Images, fonts, static files
│   ├── auth/            # Authentication components
│   ├── helpers/         # Utility functions
│   ├── services/        # API service layer
│   ├── store/           # Redux store configuration
│   │   ├── slices/      # Redux slices for different features
│   │   └── problemDetermination/
│   └── stylesheets/     # SCSS files
```

### Key Components

1. **DashboardHome** - Main layout wrapper with sidebar navigation
2. **EnterpriseServerView** - Real-time monitoring dashboard
3. **HistoricalDataMainPage** - Historical performance analysis
4. **PeriodVsPeriodMainPage** - Period comparison functionality
5. **ProblemDetermination** - Diagnostic tools
6. **CapacityPlanMainPage** - Capacity planning features

### State Management

The application uses Redux Toolkit with a comprehensive store structure:
- Separate slices for each major feature area
- Real-time data management for live monitoring
- Chart data caching and management
- User profile and authentication state
- Report generation and scheduling state

## IBM i Specific Features

The application is specifically designed for IBM Power Systems monitoring:

1. **CPW Metrics** - Commercial Processing Workload tracking
2. **5250 Response Time** - Green screen terminal response monitoring
3. **LPAR Support** - Logical partition management
4. **Pool Faulting** - Memory pool fault analysis
5. **IBM i Job Monitoring** - Native job tracking and analysis

## Current State Assessment

### Strengths
1. Comprehensive feature set for IBM i monitoring
2. Real-time capabilities with WebSocket support
3. Extensive reporting and visualization options
4. Modular component structure
5. Enterprise-focused features (multi-system support, user management)

### Technical Debt and Concerns
1. **React Version** - Using React 17 (current is 18+)
2. **Mixed Date Libraries** - Both date-fns and moment.js
3. **Legacy Build Tools** - Uses react-scripts with openssl-legacy-provider flag
4. **Large Bundle Size** - Many dependencies, some potentially redundant
5. **Mixed Styling Approaches** - SASS, styled-components, and inline styles
6. **Commented Code** - Multiple commented route definitions and test components
7. **No TypeScript** - Large codebase would benefit from type safety
8. **Limited Testing** - Test infrastructure present but minimal test coverage

### Migration Considerations for Next.js

1. **Routing** - Convert React Router to Next.js file-based routing
2. **API Layer** - Migrate REST/GraphQL endpoints to Next.js API routes
3. **State Management** - Consider modern alternatives (Zustand, Tanstack Query)
4. **Server-Side Rendering** - Leverage Next.js SSR for better performance
5. **Component Library** - Evaluate modern alternatives to PrimeReact
6. **Build System** - Modern build pipeline without legacy flags
7. **Type Safety** - Implement TypeScript throughout
8. **Real-time Features** - Evaluate Next.js compatible WebSocket solutions

## Security Considerations

The application handles sensitive performance data and includes:
- User authentication and authorization
- Role-based access control
- Secure token management
- API authentication

## Recommendations for Modernization

1. **Incremental Migration** - Start with shared components and utilities
2. **API First** - Modernize backend API structure
3. **Component Library** - Create a design system with modern components
4. **TypeScript** - Add type safety incrementally
5. **Testing** - Implement comprehensive test coverage
6. **Performance** - Optimize bundle size and loading strategies
7. **Documentation** - Create component documentation and API specs