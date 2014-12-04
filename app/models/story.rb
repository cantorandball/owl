# == Schema Information
#
# Table name: stories
#
#  id          :integer          not null, primary key
#  owner_id    :integer          not null
#  name        :string(255)      not null
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#

class Story < ActiveRecord::Base
  belongs_to :owner, class_name: 'User'
  has_many :parts, -> { order 'position' }, dependent: :destroy

  validates :name, presence: true
end
