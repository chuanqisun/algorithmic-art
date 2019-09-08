import * as React from 'react';
import styled from 'styled-components';

interface FormProps {}

export const ParametericForm: React.FC<FormProps> = props => {
  return <StyledForm onSubmit={e => e.preventDefault()}>{props.children}</StyledForm>;
};

const StyledForm = styled.form`
  width: 80vw;
`;
