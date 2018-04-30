require 'jwt'

class UsersController < ApplicationController

  def register
    User.create!(auth_params)
  end

  def login
    user = User.login(auth_params[:username], auth_params[:password])

    # fail if not logged in
    return render json: {message: "Login failed"}, status: :unauthorized if (user.blank?) 

    # check if session active
    render json: { token: user.session_token, user: UserSerializer.new(user).attributes }
  end

  def verify
    user = User.find_by_token(token_params[:token])

    # fail if not logged in
    if (user.blank? || user.session_expired?) 
      return render json: {message: "Login failed"}, status: :unauthorized 
    end

    # check if session active
    render json: user
  end

  def logout
    user = User
      .find_by_token(token_params[:token])
      .try(:logout)
  end

  private
    def auth_params
      params.require(:username)
      params.require(:password)
      params.permit(:username, :password)
    end

    def token_params
      params.require(:token)
      params.permit(:token)
    end
end
