import React, { useState } from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

type TransportType = 'car' | 'publicTransport' | 'bicycle' | 'walking';

interface TransportOption {
  emissions: string;
  reduction: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: #2C5282;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #4A5568;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  color: #2D3748;
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const ComparisonContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TransportOptionCard = styled.div<{ selected: boolean }>`
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#48BB78' : '#E2E8F0'};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? '#F0FFF4' : 'white'};

  &:hover {
    border-color: #48BB78;
  }
`;

const EmissionValue = styled.div`
  font-size: 1.5rem;
  color: #2D3748;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const GreenText = styled.span`
  color: #48BB78;
`;

const EnvironmentalImpact = () => {
  const [selectedTransport, setSelectedTransport] = useState<TransportType>('car');

  const emissionsData = {
    labels: ['Your Trip', 'Average Trip'],
    datasets: [
      {
        data: [25, 75],
        backgroundColor: ['#48BB78', '#E2E8F0'],
        borderWidth: 0,
      },
    ],
  };

  const transportOptions: Record<TransportType, TransportOption> = {
    car: { emissions: '2.5kg', reduction: '0%' },
    publicTransport: { emissions: '0.8kg', reduction: '68%' },
    bicycle: { emissions: '0kg', reduction: '100%' },
    walking: { emissions: '0kg', reduction: '100%' },
  };

  return (
    <PageContainer>
      <Header>
        <PageTitle>Environmental Impact</PageTitle>
        <Description>
          Compare different transport options and their environmental impact to make sustainable choices
        </Description>
      </Header>

      <GridContainer>
        <Card>
          <CardTitle>Your Carbon Footprint</CardTitle>
          <div style={{ height: '200px' }}>
            <Doughnut 
              data={emissionsData}
              options={{
                cutout: '70%',
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            25% lower than average
          </p>
        </Card>

        <Card>
          <CardTitle>Transport Options</CardTitle>
          <TransportOptionCard 
            selected={selectedTransport === 'car'}
            onClick={() => setSelectedTransport('car')}
          >
            <span role="img" aria-label="car">🚗</span> Car
            <EmissionValue>{transportOptions.car.emissions} CO₂</EmissionValue>
          </TransportOptionCard>
          
          <TransportOptionCard 
            selected={selectedTransport === 'publicTransport'}
            onClick={() => setSelectedTransport('publicTransport')}
          >
            <span role="img" aria-label="bus">🚌</span> Public Transport
            <EmissionValue>{transportOptions.publicTransport.emissions} CO₂</EmissionValue>
          </TransportOptionCard>
          
          <TransportOptionCard 
            selected={selectedTransport === 'bicycle'}
            onClick={() => setSelectedTransport('bicycle')}
          >
            <span role="img" aria-label="bicycle">🚲</span> Bicycle
            <EmissionValue>{transportOptions.bicycle.emissions} CO₂</EmissionValue>
          </TransportOptionCard>
          
          <TransportOptionCard 
            selected={selectedTransport === 'walking'}
            onClick={() => setSelectedTransport('walking')}
          >
            <span role="img" aria-label="walking">🚶</span> Walking
            <EmissionValue>{transportOptions.walking.emissions} CO₂</EmissionValue>
          </TransportOptionCard>
        </Card>
      </GridContainer>

      <ComparisonContainer>
        <CardTitle>Your Impact</CardTitle>
        <p>
          By choosing {selectedTransport === 'car' ? 'to drive' : selectedTransport}, you can{' '}
          <GreenText>
            reduce your carbon emissions by {transportOptions[selectedTransport].reduction}
          </GreenText>
          {' '}compared to driving.
        </p>
      </ComparisonContainer>
    </PageContainer>
  );
};

export default EnvironmentalImpact;