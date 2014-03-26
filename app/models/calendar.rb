# == Schema Information
#
# Table name: calendars
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class Calendar < ActiveRecord::Base
  belongs_to :user
  has_many :events, dependent: :destroy
end
