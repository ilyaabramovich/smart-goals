# frozen_string_literal: true

class ErrorSerializer < ActiveModel::Serializer
  attribute :status
  attribute :errors

  def status
    'error'
  end

  def errors
    object.errors.each_with_object({}) do |(key), result|
      result[key.attribute.to_s.camelize(:lower)] = key.message
    end
  end
end
