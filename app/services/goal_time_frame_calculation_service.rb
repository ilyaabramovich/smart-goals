# frozen_string_literal: true

class GoalTimeFrameCalculationService < BaseService
  def call(goal)
    @goal = goal

    calculate_time_frames
  end

  private

  attr_reader :goal

  def calculate_time_frames
    step = interval_to_step.fetch(goal.interval)
    current_date = goal.created_at.beginning_of_day
    target_date = goal.target_date.beginning_of_day
    time_frames = []

    loop do
      time_frames << current_date
      current_date += step
      break if current_date > target_date
    end

    time_frames
  end

  def interval_to_step
    {
      'daily' => 1.day,
      'weekly' => 1.week,
      'monthly' => 1.month
    }
  end
end
