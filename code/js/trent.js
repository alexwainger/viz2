$(document).ready(function() {
  var margin = {top: 50, right: 0, bottom: 100, left: 30},
    width = 960 - margin.left - margin.right
    height = 430 - margin.top - margin.bottom
    categories = ["Environment", "Games", "Fashion", "Technology", "Sports"];
    
  var x = d3.scale.ordinal()
    .range([0, width])
    .domain(categories);
    
  var y = d3.scale.linear()
    .range([0, height]);
    
  var selections = ["Funding", "Views"], 
    j = 0;  // Choose "Funding" as default

  // Create the shape selectors
  var form = d3.select("#trent").append("form");
  console.log("RADIO");
  form.selectAll("labels")
    .data(selections)
    .enter()
    .append("label")
    .text(function(d) {return d;})
    .insert("input")
    .attr({
      type: "radio",
      class: "selection",
      name: "mode",
      value: function(d, i) {return i;}
    })
    .property("checked", function(d, i) {return i===j;});
    
    
  d3.json("https://raw.githubusercontent.com/alexwainger/viz2/master/code/data/data.json", function(error, d) {
    var data = d.data;
    console.log(data);
    console.log(data.length);
    
    //console.log(data);
  });
});
  
