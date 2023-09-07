class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

  private

  def record_not_found(errors)
    render json: { error: errors.message }, status: :not_found
  end

  def invalid_record(invalid_record)
    render json: { error: invalid_record.record.errors }, status: :unprocessable_entity
  end
end
