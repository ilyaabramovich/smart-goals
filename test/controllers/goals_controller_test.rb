require "test_helper"

class GoalsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @goal = goals(:one)
  end

  test "should get index" do
    get goals_url, as: :json
    assert_response :success
  end

  test "should create goal" do
    assert_difference("Goal.count") do
      post goals_url, params: { goal: { initial_value: @goal.initial_value, description: @goal.description, interval: @goal.interval, target_date: @goal.target_date, target_value: @goal.target_value } }, as: :json
    end

    assert_response :created
  end

  test "should show goal" do
    get goal_url(@goal), as: :json
    assert_response :success
  end

  test "should update goal" do
    patch goal_url(@goal), params: { goal: { initial_value: @goal.initial_value, description: @goal.description, interval: @goal.interval, target_date: @goal.target_date, target_value: @goal.target_value } }, as: :json
    assert_response :success
  end

  test "should destroy goal" do
    assert_difference("Goal.count", -1) do
      delete goal_url(@goal), as: :json
    end

    assert_response :no_content
  end
end
