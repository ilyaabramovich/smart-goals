class Stat < ApplicationRecord
  belongs_to :goal

  validates :measurement_value, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :measurement_date, presence: true

  scope :prior_to_date, ->(date) { where(measurement_date: ..date) }

  def measured?
    measurement_value.present?
  end

  def pending?
    !measured?
  end

  def upcoming?
    measurement_date.future?
  end

  def due?
    !upcoming?
  end
end
