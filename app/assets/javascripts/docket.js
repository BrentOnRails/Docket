window.Docket = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Docket.calendars = new Docket.Collections.Calendars();
    Docket.entries = new Docket.Collections.Events();
    Docket.calendars.fetch({
      success:  function () {
        Docket.entries.fetch({
          success: function () {
            new Docket.Routers.AppRouter({
              $rootEl: $("#content"),
              calendars: Docket.calendars,
              entries: Docket.entries
            });
            Backbone.history.start();
          }

      })
    }


    })
  }
};

$(document).ready(function(){
  Docket.initialize();
});
