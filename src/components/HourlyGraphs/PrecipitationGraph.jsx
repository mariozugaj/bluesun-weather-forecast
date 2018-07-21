import React from "react";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { curveBasis } from "@vx/curve";
import { AxisLeft } from "@vx/axis";
import { scaleLinear, scaleTime } from "@vx/scale";
import { max, extent } from "d3-array";
import { AreaClosed } from "@vx/shape";

export const PrecipitationGraph = ({ width, height, margin, data }) => {
  if (width < 10) return null;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = d => new Date(d.time * 1000);
  const y = d => d.precipIntensity;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.ceil(max(data, y))],
    nice: true,
  });

  const numTicksForHeight = height => (height > 100 ? 6 : 3);
  // debugger;
  return (
    <figure className="graph-wrapper">
      <svg width={width} height={height}>
        <defs>
          <linearGradient id="precipGradient" x1={"0%"} y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0b4d93" stopOpacity={1} />
            <stop offset="50%" stopColor="#0f65c1" stopOpacity={1} />
            <stop offset="100%" stopColor="#4196f2" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Group top={margin.top} left={margin.left}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            numTicksRows={numTicksForHeight(height)}
            className="grid-lines__line"
          />
          <AreaClosed
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            strokeWidth={0}
            fill={"url(#precipGradient)"}
            curve={curveBasis}
          />
        </Group>
        <AxisLeft
          top={margin.top}
          left={margin.left}
          scale={yScale}
          tickTextFill={"#1b1a1e"}
          numTicks={numTicksForHeight(height)}
          hideTicks={true}
          hideAxisLine={true}
          tickLabelProps={() => ({ fontSize: 12, textAnchor: "end" })}
        />
        <Group left={margin.left} top={height - 4}>
          <text fontSize={12}>Precipitation mm/hr</text>
        </Group>
      </svg>
    </figure>
  );
};

export default PrecipitationGraph;
