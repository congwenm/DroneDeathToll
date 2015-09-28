/** @jsx React.DOM */
/*var React = require('react')
var Hello = require('./Hello')
var d3 = require('./d3/d3.js');

React.renderComponent(<Hello />, document.getElementById('content'))
*/

var jQuery = require('jquery');
var Chart = require('./experiment/Chart.jsx');
var App = require('./src/app.jsx');
var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9},
  {id: 's1f8phwm', x: 21, y: 40, z: 9},
  {id: 's2f8phwm', x: 15, y: 45, z: 9},
  {id: 's3f8phwm', x: 5, y: 35, z: 20},
];

var Index = React.createClass({
  getInitialState: function () {
    return {
      data: sampleData,
      domain: {
        x: [0, 30], y: [0, 100]
      },
      appData: {},
      appDomain: {
        x: [0, 30], y: [0, 100]
      }
    }
  },

  componentDidMount: function() {
    console.log('index mounted'); // eslint-disable-line
    jQuery.get('../src/dronestre.json', function(json){
      console.log('got json', json); // eslint-disable-line
      this.setState({appData: json});
    }.bind(this));
  },

  render: function () {
    window.scope = this;
    return (
      <div className="App">
        <h2>Example</h2>
        <Chart data = {this.state.data} domain={this.state.domain} />
        <h2>Result</h2>
        <App data = {this.state.appData} domain={this.state.appDomain} />
      </div>
    );
  },

})

React.renderComponent(<Index />, document.getElementById('content'));