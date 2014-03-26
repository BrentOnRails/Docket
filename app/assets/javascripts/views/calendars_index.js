Docket.Views.CalendarsIndex = Backbone.View.extend({

  template: JST['calendars/index'],

  calAlert: JST['calendars/alert'],

  events: {
    "click .delete-calendar" : "deleteCalendarPrompt",
    "click .delete-event" : "deleteEventPrompt",
    "click .confirm-delete" : "destroyCalendar"
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

  deleteCalendarPrompt: function(event) {
    var id = $(event.target).data("id");
    var cal = Docket.calendars.get(id);
    var renderedContent = this.calAlert({
      id: id,
      cal: cal
    });

    $(".application-lg-modal .modal-content").html(renderedContent)
    $(".application-lg-modal").modal("show");

  },

  deleteEventPrompt: function(event) {
    var id = $(event.target).data("id");
    var entry = Docket.entries.get(id);
    $(".application-lg-modal .modal-content").html(this.calAlert)
    $(".application-lg-modal").model("show");
    debugger
  },

  destroyCalendar: function (event) {
    var id = $(event.target).data("id");
    var cal =  Docket.calendars.get(id);
    cal.destroy();
    // confirmed that this does remove from collection and should re-render

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
