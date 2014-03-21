module ApplicationHelper
  def avatar_url(user)
    if user.avatar_url.present?
      user.avatar_url
    else

      gravatar_id = Digest::MD5.hexdigest(user.email.downcase)

      "http://gravatar.com/avatar/#{gravatar_id}.png"
    end
  end

end

# default_url = "#{root_url}images/guest.png"
# http://gravatar.com/avatar/#{gravatar_id}.png?s=48&d=#{CGI.escape(default_url)}"