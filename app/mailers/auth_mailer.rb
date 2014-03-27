class AuthMailer < ActionMailer::Base
  default :from => 'admin@docket-calendar.herokuapp.com'

    # send a signup email to the user, pass in the user object that
    # contains the user's email address
    def signup_email(user)
      mail(
        :to => user.email,
        :subject => 'Thanks for signing up'
      )
    end
end
