# frozen_string_literal: true

class GeminiService < BaseService
  BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent"

  def call(prompt)
    @prompt = prompt
    response = connection.post("", request_body.to_json)
    parse_response(response)
  rescue Faraday::Error => e
    { error: "Failed to reach AI service: #{e.message}" }
  end

  private

  def connection
    Faraday.new(url: BASE_URL) do |f|
      f.headers["Content-Type"] = "application/json"
      f.headers["X-goog-api-key"] = ENV["GEMINI_API_KEY"]
      f.response :logger, Rails.logger, headers: false, bodies: true
    end
  end

  def request_body
    {
      system_instruction: { parts: [{ text: system_prompt }] },
      contents: [{ role: "user", parts: [{ text: @prompt }] }],
      tools: [{ function_declarations: [tool_definition] }],
      tool_config: { function_calling_config: { mode: "AUTO" } }
    }
  end

  def system_prompt
    <<~PROMPT.strip
      You are a SMART goal assistant. Extract structured goal data from the user's description and call the create_goal tool.
      Today's date is #{Date.today.iso8601}. Resolve any relative date expressions (e.g. "end of the month", "next week", "in 3 months") into an absolute ISO 8601 date (YYYY-MM-DD). The target_date must be in the future.
      The interval must be one of: daily, weekly, monthly. Choose the most appropriate one based on the description.
      The initial_value defaults to 0 if not specified.
      Only call create_goal if you can confidently extract all required fields.
      If the prompt is too vague, respond with a brief message explaining what information is missing.
    PROMPT
  end

  def tool_definition
    {
      name: "create_goal",
      description: "Create a SMART goal with the extracted parameters.",
      parameters: {
        type: "OBJECT",
        properties: {
          description: {
            type: "STRING",
            description: "A clear description of the goal (at least 15 characters)."
          },
          target_value: {
            type: "NUMBER",
            description: "The numeric target to reach (e.g. 500 for 500km)."
          },
          target_date: {
            type: "STRING",
            description: "The target completion date in ISO 8601 format (YYYY-MM-DD), must be in the future."
          },
          interval: {
            type: "STRING",
            description: "How often progress is tracked: daily, weekly, or monthly."
          },
          initial_value: {
            type: "NUMBER",
            description: "Starting value (default 0)."
          }
        },
        required: ["description", "target_value", "target_date", "interval"]
      }
    }
  end

  def parse_response(response)
    body = JSON.parse(response.body)
    part = body.dig("candidates", 0, "content", "parts", 0)

    if part&.key?("functionCall") && part["functionCall"]["name"] == "create_goal"
      args = part["functionCall"]["args"]
      { params: args.slice("description", "target_value", "target_date", "interval", "initial_value") }
    else
      error_text = part&.dig("text") || "Could not extract goal details from your description."
      { error: error_text }
    end
  rescue JSON::ParserError
    { error: "Unexpected response from AI service." }
  end
end
