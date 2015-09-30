var randomNumber = function(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min); 
}

var global_strikes = {};
var Strike = function(attr) {
  global_strikes[attr._id] = this;
  attr.id = attr._id;
  attr._id = undefined;
  _.forEach(attr, function(value, key) {
    this[key] = value;
  }, this);
};

_.merge(Strike.prototype, {
  getDeaths: function(){
    var min = +(this.deaths_min);
    var max = +(this.deaths_max);
    if (isNaN(min) && isNaN(max)) {
      return 0;
    }
    else if (isNaN(min)) {
      return max;
    }
    else if (isNaN(max)) {
      return min;
    }
    else {
      return (min + max) / 2;
    }
  },
  getYear: function(){
    return (new Date(this.date)).getYear() + 1900;
  },
  generateRandomDeaths: function (min, max) {
    this.deaths_min = this.deaths_max = randomNumber(min, max);
  },
});

module.exports = Strike;
