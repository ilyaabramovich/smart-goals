require 'rails_helper'

RSpec.describe Goal, type: :model do
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

    context 'when target_date is in the past' do
      let(:goal) { build(:goal, target_date: 1.week.before) }

      it { is_expected.to be_invalid }
    end
  end

  describe '#accumulated_value' do
    it 'is computed using goal initial value' do
      goal = build(:goal, initial_value: 5)

      expect(goal.accumulated_value).to eq 5
    end

    context 'when goal has stats' do
      it 'is computed using stats measurement values' do
        user = create(:user)
        goal = create(:goal, user: user)
        create(:stat, :due, goal: goal, measurement_value: 3)
        create(:stat, :due, goal: goal, measurement_value: 2)

        expect(goal.accumulated_value).to eq 5
      end
      
      it 'is using just dew stats for computing' do
        user = create(:user)
        goal = create(:goal, user: user)
        create(:stat, :due, goal: goal, measurement_value: 3)
        create(:stat, goal: goal, measurement_value: 2, measurement_date: 1.day.from_now)

        expect(goal.accumulated_value).to eq 3
      end

      context 'when stats has nil as measurement_value' do
        it 'is computed ignoring empty values' do
          user = create(:user)
          goal = create(:goal, user: user)
          create(:stat, :due, goal: goal, measurement_value: 3)
          create(:stat, :due, goal: goal, measurement_value: nil)

          expect(goal.accumulated_value).to eq 3
        end
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

      expect(goal.completion_percentage).to eq (50)
    end

    it 'is not limited to 100' do
      user = create(:user)
      goal = create(:goal, user: user, initial_value: 5, target_value: 5)
      create(:stat, :due, goal: goal, measurement_value: 3)
      create(:stat, :due, goal: goal, measurement_value: 2)

      expect(goal.completion_percentage).to eq (200)
    end

    it 'rounds calculation result' do
      user = create(:user)
      goal = create(:goal, user: user, initial_value: 1, target_value: 18)
      create(:stat, :due, goal: goal, measurement_value: 3)
      create(:stat, :due, goal: goal, measurement_value: 2)

      expect(goal.completion_percentage).to eq (33)
    end
  end
end
