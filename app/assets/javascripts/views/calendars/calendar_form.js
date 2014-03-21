Docket.Views.CalendarForm = Backbone.View.extend({
  tagName: 'form',

  template: JST['calendars/form'],

  render: function () {
    var renderedContent = this.template({
      calendar: this.model
    });


    this.$el.html(renderedContent);

    return this;
  }

});
