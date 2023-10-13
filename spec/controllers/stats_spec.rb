require 'rails_helper'

RSpec.describe Api::V1::StatsController, type: :controller do
  let(:user) { create(:user) }

  before { sign_in_as user }

  describe 'POST update' do
    let(:goal) do
      create(
        :goal,
        description: 'I want to read more books',
        target_date: Time.current.tomorrow,
        target_value: 5,
        user: user
      )
    end

    let(:stat) { create(:stat, goal: goal, measurement_value: 0) }

    context 'when valid params are passed' do
      it 'returns correct status' do
        post :update, params: {
          id: stat.id,
          goal_id: goal.id,
          stat: {
            measurement_value: 3
          }
        }

        expect(response).to have_http_status(:success)
      end

      it 'updates existing goal with provided values' do
        expect do
          post :update, params: {
            id: stat.id,
            goal_id: goal.id,
            stat: {
              measurement_value: 3
            }
          }
          stat.reload
        end.to change(stat, :measurement_value).from(0).to(3)
      end
    end
  end
end
