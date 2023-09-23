require 'rails_helper'

RSpec.describe Stat, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:goal) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of :measurement_date }
    it { is_expected.to validate_numericality_of(:measurement_value).is_greater_than_or_equal_to 0 }
  end

  describe 'scopes' do
    describe '.prior_to_date' do
      it 'returns goals with measurement_dates that are less than or equal to specified date' do
        user = create(:user)
        goal = create(:goal, :without_create_time_frame_stats_callback, user: user)
        time_frame = Time.current.beginning_of_day
        stat_due_yesterday = create(:stat, measurement_date: 1.day.before, goal: goal)
        stat_due_today = create(:stat, measurement_date: time_frame, goal: goal)
        create(:stat, measurement_date: 1.week.from_now, goal: goal)

        expect(Stat.prior_to_date(time_frame).ids).to match_array([stat_due_yesterday.id, stat_due_today.id])
      end
    end
  end

  describe '#measured?' do
    let(:user) { build(:user) }
    let(:goal) { build(:goal, user: user) }

    context 'when measurement_value is nil' do
      it 'returns false' do
        stat = build(:stat, goal: goal, measurement_value: nil)

        expect(stat.measured?).to be_falsy
      end
    end

    context 'when measurement_value is not nil' do
      it 'returns true' do
        stat = build(:stat, goal: goal, measurement_value: 1)

        expect(stat.measured?).to be_truthy
      end
    end
  end

  describe '#pending?' do
    let(:user) { build(:user) }
    let(:goal) { build(:goal, user: user) }

    context 'when measurement_value is nil' do
      it 'returns true' do
        stat = build(:stat, goal: goal, measurement_value: nil)

        expect(stat.pending?).to be_truthy
      end
    end

    context 'when measurement_value is not nil' do
      it 'returns false' do
        stat = build(:stat, goal: goal, measurement_value: 1)

        expect(stat.pending?).to be_falsy
      end
    end
  end
end
