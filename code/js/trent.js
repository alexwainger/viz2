$(document).ready(function() {
  var margin = {top: 25, right: 0, bottom: 100, left: 80},
    width = 960 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom,
    categories = ["Environment", "Games", "Fashion", "Technology", "Sports"],
    color_bucket = ['#FF3333', '#990099', '#0000CC'],
    alt_color_bucket = ['#FF6633', '#9900CC', '#0000FF'],
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
    //.domain([70000, 80000]);
    
  var x0 = d3.scale.ordinal();
  
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .innerTickSize(-width);
  
  y.domain([70000, 80000]);
  yAxis.scale(y);
  
    //.tickFormat(function(d) {return "$" + d; });
  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Amount: </strong> <span style='color:red'> $" + 10 + "</span>";
  });
  
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

  
  
  svg.call(tip);
  //console.log(choice);
  
  var m_funding = [0, 0, 0, 0, 0];
  var f_funding = [0, 0, 0, 0, 0];
  var u_funding = [0, 0, 0, 0, 0];
  var m_views = [0, 0, 0, 0, 0];
  var f_views = [0, 0, 0, 0, 0];
  var u_views = [0, 0, 0, 0, 0];
  var entries = 0;
  var view_check = 0;
  var checker = 0;
  d3.json("https://raw.githubusercontent.com/alexwainger/viz2/master/code/data/data.json", function(error, d) {
    if (error) throw error;
    var data = d.data;
   
    
    data.forEach(function(d) {
      
      var category_index = -1;
      
      if(d.category === "Environment") {
        
        category_index = 0;
        if(d.event_name === "Fund Project"){
          entries = entries + 1;
          if(d.gender === "M") {
            m_funding[category_index] = m_funding[category_index] + d.amount;
            checker = checker + 1;
          }
          else if(d.gender === "F") {
            f_funding[category_index] = f_funding[category_index] + d.amount;
            checker = checker + 1;
          }
          else {
            u_funding[category_index] = f_funding[category_index] + d.amount;
            checker = checker + 1;
          }
        }
        else{
          view_check = view_check+1;
          if(d.gender === "M") {
            m_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
          else if(d.gender === "F") {
            f_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
          else {
            u_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
        }
      }
      
      else if(d.category === "Games") {
        category_index = 1;
        if(d.event_name === "Fund Project"){
          entries = entries + 1;
          if(d.gender === "M") {
            m_funding[category_index] = m_funding[category_index] + d.amount;
            checker = checker + 1;
          }
          else if(d.gender === "F") {
            f_funding[category_index] = f_funding[category_index] + d.amount;
            checker = checker + 1;
          }
          else {
            u_funding[category_index] = f_funding[category_index] + d.amount;
            checker = checker + 1;
          }
        }
        else{
          view_check = view_check+1;
          if(d.gender === "M") {
            m_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
          else if(d.gender === "F") {
            f_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
          else {
            u_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
        }
      }
      else if(d.category === "Fashion") {
        category_index = 2;
        if(d.event_name === "Fund Project"){
          entries = entries + 1;
          if(d.gender === "M") {
            m_funding[category_index] = m_funding[category_index] + d.amount;
            checker = checker + 1;
          }
          else if(d.gender === "F") {
            f_funding[category_index] = f_funding[category_index] + d.amount;
            checker = checker + 1;
          }
          else {
            u_funding[category_index] = f_funding[category_index] + d.amount;
            checker = checker + 1;
          }
        }
        else{
          view_check = view_check+1;
          if(d.gender === "M") {
            m_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
          else if(d.gender === "F") {
            f_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
          else {
            u_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
        }
      }
      else if(d.category === "Technology") {
        
        category_index = 3;
        if(d.event_name === "Fund Project"){
          entries = entries + 1;
          if(d.gender === "M") {
            m_funding[category_index] = m_funding[category_index] + d.amount;
            checker = checker + 1;
          }
          else if(d.gender === "F") {
            f_funding[category_index] = f_funding[category_index] + d.amount;
            checker = checker + 1;
          }
          else {
            u_funding[category_index] = f_funding[category_index] + d.amount;
            checker = checker + 1;
          }
        }
        else{
          view_check = view_check+1;
          if(d.gender === "M") {
            m_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
          else if(d.gender === "F") {
            f_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
          else {
            u_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
        }
      }
      else if(d.category === "Sports") {
        category_index = 4;
        if(d.event_name === "Fund Project"){
          entries = entries + 1;
          if(d.gender === "M") {
            m_funding[category_index] = m_funding[category_index] + d.amount;
            checker = checker + 1;
          }
          else if(d.gender === "F") {
            f_funding[category_index] = f_funding[category_index] + d.amount;
            checker = checker + 1;
          }
          else {
            u_funding[category_index] = f_funding[category_index] + d.amount;
            checker = checker + 1;
          }
        }
        else{
          view_check = view_check+1;
          if(d.gender === "M") {
            m_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
          else if(d.gender === "F") {
            f_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
          else {
            u_views[category_index] = m_views[category_index] + 1;
            checker = checker + 1;
          }
        }
      }
    });
    console.log("~~~FUNDING!~~~");
    console.log(m_funding);
    console.log(f_funding);
    console.log(u_funding);
    console.log("~~~VIEWS~~~");
    console.log(m_views);
    console.log(f_views);
    console.log(u_views);
    
    console.log("~~~CHECK~~~");
    console.log(entries);
    console.log("~~~VIEWS~~~");
    console.log(view_check);
    console.log("~~~CHECKER~~~");
    console.log(checker);
    
  d3.selectAll("input").on("change", change);
 
  function change() {
    var value = this.value;
    
    if(value == 0) {
      rescale_funding();
      transition(value);
    }
    
    else {
      rescale_views();
      /*svg.select(".male")
        .transition()
        .duration(1500)
        .attr("height", function() { return (height - y(2650)) + "px"; })
        .attr("y", function() { return y(2650) + "px"; })
        .ease("linear");*/
        transition(value);
    }
  }
  
  function rescale_views() {
    y.domain([2500, 3000]);
    yAxis.scale(y);
   
    svg.select(".y_axis")
      .transition().duration(800).ease("sin-in-out")
      .call(yAxis);
    
    svg.select(".yaxis_label")
      .text("Number of Views");
      
  }
  
  function rescale_funding() {
    y.domain([70000, 80000]);
    yAxis.scale(y);
    svg.select(".y_axis")
      .transition().duration(1500).ease("sin-in-out")
      .call(yAxis);;

    
    
    svg.select(".yaxis_label").transition().duration(800)
      .text("Amount of Funding (dollars)");
  }
  
  /*var state = svg.selectAll(".category")
    .data(categories)
    .enter().append("g")
    .attr("class", "category")
    .attr("transform", function(d) { return "translate(" + x(d) + ",0)";});*/
 
  /*svg.append("rect")
    .attr("width", 18)
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", y(5000))
    .style("fill", function(d) { return color_bucket[0]; });*/
    
    
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
          tip.show;
        })
        .on("mouseout",  function() {
          d3.select(this).style("fill", function() { return color_bucket[0]; });
          tip.hide;
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
  
  console.log("YO");
  
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
      .attr("transform", function() { return "translate(0," + i*20 + ")"; });
  }
  
  
  svg.selectAll(".legend").each(function(d, i) { 
      d3.select(this).append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function() { return color_bucket[i]; })
      d3.select(this).append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function() {  return genders[i]; });
      console.log(this);
  });
  
  /*legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(i) { return color_bucket[i]; });*/
  
  /*legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });*/
    
  apply_bars(0);
  console.log("!");
  });
});
  
