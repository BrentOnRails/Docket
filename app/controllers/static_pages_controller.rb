class StaticPagesController < ApplicationController
  before_filter :authenticate_user!

  def index
    @calendars = current_user.calendars

    render :index
  end
end
