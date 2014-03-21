Docket.Views.CalendarsIndex = Backbone.View.extend({

  template: JST['calendars/index'],

  events: {
    "click #delete-calendar" : "destroyCalendar"
  },

  initialize: function () {
    this.listenTo(this.collection, "add change:title remove reset", this.render);
  },

  render: function () {
    var renderedContent = this.template({
      calendars: this.collection
    });



    this.$el.html(renderedContent);

    return this;
  },





});
