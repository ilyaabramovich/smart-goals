# frozen_string_literal: true

class GoalSerializer < ActiveModel::Serializer
  attributes :id, :description, :target_date, :target_value, :initial_value, :interval
end
