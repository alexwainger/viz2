$(document).ready(function() {
  var margin = {top: 25, right: 0, bottom: 100, left: 80},
    width = 960 - margin.left - margin.right
    height = 430 - margin.top - margin.bottom
    categories = ["Environment", "Games", "Fashion", "Technology", "Sports"]
    color_bucket = ['#000099', '#990099']; // color_bucket[0]: male; color_bucket[1]: female
  
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
    .attr("transform", "translate(" + width/2 + "," + (height+80) + ")")
    .text("Categories");
    
  svg.append("text")
    .attr("class", "yaxis_label")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(-55," + height/2 + ")rotate(-90)")
    .text("Amount of Funding");

  
  
  
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
        if(d.event_type === "Fund Project"){
          if(d.gender === "M") {
            m_funding[category_index] = m_funding[category_index] + int(d.amount);
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
        if(d.event_type === "Fund Project"){
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
        if(d.event_type === "Fund Project"){
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
        if(d.event_type === "Fund Project"){
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
        if(d.event_type === "Fund Project"){
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
    
    //console.log(data);
  });
});
  
