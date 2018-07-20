import React from "react";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { curveBasis } from "@vx/curve";
import { AxisLeft } from "@vx/axis";
import { LinePath } from "@vx/shape";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max, min } from "d3-array";

export const WindGraph = ({ width, height, margin, data }) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = d => new Date(d.time * 1000);
  const y = d => d.windSpeed;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y) + 2],
    nice: true,
  });

  return (
    <svg width={width} height={height}>
      <Grid
        top={margin.top}
        left={margin.left}
        xScale={xScale}
        yScale={yScale}
        width={xMax}
        height={yMax}
        className="grid-lines__line"
        numTicksRows={height > 150 ? 6 : 3}
      />
      <Group top={margin.top} left={margin.left}>
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke="rgb(28, 42, 42)"
          strokeWidth={2}
          curve={curveBasis}
        />
      </Group>
      <Group left={margin.left}>
        <AxisLeft
          top={margin.top}
          left={0}
          scale={yScale}
          stroke={"#1b1a1e"}
          strokeWidth={0.5}
          tickTextFill={"#1b1a1e"}
          numTicks={height > 150 ? 6 : 3}
          hideTicks={true}
          hideAxisLine={true}
          tickLabelProps={() => ({ fontSize: 12, textAnchor: "end" })}
        />
        <text x={0} y={height - 4} transform="" fontSize={12}>
          Wind speed m/s
        </text>
        />
      </Group>
    </svg>
  );
};

export default WindGraph;
