window.Docket = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Docket.calendars = new Docket.Collections.Calendars();
    Docket.calendars.fetch({
      success: function () {
        new Docket.Routers.AppRouter({
          $rootEl: $("#content"),
          calendars: Docket.calendars
        });
        Backbone.history.start();
      }
    })
  }
};

$(document).ready(function(){
  Docket.initialize();
});
