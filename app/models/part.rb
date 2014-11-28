class Part < ActiveRecord::Base
  belongs_to :story
  has_one :media, dependent: :destroy
end
