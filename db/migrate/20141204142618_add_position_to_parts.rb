class AddPositionToParts < ActiveRecord::Migration
  def change
    add_column :parts, :position, :integer, null: false, default: 0
  end
end
