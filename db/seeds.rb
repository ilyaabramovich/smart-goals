  user = User.create(username: 'test', password: 'test', password_confirmation: 'test')
  user.goals.create(description: 'I want to read more books', target_value: 10, initial_value: 3, interval: 'daily')
