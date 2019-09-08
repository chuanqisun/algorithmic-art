import * as React from 'react';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { useParameters } from '../facility/parameters-form/use-parameters';

export const Experiment: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [params, parametersForm] = useParameters(
    {
      centerX: { value: 400 },
      centerY: { value: 200 },
      rotateFactor: { value: 1, step: 0.1 },
      scaleFactor: { value: 1.023 },
      triangleSize: { value: 80, step: 1 },
      depth: { value: 200, step: 1 },
    },
    [
      {
        centerY: 243.4,
        rotateFactor: 1.4,
        scaleFactor: 0.95855,
        triangleSize: 402,
        depth: 1144,
      },
    ]
  );

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 800, 400);

    const rotateStep = (i: number) => (Math.PI * params.rotateFactor * i) / 180;
    const scaleStep = (i: number) => Math.pow(params.scaleFactor, i);

    function draw() {
      ctx.strokeStyle = '#444';

      const triangle = makeTriangle(params.centerX, params.centerY, params.triangleSize);

      for (let i = 0; i < params.depth; i++) {
        ctx.save();
        rotateObject(ctx, params.centerX, params.centerY, rotateStep(i));
        scaleObject(ctx, params.centerX, params.centerY, scaleStep(i));
        ctx.lineWidth = 1 / scaleStep(i);
        ctx.stroke(triangle);
        ctx.restore();
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

function makeTriangle(x: number, y: number, side: number) {
  const triangle = new Path2D();
  triangle.moveTo(x, y - side / Math.sqrt(3));
  triangle.lineTo(x + side * 0.5, y + side / (2 * Math.sqrt(3)));
  triangle.lineTo(x + side * -0.5, y + side / (2 * Math.sqrt(3)));
  triangle.closePath();
  return triangle;
}

function rotateObject(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.translate(-x, -y);
}

function scaleObject(ctx: CanvasRenderingContext2D, x: number, y: number, factor: number) {
  ctx.translate(x, y);
  ctx.scale(factor, factor);
  ctx.translate(-x, -y);
}

export default Experiment;
