require 'rails_helper'

RSpec.describe GoalTimeFrameCalculationService, type: :service do
  let(:service) { described_class.new }

  describe '#call' do
    it 'returns time frames as an array of times' do
      goal = build_stubbed(:goal, target_date: 10.days.from_now, interval: 'daily')
      time_frames = service.call(goal)

      expect(time_frames).to be_an(Array)
      expect(time_frames.all? { |time| time.is_a?(Time) }).to be true
    end

    it 'calculates time frames correctly' do
      goal = build_stubbed(:goal, target_date: 10.days.from_now, interval: 'daily')
      time_frames = service.call(goal)

      expect(time_frames).to eq((0..10).map { |i| goal.created_at.beginning_of_day + i.days })
    end

    it 'calculates time frames for daily interval' do
      goal = build_stubbed(:goal, target_date: 10.days.from_now, interval: 'daily')
      time_frames = service.call(goal)

      expect(time_frames.count).to eq(11)
    end

    it 'calculates time frames for weekly interval' do
      goal = build_stubbed(:goal, target_date: 10.days.from_now, interval: 'weekly')
      time_frames = service.call(goal)

      expect(time_frames.count).to eq(2)
    end

    it 'calculates time frames for monthly interval' do
      goal = build_stubbed(:goal, target_date: 1.month.from_now, interval: 'monthly')
      time_frames = service.call(goal)

      expect(time_frames.count).to eq(2)
    end
  end
end
