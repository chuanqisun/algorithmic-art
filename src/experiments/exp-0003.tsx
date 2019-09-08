import * as React from 'react';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { useParameters } from '../facility/parameters-form/use-parameters';

export const Experiment: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [params, parametersForm] = useParameters(
    {
      waveLength: { value: 5, step: 0.01 },
      depth: { value: 10, step: 0.01 },
      x1: { value: 200, step: 1 },
      y1: { value: 100, step: 1 },
      x2: { value: 600, step: 1 },
      y2: { value: 300, step: 1 },
    },
    [{ waveLength: 8.67, depth: 18 }]
  );

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 800, 400);

    function draw() {
      ctx.strokeStyle = '#444';

      for (let i = 0; i < 2 ** params.depth; i++) {
        const x = Math.random() * 800;
        const y = Math.random() * 400;

        const distanceToS1 = getDistance(x, y, params.x1, params.y1);
        const distanceToS2 = getDistance(x, y, params.x2, params.y2);

        const s1Amplitude = Math.cos(distanceToS1 / params.waveLength);
        const s2Amplitude = Math.cos(distanceToS2 / params.waveLength);
        const totalAmplitude = s1Amplitude + s2Amplitude;

        const displayProbability = (totalAmplitude + 2) / 4;

        if (Math.random() < displayProbability) {
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    draw();
  });

  return (
    <>
      <StyledCanvas ref={canvasRef} width="800" height="400"></StyledCanvas>
      {parametersForm}
    </>
  );
};

const StyledCanvas = styled.canvas`
  border: 1px solid #444;
`;

function getDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export default Experiment;
