require 'rails_helper'

RSpec.describe Api::V1::GoalsController, type: :controller do
  let(:user) { create(:user) }

  before { sign_in_as user }

  describe 'GET index' do
    it 'succeeds' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST create' do
    context 'when valid params are passed' do
      it 'succeeds' do
        expect do
          post :create, params: {
            goal: {
              description: 'I want to read more books',
              target_date: Time.current.tomorrow,
              target_value: 5
            }
          }
        end.to change(Goal, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end
  end
end
