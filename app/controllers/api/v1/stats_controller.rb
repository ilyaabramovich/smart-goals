class Api::V1::StatsController < ApplicationController
  before_action :require_user_logged_in!
  before_action :set_stat, only: %i[show update destroy]

  def index
    goal = current_user.goals.find(params[:goal_id])
    @stats = goal.stats

    render json: @stats
  end

  def show
    render json: @stat
  end

  def create
    goal = current_user.goals.find(params[:goal_id])
    @stat = goal.stats.new(stat_params)

    if @stat.save
      render json: @stat, status: :created, location: @stat
    else
      render json: @stat.errors, status: :unprocessable_entity
    end
  end

  def update
    if @stat.update(stat_params)
      render json: @stat
    else
      render json: @stat, serializer: ErrorSerializer, status: :unprocessable_entity
    end
  end

  def destroy
    @stat.destroy
  end

  private

  def set_stat
    goal = current_user.goals.find(params[:goal_id])
    @stat = goal.stats.find(params[:id])
  end

  def stat_params
    params.require(:stat).permit(:goal_id, :measurement_value)
  end
end
