require 'rails_helper'

RSpec.describe Api::V1::GoalsController, type: :controller do
  let(:user) { create(:user) }

  before { sign_in_as user }

  describe 'GET index' do
    it 'returns correct status' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST create' do
    context 'when valid params are passed' do
      it 'returns correct status' do
        post :create, params: {
          goal: {
            description: 'I want to read more books',
            target_date: Time.current.tomorrow,
            target_value: 5
          }
        }
        expect(response).to have_http_status(:created)
      end

      it 'created a new goal' do
        expect do
          post :create, params: {
            goal: {
              description: 'I want to read more books',
              target_date: Time.current.tomorrow,
              target_value: 5
            }
          }
        end.to change(Goal, :count).by(1)
      end
    end
  end

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

    context 'when valid params are passed' do
      it 'returns correct status' do
        post :update, params: {
          id: goal.id,
          goal: {
            description: 'I want to run more',
            target_date: Time.current.tomorrow,
            target_value: 10
          }
        }

        expect(response).to have_http_status(:success)
      end

      it 'updates existing goal with provided values' do
        expect do
          post :update, params: {
            id: goal.id,
            goal: {
              description: 'I want to run more',
              target_date: Time.current.tomorrow,
              target_value: 10
            }
          }
          goal.reload
        end.to change(goal, :description)
          .from('I want to read more books')
          .to('I want to run more')
          .and change(goal, :target_value).from(5).to(10)
      end
    end
  end

  describe 'DELETE destroy' do
    let!(:goal) do
      create(
        :goal,
        description: 'I want to read more books',
        target_date: Time.current.tomorrow,
        target_value: 5,
        user: user
      )
    end

    it 'returns correct status' do
      post :destroy, params: {
        id: goal.id
      }

      expect(response).to have_http_status(:success)
    end

    it 'checks that a goal can be destroyed' do
      expect do
        post :destroy, params: {
          id: goal.id
        }
      end.to change(Goal, :count).from(1).to(0)
    end
  end
end
