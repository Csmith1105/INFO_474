var data = [ // <-A
    {expense: 10, category: "Retail"},
    {expense: 15, category: "Gas"},
    {expense: 30, category: "Retail"},
    {expense: 50, category: "Dining"},
    {expense: 80, category: "Gas"},
    {expense: 65, category: "Retail"},
    {expense: 55, category: "Gas"},
    {expense: 30, category: "Dining"},
    {expense: 20, category: "Retail"},
    {expense: 10, category: "Dining"},
    {expense: 8, category: "Gas"}
];

function render(data, category) {


       d3.select("body").selectAll("div.h-bar") // <-B
        .data(data.filter(function(d){return d.category == category;}))
  .enter()
        .append("div")
        .attr("class", "h-bar")
  .append("span");



    d3.select("body").selectAll("div.h-bar") // <-D
            .data(data.filter(function(d){return d.category == category;}))
        .attr("class", "h-bar")
        .style("width", function (d) {
            return (d.expense * 5) + "px";}
        )
        .select("span")
            .text(function (d) {
                return d.category;
            });


    d3.select("body").selectAll("div.h-bar") // <-C
        .data(data.filter(function(d){return d.category == category;}))
        .exit().remove();
/* d3.select("body").selectAll("div.h-bar")
            .filter(function (d, i) { // <-E
                return d.category == category;
            })
            .classed("selected", true);
   console.log(data);*/
}

//  render(data);

function select(category) {
    render(data, category);

}
