# frozen_string_literal: true

class StatSerializer < ActiveModel::Serializer
  attributes :id, :measurement_value, :measurement_date
end
