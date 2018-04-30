class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :token_uuid
      t.datetime :token_expiry

      t.timestamps
    end

    add_index :users, :username, unique: true
    add_index :users, :token_uuid, unique: true
  end
end
