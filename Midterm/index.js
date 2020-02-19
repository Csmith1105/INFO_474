
    const COLORS = [
      "#4E79A7",
      "#A0CBE8",
      "#F28E2B",
      "#FFBE7D",
      "#59A14F",
      "#8CD17D",
      "#B6992D",
      "#499894",
      "#86BCB6",
      "#FABFD2",
      "#E15759",
      "#FF9D9A",
      "#79706E",
      "#BAB0AC",
      "#D37295"]

    const TYPE1 = [
      "Bug",
      "Dark",
      "Electric",
      "Fairy",
      "Fighting",
      "Fire",
      "Ghost",
      "Grass",
      "Ground",
      "Ice",
      "Normal",
      "Poison",
      "Psychic",
      "Steel",
      "Water",
    ]

    d3.csv("pokemon.csv")  // similar to fetch
    .then(function(data){ // .then bc d3 is asynchronous

            let allData = data;
            let displayData = data;
            let gen = "All";
            let leg = "All";
            let svg = null;
            let x = null;
            let y = null;

            createPlot();
            plotPoints(data);
            activateDropdowns();
            //createLegend();
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
          .domain([15, 160])
          .range([ margin, width-margin]);
        svg.append("g")
          .attr("id", "xAxis")
          .attr("transform", "translate(0," + (height - margin) + ")")
          .call(d3.axisBottom(x));

          svg.append("text")      // text label for the x axis
            .attr("x", 400 )
            .attr("y",  490 )
            .style("text-anchor", "middle")
            .text("Special Defense");

            svg.append("text")      // text label for the y axis
              .style("text-anchor", "middle")
              .attr("transform", "translate(10,250) rotate(-90)")
              .text("Total");

        // Add Y axis
        y = d3.scaleLinear()
          .domain([155, 800])
          .range([ height-margin, margin]); // 500 - 50
        svg.append("g")
          .attr("id", "yAxis")
          .attr("transform", "translate("+ margin +", 0)")
          .call(d3.axisLeft(y));

      }

      function plotPoints(points) {

        svg = d3.select("#currentPlot")
        svg.remove();
        svg = d3.select("#plotArea")

        // Color scale: give me a specific name, I return a color
        var color = d3.scaleOrdinal()
          .domain(TYPE1)
          .range(COLORS)

        // Add dots
        svg.append('g')
          .attr("id", "currentPlot")
          .selectAll("dot")
          .data(points)
          .enter()
          .append("circle")
            .attr("cx", function (d) { return x(d.Sp_Def); } )
            .attr("cy", function (d) { return y(d.Total); } )
            .attr("r", 5)
            .style("fill", function (d) { return color(d.Type_1) } )
            // TOOLTIP FOR HOVERING OVER DATA POINTS
            .on("mouseover", function()
              {
                tooltip.style("display", null);
              })

            .on("mouseout", function()
              {
                tooltip.style("display", "none");
              })

            .on("mousemove", function(d)
              {
                var xPos = d3.mouse(this)[0] - 15;
                var yPos = d3.mouse(this)[1] - 55;
                tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")")
                tooltip.select("text").text(d.Name + ":" + d.Type_1 + ":" + d.Type_2)
              })

          var tooltip = svg.append("g")
              .attr("class", tooltip)
              .style("display", "none");

          tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("font-size", "1.25em")
            .style("font-weight", "bold");
      }

      function activateDropdowns() {


        d3.select("#leg-drop").on("change", function() {

          leg = this.options[this.selectedIndex].value;

          if (leg == "All" && gen == "All"){
            displayData = data;
            plotPoints(displayData);
          } else if (leg == "All") {
            displayData =  data.filter(function(d) {
                return d.Generation == gen
            })
            plotPoints(displayData);
          } else if (gen == "All") {
            displayData =  data.filter(function(d) {
                return d.Legendary == leg
            })
            plotPoints(displayData);
          } else {
            displayData =  data.filter(function(d) {
                return (d.Generation == gen && d.Legendary == leg)
            })
            plotPoints(displayData);
          }
        })


        d3.select("#gen-drop").on("change", function() {
          gen = this.options[this.selectedIndex].value;
          if (leg == "All" && gen == "All"){
            displayData = data;
            plotPoints(displayData);
          } else if (leg == "All") {
            displayData =  data.filter(function(d) {
                return d.Generation == gen
            })
            plotPoints(displayData);
          } else if (gen == "All") {
            displayData =  data.filter(function(d) {
                return d.Legendary == leg
            })
            plotPoints(displayData);
          } else {
            displayData =  data.filter(function(d) {
                return (d.Generation == gen && d.Legendary == leg)
            })
            plotPoints(displayData);
          }
          plotPoints(displayData);
        })


      }

      function createLegend(){
        // // select the svg area
        // svg = d3.select("#type1")
        //
        // //var svg = d3.select("svg");
        //
        // // Color legend.
        // var colorScale = d3.scaleQuantize()
        //   .domain(TYPE1)
        //   .range(COLORS);
        //
        // var colorLegend = d3.legend.color()
        //   .labelFormat(d3.format(".0f"))
        //   .scale(colorScale)
        //   .shapePadding(5)
        //   .shapeWidth(50)
        //   .shapeHeight(20)
        //   .labelOffset(12);
        //
        // svg.append("g")
        //   .attr("transform", "translate(352, 60)")
        //   .call(colorLegend);
        //
        //         // Usually you have a color scale in your chart already
        // // var color = d3.scaleOrdinal()
        // //   .domain(TYPE1)
        // //   .range(COLORS);
        // //
        // //           // Add one dot in the legend for each name.
        // // var size = 15
        // // svg.selectAll("mydots")
        // //   .data(COLORS)
        // //   .enter()
        // //   .append("rect")
        // //     .attr("x", 100)
        // //     .attr("y", function(d,i){ return 100 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        // //     .attr("width", size)
        // //     .attr("height", size)
        // //     .style("fill", function(d){ return color(d)})
        // //
        // //
        // // // Add one dot in the legend for each name.
        // // svg.selectAll("mylabels")
        // //   .data(TYPE1)
        // //   .enter()
        // //   .append("text")
        // //     .attr("x", 100 + size*1.2)
        // //     .attr("y", function(d,i){ return 100 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        // //     .style("fill", function(d){ return color(d)})
        // //     .text(function(d){ return d})
        // //     .attr("text-anchor", "left")
        // //     .style("alignment-baseline", "middle")

      }
});
