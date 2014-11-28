class CreateParts < ActiveRecord::Migration
  def change
    create_table :parts do |t|
      t.integer :story_id, null: false
      t.string :name
      t.text :description
      t.timestamps
    end

    add_index :parts, :story_id
  end
end
