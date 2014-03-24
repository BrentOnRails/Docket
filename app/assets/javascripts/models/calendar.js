Docket.Models.Calendar = Backbone.Model.extend({
  urlRoot: "/calendars",

  entries: function () {
    if (!this._entries) {
      this._entries = new Docket.Collections.Events([], {
        calendar: this
      });
    }

    return this._entries
  }


  // parse: function (jsonResp) {
  //   if (jsonResp.events) {
  //     this.entries().set(jsonResp.events);
  //     Docket.entries.set(jsonResp.events);
  //     delete jsonResp.events;
  //   }
  //
  //   return jsonResp;
  // }
});
