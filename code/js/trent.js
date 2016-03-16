$(document).ready(function() {
  var margin = {top: 50, right: 0, bottom: 100, left: 30},
    width = 960 - margin.left - margin.right
    height = 430 - margin.top - margin.bottom
    categories = ["Environment", "Games", "Fashion", "Technology", "Sports"]
    color_bucket = ['#000099', '#990099']; // color_bucket[0]: male; color_bucket[1]: female
  
  var x = d3.scale.ordinal()
    .rangeBands([width, 0])
    .domain(categories);
    
  var y = d3.scale.linear()
    .range([height, 0])
    .domain([0, 100]);
  
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
    
  
  var selections = ["Funding", "Views"], 
    j = 0;  // Choose "Funding" as default
  console.log("RADIO");
  // Create the shape selectors
  var form = d3.select("#trent").append("form");
  form.append("label")
    .text(selections[0])
    .insert("input")
    .attr({
      type: "radio",
      id: "selection",
      name: "mode",
      value: selections[0]
    })
    .property("checked");
  
  /*labels = form.selectAll("label")
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
    .property("checked", function(d, i) {return i===j;});*/
  
  
  //console.log(choice);
  
  d3.selectAll("input").on("change", change);
 
  function change() {
    var choice = d3.select('input[name="mode"]:checked').property("value");
    if(choice == 0) {
      console.log("Funds");
    }
    
    else {
      console.log("Views");
    }
  }
  d3.json("https://raw.githubusercontent.com/alexwainger/viz2/master/code/data/data.json", function(error, d) {
    var data = d.data;
    console.log(data);
    console.log(data.length);
    
    //console.log(data);
  });
});
  
