import * as React from 'react';
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { Scalar } from '../facility/form/scalar';
import { ParametericForm } from '../facility/form/parametric-form';
import * as p5 from 'p5';

interface Preset {
  depth: number;
  pointCount: number;
  chaos: number;
  amplitude: number;
}

export const Exp0001: React.FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [depth, setDepth] = useState(10);
  const [pointCount, setPointCount] = useState(20);
  const [chaos, setChaos] = useState(50);
  const [amplitude, setAmplitude] = useState(50);

  const preset1: Preset = {
    depth: 56.3,
    pointCount: 19,
    chaos: 121,
    amplitude: 67.8,
  };

  const usePreset = (preset: Preset) => {
    setDepth(preset.depth);
    setPointCount(preset.pointCount);
    setChaos(preset.chaos);
    setAmplitude(preset.amplitude);
  };

  useEffect(() => {
    const container = canvasContainerRef.current!;

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(800, 400);
        p.noLoop();
      };

      p.draw = () => {
        const points = [];
        for (let i = -1; i < pointCount + 2; i++) {
          points.push({ x: (800 / pointCount) * i, y: 200 + addNoise(amplitude) });
        }

        p.background(255);
        p.noFill();
        p.stroke(0, 10);
        for (let i = 0; i < depth ** 2; i++) {
          drawStrand(p, i, points);
        }
      };
    };

    const drawStrand = (p: p5, i: number, points: ({ x: number; y: number })[]) => {
      p.beginShape();
      points.forEach(point => {
        p.curveVertex(point.x, point.y + addNoise(chaos));
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
      <button onClick={() => usePreset(preset1)}>Preset 1</button>
      <ParametericForm>
        <Scalar label="Depth" value={depth} onChange={e => setDepth(e)} step={0.1} />
        <Scalar label="Points" value={pointCount} onChange={e => setPointCount(e)} step={1} />
        <Scalar label="Chaos" value={chaos} onChange={e => setChaos(e)} step={1} />
        <Scalar label="Amplitude" value={amplitude} onChange={e => setAmplitude(e)} step={0.1} />
      </ParametericForm>
    </>
  );
};

const StyledCanvasContainer = styled.div`
  width: 800px;
  height: 400px;
  border: 1px solid #444;
`;

export default Exp0001;
