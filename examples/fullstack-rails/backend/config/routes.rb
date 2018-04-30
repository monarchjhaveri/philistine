Rails.application.routes.draw do
  scope 'users/:user_id' do
    resources :meals
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'status#status'

  post 'users/register', to: 'users#register'
  post 'users/login', to: 'users#login'
  post 'users/verify', to: 'users#verify'
  post 'users/logout', to: 'users#logout'
end
