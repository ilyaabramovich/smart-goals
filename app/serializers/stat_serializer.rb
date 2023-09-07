class StatSerializer < ActiveModel::Serializer
  attributes :id, :measurement_value, :measurement_date

  belongs_to :goal
end
