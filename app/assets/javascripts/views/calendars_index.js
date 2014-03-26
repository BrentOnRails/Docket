Docket.Views.CalendarsIndex = Backbone.View.extend({

  template: JST['calendars/index'],

  calDelete: JST['partials/_calDelete'],

  entryDelete: JST['partials/_entryDelete'],

  calForm: JST['calendars/form'],

  events: {
    "click .delete-calendar" : "deleteCalendarPrompt",
    "click .delete-event" : "deleteEntryPrompt",
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

  deleteEntryPrompt: function(event) {
    var id = $(event.target).data("id");
    var entry = Docket.entries.get(id);
    var that = this;
    var renderedContent = this.entryDelete({
      id: id,
      entry: entry
    });


    $(".application-lg-modal .modal-content").html(renderedContent)
    $(".application-lg-modal").modal("show");
    $(".confirm-delete-entry").on("click", function(event){
      that.destroyEvent(event);
      $(".application-lg-modal").modal("hide");
    });

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
      Docket.entries.remove(entry);
      entry.destroy();
  }

});
