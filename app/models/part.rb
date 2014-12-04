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
#  position    :integer          default(0), not null
#

class Part < ActiveRecord::Base
  belongs_to :story
  has_one :media, dependent: :destroy
  accepts_nested_attributes_for :media, allow_destroy: true
  acts_as_taggable

  delegate :media_type, :media_url, to: :media

  before_create :set_position

  private

  def set_position
    self.position = (story.parts.maximum(:position) || 0) + 1
  end
end
