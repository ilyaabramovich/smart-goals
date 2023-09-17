require 'rails_helper'

RSpec.describe Stat, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:goal) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of :measurement_date }
    it { is_expected.to validate_numericality_of(:measurement_value).is_greater_than_or_equal_to 0 }
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
