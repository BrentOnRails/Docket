Docket.Routers.AppRouter = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl,
    this.calendars = options.calendars
  },

  routes: {
    "calendars" : "index",
    "calendars/new" : "new"
  },


  index: function () {
    var indexView = new Docket.Views.CalendarsIndex({
      collection: this.calendars
    })

    this._swapView(indexView);
  },

  new: function () {
    var newCalendar = new Docket.Models.Calendar()
    var newView = new Docket.Views.CalendarForm({
      collection: this.calendars,
      model: newCalendar
    })

    _swapView(newView);
  },


  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
});
