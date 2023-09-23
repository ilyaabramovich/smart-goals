user = User.create(username: 'test', password: 'test')
user.goals.create(
  description: 'I want to read more books',
  target_value: 10,
  target_date: 1.week.from_now,
  initial_value: 3,
  interval: 'daily'
)
