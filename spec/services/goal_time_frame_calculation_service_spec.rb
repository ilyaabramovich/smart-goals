require 'rails_helper'

RSpec.describe GoalTimeFrameCalculationService, type: :service do
  subject(:time_frames) { described_class.new.call(goal) }

  let(:goal) { build_stubbed(:goal, target_date: target_date, interval: interval) }

  describe '#call' do
    context 'for daily interval' do
      let(:interval) { 'daily' }

      context 'when target date is the same as creation date' do
        let(:target_date) { Time.current }

        it { freeze_time { is_expected.to eq([goal.created_at.beginning_of_day]) } }
      end

      context 'when target date is in future' do
        let(:target_date) { 10.days.from_now }

        it { is_expected.to eq((0..10).map { |i| goal.created_at.beginning_of_day + i.days }) }
      end
    end

    context 'for weekly interval' do
      let(:interval) { 'weekly' }

      context 'when target date is in future' do
        let(:target_date) { 10.days.from_now }

        it { is_expected.to eq([goal.created_at.beginning_of_day, goal.created_at.beginning_of_day + 1.week]) }
      end
    end

    context 'for monthly interval' do
      let(:interval) { 'monthly' }
      let(:target_date) { 1.month.from_now }

      it { is_expected.to eq([goal.created_at.beginning_of_day, goal.created_at.beginning_of_day + 1.month]) }
    end
  end
end
