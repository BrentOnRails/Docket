# == Schema Information
#
# Table name: authorizations
#
#  id         :integer          not null, primary key
#  provider   :string(255)
#  uid        :string(255)
#  user_id    :integer
#  token      :string(255)
#  secret     :string(255)
#  name       :string(255)
#  link       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Authorization < ActiveRecord::Base
end
