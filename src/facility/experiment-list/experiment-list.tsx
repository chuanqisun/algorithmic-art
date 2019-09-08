import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { lazy } from 'react';

export const experiments = [
  {
    subRoute: 'exp-0001',
    component: lazy(() => import(`../../experiments/exp-0001`)),
  },
  {
    subRoute: 'exp-0002',
    component: lazy(() => import(`../../experiments/exp-0002`)),
  },
  {
    subRoute: 'exp-0003',
    component: lazy(() => import(`../../experiments/exp-0003`)),
  },
  {
    subRoute: 'exp-0004',
    component: lazy(() => import(`../../experiments/exp-0004`)),
  },
];

export function ExperimentList() {
  return (
    <>
      <ul>
        {experiments.map(exp => (
          <li key={exp.subRoute}>
            <NavLink to={`/exp/${exp.subRoute}`}>{exp.subRoute}</NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
