Docket.Views.CalendarsIndex = Backbone.View.extend({

  template: JST['calendars/index'],

  events: {
    "click .delete-calendar" : "destroyCalendar",
    "click .delete-event" : "destroyEvent"
  },

  initialize: function (options) {
    this.listenTo(Docket.calendars, "sync add remove change:title", this.render);
    this.listenTo(Docket.entries, "sync add remove change:title", this.render);
    this.active = options.active
  },

  render: function () {
    var renderedContent = this.template({
      calendars: Docket.calendars,
      entries: this.collection
    });



    this.$el.html(renderedContent);
    this.$(this.active).attr("class","active");

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
