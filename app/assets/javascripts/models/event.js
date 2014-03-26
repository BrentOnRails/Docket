Docket.Models.Event = Backbone.Model.extend({
  urlRoot: "/events",

  comparator: function(event) {
    return event.get('datetime');
  }
});
