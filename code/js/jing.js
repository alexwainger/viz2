$(document).ready(function () {
    d3.select('#jing').append('h1').text("Views and Funds at Each Time Period in The Day");
    d3.select('#jing').append('p').text("Author: Jing Wang; Login: jw12; Date: March 17, 2016");
    
    var margin = {
            top: 30,
            right: 0,
            bottom: 70,
            left: 100
        },
        width = 960 - margin.left - margin.right,
        height = 320 - margin.top - margin.bottom,
        gridSize = Math.floor(width / 24),
        legendElementWidth = gridSize * 2,
        buckets = 8, //        colors = ["#ffe6e6", "#ffb3b3", "#ff9999", "#ff6666", "#ff3333", "#e60000", "#b30000", "#800000"], // alternatively colorbrewer.YlGnBu[9]
        colors = ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'],
        categories = ['Environment', 'Games', 'Fashion', 'Technology', 'Sports'],
        times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12a"],
        events = ["View Project", "Fund Project"];

    // draw svg
    var svg = d3.select("#jing").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var catLabels = svg.selectAll(".catLabel")
        .data(categories)
        .enter().append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", 0)
        .attr("y", function (d, i) {
            return i * gridSize;
        })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function (d, i) {
            return ((i >= 0 && i <= 4) ? "catLabel mono axis axis-cat" : "catLabel mono axis");
        });

    var timeLabels = svg.selectAll(".timeLabel")
        .data(times)
        .enter().append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", function (d, i) {
            return i * gridSize;
        })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)")
        .attr("class", function (d, i) {
            return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-time" : "timeLabel mono axis");
        });

    var heatmap = function (event) {
        // count occurence of selected event at each hour for each category
        var timeCat = {};
        for (var i = 0; i < 24; i++) {
            timeCat[i + 1] = {
                'Environment': 0,
                'Games': 0,
                'Fashion': 0,
                'Technology': 0,
                'Sports': 0
            }
        }
        d3.json("../data/data.json", function (d) {
            var data = d.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].event_name == event) {
                    var date = new Date(data[i].client_time * 1000);
                    var hour = date.getHours() + 1;
                    timeCat[hour][data[i].category]++;
                }
            }

            var dict = [];
            for (var i = 1; i < 25; i++) {
                for (var j = 0; j < categories.length; j++) {
                    var cat = categories[j];
                    dict.push({
                        category: cat,
                        hour: i,
                        value: +timeCat[i][cat],
                        catNum: j
                    });
                }
            }

            var lowerbound = d3.min(dict, function (d) {
                return d.value;
            });

            var colorScale = d3.scale.quantize()
                .domain([lowerbound, d3.max(dict, function (d) {
                    return d.value;
                })])
                .range(colors);

            var cards = svg.selectAll(".hour")
                .data(dict, function (d) {
                    return d.category + ':' + d.hour;
                });
            
            var domain = colorScale.domain();
            var gap = (domain[1] - domain[0]) / buckets;
            var cutoff = domain[0] + gap * (buckets - 4);

            cards.enter().append("rect")
                .attr("x", function (d) {
                    return (d.hour - 1) * gridSize;
                })
                .attr("y", function (d) {
                    return (d.catNum) * gridSize;
                })
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("class", "hour bordered")
                .attr("width", gridSize)
                .attr("height", gridSize)
                .style("fill", colors[0])
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("stroke", "white")
                        .attr("stroke-width", 3)
                    this.parentNode.appendChild(this);
                    var x = parseFloat(d3.select(this).attr("x")) + gridSize / 2;
                    var y = parseFloat(d3.select(this).attr("y")) + gridSize / 2;
                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", x)
                        .attr("y", y)
                        .style("fill", function () {
                            return (d.value >= cutoff) ? "white" : "black";
                        })
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .text(d.value);
                })
                .on("mouseout", function () {
                    d3.select("#tooltip").remove();
                    d3.select(this)
                        .style("stroke-width", "2px")
                        .style("stroke", "#E6E6E6");
                });

            cards.transition().duration(1000)
                .style("fill", function (d) {
                    return colorScale(d.value);
                });

            cards.exit().remove();

            var interval = (d3.max(dict, function (d) {
                return d.value;
            }) - lowerbound) / 8.0;
            var quantizes = new Array();
            for (i = 0; i < 7; i++) {
                quantizes[i] = lowerbound + interval * (i + 1);
            }
            var legend = svg.selectAll(".legend")
                .data([0].concat(quantizes), function (d) {
                    return d;
                });

            legend.enter().append("g")
                .attr("class", "legend");

            legend.append("rect")
                .attr("x", function (d, i) {
                    return legendElementWidth * i;
                })
                .attr("y", height)
                .attr("width", legendElementWidth)
                .attr("height", gridSize / 2)
                .style("fill", function (d, i) {
                    return colors[i];
                });

            legend.append("text")
                .attr("class", "mono")
                .text(function (d) {
                    return "≥ " + Math.round(d);
                })
                .attr("x", function (d, i) {
                    return legendElementWidth * i;
                })
                .attr("y", height + gridSize);

            legend.exit().remove();


        });
    }

    heatmap(events[0]);

    // create event picker buttons
    var picker = document.createElement('div');
    picker.id = 'jing-event-picker';
    document.getElementById('jing').appendChild(picker);

    var eventpicker = d3.select('#jing-event-picker').selectAll('.event-button')
        .data(events);

    eventpicker.enter()
        .append("input")
        .attr("value", function (d) {
            return "Number of " + d.split(" ")[0] + " Events";
        })
        .attr("type", "button")
        .attr("class", "event-button")
        .on("click", function (d) {
            heatmap(d);
        });
    
    d3.select('#jing').append('p').text("This is a heatmap showing you the number of viewing and funding actions at each hour for each category over one month. You can switch between displaying view events and fund events by clicking on the buttons. When you mouse over each grid, it will show the total number of actions in a month for the selected action.");
    d3.select('#jing').append('p').text("The heat map shows that there are more views in the afternoon and at night, and people are more likely to fund a project in the evening. There are more views for sports projects after 8pm, and there are more people funding sports after 8 pm as well. However, there is no significant correlation between viewing and funding actions for other categories at a certain time. - Author: Jing Wang; Login: jw12; Date: March 17, 2016");
});
