module StoriesHelper
  def render_part(part)
    render partial: "part_#{part.media_type}", object: part, as: :part
  end
end
