Docket.Views.CalendarsIndex = Backbone.View.extend({

  template: JST['calendars/index'],

  calDelete: JST['partials/_calDelete'],

  events: {
    "click .delete-calendar" : "deleteCalendarPrompt",
    "click .delete-event" : "deleteEventPrompt",
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
    var that = this;
    var renderedContent = this.calDelete({
      id: id,
      cal: cal
    });


    $(".application-lg-modal .modal-content").html(renderedContent)
    $(".application-lg-modal").modal("show");
    $(".confirm-delete-calendar").on("click", function(event){
      that.destroyCalendar(event);
      $(".application-lg-modal").modal("hide");
    });

  },

  deleteEventPrompt: function(event) {
    var id = $(event.target).data("id");
    var entry = Docket.entries.get(id);

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
