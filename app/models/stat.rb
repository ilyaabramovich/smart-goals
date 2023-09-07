class Stat < ApplicationRecord
  belongs_to :goal

  validates :measurement_value, numericality: { greater_than_or_equal_to: 0 }
  validates :measurement_date, presence: true
end
