class CommentsController < ApplicationController
  
  def create
    @photo = Photo.find(params[:comment][:photo_id])
    @comment = @photo.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      render json: {
        html: render_to_string(partial: 'users/comments', locals: { photo: @photo, comments: @photo.comments.includes(:user) }, formats: [:html]),
        text: @comment.text
      }, status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def destroy
    @comment = Comment.find(params[:id])
    @photo = @comment.photo
    if @comment.user == current_user || @photo.user == current_user
      @comment.destroy
      respond_to do |format|
        format.html { redirect_to request.referrer, notice: 'Comment was successfully deleted.' }
        format.json { head :no_content }
      end
    end
  end


  private

  def comment_params
    params.require(:comment).permit(:text, :photo_id)
  end
end