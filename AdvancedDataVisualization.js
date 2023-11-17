/*
  Filename: AdvancedDataVisualization.js
  Content: Advanced data visualization using D3.js library
*/

// Dimensions of the SVG container
const width = 800;
const height = 600;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Selecting the SVG container and setting its width and height
const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Fetching data from an API
d3.json("https://api.example.com/data")
  .then((data) => {

    // Parsing data
    const parsedData = data.map((d) => ({
      xValue: d.x,
      yValue: d.y,
      label: d.label,
    }));

    // Creating scales for x and y axes
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(parsedData, d => d.xValue)])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(parsedData, d => d.yValue)])
      .range([innerHeight, 0]);

    // Creating x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Appending the axes to the SVG container
    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top + innerHeight})`)
      .call(xAxis);

    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    // Creating a line generator
    const line = d3.line()
      .x(d => xScale(d.xValue))
      .y(d => yScale(d.yValue))
      .curve(d3.curveMonotoneX);

    // Appending the line to the SVG container
    svg.append("path")
      .datum(parsedData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Appending circles for data points
    svg.selectAll("circle")
      .data(parsedData)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.xValue))
      .attr("cy", d => yScale(d.yValue))
      .attr("r", 5)
      .attr("fill", "steelblue");

    // Adding labels to data points
    svg.selectAll("text")
      .data(parsedData)
      .enter()
      .append("text")
      .text(d => d.label)
      .attr("x", d => xScale(d.xValue))
      .attr("y", d => yScale(d.yValue) - 10)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("fill", "black");

  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });