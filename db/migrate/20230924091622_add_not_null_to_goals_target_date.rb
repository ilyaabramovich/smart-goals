class AddNotNullToGoalsTargetDate < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    change_column_null :goals, :target_date, true
  end
end
