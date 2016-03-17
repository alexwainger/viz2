$(document).ready(function() {
    var canvas_width = 550;
    var canvas_height = 350;
    var margin = 30;
    var radius = 4;
    var grouping_types = ['category','age','gender','city','state','zip_code','marital_status','device'];
    var curr_group_type = 'age';
    var data = [];
    var average_conversion_rate = 0;

    d3.json("../data/data.json", function(json) {
        data = json.data;
        data_points = group_data();
        setup_canvas(data_points);
        // TODO Calculate average conversion rate
    });

    function calc_average_conversion_rate() { 
        counts = {'Fund Project': 0.0, 'View Project': 0.0 };
        for (i=0; i<data.length; i++) {
            counts[data[i]['event_name']] = counts[data[i]['event_name']] + 1.0;
        }
        return counts['Fund Project'] / counts['View Project'];
    };

    function group_data() {
        view_counts = {};
        fund_counts = {};
        for (i=0; i<data.length; i++) {
            count_object = {};
            if (data[i]['event_name'] == 'Fund Project') {
                count_object = fund_counts;
            } else {
                count_object = view_counts;
            }

            if (curr_group_type == 'city' || curr_group_type == 'state' || curr_group_type == 'zip_code') {
                group_key = data[i]['location'][curr_group_type];
            } else {
                group_key = data[i][curr_group_type];
            }

            if (group_key in count_object) {
                count_object[group_key] = count_object[group_key] + 1.0;
            } else {
                count_object[group_key] = 1.0;
            }
        }

        data_points = [];
        for (var property in view_counts) {
            if (view_counts.hasOwnProperty(property)) {
                if (view_counts[property] > 30) {
                    if (fund_counts.hasOwnProperty(property)) {
                        data_point = { 
                            'name': property,
                            'view_count': view_counts[property],
                            'conversion_rate': fund_counts[property] / view_counts[property] };
                    } else {
                        data_point = {
                            'name': property,
                            'view_count': view_counts[property],
                            'conversion_rate': 0.0 };
                    }
                    data_points.push(data_point);
                }
            }
        }

        return data_points;
    };

    function setup_canvas(data_points) {

        alexdiv = d3.select("#alex");
        alexdiv.append("div").append("select").style("margin-left", "30px")
            .selectAll("option")
            .data(grouping_types)
            .enter()
            .append("option")
            .attr("value", function(d) { return d; })
            .text(function(d) { return d;})

        var xValue = function(d) { return d['view_count']; };
        var yValue = function(d) { return d['conversion_rate']; };

        var xScale = d3.scale.linear()
            .domain([d3.min(data_points, xValue) - 5, d3.max(data_points, xValue) + 5])
            .range([margin, canvas_width - margin * 2]);
        
        var yScale = d3.scale.linear()
            .domain([0, 1])
            .range([canvas_height - margin, margin]);

        var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
        var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
        
        var svg = alexdiv.append("svg").attr("width", canvas_width).attr("height", canvas_height);

        svg.selectAll("circle")
            .data(data_points)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d['view_count']) })
            .attr("cy", function(d) { return yScale(d['conversion_rate']) })
            .attr("r", radius)
            .attr("fill", "red");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + (canvas_height - margin) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin + ",0)")
            .call(yAxis);
    };
});
