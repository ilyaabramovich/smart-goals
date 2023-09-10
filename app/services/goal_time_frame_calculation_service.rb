class GoalTimeFrameCalculationService < BaseService
  attr_reader :goal

  def call(goal)
    @goal = goal

    calculate_time_frames
  end

  private

  def calculate_time_frames
    step = interval_to_step(goal.interval)
    current_date = goal.created_at.beginning_of_day
    time_frames = [current_date]
    target_date = goal.target_date.beginning_of_day

    while current_date < target_date
      current_date += step
      time_frames << current_date
    end

    time_frames
  end
  
  def interval_to_step(interval)
    case interval
    when 'daily'
      1.day
    when 'weekly'
      1.week
    when 'monthly'
      1.month
    end
  end
end