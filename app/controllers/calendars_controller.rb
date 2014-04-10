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
    cal.events.build(title: "Plan Example", notes: "Entries with no date are 'Plan'").save
    cal.events.build(title: "Plan Example", notes: "Entries with no date are 'Plan'").save
    cal.events.build(title: "Plan Example", notes: "Entries with no date are 'Plan'").save
    cal.events.build(title: "Plan Example", notes: "Entries with no date are 'Plan'").save
    cal.events.build(title: "Plan Example", notes: "Entries with no date are 'Plan'").save
    cal.events.build(title: "Plan Example", notes: "Entries with no date are 'Plan'").save
    cal.events.build(title: "Plan Example", notes: "Entries with no date are 'Plan'").save
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
