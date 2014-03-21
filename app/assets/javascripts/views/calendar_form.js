Docket.Views.CalendarForm = Backbone.View.extend({
  tagName: 'form',

  template: JST['calendars/form'],

  events: {
    'click button' : 'submit'
  },

  render: function () {
    var renderedContent = this.template({
      calendar: this.model
    });


    this.$el.html(renderedContent);

    return this;
  },

  submit: function (event) {
    var that = this;
    event.preventDefault();
    var attrs = this.$el.serializeJSON()
    this.model.save(attrs, {
      success: function(calendar) {
        that.collection.add(calendar);
        Backbone.history.navigate("", { trigger: true });
      }

    });
  }

});
