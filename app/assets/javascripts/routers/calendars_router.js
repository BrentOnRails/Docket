Docket.Routers.AppRouter = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl,
    this.calendars = options.calendars
  },

  routes: {
    "calendars" : "index"
  },


  index: function () {
    var indexView = new Docket.Views.CalendarsIndex({
      collection: this.calendars
    })

    this._swapView(indexView);
  },


  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
});
