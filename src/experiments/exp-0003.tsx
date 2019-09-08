import * as React from 'react';
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { Scalar } from '../facility/form/scalar';
import { ParametericForm } from '../facility/form/parametric-form';

export const Exp0001: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [waveLength, setWaveLength] = useState(5);
  const [depth, setDepth] = useState(10);
  const [x1, setX1] = useState(200);
  const [y1, setY1] = useState(100);
  const [x2, setX2] = useState(600);
  const [y2, setY2] = useState(300);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 800, 400);

    function draw() {
      ctx.strokeStyle = '#444';

      for (let i = 0; i < 2 ** depth; i++) {
        const x = Math.random() * 800;
        const y = Math.random() * 400;

        const distanceToS1 = getDistance(x, y, x1, y1);
        const distanceToS2 = getDistance(x, y, x2, y2);

        const s1Amplitude = Math.cos(distanceToS1 / waveLength);
        const s2Amplitude = Math.cos(distanceToS2 / waveLength);
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
      <ParametericForm>
        <Scalar label="Depth" value={depth} onChange={setDepth} stepSize={0.01} />
        <Scalar label="x1" value={x1} onChange={setX1} stepSize={1} />
        <Scalar label="y1" value={y1} onChange={setY1} stepSize={1} />
        <Scalar label="x2" value={x2} onChange={setX2} stepSize={1} />
        <Scalar label="y2" value={y2} onChange={setY2} stepSize={1} />
        <Scalar label="Wave length" value={waveLength} onChange={setWaveLength} stepSize={0.01} />
      </ParametericForm>
    </>
  );
};

const StyledCanvas = styled.canvas`
  border: 1px solid #444;
`;

function getDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export default Exp0001;
