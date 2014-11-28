class Story < ActiveRecord::Base
  belongs_to :owner, class_name: 'User'
  has_many :parts, dependent: :destroy

  validates :name, presence: true
end
