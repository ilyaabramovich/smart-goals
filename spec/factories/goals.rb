FactoryBot.define do
  factory :goal do
    description { 'I want to read more' }
    target_value { 5 }
    target_date { 1.week.from_now }
  end
end
