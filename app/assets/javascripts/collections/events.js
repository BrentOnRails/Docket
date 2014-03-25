Docket.Collections.Events = Backbone.Collection.extend({
  model: Docket.Models.Event,
  url: '/events',

  comparator: function(event) {
    return [event.get('date'), event.get('time')];
  }

});
