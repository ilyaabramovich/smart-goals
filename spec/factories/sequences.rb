# frozen_string_literal: true

FactoryBot.define do
  sequence(:username) { |n| "user#{n}" }
end
