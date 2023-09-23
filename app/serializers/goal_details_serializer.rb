# frozen_string_literal: true

class GoalDetailsSerializer < ActiveModel::Serializer
  attributes :id, :description, :target_date, :target_value, :initial_value, :interval, :accumulated_value, :completion_percentage, :nearest_upcoming_stat_date

  has_many :measured_stats
  has_many :pending_stats
end
