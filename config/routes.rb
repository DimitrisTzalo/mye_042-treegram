Rails.application.routes.draw do
  get '/' => 'home#index'

  resources :users do
    resources :photos
    collection do
      get '/emails', to: 'users#emails', as: 'emails'
    end
  end

  resources :photos do
    member do
      get 'comments', to: 'photos#comments', as: 'comments'
    end
  end
  
  resources :comments, only: [:create, :destroy]
  resources :follows, only: [:create, :destroy]
  resources :tags, only: [:create, :destroy]

  get '/log-in' => "sessions#new"
  post '/log-in' => "sessions#create"
  get '/log-out' => "sessions#destroy", as: :log_out
end