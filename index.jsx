/** @jsx React.DOM */
/*var React = require('react')
var Hello = require('./Hello')
var d3 = require('./d3/d3.js');

React.renderComponent(<Hello />, document.getElementById('content'))
*/

var d3 = require('./d3/d3.js');
var App = require('./src/app.jsx');
var css = require('./src/style.css')


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