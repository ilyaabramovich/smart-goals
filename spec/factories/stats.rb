FactoryBot.define do
  factory :stat do
    measurement_date { Time.current }
  end

  trait :due do
    measurement_date { Time.current.yesterday }
  end
end
