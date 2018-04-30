class CreateMeals < ActiveRecord::Migration[5.1]
  def change
    create_table :meals do |t|
      t.text :description, null: false
      t.integer :calories, null: false
      t.references :user, null: false

      t.timestamps
    end
  end
end
