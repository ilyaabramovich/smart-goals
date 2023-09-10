class Goal < ApplicationRecord
  belongs_to :user
  has_many :stats, dependent: :destroy
  has_many :due_stats, -> { prior_to_date(Time.current.beginning_of_day) }, class_name: 'Stat'

  VALID_INTERVALS = ['daily', 'weekly', 'monthly']

  validates :description, presence: true, length: { minimum: 15 }
  validates :target_value, numericality: { greater_than_or_equal_to: 0 }
  validates :initial_value, numericality: { greater_than_or_equal_to: 0 }
  validates :interval, inclusion: { in: VALID_INTERVALS }
  validates :target_date, presence: true
  validate :target_date_must_be_in_future

  after_create :create_time_frame_stats

  def measured_stats
    due_stats.select(&:measured?)
  end
  
  def pending_stats
    due_stats.select(&:pending?)
  end

  def accumulated_value
    initial_value + due_stats.map(&:measurement_value).compact.sum
  end

  def completion_percentage
    return 0 if target_value.zero?

    ((accumulated_value * 100) / target_value).round
  end

  private

  def create_time_frame_stats
    time_frames = GoalTimeFrameCalculationService.new.call(self)
    stats_data = time_frames.map { |time_frame| { measurement_date: time_frame } }
    stats.create!(stats_data)
  end

  def target_date_must_be_in_future
    if target_date.present? && target_date <= Time.zone.today
      errors.add(:target_date, "must be in the future")
    end
  end
end
