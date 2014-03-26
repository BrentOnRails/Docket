Docket.Views.EventForm = Backbone.View.extend({
  tagName: "form role='form' ",

  template: JST['events/form'],

  events: {
    'click button' : 'submit'
  },

  render: function () {
    var renderedContent = this.template({
      calendars: this.collection,
      event: this.model
    });


    this.$el.html(renderedContent);

    return this;
  },

  submit: function (event) {
    var that = this;
    event.preventDefault();
    var attrs = this.$el.serializeJSON()
    this.model.save(attrs, {
      success: function(entry) {
        Docket.entries.add(entry);
        $(".application-lg-modal").modal("hide");
        Backbone.history.navigate("", { trigger: true });
      }

    });
  }

});
