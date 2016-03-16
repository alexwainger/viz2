$(document).ready(function() {
  var margin = {top: 50, right: 0, bottom: 100, left: 60},
    width = 960 - margin.left - margin.right
    height = 430 - margin.top - margin.bottom
    categories = ["Environment", "Games", "Fashion", "Technology", "Sports"]
    color_bucket = ['#000099', '#990099']; // color_bucket[0]: male; color_bucket[1]: female
  
  var x = d3.scale.ordinal()
    .rangeBands([width, 0])
    .domain(categories);
    
  var y = d3.scale.linear()
    .range([height, 0])
    .domain([0, 10000]);
  
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    
  var svg = d3.select("#trent").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
  svg.append("g")
    .attr("class", "x_axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
    
  svg.append("g")
    .attr("class", "y_axis")
    .call(yAxis); 
    
  svg.append("text")
    .attr("class", "xaxis_label")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + width/2 + "," + (height+100) + ")")
    .text("Categories");
    
  svg.append("text")
    .attr("class", "yaxis_label")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(-100," + height/2 + ")rotate(-90)")
    .text("Amount of Funding");

  var selections = ["Funding", "Views"], 
    j = 0;  // Choose "Funding" as default
  console.log("RADIOS");
  // Create the shape selectors
  var form = d3.select("#trent").append("form");
 
  
  labels = form.selectAll("label")
    .data(selections)
    .enter()
    .append("label")
    .text(function(d) {return d;})
    .insert("input")
    .attr({
      type: "radio",
      id: "selection",
      name: "mode",
      value: function(d, i) {return i;}
    })
    .property("checked", function(d, i) {return i===j;});
  
  
  //console.log(choice);
  
  d3.selectAll("input").on("change", change);
 
  function change() {
    var value = this.value;
    if(value == 0) {
      rescale_funding();
      console.log("Funding");
    }
    
    else {
      rescale_views();
      console.log("Views");
    }
    
  }
  
  function rescale_views() {
    y.domain([0, 100]);
    
    svg.select(".y_axis")
      .transition().duration(1500).ease("sin-in-out")
      .call(yAxis);
      
    svg.select(".yaxis_label")
      .text("Number of Views");
  }
  
  function rescale_funding() {
    y.domain([0, 10000]);
    
    svg.select(".y_axis")
      .transition().duration(1500).ease("sin-in-out")
      .call(yAxis);
      
    svg.select(".yaxis_label")
      .text("Amount of Funding");
  }
  d3.json("https://raw.githubusercontent.com/alexwainger/viz2/master/code/data/data.json", function(error, d) {
    var data = d.data;
    console.log(data);
    console.log(data.length);
    
    //console.log(data);
  });
});
  
