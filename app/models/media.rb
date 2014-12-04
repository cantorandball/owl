# == Schema Information
#
# Table name: media
#
#  id         :integer          not null, primary key
#  part_id    :integer
#  type       :string(255)      not null
#  url        :string(255)
#  content    :text
#  created_at :datetime
#  updated_at :datetime
#  attachment :string(255)
#

class Media < ActiveRecord::Base
  belongs_to :part

  def media_type
    self.class.name.sub(/Media$/, '').underscore
  end

  def media_url
    if attachment
      return attachment.url
    end

    url
  end
end
