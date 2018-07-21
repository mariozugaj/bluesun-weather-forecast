import React from "react";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { curveBasis } from "@vx/curve";
import { AxisLeft } from "@vx/axis";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";
import { LinePath } from "@vx/shape";

export const WindGraph = ({ width, height, margin, data }) => {
  if (width < 10) return null;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = d => new Date(d.time * 1000);
  const y = d => d.windSpeed;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.ceil(max(data, y))],
    nice: true,
  });

  const numTicksForHeight = height => (height > 150 ? 8 : 5);

  return (
    <figure className="graph-wrapper">
      <svg width={width} height={height}>
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
            stroke="rgb(28, 42, 42)"
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
          <text fontSize={12}>Wind speed m/s</text>
        </Group>
        />
      </svg>
    </figure>
  );
};

export default WindGraph;
