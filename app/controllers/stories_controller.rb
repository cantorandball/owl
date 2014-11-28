class StoriesController < ApplicationController
  def index
    @stories = current_user.stories.order(updated_at: :desc)
  end
end
