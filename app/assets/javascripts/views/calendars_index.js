Docket.Views.CalendarsIndex = Backbone.View.extend({

  template: JST['calendars/index'],

  events: {
    "click .delete-calendar" : "destroyCalendar",
    "click .delete-event" : "destroyEvent"
  },

  initialize: function () {
    this.listenTo(Docket.calendars, "all", this.render);
    this.listenTo(Docket.entries, "all", this.render);
  },

  render: function () {
    var renderedContent = this.template({
      calendars: Docket.calendars,
      entries: Docket.entries
    });



    this.$el.html(renderedContent);

    return this;
  },

  destroyCalendar: function (event) {
    var id = $(event.target).data("id")
    var cal =  Docket.calendars.get(id)
    result = window.confirm("Delete Calendar?")
    if (result == true) {
      cal.destroy();
    }
  },

  destroyEvent: function (event) {
    that = this;
    var id = $(event.target).data("id");
    var entry = Docket.entries.get(id);
    result = window.confirm("Delete Entry?")
    if (result == true) {
      Docket.entries.remove(entry);
      entry.destroy();
      // that.render();
    }
  }


});
