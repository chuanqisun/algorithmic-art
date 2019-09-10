import * as React from 'react';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import * as p5 from 'p5';
import { useParameters } from '../facility/parameters-form/use-parameters';

export const Experiment: React.FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [params, parametersForm] = useParameters(
    {
      depth: { value: 10, step: 0.1 },
      radius: { value: 50, step: 1 },
      pointCount: { value: 20, step: 1 },
      chaos: { value: 25, step: 1 },
      amplitude: { value: 50, step: 0.1 },
    },
    [
      {
        depth: 19.3,
        radius: 74,
        pointCount: 90,
        chaos: 58,
        amplitude: 73.1,
      },
    ]
  );

  useEffect(() => {
    const container = canvasContainerRef.current!;

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(800, 400);
        p.noLoop();
      };

      p.draw = () => {
        const points = [];
        for (let i = -1; i < params.pointCount + 2; i++) {
          points.push({
            a: ((2 * Math.PI) / params.pointCount) * i,
          });
        }

        p.background(255);
        p.noFill();
        p.stroke(0, 10);
        for (let i = 0; i < params.depth ** 2; i++) {
          drawStrand(p, i, points);
        }
      };
    };

    const drawStrand = (p: p5, i: number, points: ({ a: number })[]) => {
      p.beginShape();
      points.forEach(point => {
        const noise = addNoise(params.chaos);
        const noise2 = addNoise(params.chaos);
        const noise3 = addNoise(params.chaos);
        const x = 400 + (params.radius + noise) * Math.sin(point.a) + noise2;
        const y = 200 + (params.radius + noise) * Math.cos(point.a) + noise3;

        p.curveVertex(x, y);
      });
      p.endShape();
    };

    const addNoise = (amplitude: number) => (0.5 - Math.random()) * 2 * amplitude;

    const p5Instance = new p5(sketch, container);
    return () => {
      p5Instance.clear();
      canvasContainerRef.current!.innerHTML = '';
    };
  });

  return (
    <>
      <StyledCanvasContainer ref={canvasContainerRef}></StyledCanvasContainer>
      {parametersForm}
    </>
  );
};

const StyledCanvasContainer = styled.div`
  width: 800px;
  height: 400px;
  border: 1px solid #444;
`;

export default Experiment;
