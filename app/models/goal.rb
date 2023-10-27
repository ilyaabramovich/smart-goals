class Goal < ApplicationRecord
  belongs_to :user
  has_many :stats, dependent: :destroy, inverse_of: :goal
  has_many :due_stats, -> { prior_to_date(Time.current) }, dependent: :destroy, class_name: 'Stat', inverse_of: :goal

  VALID_INTERVALS = %w[daily weekly monthly].freeze

  validates :description, presence: true, length: { minimum: 15 }
  validates :initial_value, numericality: { greater_than_or_equal_to: 0 }
  validates :target_value, numericality: { greater_than_or_equal_to: 0 }
  validates :target_date, presence: true
  validates :interval, inclusion: { in: VALID_INTERVALS }
  validate :target_date_must_not_be_in_the_past, if: :target_date_changed?

  after_create :create_time_frame_stats

  def due_stats
    stats.select(&:due?)
  end

  def measured_stats
    due_stats.select(&:measured?)
  end

  def accumulated_value
    initial_value + due_stats.inject(0) { |sum, stat| sum + stat.measurement_value.to_i }
  end

  def days_to_complete
    (target_date - created_at).to_i / (24 * 60 * 60)
  end

  def completion_percentage
    return 0 if target_value.zero?

    ((accumulated_value * 100) / target_value).round
  end

  def nearest_upcoming_stat_date
    nearest_stat = stats.detect(&:upcoming?)
    return if nearest_stat.blank?

    nearest_stat.measurement_date
  end

  private

  def create_time_frame_stats
    time_frames = GoalTimeFrameCalculationService.new.call(self)
    return if time_frames.empty?

    stats_data = time_frames.map { |time_frame| { measurement_date: time_frame } }

    stats.insert_all(stats_data)
  end

  def target_date_must_not_be_in_the_past
    if target_date.present? && target_date.past?
      errors.add(:target_date, 'must not be in the past')
    end
  end
end
