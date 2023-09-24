class AddGoalsDescriptionConstraint < ActiveRecord::Migration[7.0]
  def change
    add_check_constraint :goals, 'char_length(description) >= 15', name: 'goals_description_length_check'
  end
end
