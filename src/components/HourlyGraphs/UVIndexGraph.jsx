import React from "react";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { curveMonotoneX } from "@vx/curve";
import { AxisLeft } from "@vx/axis";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max, bisector } from "d3-array";
import { LinePath, Line, Bar } from "@vx/shape";
import { Point } from "@vx/point";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { timeFormat } from "d3-time-format";

export const UVIndexGraph = ({
  width,
  height,
  margin,
  data,
  showTooltip,
  tooltipData,
  tooltipLeft,
  tooltipTop,
  tooltipOpen,
  hideTooltip,
  events,
}) => {
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
    domain: [0, 14],
    nice: true,
  });

  const numTicksForHeight = height => (height > 150 ? 8 : 4);
  const bisectDate = bisector(d => new Date(d.time * 1000)).left;
  const formatDate = timeFormat("%a %b %d, %H:%M");

  const handleTooltip = datum => event => {
    let xLoc = localPoint(event).x;
    xLoc -= margin.left;
    const x0 = xScale.invert(xLoc);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.time) {
      d = x0 - x(d0.time) > x(d1.time) - x0 ? d1 : d0;
    }
    return showTooltip({
      tooltipData: d,
      tooltipLeft: xLoc,
      tooltipTop: yScale(d.uvIndex),
    });
  };

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
            stroke="url(#uvGradient)"
            strokeWidth={2}
            curve={curveMonotoneX}
          />
          <Bar
            x={0}
            y={0}
            width={xMax}
            height={yMax}
            fill="transparent"
            rx={14}
            data={data}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onTouchEnd={() => () => hideTooltip()}
            onMouseLeave={() => () => hideTooltip()}
          />
          {tooltipOpen && (
            <g>
              <Line
                from={new Point({ x: tooltipLeft, y: 0 })}
                to={new Point({ x: tooltipLeft, y: yMax })}
                stroke="#0341b6"
                strokeWidth={2}
                style={{ pointerEvents: "none" }}
                strokeDasharray="2,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={6}
                fill="#0341b6"
                stroke="white"
                strokeWidth={2}
                style={{ pointerEvents: "none" }}
              />
            </g>
          )}
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
      {tooltipOpen && (
        <span>
          <Tooltip
            top={0}
            left={tooltipLeft + 18}
            style={{
              backgroundColor: "#005bff",
              color: "white",
            }}>
            {`${y(tooltipData)}`}
          </Tooltip>
          <Tooltip top={height - margin.bottom} left={tooltipLeft - 25}>
            {formatDate(x(tooltipData))}
          </Tooltip>
        </span>
      )}
    </figure>
  );
};

export default withTooltip(UVIndexGraph);
