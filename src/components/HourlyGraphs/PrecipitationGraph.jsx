import React from "react";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { curveMonotoneX } from "@vx/curve";
import { AxisLeft } from "@vx/axis";
import { scaleLinear, scaleTime } from "@vx/scale";
import { max, extent, bisector } from "d3-array";
import { AreaClosed, Line, Bar } from "@vx/shape";
import { Point } from "@vx/point";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { timeFormat } from "d3-time-format";
import PropTypes from "prop-types";

import { round } from "helpers";

export const PrecipitationGraph = ({
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
  units,
}) => {
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
      tooltipTop: yScale(d.precipIntensity),
    });
  };

  return (
    <figure className="graph-wrapper">
      <svg width={width} height={height}>
        <defs>
          <linearGradient
            id="precipGradient"
            x1={"0%"}
            y1="0%"
            x2="0%"
            y2="100%"
          >
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
            fill="url(#precipGradient)"
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
          <text
            fontSize={12}
          >{`Precipitation ${units.precipitationPerHour}`}</text>
        </Group>
      </svg>
      {tooltipOpen && (
        <span>
          <Tooltip
            top={0}
            left={tooltipLeft + 10}
            style={{
              backgroundColor: "#005bff",
              color: "white",
            }}
          >
            {round(y(tooltipData), 2)}
          </Tooltip>
          <Tooltip top={height - margin.bottom} left={tooltipLeft - 25}>
            {formatDate(x(tooltipData))}
          </Tooltip>
        </span>
      )}
    </figure>
  );
};

PrecipitationGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number.isRequired,
      precipIntensity: PropTypes.number.isRequired,
    })
  ),
  showTooltip: PropTypes.func.isRequired,
  tooltipData: PropTypes.shape({
    time: PropTypes.number.isRequired,
    precipIntensity: PropTypes.number.isRequired,
  }),
  tooltipLeft: PropTypes.number,
  tooltipTop: PropTypes.number,
  tooltipOpen: PropTypes.bool.isRequired,
  hideTooltip: PropTypes.func.isRequired,
  units: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

export default withTooltip(PrecipitationGraph, {
  style: { position: "relative" },
});
