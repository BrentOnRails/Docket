# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime
#  updated_at             :datetime
#  name                   :string(255)
#  avatar_url             :string(255)
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable,
         :async

   has_many :calendars, dependent: :destroy
   has_many :events, :through => :calendars, :source => :events
   has_many :authorizations


   def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
       data = access_token.info
       user = User.where(:email => data["email"]).first


       unless user
           user = User.create(name: data["name"],
                email: data["email"],
                password: Devise.friendly_token[0,20],
                name: data["name"]
               )
       end
       user
   end
end
