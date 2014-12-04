Rails.application.routes.draw do
  devise_for :users

  resources :stories, except: :destroy do
    resources :parts, only: :create
  end

  root to: 'stories#index'
end
