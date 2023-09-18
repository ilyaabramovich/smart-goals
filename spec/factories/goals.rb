FactoryBot.define do
  factory :goal do
    description { 'I want to read more' }
    target_value { 5 }
    target_date { 1.week.from_now }
  end

  trait :without_create_time_frame_stats_callback do
    after(:build) do
      Goal.skip_callback(:create, :after, :create_time_frame_stats)
    end

    to_create { |instance| instance.save!(validate: false) }

    after(:create) do
      Goal.set_callback(:create, :after, :create_time_frame_stats)
    end
  end
end
