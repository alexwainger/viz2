$(document).ready(function() {
	"use strict";	
	d3.select('#xiaoyi').append('h1').text("Fund for each category in each states");
  d3.select('#xiaoyi').append('p').text("Author: Xiaoyi Mao; Login: xmao; Date: March 17, 2016");
    
	d3.json("../data/data.json", function(d) {
		var allstates = {}
		var data = d.data;
		// allstates.data = []
		for (var i = 0; i < data.length; i++) {
			if (data[i].event_name === "View Project") {
				continue;
			}
			var state = data[i].location.state;
			var category = data[i].category;

			var fund = parseInt(data[i].amount)
			if (allstates[state] === undefined) {
				allstates[state] = {
					'Environment': [0, 0],
					'Games': [0, 0],
					'Fashion': [0, 0],
					'Technology': [0, 0],
					'Sports': [0, 0]
				}
			}
			allstates[state][category][0] += fund;
		}

		// get max of each state, and the percentage
		for (var key in allstates) {
			var sum = 0;
			var max = 0;
			var state = allstates[key];
			for (var type in state) {
				var val = state[type][0];
				sum += val;
				if (val > max) max = val;
			}
			for (var type in state) {
				var val = state[type][0];
				// console.log(state[type])
				state[type][1] = parseInt(parseFloat(val/sum).toFixed(2)*100);
				if (val === max) state["fillKey"] = type;
			}
		}

		var map = new Datamap({
			element: document.getElementById('xiaoyi'),
			scope: 'usa',
			dataType: 'json',
			data: allstates,
			fills: {
				'Environment': '#F2DA57',
				'Games': '#42A5B3',
				'Fashion': '#F6B656',
				'Technology': '#B396AD',
				'Sports': '#C1BAA9'
			},
			geographyConfig: {
				popupTemplate: function (geo, data) {
					var e_info = "Environment: " + data["Environment"][1] + "%";
					var g_info = "Games:       " + data["Games"][1] + "%";
					var f_info = "Fashion:     " + data["Fashion"][1] + "%";
					var t_info = "Technology:  " + data["Technology"][1] + "%";
					var s_info = "Sports:      " + data["Sports"][1] + "%";
					return "<div class = 'xiaoyi_hoverinfo'>"+
										"<div class= 'xiaoyi_info'>" + e_info + "</div>" +
										"<div class= 'xiaoyi_info'>" + g_info + "</div>" +
										"<div class= 'xiaoyi_info'>" + f_info + "</div>" +
										"<div class= 'xiaoyi_info'>" + t_info + "</div>" +
										"<div class= 'xiaoyi_info'>" + s_info + "</div>" +
									"</div>";
				},
				highlightOnHover: true,
        highlightFillColor: '#BA5F06',
        highlightBorderColor: '#BD2D28',
			}
			
		})
		map.labels();
		map.legend();
	});
	d3.select('#xiaoyi').append('p').text("This Map shows the most funded category in each state by showing the corresponding color."+
						"When the mouse hovers over each state, a detailed break down of the percentages of each category will be shown in a popup div");
	d3.select("#xiaoyi").append('p').text("From this chart, the app can know more about the distribution of funding and what people are more interested in regional wide.");
	d3.select("#xiaoyi").append('p').text("Credit: I imported an external library of US map from http://datamaps.github.io");
}) 