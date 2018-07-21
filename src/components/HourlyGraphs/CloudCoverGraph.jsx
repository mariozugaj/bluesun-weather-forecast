import React from "react";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { curveBasis } from "@vx/curve";
import { AxisLeft } from "@vx/axis";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";
import { LinePath } from "@vx/shape";

export const CloudCoverGraph = ({ width, height, margin, data }) => {
  if (width < 10) return null;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = d => new Date(d.time * 1000);
  const y = d => d.cloudCover * 100;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, y)],
    nice: true,
  });

  const numTicksForHeight = height => (height > 150 ? 8 : 5);

  return (
    <figure className="graph-wrapper">
      <svg width={width} height={height}>
        <defs>
          <linearGradient id="cloudCoverGradient" x1={"0%"} y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#514f51" />
            <stop offset="50%" stopColor="#a29fa3" />
            <stop offset="100%" stopColor="#95c8f4" />
          </linearGradient>
        </defs>
        <Group top={margin.top} left={margin.left}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            className="grid-lines__line"
            numTicksRows={numTicksForHeight(height)}
          />
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            stroke="url(#cloudCoverGradient)"
            strokeWidth={2}
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
          <text fontSize={12}>Cloud cover %</text>
        </Group>
        />
      </svg>
    </figure>
  );
};

export default CloudCoverGraph;
