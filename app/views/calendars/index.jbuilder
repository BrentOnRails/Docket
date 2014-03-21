json.array! @calendars do |calendar|
  json.id calendar.id
  json.title calendar.title
  json.events calendar.events do |event|
    json.id event.id
    json.title event.title
    json.notes event.notes
    json.date event.date
    json.calendar_id event.calendar_id
  end
end