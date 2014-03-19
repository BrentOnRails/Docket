class CreateCalendars < ActiveRecord::Migration
  def change
    create_table :calendars do |t|
      t.string :title
      t.integer :user_id

      t.timestamps
    end
  end
end
