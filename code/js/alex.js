$(document).ready(function() {
    var canvas_width = 550;
    var canvas_height = 350;
    var margin = 30;
    var radius = 4;
    var grouping_types = ['category','age','gender','city','state','zip_code','marital_status','device'];
    var curr_group_type = 'category';
    var data = [];
    var average_conversion_rate = 0;

    var xValue = function(d) { return d['view_count']; };
    var yValue = function(d) { return d['conversion_rate']; };

    var xScale = d3.scale.pow().exponent(.1);
    var yScale = d3.scale.linear()
        .domain([0, 1])
        .range([canvas_height - margin, margin]);

    var xAxis = d3.svg.axis();
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    d3.json("../data/data.json", function(json) {
        data = json.data;
        average_conversion_rate = calc_average_conversion_rate();
        data_points = group_data();
        setup_selectmenu();
        setup_canvas(data_points);
    });

    function calc_average_conversion_rate() { 
        counts = {'Fund Project': 0.0, 'View Project': 0.0 };
        for (i=0; i<data.length; i++) {
            counts[data[i]['event_name']] = counts[data[i]['event_name']] + 1.0;
        }
        return counts['Fund Project'] / counts['View Project'];
    };

    function redraw_datapoints() {
        curr_group_type = $(this).val();
        new_data_points = group_data();
        
        setup_x_axis(new_data_points);

        d3.select(".x.axis").transition().duration(1000).call(xAxis);

        // Remove old circles
        d3.select("#data-group")
            .selectAll("circle")
            .transition()
            .duration(1000)
            .style("opacity", 0)
            .remove();

        d3.select("#alexsvg").append("g").attr("id", "new-data-group")
            .selectAll("circle")
            .data(new_data_points)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d['view_count']) })
            .attr("cy", function(d) { return yScale(d['conversion_rate']) })
            .attr("r", radius)
            .attr("fill", "red")
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1);

       d3.select("#data-group").transition().delay(1000).remove();
       d3.select("#new-data-group").attr("id", "data-group");
    };

    function setup_selectmenu() {
        d3.select("#alex").append("div").append("select").attr("id", "selectmenu").style("margin-left", "30px")
            .selectAll("option")
            .data(grouping_types)
            .enter()
            .append("option")
            .attr("value", function(d) { return d; })
            .text(function(d) { return d;});
       
         $("#selectmenu").on("change", redraw_datapoints);
    };

    function setup_x_axis(data_points) {
        xScale.domain([d3.min(data_points, xValue) - 5, d3.max(data_points, xValue) + 5])
            .range([margin, canvas_width - margin * 2]);

        xAxis.scale(xScale).orient("bottom").ticks(5);
    };

    function setup_canvas(data_points) {

        setup_x_axis(data_points);

        var svg = d3.select("#alex").append("svg")
            .attr("id", "alexsvg")
            .attr("width", canvas_width)
            .attr("height", canvas_height);

        svg.append("g").attr("id", "data-group").selectAll("circle")
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
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", canvas_width-60)
            .attr("y", -6)
            .attr("text-anchor", "end")
            .text("Event Views");

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin + ",0)")
            .call(yAxis)
            .append("text")
            .attr("class","label")
            .attr("transform", "rotate(-90)")
            .attr("y", 12)
            .attr("x", -10)
            .style("text-anchor", "end")
            .text("Conversion Rate");



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

});
