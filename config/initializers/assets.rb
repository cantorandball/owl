# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

Rails.application.config.assets.precompile << Proc.new do |path|
  if File.basename(path).starts_with?('_') || path !~ /\.(css|js|afm|eot|ttf|woff)\z/
    false
  else
    full_path          = Rails.application.assets.resolve(path).to_path
    app_assets_path    = Rails.root.join('app', 'assets').to_path
    vendor_assets_path = Rails.root.join('vendor', 'assets').to_path

    full_path.starts_with?(app_assets_path) || full_path.starts_with?(vendor_assets_path)
  end
end
