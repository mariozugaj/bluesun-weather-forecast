import React from "react";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { curveNatural } from "@vx/curve";
import { AxisLeft, AxisTop } from "@vx/axis";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max, min, bisector } from "d3-array";
import { LinePath, Line, Bar } from "@vx/shape";
import { Point } from "@vx/point";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { timeFormat } from "d3-time-format";

export const TemperatureGraph = ({
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

  const xSelector = d => new Date(d.time * 1000);
  const ySelector = d => d.temperature;
  const zSelector = d => d.apparentTemperature;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top * 1.5 - margin.bottom;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, xSelector),
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [
      min(data, d => min([ySelector(d), zSelector(d)])) - 2,
      max(data, d => max([ySelector(d), zSelector(d)])) + 2,
    ],
    nice: true,
  });

  const anySubZeroTicks = yScale.ticks()[0] <= 0;

  const numTicksForHeight = height => (height > 299 ? 10 : 7);
  const bisectDate = bisector(d => new Date(d.time * 1000)).left;
  const formatDate = timeFormat("%a %b %d, %H:%M");

  const handleTooltip = datum => event => {
    let { x } = localPoint(event);
    x -= margin.left;
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.time) {
      d = x0 - xSelector(d0.time) > xSelector(d1.time) - x0 ? d1 : d0;
    }
    return showTooltip({
      tooltipData: d,
      tooltipLeft: x,
      tooltipTop: yScale(d.temperature),
    });
  };

  return (
    <figure className="graph-wrapper">
      <svg width={width} height={height}>
        <defs>
          <linearGradient
            id="tempGradient"
            x1={0}
            y1={yScale(1)}
            x2={0}
            y2={yScale(-1)}
            gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c60000" />
            <stop offset="50%" stopColor="#c60000" />
            <stop offset="50%" stopColor="blue" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
        </defs>
        <Group top={margin.top * 1.5} left={margin.left}>
          <Grid
            top={0}
            left={0}
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
            x={xSelector}
            y={ySelector}
            stroke="url(#tempGradient)"
            strokeWidth={2}
            curve={curveNatural}
          />
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={xSelector}
            y={zSelector}
            stroke="url(#tempGradient)"
            strokeWidth={1}
            strokeDasharray="4,3"
            curve={curveNatural}
          />
          {anySubZeroTicks && (
            <Line
              from={new Point({ x: 0, y: yScale(0) })}
              to={new Point({ x: xMax, y: yScale(0) })}
              strokeDasharray="4,3"
              strokeWidth="1px"
              stroke="#a1a1a1"
              shapeRendering="crispEdges"
            />
          )}
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
          top={margin.top * 1.5}
          left={margin.left}
          scale={yScale}
          tickTextFill={"#1b1a1e"}
          numTicks={numTicksForHeight(height)}
          tickFormat={val => `${val}˚`}
          hideTicks={true}
          hideAxisLine={true}
          tickLabelProps={() => ({ fontSize: 12, textAnchor: "end" })}
        />
        <AxisTop
          top={margin.top}
          left={margin.left}
          scale={xScale}
          hideTicks={true}
          hideAxisLine={true}
          tickLabelProps={() => ({ fontSize: "1em", fontWeight: 400, textAnchor: "middle" })}
        />
        <Group left={margin.left} top={height - 10}>
          <text fontSize={12}>Temperature °C | Feels like °C</text>
        </Group>
      </svg>
      {tooltipOpen && (
        <span>
          <Tooltip
            top={tooltipTop + margin.top + 8}
            left={tooltipLeft + 50}
            style={{
              backgroundColor: "#005bff",
              color: "white",
            }}>
            {`${ySelector(tooltipData)}˚ C`}
          </Tooltip>
          <Tooltip top={height - margin.bottom} left={tooltipLeft - 25}>
            {formatDate(xSelector(tooltipData))}
          </Tooltip>
        </span>
      )}
    </figure>
  );
};

export default withTooltip(TemperatureGraph);
