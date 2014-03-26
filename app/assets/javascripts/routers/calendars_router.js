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
    "today" : "today",
    "week" : "week",
    "month" : "month",
    "missed" : "missed",
    "calendars/:id/edit" : "edit",
    "entries/new" : "newEntry",
    "entries/:id/edit" : "editEntry"
  },


  index: function () {
    var indexView = new Docket.Views.CalendarsIndex({
      collection: this.entries,
      active: "#all"
    })

    this._swapView(indexView);
  },

  new: function () {
    var newCalendar = new Docket.Models.Calendar()
    var newView = new Docket.Views.CalendarForm({
      collection: this.calendars,
      model: newCalendar,
    })

    this._modalNew(newView)
  },

  _modalNew: function(view) {
    $(".application-lg-modal .modal-content").html(view.render().$el)
    $(".application-lg-modal").modal("show");
  },

  newEntry: function () {
    var newEvent = new Docket.Models.Event();
    var newView = new Docket.Views.EventForm({
      collection: this.calendars,
      model: newEvent
    })

    this._modalNew(newView);
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

    that._modalNew(editView);
    });

  },

  edit: function (id) {
    var that = this;
    this._getCalendar(id, function (calendar) {
      var editView = new Docket.Views.CalendarForm({
        collection: that.calendars,
        model: calendar
      })

    that._modalNew(editView);
    });


  },

  today: function() {
    this.today_entries = this._entryFilter(0);

    var todayView = new Docket.Views.CalendarsIndex({
      collection: this.today_entries,
      active: "#today"
    })

    this._swapView(todayView);
  },

  week: function() {
    this.week_entries = this._entryFilter(7);

    var weekView = new Docket.Views.CalendarsIndex({
      collection: this.week_entries,
      active: "#week"
    });

    this._swapView(weekView);
  },

  month: function() {
    this.month_entries = this._entryFilter(31);

    var monthView = new Docket.Views.CalendarsIndex({
      collection: this.month_entries,
      active: "#month"
    });

    this._swapView(monthView);
  },

  missed: function() {
    this.missed_entries = this._entryFilter(-1);

    var missedView = new Docket.Views.CalendarsIndex({
      collection: this.missed_entries,
      active: "#missed"
    });

    this._swapView(missedView);
  },

  _diff: function(d1, d2) {
    var day = (1000*60*60*24);
    var diff = Math.round((d2.getTime()-d1.getTime())/(day));
		if (diff == -0){
			diff = 0
		}
    return diff;
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
  },

  _entryFilter: function (offset) {
    that = this;
      var entries = new Docket.Collections.Events();
      Docket.entries.each(function(entry) {
        var today = new Date();
        var entry_date = new Date(entry.get("date"));
        var p = entry_date.setDate(entry_date.getDate() + 1)
        entry_date = new Date(p);
        if (entry.get("date") != null){
          var diff = that._diff(today, entry_date);
					var isToday = (diff == 0)
					var isPast = (diff < 0 && !isToday)
					if (offset == 0){
						if (isToday && diff >= 0){
							entries.push(entry);
						}
					} else if (diff > 0 && diff <= offset){
							entries.push(entry);
					} else if (offset == -1 && isPast){
						entries.push(entry);
					}
        }
      })
      return entries;
  }



});
