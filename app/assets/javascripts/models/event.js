Docket.Models.Event = Backbone.Model.extend({
  urlRoot: "/calendars",

  parse: function (jsonResp) {
    if (jsonResp.events) {
      this.entries().set(jsonResp.events);
      delete jsonResp.events;
    }

    return jsonResp;
  },
	
  comparator: function(calendar) {
    return event.get('date');
  }
});
