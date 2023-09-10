class GoalSerializer < ActiveModel::Serializer
  attributes :id, :description, :target_date, :target_value, :initial_value, :interval

  has_many :measured_stats
  has_many :pending_stats

  attribute :completion_percentage
  attribute :accumulated_value

  def completion_percentage
    object.completion_percentage
  end

  def accumulated_value
    object.accumulated_value
  end
end
