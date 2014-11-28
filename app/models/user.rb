class User < ActiveRecord::Base
  devise :confirmable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :stories, dependent: :destroy, foreign_key: 'owner_id'
end
