import * as React from 'react';
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { Scalar } from '../facility/form/scalar';
import { ParametericForm } from '../facility/form/parametric-form';

export const Exp0001: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [depth, setDepth] = useState(10);
  const [radius, setRadius] = useState(50);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 800, 400);

    function draw() {
      ctx.strokeStyle = '#444';

      for (let i = 0; i < Math.pow(2, depth); i++) {
        const angle = Math.PI * 2 * Math.random();
        const probabalisticRaidus = radius * (2 + Math.sin(Math.PI * Math.random() * 2));
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
      <ParametericForm>
        <Scalar label="Depth" value={depth} onChange={setDepth} step={0.005} />
        <Scalar label="Radius" value={radius} onChange={setRadius} />
      </ParametericForm>
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
