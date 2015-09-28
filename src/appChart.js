// "_id": "55c79e711cbee48856a30886",
// "number": 1,
// "country": "Yemen",
// "date": "2002-11-03T00:00:00.000Z",
// "narrative": "In the first known US targeted assassination using a drone, a CIA Predator struck a car, killing 6 people.",
// "town": "",
// "location": "Marib Province",
// "deaths": "6",
// "deaths_min": "6",
// "deaths_max": "6",
// "civilians": "0",
// "injuries": "",
// "children": "",
// "tweet_id": "278544689483890688",
// "bureau_id": "YEM001",
// "bij_summary_short": "In the first known US targeted assassination using a drone, a CIA Predator struck a car killing six al Qaeda suspects.",
// "bij_link": "http://www.thebureauinvestigates.com/2012/03/29/yemen-reported-us-covert-actions-since-2001/",
// "target": "",
// "lat": "15.47467",
// "lon": "45.322755",
// "articles": [],
// "names": ["Qa'id Salim Sinan al-Harithi, Abu Ahmad al-Hijazi, Salih Hussain Ali al-Nunu, Awsan Ahmad al-Tarihi, Munir Ahmad Abdallah al-Sauda, Adil Nasir al-Sauda'"]

// use this as a keymap
var global_strikes = {};
var appChart = {};
var Strike = function(attr) {
  global_strikes[attr._id] = this;
  attr.id = attr._id;
  attr._id = undefined;
  attr.forEach(function(key, value) {
    this[key] = value;
  }, this);
};

_.merge(Strike.prototype, {
  getDeaths: function(){
    return (+(this.deaths_min) + +(this.deaths_max)) / 2;
  },
  getYear: function(){
    return (new Date(this.date)).getYear();
  }
});

//death per year
appChart.create = function(el, props, state) {
  if (!state.data.strike) {
    return;
  } else {
    console.log('commencing create'); // eslint-disable-line
  }
  var strikes = state.data.strike.map(function(stri_attr){
    return new Strike(stri_attr);
  });
  var groupByYear = _.groupBy(strikes, function(strike){
    return strike.getYear();
  });
  var aggregateByYear = groupByYear.map(function (strike_arr, year) {
    return strike_arr.reduce(function(count, stri, key) {
      return count = count + stri.getDeaths();
    }, 0);
  });


  var xRange = d3.scale.ordinal().rangeRoundBands([0, 1000], 0.1).domain(barData);

  // to be continued...

};

appChart.update = function() {

}

module.exports = appChart;
