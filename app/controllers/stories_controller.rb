class StoriesController < ApplicationController
  def index
    @stories = current_user.stories.order(updated_at: :desc)
  end

  def show
    @story    = Story.includes(parts: :media).find(params[:id])
    @new_part = Part.new(story: @story)
  end

  def new
    @story = Story.new
  end

  def create
    @story = current_user.stories.build(story_params)
    @story.save!
    redirect_to story_path(@story), notice: 'Great! Your story has been started.'

  rescue ActiveRecord::RecordInvalid
    render action: :new
  end

  def edit
    @story = find_story
  end

  def update
    @story = find_story
    @story.update_attributes!(story_params)
    redirect_to story_path(@story), notice: 'Story saved.'

  rescue ActiveRecord::RecordInvalid
    render action: :edit
  end

  private

  def find_story
    Story.find(params[:id])
  end

  def story_params
    params.require(:story).permit(:name, :description)
  end
end
