class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.valid?
    if !@user.is_email?
      flash[:alert] = "Input a properly formatted email."
      redirect_back(fallback_location: root_path)
    elsif @user.errors.messages[:email].present?
      flash[:notice] = "That email " + @user.errors.messages[:email].first
      redirect_back(fallback_location: root_path)
    elsif @user.save
      flash[:notice] = "Signup successful. Welcome to the site!"
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      flash[:alert] = "There was a problem creating your account. Please try again."
      redirect_back(fallback_location: root_path)
    end
  end

  def new
  end

  def show
    @users = User.all
    @user = User.find(params[:id])
    @tag = Tag.new
    @photos = @user.photos.order(created_at: :desc)
    @comment = Comment.new
    @followed_users = @user.followed_users.includes(:photos)
    @followed_photos = Photo.joins(user: :followers)
                            .where(follows: { follower_id: current_user.id })
                            .order(created_at: :desc)
                            .distinct
                            .includes(:comments)
    
  end

  def emails
    @users = User.all
    @current_user_email = params[:current_user_email]
  end


  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :avatar)
  end

end