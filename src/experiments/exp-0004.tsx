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
      pointCount: { value: 20, step: 1 },
      chaos: { value: 25, step: 1 },
      amplitude: { value: 50, step: 0.1 },
    },
    [{ depth: 56.3, pointCount: 19, chaos: 121, amplitude: 67.8 }]
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
          points.push({ x: (800 / params.pointCount) * i, y: 200 + addNoise(params.amplitude) });
        }

        p.background(255);
        p.noFill();
        p.stroke(0, 10);
        for (let i = 0; i < params.depth ** 2; i++) {
          drawStrand(p, i, points);
        }
      };
    };

    const drawStrand = (p: p5, i: number, points: ({ x: number; y: number })[]) => {
      p.beginShape();
      points.forEach(point => {
        p.curveVertex(point.x, point.y + addNoise(params.chaos));
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
