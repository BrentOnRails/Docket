class EventsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @events = current_user.events

    render json: @events
  end

  def create
    # @calendar = Calendar.find(event_params[:calendar_id])
    @event = Event.new(event_params)
    if @event.save
      render json: @event
    else
      render json: { errors: @event.errors.full_messages }, status: 422
    end
  end

  def update
    @event = Event.find(params[:id])
    @event.update_attributes(calendar_params)

    if @event.save
      render json: @event
    else
      render json: { errors: @event.errors.full_messages }, status: 422
    end
  end



  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    render json: nil
  end



  private
  def event_params
    params.require(:event).permit(:title, :notes, :date, :calendar_id)
  end

end
