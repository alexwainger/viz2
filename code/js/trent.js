$(document).ready(function() {
  var margin = {top: 50, right: 0, bottom: 100, left: 30},
    width = 960 - margin.left - margin.right
    height = 430 - margin.top - margin.bottom
    categories = ["Environment", "Games", "Fashion", "Technology", "Sports"];
   
  
  d3.json("../data/data.json", function(error, data) {
    data.forEach(function(d) {
      console.log(d);
    });
  });
});
  
