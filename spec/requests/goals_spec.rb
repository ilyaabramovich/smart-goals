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
end
