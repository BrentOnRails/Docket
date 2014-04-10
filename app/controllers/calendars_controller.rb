class CalendarsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @calendars = current_user.calendars
    if @calendars.count == 0
      @calendars = demo_data
    end
    
    render json: @calendars
  end
  
  def demo_data
    cal = current_user.calendars.build(title: "test calendar", user_id: current_user.id)
    cal.save
    cal.events.build(title: "Plan Example", notes: "Entries with no date are 'Plans'").save
    cal.events.build(title: "Today Example", date: 1.second.ago, notes: "The Today Tab shows events for today!'").save
    cal.events.build(title: "Week Example", date: 5.days.from_now, notes: "Anything 7 days or less in the future shows on the week tab").save
    cal.events.build(title: "Month Example", date: 20.days.from_now, notes: "Anything 30 days or less in the future shows on month tab").save
    cal.events.build(title: "Visit my portfolio site", notes: "BrentOnRails.com").save
    cal.events.build(title: "Hite a Web Dev!", notes: "I'm one and I know others, hit me up!").save
    cal.events.build(title: "Check Back!", date: 1.day.from.now, notes: "Theres new features added everyday!").save
    return current_user.calendars
  end

  def create
    @calendar = current_user.calendars.build(calendar_params)
    if @calendar.save
      render json: @calendar
    else
      render json: { errors: @calendar.errors.full_messages }, status: 422
    end
  end


  def update
    @calendar = Calendar.find(params[:id])
    @calendar.update_attributes(calendar_params)

    if @calendar.save
      render json: @calendar
    else
      render json: { errors: @calendar.errors.full_messages }, status: 422
    end
  end



  def destroy
    @calendar = Calendar.find(params[:id])
    @calendar.destroy
    render json: nil
  end


  private
  def calendar_params
    params.require(:calendar).permit(:title)
  end
end
