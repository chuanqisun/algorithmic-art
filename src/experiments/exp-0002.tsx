import * as React from 'react';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { useParameters } from '../facility/parameters-form/use-parameters';

export const Experiment: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [params, parametersForm] = useParameters(
    {
      depth: { value: 10, step: 0.005 },
      radius: { value: 50 },
    },
    [{ depth: 15, radius: 100 }]
  );

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 800, 400);

    function draw() {
      ctx.strokeStyle = '#444';

      for (let i = 0; i < Math.pow(2, params.depth); i++) {
        const angle = Math.PI * 2 * Math.random();
        const probabalisticRaidus = params.radius * (2 + Math.sin(Math.PI * Math.random() * 2));
        const x = probabalisticRaidus * Math.sin(angle) + 400;
        const y = probabalisticRaidus * Math.cos(angle) + 200;
        ctx.fillRect(x, y, 1, 1);
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

export default Experiment;
