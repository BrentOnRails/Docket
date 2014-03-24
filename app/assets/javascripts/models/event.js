Docket.Models.Event = Backbone.Model.extend({
  urlRoot: "/events",

  // parse: function (jsonResp) {
  //   if (jsonResp.events) {
  //     this.entries().set(jsonResp.events);
  //     delete jsonResp.events;
  //   }
  //
  //   return jsonResp;
  // },

  comparator: function(event) {
    return event.get('date');
  }
});
