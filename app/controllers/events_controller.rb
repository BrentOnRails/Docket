class EventsController < ApplicationController
  require 'time'
  before_filter :authenticate_user!


  def index
    @events = current_user.events

    render json: @events
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event
    else
      render json: { errors: @event.errors.full_messages }, status: 422
    end
  end

  def update
    @event = Event.find(params[:id])
    @event.update_attributes(event_params)

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
    params.require(:event).permit(:title, :notes, :calendar_id, :date)
  end

end
