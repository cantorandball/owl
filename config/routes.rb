Rails.application.routes.draw do
  devise_for :users

  resources :stories, except: :destroy do
    member do
      post :arrange_parts
    end
    resources :parts, only: :create
  end

  root to: 'stories#index'
end
