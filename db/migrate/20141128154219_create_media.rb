class CreateMedia < ActiveRecord::Migration
  def change
    create_table :media do |t|
      t.integer :part_id
      t.string :type, null: false
      t.string :url
      t.text :content
      t.timestamps
    end

    add_index :media, :part_id, unique: true
  end
end
