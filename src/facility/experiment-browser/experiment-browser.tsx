import * as React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { experiments } from '../experiment-list/experiment-list';

export function ExperimentBrowser() {
  return (
    <>
      <Switch>
        {experiments.map(exp => (
          <Route key={exp.subRoute} path={`/exp/${exp.subRoute}`}>
            <StyledIframe width="100%" height="100%" frameBorder="0" src={`/host/${exp.subRoute}`} />
          </Route>
        ))}
      </Switch>
    </>
  );
}

const StyledIframe = styled.iframe`
  display: block;
`;
