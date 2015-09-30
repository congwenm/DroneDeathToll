/** @jsx React.DOM */
/*var React = require('react')
var Hello = require('./Hello')
var d3 = require('./d3/d3.js');

React.renderComponent(<Hello />, document.getElementById('content'))
*/

var d3 = require('./d3/d3.js');
var App = require('./src/app.jsx');
var css = require('./src/style.css')

var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9},
  {id: 's1f8phwm', x: 21, y: 40, z: 9},
  {id: 's2f8phwm', x: 15, y: 45, z: 9},
  {id: 's3f8phwm', x: 5, y: 35, z: 20},
];

var Index = React.createClass({
  render: function () {
    return (
      <div className="App">
        <h2 style={{paddingLeft: '500px'}}>Known Death per year</h2>
        <App />
      </div>
    );
  },

})

React.renderComponent(<Index />, document.getElementById('content'));