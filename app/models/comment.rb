class Comment < ActiveRecord::Base
  belongs_to :photo
  belongs_to :user

  validates :text , presence: true
end
