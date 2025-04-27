class FollowsController < ApplicationController
  def create
    user = User.find(params[:followed_id])
    Follow.create(follower_id: current_user.id, followed_id: user.id)
    flash[:notice] = "You are now following #{user.email}"
    redirect_to :back
  end

  def destroy
    follow = Follow.find(params[:id])
    follow.destroy
    flash[:notice] = "You have unfollowed #{follow.followed.email}"
    redirect_to :back
  end
end