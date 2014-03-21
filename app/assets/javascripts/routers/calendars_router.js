Docket.Routers.AppRouter = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl,
    this.calendars = options.calendars
  },

  routes: {
    "" : "index",
    "calendars" : "index",
    "calendars/new" : "new",
    "calendars/:id/edit" : "edit",
    "calendars:/:id/delete" : "delete"
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

    this._swapView(newView);
  },

  edit: function (id) {
    var that = this;
    this._getCalendar(id, function (calendar) {
      var editView = new Docket.Views.CalendarForm({
        collection: that.calendars,
        model: calendar
      })

    that._swapView(editView);
  });


  },


  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  },

  _getCalendar: function(id, callback){
    var that = this;
    var calendar = Docket.calendars.get(id);
    if (!calendar) {
      calendar = new Docket.Models.Calendar({
        id: id
      });
      calendar.collection = this.calendars;
      calendar.fetch({
        success: function () {
          that.calendars.add(calendar);
          callback(calendar);
        }
      });
    } else {
      callback(calendar);
    }
  }
});
