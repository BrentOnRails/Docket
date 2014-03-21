Docket.Collections.Calendars = Backbone.Collection.extend({
  model: Docket.Models.Calendar,
  url: '/calendars',

  comparator: function(calendar) {
    return calendar.get('id');
  }

});
