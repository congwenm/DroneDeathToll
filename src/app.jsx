
var jQuery = require('jquery');
var appChart = require('./appChart');
var Strike = require('./strike.js');

var App = React.createClass({
  getInitialState: function () {
    return {
      data: [],
      loading: true,
    };
  },

  componentDidMount: function() {
    jQuery.get('../src/dronestre.json', function(json){
      console.log('got json', json); // eslint-disable-line
      window.setTimeout(function(){
        this.setState({
          data: json.strike.map(function(strike_attr) {
            return new Strike(strike_attr);
          }),
          loading: false,
        });

      }.bind(this), 1500);
    }.bind(this));


    console.log('app mounted'); // eslint-disable-line
    var el = this.getDOMNode();
    appChart.create(el, {
      width: 1000,
      height: 500,
    }, this.getChartState());
  },

  componentDidUpdate: function () {
    console.log('did update');
    var el = this.getDOMNode();
    appChart.update(el, this.getChartState());
  },

  getChartState: function () {
    return {
      data: this.state.data,
    }
  },
  componentWillUnmount: function () {
    var el = this.getDOMNode();
    d3Chart.destroy(el); // does nothing
  },

  render: function () {
    window.app = this;
    
    return <div className="Chart">
      {
        (this.state.loading) && <div className="loader">Loading...</div>
      }
      <button onClick={this.randomDeaths} style={{position: 'absolute'}} disabled={this.state.loading}>
        Random Death per Drone
      </button><br/>
    </div>;
  },

  randomDeaths: function () {
    this.setState({loading: true});
    
    
    window.setTimeout(function(){
      this.state.data.map(function(stri) {
        stri.generateRandomDeaths(0, 12)
      });
      this.setState({loading: false});
      this.forceUpdate();
    }.bind(this), 1000);
  },
})

module.exports = App;