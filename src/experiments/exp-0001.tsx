import * as React from 'react';
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';

export const Exp0001: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [centerX, setCenterX] = useState(200);
  const [centerY, setCenterY] = useState(120);
  const [rotateFactor, setRotateFactor] = useState(0.0052);
  const [scaleFactor, setScaleFactor] = useState(1.023);
  const [triangleSize, setTriangleSize] = useState(80);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 800, 400);

    const rotateStep = (i: number) => Math.PI * rotateFactor * i;
    const scaleStep = (i: number) => Math.pow(scaleFactor, i);

    function draw() {
      ctx.strokeStyle = '#444';

      const triangle = makeTriangle(centerX, centerY, triangleSize);

      for (let i = 0; i < 199; i++) {
        ctx.save();
        rotateObject(ctx, centerX, centerY, rotateStep(i));
        scaleObject(ctx, centerX, centerY, scaleStep(i));
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
      <div>
        <label>
          Triangle size
          <input type="number" value={triangleSize} onChange={e => setTriangleSize(parseInt(e.target.value))} />
        </label>
        <br />
        <label>
          Center X
          <input type="number" value={centerX} onChange={e => setCenterX(parseInt(e.target.value))} />
        </label>
        <br />
        <label>
          Center Y
          <input type="number" value={centerY} onChange={e => setCenterY(parseInt(e.target.value))} />
        </label>
        <br />
        <label>
          Rotate
          <input type="number" value={rotateFactor} onChange={e => setRotateFactor(parseFloat(e.target.value))} />
        </label>
        <br />
        <label>
          Scale
          <input type="number" value={scaleFactor} onChange={e => setScaleFactor(parseFloat(e.target.value))} />
        </label>
      </div>
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

export default Exp0001;
