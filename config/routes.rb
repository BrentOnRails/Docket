Docket::Application.routes.draw do
  devise_for :users, :controllers => { omniauth_callbacks: "omniauth_callbacks" }
  resources :calendars, only: [:index, :create, :destroy, :update]
  resources :events, only: [:index, :create, :destroy, :update]

  root to: "static_pages#index"
end
