Docket::Application.routes.draw do
  devise_for :users
  root to: "calendars#index"
end
