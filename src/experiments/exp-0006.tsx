import * as React from 'react';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import * as p5 from 'p5';
import { useParameters } from '../facility/parameters-form/use-parameters';

export const Experiment: React.FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [params, parametersForm] = useParameters(
    {
      depth: { value: 1, step: 0.01 },
      rotate: { value: Math.PI / 4 },
      segmentSize: { value: 50 },
      shrink: { value: 1 },
    },
    [
      {
        shrink: 1,
        depth: 11,
        rotate: 5.64504929941916,
        segmentSize: 50,
      },
      {
        shrink: 0.992,
        depth: 11,
        rotate: 5.84139884026853,
        segmentSize: 42.2,
      },
      {
        depth: 9.7,
        rotate: 1.09563043793944,
        segmentSize: 100,
        shrink: 0.779,
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
        p.background(255);
        p.noFill();
        p.stroke(0, 40);
        drawRecursive(p, 0, Math.PI / 2, { x: 400, y: 400 }, params.segmentSize);
      };
    };

    const drawRecursive = (p: p5, depth: number, angle: number, fromPoint: { x: number; y: number }, segmentSize: number) => {
      if (depth > params.depth) return;

      const rotation = params.rotate;
      const newRotation1 = angle + rotation;
      const newRotation2 = angle - rotation;
      const vector = {
        x: Math.cos(angle) * segmentSize,
        y: -Math.sin(angle) * segmentSize,
      };
      const newPoint1 = {
        x: fromPoint.x + Math.cos(rotation) * vector.x - Math.sin(rotation) * vector.y,
        y: fromPoint.y + Math.sin(rotation) * vector.x + Math.cos(rotation) * vector.y,
      };
      const newPoint2 = {
        x: fromPoint.x + Math.cos(-rotation) * vector.x - Math.sin(-rotation) * vector.y,
        y: fromPoint.y + Math.sin(-rotation) * vector.x + Math.cos(-rotation) * vector.y,
      };

      p.line(fromPoint.x, fromPoint.y, newPoint1.x, newPoint1.y);
      p.line(fromPoint.x, fromPoint.y, newPoint2.x, newPoint2.y);

      drawRecursive(p, depth + 1, newRotation1, newPoint1, segmentSize * params.shrink);
      drawRecursive(p, depth + 1, newRotation2, newPoint2, segmentSize * params.shrink);
    };

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
