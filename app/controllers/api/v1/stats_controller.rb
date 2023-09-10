class Api::V1::StatsController < ApplicationController
  before_action :require_user_logged_in!
  before_action :set_stat, only: %i[ show update destroy ]

  # GET /stats
  def index
    @stats = Stat.all

    render json: @stats
  end

  # GET /stats/1
  def show
    render json: @stat
  end

  # POST /stats
  def create
    goal = current_user.goals.find(params[:goal_id])
    @stat = goal.stats.new(stat_params)

    if @stat.save
      render json: @stat, status: :created, location: @stat
    else
      render json: @stat.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stats/1
  def update
    if @stat.update(stat_params)
      render json: @stat
    else
      render json: @stat.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stats/1
  def destroy
    @stat.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stat
      goal = current_user.goals.find(params[:goal_id])
      @stat = goal.stats.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def stat_params
      params.require(:stat).permit(:goal_id, :measurement_value)
    end
end
