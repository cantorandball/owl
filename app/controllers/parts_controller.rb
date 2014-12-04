class PartsController < ApplicationController
  def create
    story = Story.find(params[:story_id])
    story.parts.create!(part_params)

    render json: { success: true }

  rescue => e
    render json: { error: e.to_s }
  end

  private

  def part_params
    params.require(:part).permit(media: [:type, :url])
  end
end
