$(document).ready(function() {

var width = 960,
    height = 700,
    radius = (Math.min(width, height) / 2) - 10;

var formatNumber = d3.format(",d");

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.sqrt()
    .range([0, radius]);

var color = d3.scale.category20c();

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var labelFitsX = function(d) {
    return x(d.x + d.dx) - x(d.x) > 0.05;
};


var formatNumber = d3.format(",d");

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

var svg = d3.select("#siyi").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");


var dataDict = {}
d3.json("../data/data.json", function(d) {
    data = d.data;
    for (var idx in data) {
        item = data[idx];
        seqString = item.category + ">" + item.age + ">" + item.gender;
        if (seqString in dataDict) {
            dataDict[seqString] += 1;
        } else {
            dataDict[seqString] = 1;
        }
    }
    var root = buildtree(dataDict);

    var g = svg.selectAll("g")
        .data(partition.nodes(root))
        .enter().append("g");

    var path = g.append("path")
        .attr("d", arc)
        .style("stroke","#fff")
        .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
        .on("click", click);

    var text = g.append("text")
        .attr("transform", function(d) {
            return "rotate(" + computeTextRotation(d) + ")"; 
        })
        .style("fill", function(d) { return labelFitsX(d) ? "black" : "none"; })
        .attr("x", function(d) { return y(d.y); })
        .attr("dx", "6") // margin
        .attr("dy", ".35em") // vertical-align
        .text(function(d) { 
            if (d.name == "Technology") return "Tech";
            if (d.name == "Environment") return "Environ.";
            return d.name;
         });

    function click(d) {
        // fade out all text elements
        text.transition().attr("opacity", 0);

        path.transition()
            .duration(750)
            .attrTween("d", arcTween(d))
            .each("end", function(e, i) {
                if (e.x >= d.x && e.x < (d.x + d.dx)) {
                    var arcText = d3.select(this.parentNode).select("text");
                    arcText.transition().duration(750)
                        .attr("opacity", 1)
                        .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
                        .attr("x", function(d) { return y(d.y); });
                }
            });
        if (d.depth != 0) {
            d3.select("#centre-label").style("display", "block");
        } else {
            d3.select("#centre-label").style("display", "none")
        }

        d3.select("#name").text(d.depth == 4 ? d.parent.name : d.name);
        d3.select("#segment").text(d.depth == 4 ? d.name : " ");
        d3.select("#count").text(d.value != 0 ? "# of Users: "+d.value : " ");
    }

    svg.append("image")
        .attr("id", "centre-label")
        .attr("x", -9)
        .attr("y", -9)
        .attr("width", 20)
        .attr("height", 20)
        .attr("pointer-events", "none")
        .attr("xlink:href","./js/zoomout.png")
        .style("display", "none")
});

function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function computeTextRotation(d) {
  return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
}
d3.select(self.frameElement).style("height", height + "px");


function buildtree(dataDict) {
    var root = {"name": "All", "children": []};
    for (var key in dataDict) {
        var parts = key.split(">");
        var currentNode = root;
        for (var i = 0; i < parts.length; i++) {
            var children = currentNode["children"];
            var nodeName = parts[i];
            var childNode;
            if (i + 1 < parts.length) {
                var foundChild = false;
                for (var k = 0; k < children.length; k++) {
                    if (children[k]["name"] == nodeName) {
                        childNode = children[k];
                        foundChild = true;
                        break;
                    }
                }
                if (!foundChild) {
                    childNode = {"name": nodeName, "children": []};
                    children.push(childNode);
                }
                currentNode = childNode;
            } else {
                childNode = {"name": nodeName, "size": dataDict[key]};
                children.push(childNode);
            }
        }
    }
  return root;
};


// brief writeup
d3.select('#siyi').append('p').text("My part of the visualization project is to create a layered, interactive "+
    "pie chart that demonstrates the demography of the population in the dataset. The first layer of the chart "+
    "is divided according to categories: Tech, Environment, Games, Sports, and Fashion. The second layer is devided "+
    "accodring to age groups. And the third layer is based on gender. You can click on any of the layers and it will pop "+
    "you with a more specific division for that layer. You can click the zoom-out icon in the center to go back to the "+
    "previous layer. Also, you can use the mouse to hover over any region to see the number of people corresponding to "+
    "that region.");
});