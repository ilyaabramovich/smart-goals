require "test_helper"

class StatsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @stat = stats(:one)
  end

  test "should get index" do
    get stats_url, as: :json
    assert_response :success
  end

  test "should create stat" do
    assert_difference("Stat.count") do
      post stats_url, params: { stat: { goal_id: @stat.goal_id, measurement_date: @stat.measurement_date, measurement_value: @stat.measurement_value } }, as: :json
    end

    assert_response :created
  end

  test "should show stat" do
    get stat_url(@stat), as: :json
    assert_response :success
  end

  test "should update stat" do
    patch stat_url(@stat), params: { stat: { goal_id: @stat.goal_id, measurement_date: @stat.measurement_date, measurement_value: @stat.measurement_value } }, as: :json
    assert_response :success
  end

  test "should destroy stat" do
    assert_difference("Stat.count", -1) do
      delete stat_url(@stat), as: :json
    end

    assert_response :no_content
  end
end
