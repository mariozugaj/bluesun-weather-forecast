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

  const x = d => new Date(d.time * 1000);
  const y = d => d.temperature;
  const z = d => d.apparentTemperature;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top * 1.5 - margin.bottom;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [
      min(data, d => Math.floor(min([y(d), z(d)]))),
      max(data, d => Math.ceil(max([y(d), z(d)]))),
    ],
    nice: true,
  });

  const anySubZeroTicks = yScale.ticks()[0] <= 0;

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
      tooltipTop: [yScale(d.temperature), yScale(d.apparentTemperature)],
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
            gradientUnits="userSpaceOnUse"
          >
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
            numTicksRows={9}
          />
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            stroke="url(#tempGradient)"
            strokeWidth={2}
            curve={curveNatural}
          />
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={z}
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
                cy={tooltipTop[0]}
                r={6}
                fill="rgb(235, 235, 235)"
                stroke="black"
                strokeWidth={2}
                style={{ pointerEvents: "none" }}
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop[1]}
                r={6}
                fill="rgb(235, 235, 235)"
                stroke="black"
                strokeWidth={2}
                style={{ pointerEvents: "none" }}
                strokeDasharray="2,2"
              />
            </g>
          )}
        </Group>
        <AxisLeft
          top={margin.top * 1.5}
          left={margin.left}
          scale={yScale}
          tickTextFill={"#1b1a1e"}
          numTicks={9}
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
            top={margin.top}
            left={tooltipLeft - 25}
            style={{
              backgroundColor: "#005bff",
              color: "white",
            }}
          >
            {`${y(tooltipData)}˚ C | ${z(tooltipData)}˚ C`}
          </Tooltip>
          <Tooltip top={height - margin.bottom} left={tooltipLeft - 25}>
            {formatDate(x(tooltipData))}
          </Tooltip>
        </span>
      )}
    </figure>
  );
};

export default withTooltip(TemperatureGraph, { style: { position: "relative" } });
