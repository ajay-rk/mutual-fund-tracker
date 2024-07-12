import React, { useState } from 'react';
import InputForm from './InputForm';
import ResultTable from './ResultTable';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f0f9ff; /* Light blue background */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Soft shadow */
  height: 550px;
  `;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #007bff; /* Blue heading */
`;

const App = () => {
  const [data, setData] = useState(null);

  const handleData = (formData) => {
    const tempData = formData;
    tempData[1]['date'] = new Date().toLocaleDateString();
    setData(tempData);
  };

  return (
    <AppContainer>
      <Heading>Mutual Fund Tracker</Heading>
      <InputForm onSubmit={handleData} />
      {data && <ResultTable data={data} />}
    </AppContainer>
  );
};

export default App;
