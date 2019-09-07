import * as React from 'react';
import { Route } from 'react-router-dom';
import { Suspense } from 'react';
import { experiments } from '../experiment-list/experiment-list';

export function ExperimentHost() {
  return (
    <>
      {experiments.map(exp => (
        <Route
          key={exp.subRoute}
          path={`/host/${exp.subRoute}`}
          component={() => (
            <Suspense fallback="loading...">
              <exp.component />
            </Suspense>
          )}
        />
      ))}
    </>
  );
}
