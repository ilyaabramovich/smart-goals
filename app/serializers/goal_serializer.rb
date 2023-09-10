class GoalSerializer < ActiveModel::Serializer
  attributes :id, :description, :target_date, :target_value, :current_value, :interval

  has_many :stats
end
