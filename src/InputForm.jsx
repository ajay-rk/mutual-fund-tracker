import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-right: 10px;
  display: block;
  width: 100px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
  width: 200px;
`;

const ErrorMsg = styled.p`
  color: red;
`;

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    aum: '',
    three_yr_rolling_rtn: '',
    ten_yr_cagr: '',
    cgar_five_yr: '',
    absolute_rtn_one_yr: '',
    lc: '',
    mc: '',
    sc: '',
    pe: '',
    std_div: '',
    sharpe_ratio: '',
    maximum_drawdown: '',
    sortino_ratio: '',
    alpha: '',
    fund_manager: '',
    turn_around: '',
    time_since_inception: '',
    number_of_rows: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = 'https://project-mf-be.onrender.com/file/get_details';

      // Filter out empty values and construct the query parameters
      const queryParams = Object.keys(formData)
        .filter((key) => formData[key] !== '')
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
        .join('&');

      const fullUrl = `${url}?${queryParams}`;

      const response = await axios.get(fullUrl);
      onSubmit(response.data);
    } catch (error) {
      setError('Failed to fetch data from API');
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ width: '30%' }}>
            <Label>
              AUM:
              <Input type="text" name="aum" value={formData.aum} onChange={handleChange} />
            </Label>
            <Label>
              3Y Rolling Return:
              <Input type="text" name="three_yr_rolling_rtn" value={formData.three_yr_rolling_rtn} onChange={handleChange} />
            </Label>
            <Label>
              10Y CAGR:
              <Input type="text" name="ten_yr_cagr" value={formData.ten_yr_cagr} onChange={handleChange} />
            </Label>
          </div>
          <div style={{ width: '30%' }}>
            <Label>
              CGAR 5Y:
              <Input type="text" name="cgar_five_yr" value={formData.cgar_five_yr} onChange={handleChange} />
            </Label>
            <Label>
              Absolute Return 1Y:
              <Input type="text" name="absolute_rtn_one_yr" value={formData.absolute_rtn_one_yr} onChange={handleChange} />
            </Label>
            <Label>
              Large Cap:
              <Input type="text" name="lc" value={formData.lc} onChange={handleChange} />
            </Label>
          </div>
          <div style={{ width: '30%' }}>
            <Label>
              Mid Cap:
              <Input type="text" name="mc" value={formData.mc} onChange={handleChange} />
            </Label>
            <Label>
              Small Cap:
              <Input type="text" name="sc" value={formData.sc} onChange={handleChange} />
            </Label>
            <Label>
              PE Ratio:
              <Input type="text" name="pe" value={formData.pe} onChange={handleChange} />
            </Label>
          </div>
          <div style={{ width: '30%' }}>
            <Label>
              Std Dev:
              <Input type="text" name="std_div" value={formData.std_div} onChange={handleChange} />
            </Label>
            <Label>
              Sharpe Ratio:
              <Input type="text" name="sharpe_ratio" value={formData.sharpe_ratio} onChange={handleChange} />
            </Label>
            <Label>
              Max Drawdown:
              <Input type="text" name="maximum_drawdown" value={formData.maximum_drawdown} onChange={handleChange} />
            </Label>
          </div>
          <div style={{ width: '30%' }}>
            <Label>
              Sortino Ratio:
              <Input type="text" name="sortino_ratio" value={formData.sortino_ratio} onChange={handleChange} />
            </Label>
            <Label>
              Alpha:
              <Input type="text" name="alpha" value={formData.alpha} onChange={handleChange} />
            </Label>
            <Label>
              Fund Manager:
              <Input type="text" name="fund_manager" value={formData.fund_manager} onChange={handleChange} />
            </Label>
          </div>
          <div style={{ width: '30%' }}>
            <Label>
              Turn Around:
              <Input type="text" name="turn_around" value={formData.turn_around} onChange={handleChange} />
            </Label>
            <Label>
              Time Since Inception:
              <Input type="text" name="time_since_inception" value={formData.time_since_inception} onChange={handleChange} />
            </Label>
            <Label>
              Number of Rows:
              <Input type="text" name="number_of_rows" value={formData.number_of_rows} onChange={handleChange} />
            </Label>
          </div>
        </div>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </FormContainer>
  );
};

export default InputForm;
