var _ = require('lodash');
var appChart = require('./appChart');

var App = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    console.log('app mounted'); // eslint-disable-line
    var el = this.getDOMNode();
    appChart.create(el, {
      width: '100%',
      height: '500px',
    }, this.getChartState());
  },

  componentDidUpdate: function () {
    var el = this.getDOMNode();
    appChart.update(el, this.getChartState());
  },

  getChartState: function () {
    return {
      data: this.props.data,
      domain: this.props.domain
    }
  },
  componentWillUnmount: function () {
    var el = this.getDOMNode();
    d3Chart.destroy(el); // does nothing
  },

  render: function () {
    window.app = this;
    return <div className="Chart"></div>;
  },
})

module.exports = App;