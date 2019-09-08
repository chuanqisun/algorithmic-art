import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Scalar } from './scalar';

type ParamsConfig<P> = {
  [T in keyof P]: ParamConfig<P[T]>;
};

interface ParamConfig<P> {
  value: P;
  step?: number;
  stepCount?: number;
}

type ReadonlyParams<P> = {
  readonly [T in keyof P]: P[T];
};

type PatchParamsFn<P> = (delta: Partial<P>) => void;

export function useParameters<P extends Q, Q>(config: ParamsConfig<P>, presets?: Partial<Q>[]): [ReadonlyParams<P>, JSX.Element] {
  const [paramsObject, setParamsObject] = useState(getInitialValue(config));
  const patchParams: PatchParamsFn<P> = delta => setParamsObject({ ...paramsObject, ...delta });
  const parametersForm = <ParametersForm config={config} readonlyParams={paramsObject} patchParams={patchParams} presets={presets} />;

  return [paramsObject, parametersForm];
}

function getInitialValue<P>(config: ParamsConfig<P>): ReadonlyParams<P> {
  const initObj = {} as any;
  for (let entry in config) {
    initObj[entry] = config[entry].value;
  }

  return initObj;
}

const ParametersForm: React.FC<{
  config: ParamsConfig<any>;
  readonlyParams: ReadonlyParams<any>;
  patchParams: PatchParamsFn<any>;
  presets?: any[];
}> = props => {
  return (
    <StyledForm onSubmit={e => e.preventDefault()}>
      <button onClick={e => props.patchParams(getInitialValue(props.config))}>Reset</button>
      {props.presets &&
        props.presets.map((preset, i) => (
          <button key={i} onClick={e => props.patchParams(preset)}>
            Preset {i + 1}
          </button>
        ))}
      <br />
      <br />
      {Object.entries(props.readonlyParams).map(([key, value]) => (
        <Scalar
          key={key}
          step={props.config[key].step}
          stepCount={props.config[key].stepCount}
          label={key}
          value={value as any}
          onChange={e =>
            props.patchParams({
              [key]: e,
            } as any)
          }
        />
      ))}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 80vw;
`;
