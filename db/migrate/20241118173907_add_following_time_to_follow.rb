class AddFollowingTimeToFollow < ActiveRecord::Migration
  def change
    add_column :follows, :following_at, :datetime
  end
end
