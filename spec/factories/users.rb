FactoryBot.define do
  factory :user do
    username
    password { 'password' }
  end
end
