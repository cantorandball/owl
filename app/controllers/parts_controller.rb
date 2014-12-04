class PartsController < ApplicationController
  def create
    story = Story.find(params[:story_id])
    story.parts.create!(part_params)

    respond_to do |format|
      format.json do
        render json: { success: true }
      end

      format.html do
        redirect_to story_path(story), notice: 'Part added'
      end
    end

  rescue => e
    render json: { error: e.to_s }
  end

  private

  def part_params
    params.require(:part).permit(media_attributes: [:attachment, :content, :type, :url])
  end
end
