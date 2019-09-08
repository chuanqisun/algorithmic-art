import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface ScalarProps {
  label: string;
  value: number;
  stepCount?: number;
  step?: number;
  onChange: (value: number) => any;
}

export const Scalar: React.FC<ScalarProps> = props => {
  const [step, setStep] = useState(props.step || Math.abs(props.value / 1000));
  const [stepCount, setStepCount] = useState(props.stepCount || 1000);
  const [min, setMin] = useState(props.value - stepCount * step);
  const [max, setMax] = useState(props.value + stepCount * step);

  return (
    <StyledLabel>
      <div>
        {props.label} ({props.value})
      </div>
      <input className="input" type="range" value={props.value} step={step} min={min} max={max} onChange={e => props.onChange(parseFloat(e.target.value))} />
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  .input {
    width: 100%;
  }
`;
