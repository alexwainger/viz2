$(document).ready(function() {
	var margin = { top: 50, right: 0, bottom: 50, left: 30 },
	  width = 960 - margin.left - margin.right,
	  height = 430 - margin.top - margin.bottom,
	  gridSize = Math.floor(width / 24),
	  legendElementWidth = gridSize*2,
	  buckets = 8,
	  colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494"], // alternatively colorbrewer.YlGnBu[9]
	  categories = ['Environment', 'Games', 'Fashion', 'Technology', 'Sports'],
	  times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12a"];
	
	var catTime = [];
	d3.json("../data/data.json", function(d) {
		var data = d.data;
		for (var i=0; i<data.length; i++) {
			var date = new Date(data[i].client_time * 1000);
			var time = date.getHours();
			console.log(time);
		}
	});
});