
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

            let allData = data;  // DO I NEED TO DO THIS??
            let displayData = data;
            let gen = "All";
            let leg = "All";
            let svg = null;
            let x = null;
            let y = null;

            createPlot();
            plotPoints(data);
            //createTooltip();
            activateDropdowns();

            let testRow = data[1];
            let testGen = testRow.Generation; // 1
            let testLeg = testRow.Legendary; // False
            let genString = toString(testGen);

            console.log("Type of genString = " + typeof genString);
            var result = genString.localeCompare("1");
            console.log(result);

      function createPlot() {
        let margin = 50;
        let width = 800;
        let height = 600;

        // CREATING THE PLOT
        svg = d3.select("#plot")
          .append("svg")
            .attr("width", width)
            .attr("height", height)

        // Add X axis
        x = d3.scaleLinear()
          .domain([15, 135])
          .range([ margin, width-margin]);
        svg.append("g")
          .attr("transform", "translate(0," + (height - margin) + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        y = d3.scaleLinear()
          .domain([155, 800])
          .range([ height-margin, margin]); // 500 - 50
        svg.append("g")
          .attr("transform", "translate("+ margin +", 0)")
          .call(d3.axisLeft(y));
      }

      function plotPoints(points) {
        // Color scale: give me a specific name, I return a color
        var color = d3.scaleOrdinal()
          .domain(TYPE1)
          .range(COLORS)

        // Add dots
        svg.append('g')
          .selectAll("dot")
          .data(points)
          .enter()
          .append("circle")
            .attr("cx", function (d) { return x(d.Sp_Def); } )
            .attr("cy", function (d) { return y(d.Total); } )
            .attr("r", 5)
            .style("fill", function (d) { return color(d.Type_1) } )
      }

      function createTooltip() {
      //   // TOOLTIP FOR HOVERING OVER DATA POINTS
      //   .on("mouseover", function()
      //     {
      //       tooltip.style("display", null);
      //     })
      //
      //   .on("mouseout", function()
      //     {
      //       tooltip.style("display", "none");
      //     })
      //
      //   .on("mousemove", function(d)
      //     {
      //       var xPos = d3.mouse(this)[0] - 15;
      //       var yPos = d3.mouse(this)[1] - 55;
      //       tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")")
      //       tooltip.select("text").text(d.Name + ":" + d.Type_1 + ":" + d.Type_2)
      //     })
      //
      // var tooltip = svg.append("g")
      //     .attr("class", tooltip)
      //     .style("display", "none");
      //
      // tooltip.append("text")
      //   .attr("x", 15)
      //   .attr("dy", "1.2em")
      //   .style("font-size", "1.25em")
      //   .style("font-weight", "bold");
      }

      function activateDropdowns() {

        d3.select("#leg-drop").on("change", function() {
          let val = this.options[this.selectedIndex].value;
          leg = val;
          filter("leg", val);
        })

        d3.select("#gen-drop").on("change", function() {
          let val = this.options[this.selectedIndex].value;
          gen = val;
          filter("gen", val)
        })
      }

      function filter(attribute, filter){

        console.log("Attribute = " + attribute + ", Filter value = " + filter);
        if(attribute == "leg") {
          leg = filter;
        } else {
          gen = filter;
        }

        if(leg == "All" && gen == "All") {
          console.log("Both All");
          displayData = data;
        } else if (leg == "All") {
          displayData = [];
          console.log("Leg All");
          for (row in data) {
            if (toString(row.Generation) == gen) {
              displayData.push(row);
            }
          }
        } else if (gen == "All") {
          console.log("Gen All");
          for (row in data) {
            if (row.Legendary == leg) {
              displayData.push(row);
            }
          }
        } else {
          console.log("Both Values");
          for (row in data) {
            if (row.Legendary == leg && toString(row.Generation) == gen) {
              displayData.push(row);
            }
          }
        }
        console.log("Filtered data length = " + displayData.length);
        plotPoints(displayData);
      }

});
