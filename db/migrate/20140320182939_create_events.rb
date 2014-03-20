class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.date :date
      t.string :title
      t.text :notes
      t.integer :calendar_id

      t.timestamps
    end
  end
end
