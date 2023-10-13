# frozen_string_literal: true

class GoalDetailsSerializer < ActiveModel::Serializer
  attributes :id,
    :description,
    :target_date,
    :target_value,
    :initial_value,
    :interval,
    :accumulated_value,
    :completion_percentage,
    :days_to_complete

  attribute :stats_total
  attribute :measurement_values
  attribute :measurement_dates

  has_many :pending_stats do
    object.due_stats.select(&:pending?)
  end

  def stats_total
    object.stats.size
  end

  def measurement_values
    object.measured_stats.map(&:measurement_value)
  end

  def measurement_dates
    object.measured_stats.map { |stat| stat.measurement_date.strftime('%Y-%d-%m') }
  end
end
