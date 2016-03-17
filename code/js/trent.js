$(document).ready(function() {
  var margin = {top: 25, right: 0, bottom: 100, left: 80},
    width = 960 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom,
    categories = ["Environment", "Games", "Fashion", "Technology", "Sports"],
    color_bucket = ['#E00000', '#990099', '#0000CC'],
    alt_color_bucket = ['#FF6600', '#9900CC', '#0000FF'],
    genders = ["Male", "Female", "Unspecified"]; // color_bucket[0]: male; color_bucket[1]: female; color_bucket[2]: unspecified
  
  var selections = ["Funding", "Views"], 
    j = 0;  // Choose "Funding" as default

  var form = d3.select("#trent").append("form")
    .attr("class", "toggle");

  var labels = form.selectAll("label")
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
    
  var x = d3.scale.ordinal()
    .rangeBands([width, 0])
    .domain(categories);
    
  var y = d3.scale.linear()
    .range([height, 0]);

  var x0 = d3.scale.ordinal();
  
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .innerTickSize(-width);
  
  y.domain([70000, 78000]);
  yAxis.scale(y);
  
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
    .attr("transform", "translate(" + width/2 + "," + (height+50) + ")")
    .text("Categories");
    
  svg.append("text")
    .attr("class", "yaxis_label")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(-65," + height/2 + ")rotate(-90)")
    .text("Amount of Funding (dollars)");
  
  var m_funding = [0, 0, 0, 0, 0];
  var f_funding = [0, 0, 0, 0, 0];
  var u_funding = [0, 0, 0, 0, 0];
  var m_views = [0, 0, 0, 0, 0];
  var f_views = [0, 0, 0, 0, 0];
  var u_views = [0, 0, 0, 0, 0];
 
  d3.json("https://raw.githubusercontent.com/alexwainger/viz2/master/code/data/data.json", function(error, d) {
    if (error) throw error;
    var data = d.data;
    
    data.forEach(function(d) {
      var category_index = -1;
      if(d.category === "Environment") {
        
        category_index = 0;
        if(d.event_name === "Fund Project"){
          if(d.gender === "M") {
            m_funding[category_index] = m_funding[category_index] + d.amount;
          }
          else if(d.gender === "F") {
            f_funding[category_index] = f_funding[category_index] + d.amount;
          }
          else {
            u_funding[category_index] = f_funding[category_index] + d.amount;
          }
        }
        else{
          view_check = view_check+1;
          if(d.gender === "M") {
            m_views[category_index] = m_views[category_index] + 1;
          }
          else if(d.gender === "F") {
            f_views[category_index] = m_views[category_index] + 1;
          }
          else {
            u_views[category_index] = m_views[category_index] + 1;
          }
        }
      }
      
      else if(d.category === "Games") {
        category_index = 1;
        if(d.event_name === "Fund Project"){
          if(d.gender === "M") {
            m_funding[category_index] = m_funding[category_index] + d.amount;
          }
          else if(d.gender === "F") {
            f_funding[category_index] = f_funding[category_index] + d.amount;
          }
          else {
            u_funding[category_index] = f_funding[category_index] + d.amount;
          }
        }
        else{
          if(d.gender === "M") {
            m_views[category_index] = m_views[category_index] + 1;
          }
          else if(d.gender === "F") {
            f_views[category_index] = m_views[category_index] + 1;
          }
          else {
            u_views[category_index] = m_views[category_index] + 1;
          }
        }
      }
      else if(d.category === "Fashion") {
        category_index = 2;
        if(d.event_name === "Fund Project"){
          if(d.gender === "M") {
            m_funding[category_index] = m_funding[category_index] + d.amount;
          }
          else if(d.gender === "F") {
            f_funding[category_index] = f_funding[category_index] + d.amount;
          }
          else {
            u_funding[category_index] = f_funding[category_index] + d.amount;
          }
        }
        else{
          if(d.gender === "M") {
            m_views[category_index] = m_views[category_index] + 1;
          }
          else if(d.gender === "F") {
            f_views[category_index] = m_views[category_index] + 1;
          }
          else {
            u_views[category_index] = m_views[category_index] + 1;
          }
        }
      }
      else if(d.category === "Technology") {
        category_index = 3;
        if(d.event_name === "Fund Project"){
          if(d.gender === "M") {
            m_funding[category_index] = m_funding[category_index] + d.amount;
          }
          else if(d.gender === "F") {
            f_funding[category_index] = f_funding[category_index] + d.amount;
          }
          else {
            u_funding[category_index] = f_funding[category_index] + d.amount;
          }
        }
        else{
          if(d.gender === "M") {
            m_views[category_index] = m_views[category_index] + 1;
          }
          else if(d.gender === "F") {
            f_views[category_index] = m_views[category_index] + 1;
          }
          else {
            u_views[category_index] = m_views[category_index] + 1;
          }
        }
      }
      else if(d.category === "Sports") {
        category_index = 4;
        if(d.event_name === "Fund Project"){
          if(d.gender === "M") {
            m_funding[category_index] = m_funding[category_index] + d.amount;
          }
          else if(d.gender === "F") {
            f_funding[category_index] = f_funding[category_index] + d.amount;
          }
          else {
            u_funding[category_index] = f_funding[category_index] + d.amount;
          }
        }
        else{
          if(d.gender === "M") {
            m_views[category_index] = m_views[category_index] + 1;
          }
          else if(d.gender === "F") {
            f_views[category_index] = m_views[category_index] + 1;
          }
          else {
            u_views[category_index] = m_views[category_index] + 1;
          }
        }
      }
    });
  
  d3.selectAll("input").on("change", change);
 
  function change() {
    var value = this.value;
    
    if(value == 0) {
      rescale_funding();
      transition(value);
    }
    
    else {
      rescale_views();
      transition(value);
    }
  }
  
  function rescale_views() {
    y.domain([2600, 2800]);
    yAxis.scale(y);
   
    svg.select(".y_axis")
      .transition().duration(800).ease("sin-in-out")
      .call(yAxis);
    
    svg.select(".yaxis_label")
      .text("Number of Views");
  }
  
  function rescale_funding() {
    y.domain([70000, 78000]);
    yAxis.scale(y);
    
    svg.select(".y_axis")
      .transition().duration(1500).ease("sin-in-out")
      .call(yAxis);
      
    svg.select(".yaxis_label").transition().duration(800)
      .text("Amount of Funding (dollars)");
  }
    
  function apply_bars(check) {  
    if(check == 0) {
      var m = m_funding;
      var f = f_funding;
      var u = u_funding;
    }
    
    else {
      var m = m_views;
      var f = f_views;
      var u = u_views;
    }
    
    for(var i = 0; i < 5; i++) {
      svg.append("rect")
        .attr("width", "30px")
        .attr("height", function() { return (height - y(m[i])) + "px"; })
        .attr("x", x(categories[i]) + 43)
        .attr("y", function() { return y(m[i]) + "px"; })
        .style("fill", function() { return color_bucket[0]; })
        .attr("class", "male")
        .on("mouseover", function() {
          d3.select(this).style("fill", function() { return alt_color_bucket[0]; });
        })
        .on("mouseout",  function() {
          d3.select(this).style("fill", function() { return color_bucket[0]; });
        });
    }
  
    for(var i = 0; i < 5; i++) {
      svg.append("rect")
        .attr("width", "30px")
        .attr("height", function() { return (height - y(f[i])) + "px"; })
        .attr("x", x(categories[i]) + 73)
        .attr("y", function() { return y(f[i]) + "px"; })
        .style("fill", function() { return color_bucket[1]; })
        .attr("class", "female")
        .on("mouseover", function() {
          d3.select(this).style("fill", function() { return alt_color_bucket[1]; });
        })
        .on("mouseout",  function() {
          d3.select(this).style("fill", function() { return color_bucket[1]; });
        });
    }
  
    for(var i = 0; i < 5; i++) {
      svg.append("rect")
        .attr("width", "30px")
        .attr("height", function() { return (height - y(u[i])) + "px"; })
        .attr("x", x(categories[i]) + 103)
        .attr("y", function() { return y(u[i]) + "px"; })
        .style("fill", function() { return color_bucket[2]; })
        .attr("class", "unspecified")
        .on("mouseover", function() {
          d3.select(this).style("fill", function() { return alt_color_bucket[2]; });
        })
        .on("mouseout",  function() {
          d3.select(this).style("fill", function() { return color_bucket[2]; });
        });
    }
  }
  
  function transition(check) {
    if(check == 0) {
      var m = m_funding;
      var f = f_funding;
      var u = u_funding;
    }
    
    else {
      var m = m_views;
      var f = f_views;
      var u = u_views;
    }
    svg.selectAll(".male").each(function(d, i) { 
      d3.select(this).transition()
        .duration(1500)
        .attr("height", function() { return (height - y(m[i])) + "px"; })
        .attr("y", function() { return y(m[i]) + "px"; })
        .ease("linear");
    });
    svg.selectAll(".female").each(function(d, i) { 
      d3.select(this).transition()
        .duration(1500)
        .attr("height", function() { return (height - y(f[i])) + "px"; })
        .attr("y", function() { return y(f[i]) + "px"; })
        .ease("linear");
    });
    svg.selectAll(".unspecified").each(function(d, i) { 
      d3.select(this).transition()
        .duration(1500)
        .attr("height", function() { return (height - y(u[i])) + "px"; })
        .attr("y", function() { return y(u[i]) + "px"; })
        .ease("linear");
    });
  }
  
  for(var i = 0; i < 3; i++) {
    svg.append("g")
      .attr("class", "legend")
      .attr("transform", function() { return "translate(0," + i*20 + ")"; })
        .append("rect")
        .attr("width", 100)
        .attr("height", 20)
        .attr("x", 780)
        .style("fill", "white");
  }
  
  svg.selectAll(".legend").each(function(d, i) {
      d3.select(this).append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function() { return color_bucket[i]; });
        
      d3.select(this).append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function() {  return genders[i]; });
  });

  apply_bars(0);
  console.log("FINISHED");
  });
});
  
