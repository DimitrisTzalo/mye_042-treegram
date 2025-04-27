class PhotosController < ApplicationController
  def create
    @user = User.find(params[:user_id])
    if params[:photo].nil?
      flash[:alert] = "Please upload a photo"
      redirect_back(fallback_location: user_path(@user))
    else
      @photo = Photo.create(photo_params)
      @photo.user_id = @user.id
      @photo.save
      flash[:notice] = "Successfully uploaded a photo"
      redirect_to user_path(@user)
    end
  end

  def show
    @photo = Photo.find(params[:id])
  end

  def new
    @user = User.find(params[:user_id])
    @photo = Photo.create()
  end
  
  def destroy
    @photo = Photo.find(params[:id])
    if @photo.user == current_user
      @photo.destroy
      flash[:notice] = "Photo and its associated comments and tags deleted successfully."
    else
      flash[:alert] = "You can only delete your own photos."
    end
    redirect_to :back
  end


  def comments
    @photo = Photo.find(params[:id])
    @comments = @photo.comments.includes(:user)
    render json: 'users/comments', locals: { photo: @photo, comments: @comments } 
  end

 

  private

  def photo_params
    params.require(:photo).permit(:image, :title)
  end
end