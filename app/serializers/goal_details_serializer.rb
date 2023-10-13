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

  has_many :measured_stats do
    object.due_stats.select(&:measured?)
  end

  has_many :pending_stats do
    object.due_stats.select(&:pending?)
  end

  def stats_total
    object.stats.size
  end
end
