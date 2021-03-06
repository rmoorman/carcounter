
var $ = require("./jquery-or-zepto");
var Backbone = require("backbone");
var _ = require("underscore");
// http://momentjs.com/
var moment = require("moment");
// http://code.shutterstock.com/rickshaw/
var Rickshaw = require("./vendor/rickshaw");

var template = require("./templates/graph.hbs");

var GraphView = Backbone.View.extend({

  constructor: function() {
    Backbone.View.prototype.constructor.apply(this, arguments);
    this.listenTo(this.collection, "add", this.render);

    // We can use safely Function.prototype.bind here because we have loaded
    // the shim if the browser did not implement it already
    this._rerender = _.debounce(this.render.bind(this) , 250);
    $(window).on("resize", this._rerender);
  },


  render: function() {
    this.$el.html(template());
    var container = this.$(".graph");

    var data = [];
    var count = 0;
    this.collection.each(function(m) {
      count += 1;
      data.push({
        x: m.get("seen").getTime(),
        y: count
      });
    });

    if (!data.length) {
      container.html("<i>no data!</i>");
      return;
    }

    var graph = new Rickshaw.Graph( {
      element: container[0],
      renderer: 'line',
      series: [
        {
          color: "blue",
          data: data,
          name: 'Cars'
        }
      ]
    } );

    var yAxis = new Rickshaw.Graph.Axis.Y({
        graph: graph
    });

    var xAxis = new Rickshaw.Graph.Axis.X({
        graph: graph,
        tickFormat: function(data) {
          return moment.unix(data/1000).format("hh:mm:ss a");
        }
    });

    graph.render();
    yAxis.render();
    xAxis.render();
  },

  remove: function() {
    Backbone.View.prototype.remove.apply(this, arguments);
    $(window).off("resize", this._rerender);
  }

});


module.exports = GraphView;
