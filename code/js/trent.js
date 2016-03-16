$(document).ready(function() {
  var margin = {top: 25, right: 0, bottom: 100, left: 80},
    width = 960 - margin.left - margin.right
    height = 430 - margin.top - margin.bottom
    categories = ["Environment", "Games", "Fashion", "Technology", "Sports"]
    color_bucket = ['#000099', '#990099', '#808080']; // color_bucket[0]: male; color_bucket[1]: female; color_bucket[2]: unspecified
  
  var selections = ["Funding", "Views"], 
    j = 0;  // Choose "Funding" as default

  var form = d3.select("#trent").append("form")
    .attr("class", "toggle");

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
    
  var x = d3.scale.ordinal()
    .rangeBands([width, 0])
    .domain(categories);
    
  var y = d3.scale.linear()
    .range([height, 0])
    .domain([0, 77551]);
    
  var x0 = d3.scale.ordinal();
  
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    //.tickFormat(function(d) {return "$" + d; });
    
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

  
  
  
  //console.log(choice);
  
  
  
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
      else {
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
    console.log("TEST");
    console.log(m_funding);
    console.log(f_funding);
    console.log(u_funding);
    console.log(m_views);
    console.log(f_views);
    console.log(u_views);
    
    d3.selectAll("input").on("change", change);
 
  function change() {
    var value = this.value;
    if(value == 0) {
      rescale_funding();
      //console.log("Funding");
    }
    
    else {
      rescale_views();
      //console.log("Views");
    }
    
  }
  
  function rescale_views() {
    y.domain([0, 2762]);
    
    svg.select(".y_axis")
      .transition().duration(1500).ease("sin-in-out")
      .call(yAxis);
      
    svg.select(".yaxis_label")
      .text("Number of Views");
  }
  
  function rescale_funding() {
    y.domain([0, 77551]);
    
    svg.select(".y_axis")
      .transition().duration(1500).ease("sin-in-out")
      .call(yAxis);
      
    svg.select(".yaxis_label")
      .text("Amount of Funding (dollars)");
  }
  console.log("CHECKER1");
  console.log(y(77551));
  
  var state = svg.selectAll(".category")
    .data(categories)
    .enter().append("g")
    .attr("class", "category")
    .attr("transform", function(d) { return "translate(" + x(d) + ",0)";})
      .append("rect")
      .attr("width", 18)
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", y(5000))
      .style("fill", function(d) { return color_bucket[0]; });
    
  /*state.append("rect")
    .attr("width", 18)
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", y(5000))
    .style("fill", function(d) { return color_bucket[0]; });*/
  /*state.append("rect")
    .attr("width", "18px")
    .attr("height", function(d, i) { return (height - y(d[i])) + "px"; })
    .attr("x", 0)
    .attr("y", function(d, i) { return y(d[i]) + "px"; })
    .style("fill", function(d) { return color_bucket[0]; });*/
  for(var i = 0; i < 5; i++) {
    var tester = svg.select(".category");
    
    console.log(tester);
  }
    

  
  
    
  console.log("ADD ME@");
 
    
    //console.log(data);
  });
});
  
