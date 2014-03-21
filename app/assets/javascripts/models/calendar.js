Docket.Models.Calendar = Backbone.Model.extend({
  urlRoot: "/calendars",

  events: function () {
    if (!this._events) {
      this._events = new Docket.Collections.CalendarEvents([], {
        calender: this
      });
    }

    return this._events
  },


  parse: function (jsonResp) {
    if (jsonResp.events) {
      this.events().set(jsonResp.events);
      delete jsonResp.events;
    }

    return jsonResp;
  }
});
