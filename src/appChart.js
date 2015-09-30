
var _ = require('lodash');

var appChart = {};


appChart.create = function(el, props, state) {
  console.log('appChart.create', el, props, state);
  this.width = props.width;
  this.height = props.height;
  this.offsetMargin = 50;    //hardcoded
  this.axisWidth = 2;       //hardcoded
  this.graphWidth = this.width - this.offsetMargin;
  this.graphHeight = this.height - this.offsetMargin;
  this.scale = 3; //hardcoded

  this.svg = d3.select(el).append('svg')
    .attr('class', 'd3')
    .attr('width', this.width + 'px')
    .attr('height', this.height + 'px');
  
  if (!state.data.length) {
    return;
  } 
  else {

    this.update(el, state)
  }
};

appChart.update = function(el, state) {
  console.log('app update')
  this.svg.remove();
  this.svg = d3.select(el).append('svg')
    .attr('class', 'd3')
    .attr('width', this.width + 'px')
    .attr('height', this.height + 'px');

  // strike calculation
  var groupByYear = _.groupBy(state.data, function(strike){
    return strike.getYear();
  });
  var deathByYear = this.dataset = _.map(groupByYear, function (strike_arr, year) {
    return {
      year: year,
      deaths: strike_arr.reduce(function(count, stri, key) {
        return count = count + stri.getDeaths();
      }, 0),
    }
  }, this);

  // setting up axis
  this.svg.append("line")
    .attr("class", "x-axis")
    .attr("x1", this.offsetMargin)
    .attr("y1", appChart.height-this.offsetMargin + this.axisWidth)
    .attr("x2", appChart.width)
    .attr("y2", appChart.height-this.offsetMargin + this.axisWidth)
    .attr('stroke', 'black')
    .attr("stroke-width", this.axisWidth)
  ;

  this.svg.append("line")
    .attr("class", "y-axis")
    .attr("x1", this.offsetMargin)
    .attr("y1", this.offsetMargin)
    .attr("x2", this.offsetMargin)
    .attr("y2", appChart.height-this.offsetMargin + this.axisWidth)
    .attr('stroke', 'black')
    .attr("stroke-width", this.axisWidth)
  ;


  this.svg.selectAll('rect')
    .data(_.pluck(this.dataset, 'deaths'))
    .enter()
    .append('rect')
    .attr('x', function (deaths, i) {
      return i * (appChart.graphWidth / appChart.dataset.length) + appChart.offsetMargin;
    })
    .attr('y', function (deaths, i) {
      return appChart.graphHeight - deaths/appChart.scale;
    })
    .attr('width', function (deaths, i) {
      return (appChart.graphWidth) / appChart.dataset.length - 4;
    })
    .attr('height', function (deaths) {
      return deaths/appChart.scale;
    })
    .attr('fill', function (deaths) {
      deaths = deaths > 255 ? deaths / 5 : 50;
      return [
        "rgb(", 
        [255-2*deaths, 255-2*deaths, 255-deaths].map(function(d) {
          return Math.round(d);
        }).join(','),
        ")"
      ].join('');
    })
  ;

  this.svg.selectAll("text.xCoordinates")
    .data(this.dataset)
    .enter()
    .append("text")
    .attr('class', 'xCoordinates')
    .attr("x", function (deathsData, i) {
      return i * (appChart.graphWidth / appChart.dataset.length) + appChart.offsetMargin + (appChart.graphWidth / appChart.dataset.length - 4) / 2;
    })
    .attr('y', appChart.graphHeight + 20)
    .text(function(deathsData) {
      return deathsData.year;
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '15px')
    .attr("text-anchor", "middle")
    .attr('fill', '#555')
  ;

  var maximumDeaths = this.dataset.sort(function(a, b){
    return a.deaths < b.deaths ? 1 : -1;
  })[0].deaths;

  var yScale = 250;
  var maxY = Math.ceil(maximumDeaths / yScale) * yScale;
  var scatterYAxis = [];
  for (var i = yScale; i <= maxY; i = i + yScale ) {
    scatterYAxis.push(i);
  }

  this.svg.selectAll("text.yCoordinates")
    .data(function(){
      console.log('checking scatterYAxis', scatterYAxis)
      return scatterYAxis;
    })
    .enter()
    .append("text")
    .attr('class', 'yCoordinates')
    .attr('y', function(yCoords) {
      console.log('plot on y', appChart.graphHeight, yCoords);
      return appChart.graphHeight - (yCoords/appChart.scale);
    })
    .attr("x", appChart.offsetMargin - 20)
    .text(function(yCoords) {
      return yCoords;
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '15px')
    .attr("text-anchor", "middle")
    .attr('fill', '#555')
  ;

}; 

module.exports = appChart;
