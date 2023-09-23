class AddIndexUsernameOnUser < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    add_index :users, :username, algorithm: :concurrently, unique: true
  end
end
