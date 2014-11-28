class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.integer :owner_id, null: false
      t.string :name, null: false
      t.text :description

      t.timestamps
    end

    add_index :stories, :owner_id
  end
end
