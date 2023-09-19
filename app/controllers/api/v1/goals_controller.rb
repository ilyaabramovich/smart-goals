class Api::V1::GoalsController < ApplicationController
  before_action :require_user_logged_in!
  before_action :set_goal, only: %i[show update destroy]

  def index
    @goals = current_user.goals.select(:id, :description)

    render json: @goals, fields: [:id, :description]
  end

  def show
    render json: @goal
  end

  def create
    @goal = current_user.goals.new(goal_params)

    if @goal.save
      render json: @goal, status: :created
    else
      render json: @goal.errors, status: :unprocessable_entity
    end
  end

  def update
    if @goal.update(goal_params)
      render json: @goal
    else
      render json: @goal.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @goal.destroy
  end

  private

  def set_goal
    @goal = current_user.goals.find(params[:id])
  end

  def goal_params
    params.require(:goal).permit(:target_date, :target_value, :description, :interval, :initial_value)
  end
end
