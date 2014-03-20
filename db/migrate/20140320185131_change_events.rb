class ChangeEvents < ActiveRecord::Migration
  def change
    change_table :events do |t|
      t.date :date
    end
  end
end
