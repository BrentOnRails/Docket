Docket.Routers.AppRouter = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl,
    this.calendars = options.calendars,
    this.entries = options.entries
  },

  routes: {
    "" : "index",
    "calendars" : "index",
    "calendars/new" : "new",
    "calendars/:id/edit" : "edit",
    "entries/new" : "newEvent",
    "entries/:id/edit" : "editEntry"
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

  newEvent: function () {
    var newEvent = new Docket.Models.Event();
    var newView = new Docket.Views.EventForm({
      collection: this.calendars,
      model: newEvent
    })

    this._swapView(newView);
  },


  _getEntry: function (id, callback){
    var that = this;
    var entry = Docket.entries.get(id);
    if (!entry){
      entry = new Docket.Models.Events({
        id: id
      });
      entry.collection = this.entries;
      entry.fetch({
        success: function () {
          that.entries.add(entry);
          callback(entry)
        }
      });
    } else {
      callback(entry);
    }
  },

  editEntry: function (id) {
    var that = this;
    this._getEntry(id, function(entry) {
      var editView = new Docket.Views.EventForm({
        collection: that.calendars,
        model: entry
      })

    that._swapView(editView);
    });

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
