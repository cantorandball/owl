Rails.application.routes.draw do
  devise_for :users

  resources :stories, except: :destroy
  root to: 'stories#index'
end
