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
        time = Time.current.beginning_of_day
        stat_due_yesterday = create(:stat, measurement_date: 1.day.before, goal: goal)
        stat_due_today = create(:stat, measurement_date: time, goal: goal)
        create(:stat, measurement_date: 1.week.from_now, goal: goal)

        expect(described_class.prior_to_date(time).ids).to contain_exactly(stat_due_yesterday.id, stat_due_today.id)
      end
    end
  end

  describe '#measured?' do
    let(:user) { build(:user) }
    let(:goal) { build(:goal, user: user) }

    context 'when measurement_value is nil' do
      it 'returns false' do
        stat = build(:stat, goal: goal, measurement_value: nil)

        expect(stat.measured?).to be(false)
      end
    end

    context 'when measurement_value is not nil' do
      it 'returns true' do
        stat = build(:stat, goal: goal, measurement_value: 1)

        expect(stat.measured?).to be(true)
      end
    end
  end

  describe '#pending?' do
    let(:user) { build(:user) }
    let(:goal) { build(:goal, user: user) }

    context 'when measurement_value is nil' do
      it 'returns true' do
        stat = build(:stat, goal: goal, measurement_value: nil)

        expect(stat.pending?).to be(true)
      end
    end

    context 'when measurement_value is not nil' do
      it 'returns false' do
        stat = build(:stat, goal: goal, measurement_value: 1)

        expect(stat.pending?).to be(false)
      end
    end
  end

  describe '#upcoming?' do
    let(:user) { build(:user) }
    let(:goal) { build(:goal, user: user) }

    context 'when measurement_date is in future' do
      it 'returns true' do
        stat = build(:stat, goal: goal, measurement_date: Time.current.tomorrow)

        expect(stat.upcoming?).to be(true)
      end
    end

    context 'when measurement_date is in past' do
      it 'returns true' do
        stat = build(:stat, goal: goal, measurement_date: Time.current.yesterday)

        expect(stat.upcoming?).to be(false)
      end
    end

    context 'when measurement_date is today' do
      it 'returns true' do
        stat = build(:stat, goal: goal, measurement_date: Time.zone.today)

        expect(stat.upcoming?).to be(false)
      end
    end
  end

  describe '#due?' do
    let(:user) { build(:user) }
    let(:goal) { build(:goal, user: user) }

    context 'when measurement_date is in future' do
      it 'returns true' do
        stat = build(:stat, goal: goal, measurement_date: Time.current.tomorrow)

        expect(stat.due?).to be(false)
      end
    end

    context 'when measurement_date is in past' do
      it 'returns true' do
        stat = build(:stat, goal: goal, measurement_date: Time.current.yesterday)

        expect(stat.due?).to be(true)
      end
    end

    context 'when measurement_date is today' do
      it 'returns true' do
        stat = build(:stat, goal: goal, measurement_date: Time.zone.today)

        expect(stat.due?).to be(true)
      end
    end
  end
end
