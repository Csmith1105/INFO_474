
  // let data = data.csv;
  // let histogram = d3.histogram();
    // .value(function(data)) {return data["GRE Score"];})
    // .domain([0, 100]) // min and max values
    // .thresholds(xScale.ticks(10))

    d3.csv("Admission_Predict.csv")  // similar to fetch
    .then(function(data){ // .then bc d3 is asynchronous

    toefl_Scores = data.map((row) => parseInt(row["TOEFL Score"]));

    let width = 1000;
    let height = 500;
    let margin = {top: 20, right: 20, bottom: 50, left: 20};

  // append svg to body
  let svg = d3.select('body').append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      //.attr('width', 500)
      //.attr('height', 500)
      .attr('id', 'svg')
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // make x scaling function and append x-axis
  let xScale = d3.scaleLinear()
      .domain([92, 120])
      .range([50, 450])

  let xAxis = d3.axisBottom(xScale)

  svg.append('g')
      .attr('id', 'x-axis')
      .attr('transform', 'translate(0,450)')
      .call(xAxis)

      svg.append("text")      // text label for the x axis
        .attr("x", 250 )
        .attr("y",  500 )
        .style("text-anchor", "middle")
        .text("TOEFL Scores");

        svg.append("text")      // text label for the y axis
          .style("text-anchor", "middle")
          .attr("transform", "translate(10,250) rotate(-90)")
          .text("Counts");


  /******************************************
   * HISTOGRAM SECTION
   ******************************************/

   // set parameters for our histogram function
  let histogram = d3.histogram()
      // what value we want to count in our histogram
      .value(function(d) { return d })
      // the range of values from our data
      .domain([92, 120])
      // the number of bins (bars) we want in our histogram (roughly)
      // learn more about bins here:
      // from 7 - 8, results in 6 bins
      // from 9 - 19, results in 14 bins
      // from 20 - ?, results in 28 bins
      .thresholds(xScale.ticks(10))

      // console.log(xScale.ticks(12))


  // get our bins
  let bins = histogram(toefl_Scores)
  // console.log(bins)

  // figure out our max y value
  // below code is equivalent to:
  // let max = d3.max(bins, function(d) { return d.length })
  let max = 0;
  for (let i = 0; i < bins.length; i++) {
      if (bins[i].length > max) {
          max = bins[i].length
      }
  }
  // console.log(max)

  // make y-axis and y scaling function
  let yScale = d3.scaleLinear()
      .domain([max, 0])
      .range([50, 450])

  let yAxis = d3.axisLeft(yScale)

  svg.append('g')
      .attr('id', 'y-axis')
      .attr('transform', 'translate(50,0)')
      .text("Number of Instances")
      .call(yAxis)

  // append bars of histogram
  svg.selectAll('.rect')
      .data(bins) // use the bins data
      .enter()
      .append('rect')
          // x and y determine the upper left corner of our rectangle

          // d.x0 is the lower bound of one bin
          .attr('x', function(d) { return xScale(d.x0) })
          // d.length is the count of values in the bin
          .attr('y', function(d) { return yScale(d.length) })
          .attr('width', function(d) { return xScale(d.x1) - xScale(d.x0) })
          .attr('height', function(d) { return 450 - yScale(d.length) })
          .attr('fill', 'steelblue')
          .attr('stroke', 'white')

  console.log(yScale(bins[0].length))
});
