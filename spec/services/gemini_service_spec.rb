# frozen_string_literal: true

require 'rails_helper'
require 'webmock/rspec'

RSpec.describe GeminiService do
  subject(:service) { described_class.new }

  let(:api_url_pattern) { /generativelanguage\.googleapis\.com/ }

  describe '#call' do
    context 'when Gemini returns a function call with all required fields' do
      before do
        stub_request(:post, api_url_pattern)
          .to_return(
            status: 200,
            headers: { 'Content-Type' => 'application/json' },
            body: {
              candidates: [{
                content: {
                  parts: [{
                    functionCall: {
                      name: 'create_goal',
                      args: {
                        description: 'Run 500km total by end of year',
                        target_value: 500,
                        target_date: '2026-12-31',
                        interval: 'weekly',
                        initial_value: 0
                      }
                    }
                  }]
                }
              }]
            }.to_json
          )
      end

      it 'returns extracted params without error' do
        result = service.call('Run 500km total by end of year, tracking weekly')

        expect(result[:error]).to be_nil
        expect(result[:params]).to include(
          'description' => 'Run 500km total by end of year',
          'target_value' => 500,
          'target_date' => '2026-12-31',
          'interval' => 'weekly'
        )
      end
    end

    context 'when Gemini returns text because the prompt is too vague' do
      before do
        stub_request(:post, api_url_pattern)
          .to_return(
            status: 200,
            headers: { 'Content-Type' => 'application/json' },
            body: {
              candidates: [{
                content: {
                  parts: [{
                    text: 'Your goal is too vague. Please specify a numeric target and a deadline.'
                  }]
                }
              }]
            }.to_json
          )
      end

      it 'returns an error and no params' do
        result = service.call('I want to be healthier')

        expect(result[:params]).to be_nil
        expect(result[:error]).to eq('Your goal is too vague. Please specify a numeric target and a deadline.')
      end
    end
  end
end
