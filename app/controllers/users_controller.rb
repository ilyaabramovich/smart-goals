class UsersController < ApplicationController
  before_action :set_user, only: %i[update destroy]

  def index
    @users = User.all

    render json: @users
  end

  def show
    if current_user
      render json: current_user, status: :ok
    else
      render json: { status: :error, error: 'Not authenticated' }, status: :unauthorized
    end
  end

  def create
    @user = User.create!(user_params)
    session[:user_id] = @user.id
    render json: @user, status: :created, location: @user
  end

  def update
    @user.update!(user_params)
    render json: @user
  end

  def destroy
    @user.destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:username, :password)
  end
end
