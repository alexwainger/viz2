$(document).ready(function() {
  d3.json("../data/data.json", function(d) {
    var data = d.data;
    for(var i = 0; i < data.length; i ++) {
      console.log(data[i].gender);
    }
  });
});
  
