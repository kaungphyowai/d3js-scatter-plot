let width = 1000;
let height = 700;
let horizontalPadding = 100;
let verticalPadding = 30;
let xStratPoint = horizontalPadding;
let xEndPoint = width - horizontalPadding;
let yStartPoint = verticalPadding;
let yEndPoint = height - verticalPadding;
//find the min value of year
fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
)
  .then((data) => data.json())
  .then((res) => {
    //Format Data
    let yearsRange = res.map((data) => {
      return new Date(data["Year"].toString());
    });
    let records = res.map((data) => {
      return new Date(data["Seconds"] * 1000);
    });
    //Draw An Svg
    let svg = d3.select("svg").attr("width", width).attr("height", height);
    //Draw the Xaxis
    let yearMin = d3.min(yearsRange);
    let yearMax = d3.max(yearsRange);
    yearMin.setFullYear(yearMin.getFullYear() - 1);
    yearMax.setFullYear(yearMax.getFullYear() + 1);
    let xScale = d3
      .scaleLinear()
      .domain([yearMin, yearMax])
      .range([xStratPoint, xEndPoint]);
    let Xaxis = d3.axisBottom(xScale).tickFormat(d3.utcFormat("%Y"));
    svg
      .append("g")
      .attr("transform", "translate(" + 0 + ", " + yEndPoint + ")")
      .attr("id", "x-axis")
      .call(Xaxis);

    // //draw the Yaxis
    let timeMin = d3.min(records);
    let timeMax = d3.max(records);
    timeMax.setSeconds(timeMax.getSeconds() + 5);
    var Yscale = d3
      .scaleLinear()
      .domain([timeMin, timeMax])
      .range([yStartPoint, yEndPoint]);

    var y_axis = d3.axisLeft(Yscale).tickFormat(d3.utcFormat("%M:%S"));

    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + xStratPoint + ", " + 0 + ")")
      .call(y_axis);

    svg
      .append("g")
      .selectAll("circle")
      .data(res)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("data-xvalue", (d) => new Date(d["Year"].toString()))
      .attr("data-yvalue", (d) => new Date(d["Seconds"] * 1000))
      .attr("cx", (d) => xScale(new Date(d["Year"].toString())))
      .attr("cy", (d) => Yscale(new Date(d["Seconds"] * 1000)))
      .attr("r", 1.5)
      .style("fill", "black");
    let temp = new Date(res[0]["Year"].toString());
    console.log(xScale(temp));
  });
