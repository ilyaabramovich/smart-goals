# frozen_string_literal: true

class ErrorSerializer < ActiveModel::Serializer
  attribute :status
  attribute :errors

  def status
    'error'
  end

  def errors
    object.errors.each_with_object({}) do |error, result|
      result[error.attribute.to_s.camelize(:lower)] = error.full_message
    end
  end
end
