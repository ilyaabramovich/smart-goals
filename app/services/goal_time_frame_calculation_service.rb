# frozen_string_literal: true

class GoalTimeFrameCalculationService < BaseService
  attr_reader :goal

  def call(goal)
    @goal = goal

    calculate_time_frames
  end

  private

  def calculate_time_frames
    step = interval_to_step.fetch(goal.interval, 1.day)
    current_date = goal.created_at.beginning_of_day
    time_frames = [current_date]
    target_date = goal.target_date.beginning_of_day

    while current_date < target_date
      current_date += step
      time_frames << current_date
    end

    time_frames
  end

  def interval_to_step
    {
      daily: 1.day,
      weekly: 1.week,
      monthly: 1.month
    }
  end
end
