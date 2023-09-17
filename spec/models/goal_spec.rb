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
end
