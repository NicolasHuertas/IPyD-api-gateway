# IPyD API Gateway

## Related Repositories

This is the main gateway for the IPyD ecosystem. The complete system consists of:

- **API Gateway** (this repository): [https://github.com/NicolasHuertas/IPyD-api-gateway](https://github.com/NicolasHuertas/IPyD-api-gateway)
- **Orchestrator**: [https://github.com/NicolasHuertas/IPyD-Orchestrator](https://github.com/NicolasHuertas/IPyD-Orchestrator)
- **Flights API**: [https://github.com/NicolasHuertas/IPyD-flightsAPI](https://github.com/NicolasHuertas/IPyD-flightsAPI)
- **Frontend**: [https://github.com/NicolasHuertas/IPyD-frontend](https://github.com/NicolasHuertas/IPyD-frontend)

## Overview
The IPyD API Gateway is a Node.js/Express-based microservice that serves as the single entry point for all client requests to the IPyD (Integrated Python Booking System) ecosystem. It routes requests to the appropriate backend services using HTTP proxy middleware.

## Features
- Centralized routing for all microservices
- CORS support for frontend integration
- Request proxying and path rewriting
- Load distribution across services
- Simplified client-side API consumption

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express 4.18.2
- **Proxy**: http-proxy-middleware 2.0.6
- **CORS**: cors 2.8.5
- **Container**: Docker & Docker Compose

## Prerequisites
- Node.js (v16 or higher)
- npm
- Docker and Docker Compose (for containerized deployment)

## Installation

### Using Docker (Recommended)
```bash
# Build and run the entire stack
docker-compose up --build

# The API Gateway will be available at http://localhost:8005
```

### Local Development
```bash
# Install dependencies
npm install

# Start the gateway
node api-gateway/index.js

# The gateway will be available at http://localhost:8005
```

## API Routes

The gateway proxies requests to the following services:

### Reservations (Orchestrator)
```
/reservations/* → http://combined-reservations:8420/reservations/*
```
Handles combined flight and hotel reservations.

### Hotels
```
/hotels/* → http://hotel-reservations:3000/api/reservations/*
```
Manages hotel reservations.

### Flight Seats
```
/seats/* → http://flight-reservations:8000/api/reservations/*
```
Manages flight seat reservations.

### Flights
```
/flights/* → http://flight-reservations:8000/api/flights/*
```
Provides flight information and search.

## Docker Configuration

The API Gateway orchestrates the following services via docker-compose:

- **API Gateway**: Port 8005
- **Combined Reservations (Orchestrator)**: Port 8420
- **Hotel Reservations**: Port 3000
- **Flight Reservations**: Port 8000
- **Frontend**: Port 5173

All services are connected via the `ipyd-network` bridge network.

## Environment Variables
No specific environment variables required. Service endpoints are configured in the docker-compose.yml file.

## System Architecture

The IPyD system follows a microservices architecture:

1. **Frontend** (React) → Sends requests to API Gateway
2. **API Gateway** (Express) → Routes requests to appropriate services
3. **Orchestrator** (Django) → Coordinates complex multi-service operations
4. **Flights API** (Django) → Manages flight data and reservations
5. **Hotel API** (External) → Manages hotel reservations

## Getting Started

To run the complete system:

```bash
# Clone all repositories
git clone git@github.com:NicolasHuertas/IPyD-api-gateway.git
git clone git@github.com:NicolasHuertas/IPyD-Orchestrator.git
git clone git@github.com:NicolasHuertas/IPyD-flightsAPI.git
git clone git@github.com:NicolasHuertas/IPyD-frontend.git

# Navigate to the API Gateway directory
cd IPyD-api-gateway

# Start the entire stack
docker-compose up --build
```

Access the application at `http://localhost:5173`

## License
ISC

## Author
Nicolas Huertas (lcastillo)
