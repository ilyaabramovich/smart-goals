require 'rails_helper'

RSpec.describe Goal do
  describe 'associations' do
    it { is_expected.to have_many(:stats).dependent(:destroy) }
    it { is_expected.to have_many(:due_stats) }
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of :description }
    it { is_expected.to validate_presence_of :target_date }
    it { is_expected.to validate_length_of(:description).is_at_least 15 }
    it { is_expected.to validate_numericality_of(:initial_value).is_greater_than_or_equal_to 0 }
    it { is_expected.to validate_numericality_of(:target_value).is_greater_than_or_equal_to 0 }
    it { is_expected.to validate_inclusion_of(:interval).in_array Goal::VALID_INTERVALS }

    describe '#target_date_must_not_be_in_the_past' do
      subject { build(:goal, user: build(:user), target_date: target_date, target_value: 5) }

      context 'when target_date is in the past' do
        let(:target_date) { 1.week.before }

        it { is_expected.not_to be_valid }
      end

      context 'when target_date is in the same day' do
        let(:target_date) { Time.current }

        it { freeze_time { is_expected.to be_valid } }
      end

      context 'when target_date is in future' do
        let(:target_date) { 1.week.from_now }

        it { is_expected.to be_valid }
      end
    end
  end

  describe '#due_stats' do
    it 'calculates due stats correctly' do
      user = create(:user)
      goal = create(:goal, :without_create_time_frame_stats_callback, user: user, target_value: 0)
      due_stat = create(:stat, :due, goal: goal)
      create(:stat, :upcoming, goal: goal)

      expect(goal.due_stats).to contain_exactly(due_stat)
    end
  end

  describe '#accumulated_value' do
    it 'computing sum correctly' do
      user = create(:user)
      goal = create(:goal, user: user, initial_value: 5)
      create(:stat, :due, goal: goal, measurement_value: 3)
      create(:stat, :due, goal: goal, measurement_value: 2)

      expect(goal.accumulated_value).to eq 10
    end

    it 'computing sum using just dew stats' do
      user = create(:user)
      goal = create(:goal, user: user)
      create(:stat, :due, goal: goal, measurement_value: 3)
      create(:stat, goal: goal, measurement_value: 2, measurement_date: 1.day.from_now)

      expect(goal.accumulated_value).to eq 3
    end

    context 'when stat has empty measurement_value' do
      it 'computing sum correctly' do
        user = create(:user)
        goal = create(:goal, user: user)
        create(:stat, :due, goal: goal, measurement_value: 3)
        create(:stat, :due, goal: goal, measurement_value: nil)

        expect(goal.accumulated_value).to eq 3
      end
    end
  end

  describe '#completion_percentage' do
    context 'when goal has zero as target value' do
      it 'returns 0' do
        user = create(:user)
        goal = create(:goal, user: user, target_value: 0)

        expect(goal.completion_percentage).to eq 0
      end
    end

    it 'is using stats accumulated value for computing' do
      user = create(:user)
      goal = create(:goal, user: user, initial_value: 5, target_value: 20)
      create(:stat, :due, goal: goal, measurement_value: 3)
      create(:stat, :due, goal: goal, measurement_value: 2)

      expect(goal.completion_percentage).to eq 50
    end

    it 'is not limited to 100' do
      user = create(:user)
      goal = create(:goal, user: user, initial_value: 5, target_value: 5)
      create(:stat, :due, goal: goal, measurement_value: 3)
      create(:stat, :due, goal: goal, measurement_value: 2)

      expect(goal.completion_percentage).to eq 200
    end

    it 'rounds calculation result' do
      user = create(:user)
      goal = create(:goal, user: user, initial_value: 1, target_value: 18)
      create(:stat, :due, goal: goal, measurement_value: 3)
      create(:stat, :due, goal: goal, measurement_value: 2)

      expect(goal.completion_percentage).to eq 33
    end
  end

  describe '#nearest_upcoming_stat_date' do
    it 'calculates measured stats correctly' do
      user = create(:user)
      goal = create(:goal, :without_create_time_frame_stats_callback, user: user, target_value: 0)
      nearest_upcoming_stat = create(:stat, measurement_date: Time.current.tomorrow, goal: goal)
      create(:stat, measurement_date: Time.current.next_week, goal: goal)

      expect(goal.nearest_upcoming_stat_date).to eq(nearest_upcoming_stat.measurement_date)
    end

    context 'when there are no upcoming stats' do
      it 'returns nil' do
        user = create(:user)
        goal = create(:goal, :without_create_time_frame_stats_callback, user: user, target_value: 0)
        create(:stat, :due, goal: goal, measurement_value: nil)

        expect(goal.nearest_upcoming_stat_date).to be_nil
      end
    end
  end

  describe '#days_to_complete' do
    context 'when the target date is in the future' do
      it 'calculates difference in days between goal target_date in future and current time' do
        user = create(:user)
        freeze_time do
          goal = build_stubbed(:goal, user: user, target_date: 4.days.from_now)
          expect(goal.days_to_complete).to eq(4)
        end
      end
    end

    context 'when the target date is in the past' do
      it 'calculates difference in days between goal target_date in past and current time' do
        user = create(:user)
        freeze_time do
          goal = build_stubbed(:goal, user: user, target_date: 4.days.before)
          expect(goal.days_to_complete).to eq(-4)
        end
      end
    end

    context 'when the target date in is the same day' do
      it 'returns zero' do
        user = create(:user)
        freeze_time do
          goal = build_stubbed(:goal, user: user, target_date: Time.current)
          expect(goal.days_to_complete).to eq(0)
        end
      end
    end
  end
end
