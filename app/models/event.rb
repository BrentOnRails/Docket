# == Schema Information
#
# Table name: events
#
#  id          :integer          not null, primary key
#  datetime    :datetime
#  title       :string(255)
#  notes       :text
#  calendar_id :integer
#  created_at  :datetime
#  updated_at  :datetime
#  date        :date
#

class Event < ActiveRecord::Base
  belongs_to :calendar
end
