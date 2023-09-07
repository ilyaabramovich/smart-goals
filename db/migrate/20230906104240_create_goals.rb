class CreateGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :goals do |t|
      t.datetime :target_date
      t.float :target_value
      t.text :description
      t.string :interval, default:'daily'
      t.float :current_value, default:0

      t.timestamps
    end
  end
end
