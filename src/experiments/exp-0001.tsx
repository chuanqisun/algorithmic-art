import * as React from 'react';
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { Scalar } from '../facility/form/scalar';
import { ParametericForm } from '../facility/form/parametric-form';

interface Preset {
  centerY: number;
  rotateFactor: number;
  scaleFactor: number;
  triangleSize: number;
  depth: number;
}

export const Exp0001: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [centerX, setCenterX] = useState(400);
  const [centerY, setCenterY] = useState(200);
  const [rotateFactor, setRotateFactor] = useState(1);
  const [scaleFactor, setScaleFactor] = useState(1.023);
  const [triangleSize, setTriangleSize] = useState(80);
  const [depth, setDepth] = useState(200);

  const preset1: Preset = {
    centerY: 243.4,
    rotateFactor: 1.4,
    scaleFactor: 0.95855,
    triangleSize: 402,
    depth: 1144,
  };

  const usePreset = (preset: Preset) => {
    setCenterY(preset.centerY);
    setRotateFactor(preset.rotateFactor);
    setScaleFactor(preset.scaleFactor);
    setTriangleSize(preset.triangleSize);
    setDepth(preset.depth);
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 800, 400);

    const rotateStep = (i: number) => (Math.PI * rotateFactor * i) / 180;
    const scaleStep = (i: number) => Math.pow(scaleFactor, i);

    function draw() {
      ctx.strokeStyle = '#444';

      const triangle = makeTriangle(centerX, centerY, triangleSize);

      for (let i = 0; i < depth; i++) {
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
      <button onClick={() => usePreset(preset1)}>Preset 1</button>
      <ParametericForm>
        <Scalar label="Depth" value={depth} onChange={setDepth} step={1} />
        <Scalar label="Triangle size" value={triangleSize} onChange={setTriangleSize} step={1} />
        <Scalar label="Center X" value={centerX} onChange={setCenterX} />
        <Scalar label="Center Y" value={centerY} onChange={setCenterY} />
        <Scalar label="Rotate" value={rotateFactor} onChange={setRotateFactor} step={0.1} />
        <Scalar label="Scale" value={scaleFactor} onChange={setScaleFactor} />
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
