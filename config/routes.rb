Docket::Application.routes.draw do
  devise_for :users, :controllers => { omniauth_callbacks: "omniauth_callbacks" }
  resources :calendars, only: [:index]
  root to: "static_pages#index"
end
