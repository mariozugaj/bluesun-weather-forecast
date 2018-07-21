import React from "react";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { curveMonotoneX } from "@vx/curve";
import { AxisLeft } from "@vx/axis";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";
import { LinePath } from "@vx/shape";

export const UVIndexGraph = ({ width, height, margin, data }) => {
  if (width < 10) return null;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = d => new Date(d.time * 1000);
  const y = d => d.uvIndex;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, y)],
    nice: true,
  });

  const numTicksForHeight = height => (height > 150 ? 8 : 4);

  return (
    <figure className="graph-wrapper">
      <svg width={width} height={height} className="graph">
        <defs>
          <linearGradient
            id="uvGradient"
            x1={0}
            y1={yScale(0)}
            x2={0}
            y2={yScale(13)}
            gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="green" />
            <stop offset="22.3%" stopColor="green" />
            <stop offset="27.08%" stopColor="yellow" />
            <stop offset="45.4%" stopColor="yellow" />
            <stop offset="50.15%" stopColor="orange" />
            <stop offset="60.77%" stopColor="orange" />
            <stop offset="65.54%" stopColor="red" />
            <stop offset="83.85%" stopColor="red" />
            <stop offset="88.62%" stopColor="darkviolet" />
            <stop offset="100%" stopColor="darkviolet" />
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
            stroke={"url(#uvGradient)"}
            strokeWidth={2}
            curve={curveMonotoneX}
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
          <text fontSize={12}>UV Index</text>
        </Group>
        />
      </svg>
    </figure>
  );
};

export default UVIndexGraph;
