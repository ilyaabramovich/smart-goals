class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

  def require_user_logged_in!
    if current_user.nil?
      render json: { status: :error, error: 'You are not authorized to do that.' }, status: :unauthorized
    end
  end

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def record_not_found(errors)
    render json: { status: :error, error: errors.message }, status: :not_found
  end

  def invalid_record(error)
    render json: error.record, serializer: ErrorSerializer, status: :unprocessable_entity
  end
end
