import "./App.css";
import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

function App() {
  //  1] Setup Initial data and settings ------------//

  const initialData = [
    {
      name: "Car",
      value: 10,
    },
    {
      name: "Food",
      value: 3,
    },
    {
      name: "Telephone",
      value: 8,
    },
    {
      name: "Electricity",
      value: 7,
    },
    {
      name: "Cinema",
      value: 4,
    },
  ];

  const width = 500;
  const height = 150;
  const padding = 20;
  const maxValue = 20; // Maximum data value

  const [chartdata, setChartdata] = useState(initialData);

  const svgRef = useRef();

  //  2] Setup random data generator and SVG canvas -//
  const newData = () =>
    chartdata.map(function (d) {
      d.value = Math.floor(Math.random() * (maxValue + 1));
      return d;
    });

  useEffect(() => {
    //  3] Setup functions for Scales ------------------//

    //xscales
    const xScale = d3
      .scalePoint()
      .domain(chartdata.map((d) => d.name))
      .range([0 + padding, width - padding]);

    //Yscales
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartdata, (d) => d.value)])
      .range([height - padding, 0 + padding]);

    //  4] Setup functions to draw Lines ---------------//

    const line = d3
      .line()
      .x((d) => xScale(d.name))
      .y((d) => yScale(d.value))
      .curve(d3.curveBasis);

    //  5] Draw line        ---------------------------//
    d3.select(svgRef.current)
      .select("path")
      .attr("d", () => line(chartdata))
      .attr("fill", "none")
      .attr("stroke", "purple");

    //  6] Setup functions to draw X and Y Axes --------//
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    //  7] Draw x and y Axes   -------------------------//
    d3.select("#xaxis").remove();
    d3.select(svgRef.current)
      .append("a")
      .attr("transform", `translate(0,${height - padding})`)
      .attr("id", "xaxis")
      .call(xAxis);

    d3.select("#yaxis").remove();
    d3.select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${padding},0)`)
      .attr("id", "yaxis")
      .call(yAxis);
  }, [chartdata]);

  return (
    <div className="App">
      <header className="App-header">
        <svg id="chart" ref={svgRef} viewBox="0 0 500 150">
          <path d="" fill="none" stroke="white" strokeWidth="5" />
        </svg>
        <p>
          <button type="button" onClick={() => setChartdata(newData())}>
            Click to refresh expenses data
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
