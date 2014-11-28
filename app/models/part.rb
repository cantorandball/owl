# == Schema Information
#
# Table name: parts
#
#  id          :integer          not null, primary key
#  story_id    :integer          not null
#  name        :string(255)
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#

class Part < ActiveRecord::Base
  belongs_to :story
  has_one :media, dependent: :destroy
end
