$(document).ready(function () {
    var margin = {
            top: 50
            , right: 0
            , bottom: 70
            , left: 100
        }
        , width = 960 - margin.left - margin.right
        , height = 320 - margin.top - margin.bottom
        , gridSize = Math.floor(width / 24)
        , legendElementWidth = gridSize * 2
        , buckets = 8
        , colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494"], // alternatively colorbrewer.YlGnBu[9]
        categories = ['Environment', 'Games', 'Fashion', 'Technology', 'Sports']
        , times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12a"]
        , events = ["View Project", "Fund Project"];

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
        // count view events at each hour for each category
        var timeCat = {};
        for (var i = 0; i < 24; i++) {
            timeCat[i + 1] = {
                'Environment': 0
                , 'Games': 0
                , 'Fashion': 0
                , 'Technology': 0
                , 'Sports': 0
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
                        category: cat
                        , hour: i
                        , value: +timeCat[i][cat]
                        , catNum: j
                    });
                }
            }
            console.log(dict);

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

            cards.append("title");

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
                .style("fill", colors[0]);

            cards.transition().duration(1000)
                .style("fill", function (d) {
                    return colorScale(d.value);
                });

            cards.select("title").text(function (d) {
                return d.value;
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
            return "Event " + d
        })
        .attr("type", "button")
        .attr("class", "event-button")
        .on("click", function (d) {
            heatmap(d);
        });
});