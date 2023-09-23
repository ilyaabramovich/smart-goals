module SessionHelpers
  def sign_in
    sign_in_as create(:user)
  end

  def sign_in_as(user)
    session[:user_id] = user.id
    @current_user = user
  end

  def current_user
    @current_user
  end
end
