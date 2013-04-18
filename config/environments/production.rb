Discourse::Application.configure do
  config.cache_classes = true

  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Disable Rails's static asset server (Apache or nginx will already do this)
  config.serve_static_assets = false

  config.assets.compress = true
  config.assets.compile = true
  config.assets.digest = true

  # Specifies the header that your server uses for sending files
  config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect' # for nginx

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation can not be found)
  config.i18n.fallbacks = true


  config.action_mailer.smtp_settings = {
    :address              => ENV['MAILGUN_SMTP_SERVER'],
    :port                 => ENV['MAILGUN_SMTP_PORT'],
    :domain               => 'gotealeaf.com',
    :user_name            => ENV['MAILGUN_SMTP_LOGIN'],
    :password             => ENV['MAILGUN_SMTP_PASSWORD'],
    :authentication       => :plain
  }

  config.action_mailer.delivery_method = :smtp

  # Send deprecation notices to registered listeners
  config.active_support.deprecation = :notify

  # this will cause all handlebars templates to be pre-compiles, making your page faster
  config.handlebars.precompile = true

  # this setting enables rack_cache so it caches various requests in redis
  config.enable_rack_cache = true

  # allows admins to use mini profiler
  config.enable_mini_profiler = true

  # Discourse strongly recommend you use a CDN.
  # For origin pull cdns all you need to do is register an account and configure
  # config.action_controller.asset_host = "http://YOUR_CDN_HERE"

end
