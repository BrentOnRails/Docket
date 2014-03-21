Docket.Views.CalendarsIndex = Backbone.View.extend({

  template: JST['calendars/index'],

  render: function () {
    var renderedContent = this.template({
      calendars: this.collection
    });



    this.$el.html(renderedContent);

    return this;
  }

});
