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

// var color = {

// }

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

// drawing the arc
var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });



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

    svg = d3.select("#siyi").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    group = svg
        .selectAll("path")
        .data(partition.nodes(root))
        .enter()
        .append('g');

    group.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
        .on("click", click)
        .append("title")
        .text(function(d) { return d.name + "\n" + formatNumber(d.value); });
    
    // svg.selectAll("path")
        //.data(partition.nodes(root))
        //.enter()
        // .append("path")
        // .attr("d", arc)
        // .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
        // .on("click", click);
        // .append("title")
        // .text(function(d) { return d.name + "\n" + formatNumber(d.value); });

    // group.append("text")
    //     .attr("dx", function (d) {
    //         var c = arc.centroid(d);
    //         return c[0];
    //     })
    //     .style("width", 50)
    //     .style("height", 100)
    //     .attr("dx", "0")
    //     .attr("dy", "0")
    //     .style("text-anchor","middle")
    //     .append("textPath")
    //     .style("width", 50)
    //     .style("height", 100)
    //     .attr("xlink:href", function(d, i){
    //         return "#s" + i;
    //     })
    //     .attr("startOffset",function(d,i) {return "25%";} )
    //     .text(function (d) {
    //         return d.name;
    //     });

});


function click(d) {
  svg.transition()
      .duration(750)
      .tween("scale", function() {
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, 1]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
      })
    .selectAll("path")
      .attrTween("d", function(d) { return function() { return arc(d); }; });
}

d3.select(self.frameElement).style("height", height + "px");


function buildtree(dataDict) {
    var root = {"name": "root", "children": []};
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
});