class Api::V1::GoalsController < ApplicationController
  before_action :require_user_logged_in!
  before_action :set_goal, only: %i[ show update destroy ]

  # GET /goals
  def index
    @goals = Goal.all

    render json: @goals
  end

  # GET /goals/1
  def show
    render json: @goal
  end

  # POST /goals
  def create
    @goal = Goal.new(goal_params)
    @goal.user_id = current_user.id

    if @goal.save
      render json: @goal, status: :created
    else
      render json: @goal.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /goals/1
  def update
    if @goal.update(goal_params)
      render json: @goal
    else
      render json: @goal.errors, status: :unprocessable_entity
    end
  end

  # DELETE /goals/1
  def destroy
    @goal.destroy
  end

  private
    def set_goal
      @goal = current_user.goals.find(params[:id])
    end

    def goal_params
      params.require(:goal).permit(:target_date, :target_value, :description, :interval, :current_value)
    end
end
