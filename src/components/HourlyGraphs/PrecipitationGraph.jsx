import React from "react";
import { Group } from "@vx/group";
import { scaleLinear, scaleTime } from "@vx/scale";
import { max, extent } from "d3-array";
import { AxisLeft } from "@vx/axis";
import { Grid } from "@vx/grid";
import { curveBasis } from "@vx/curve";
import { AreaClosed } from "@vx/shape";

// accessors
const x = d => new Date(d.time * 1000);
const y = d => d.precipIntensity;

export default ({ width, height, margin, data }) => {
  if (width < 10) return null;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, y) + 3],
  });

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });

  return (
    <svg width={width} height={height}>
      <defs>
        <linearGradient id="precipGradient" x1={"0%"} y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0b4d93" stopOpacity={1} />
          <stop offset="50%" stopColor="#0f65c1" stopOpacity={1} />
          <stop offset="100%" stopColor="#4196f2" stopOpacity={1} />
        </linearGradient>
      </defs>
      <Group left={margin.left}>
        <AxisLeft
          top={margin.top}
          left={0}
          scale={yScale}
          tickTextFill={"#1b1a1e"}
          numTicks={height > 100 ? 5 : 2}
          hideTicks={true}
          hideAxisLine={true}
          tickLabelProps={() => ({ fontSize: 12, textAnchor: "end" })}
        />
        <text x={0} y={height - 2} fontSize={12}>
          Precipitation mm/hr
        </text>
      </Group>
      <Group top={margin.top} left={margin.left}>
        <Grid
          xScale={xScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
          numTicksRows={height > 100 ? 5 : 2}
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
    </svg>
  );
};
