
    d3.csv("gapminder.csv")  // similar to fetch
    .then(function(data){ // .then bc d3 is asynchronous

            let spData = data.filter(d => d['year'] == "1980")
            let allData = data;
            let displayData = data;
            let gen = "All";
            let leg = "All";
            let svg = null;
            let x = null;
            let y = null;

            //let subset = data[3701, 3885];
            let country = data.map((row) => row["country"]);
            let year = data.map((row) => parseInt(row["year"]));
            let fertility = data.map((row) => parseFloat(row["fertility"]));
            let lifeEx = data.map((row) => parseFloat(row["life_expectancy"]));
            let pop = data.map((row) => parseInt(row["population"]));
            createPlot();
            plotPoints(spData);
            //console.log(data.length);
            //console.log(data[1].fertility);
            //console.log(data.fertility);


;
      function createPlot() {
        let margin = 50;
        let width = 800;
        let height = 500;

        // CREATING THE PLOT
        svg = d3.select("#plot")
          .append("svg")
            .attr("id", "plotArea")
            .attr("width", width)
            .attr("height", height)

        // Add X axis
        x = d3.scaleLinear()
          .domain([0, 10])
          .range([ margin, width-margin]);
        svg.append("g")
          .attr("id", "xAxis")
          .attr("transform", "translate(0," + (height - margin) + ")")
          .call(d3.axisBottom(x));

          svg.append("text")      // text label for the x axis
            .attr("x", 400 )
            .attr("y",  490 )
            .style("text-anchor", "middle")
            .text("Fertility");

            svg.append("text")      // text label for the y axis
              .style("text-anchor", "middle")
              .attr("transform", "translate(10,250) rotate(-90)")
              .text("Life Expectancy");

        // Add Y axis
        y = d3.scaleLinear()
          .domain([30, 85])
          .range([ height-margin, margin]); // 500 - 50
        svg.append("g")
          .attr("id", "yAxis")
          .attr("transform", "translate("+ margin +", 0)")
          .call(d3.axisLeft(y));

      }

      function plotPoints(points) {

        svg = d3.select("#plotArea")

        // Add dots
        svg.append('g')
          .attr("id", "currentPlot")
          .selectAll("dot")
          .data(points)
          .enter()
          .append("circle")
            .attr("cx", function (d) { return x(d.fertility); } )
            .attr("cy", function (d) { return y(d.life_expectancy); } )
            .attr("r", 1)
            .style("stroke", "blue")

      }
});
