Rails.application.routes.draw do
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post '/signup', to: "users#create"
  get '/me', to: "users#show"
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  namespace :api do
    namespace :v1 do
      resources :goals do
        resources :stats
        member do
          get 'details'
        end
      end
    end
  end
end
