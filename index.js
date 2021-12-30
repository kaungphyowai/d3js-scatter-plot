let width = 1000;
let height = 700;
let horizontalPadding = 40;
let verticalPadding = 30;
//find the min value of year
fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
    .then(data => data.json()).then(res => {
        let svg = d3.select('svg').attr('width', width).attr('height', height);
        //draw the Xaxis
        let yearMin = d3.min(res, d => d['Year'])
        let yearMax = d3.max(res, d => d['Year'])
        console.log(yearMax)
        let xScale = d3.scaleLinear().domain([yearMin - 1, yearMax]).range([0 + horizontalPadding, width - horizontalPadding])
        let Xaxis = d3.axisBottom(xScale)
        svg.append('g')
            .attr("transform", "translate(" + 0 + ", " + (height - verticalPadding) + ")")
            .attr('id', 'x-axis')
            .call(Xaxis)


        //draw the Yaxis
        let timeMin = d3.min(res, d => d['Time']);
        let timeMax = d3.max(res, d => d['Time']);
        var Yscale = d3.scaleLinear()
            .domain([timeMin, timeMax])
            .range([0 + verticalPadding, height - verticalPadding]);

        var y_axis = d3.axisLeft(Yscale);


        svg.append("g")
            .attr('id', 'y-axis')
            .attr('transform', 'translate(' + horizontalPadding + ", " + 0 + ")")
            .call(y_axis);
    })