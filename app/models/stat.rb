class Stat < ApplicationRecord
  belongs_to :goal

  validates :measurement_value, numericality: { greater_than_or_equal_to: 0 }
  validates :measurement_date, presence: true

  scope :prior_to_date, ->(date) { where(measurement_date: ...date) }

  def measured?
    measurement_value.present?
  end
  
  def pending?
    !measured?
  end
end
