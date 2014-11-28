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
#

class VideoMedia < Media
end
