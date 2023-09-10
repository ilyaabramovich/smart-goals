class Goal < ApplicationRecord
  belongs_to :user
  has_many :stats, dependent: :destroy

  VALID_INTERVALS = ['daily', 'weekly', 'monthly']

  validates :description, presence: true, length: { minimum: 15 }
  validates :target_date, presence: true
  validates :target_value, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :current_value, numericality: { greater_than_or_equal_to: 0 }
  validates :interval, inclusion: { in: VALID_INTERVALS }
  validate :target_date_must_be_in_future

  after_create :create_time_frame_stats

  private

  def create_time_frame_stats
    time_frames = GoalTimeFrameCalculationService.new.call(self)
    stats_data_to_insert = time_frames.map { |time_frame| { measurement_date: time_frame, measurement_value: 0 } }
    stats.create!(stats_data_to_insert)
  end

  def target_date_must_be_in_future
    if target_date.present? && target_date <= Date.today
      errors.add(:target_date, "must be in the future")
    end
  end
end
