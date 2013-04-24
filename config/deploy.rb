require 'mina/git'
require 'mina/bundler'
require 'mina/rails'

set :user, 'deployer'
set :domain, 'community.gotealeaf.com'
set :deploy_to, '/var/www/forum.gotealeaf.com'
set :repository, 'https://github.com/knwang/discourse'
set :app_port, '12345'
set :web_pid_file, "#{deploy_to}/shared/tmp/pids/#{rails_env}.pid"
set :sidekiq_pid_file, "#{deploy_to}/shared/tmp/pids/sidekiq.pid"
set :app_path, lambda { "#{deploy_to}/#{current_path}" }
set :shared_paths, ['config/database.yml', 'config/redis.yml', 'log', 'tmp']
set :rails_env, 'production'


task :deploy do
  to :prepare do
    invoke :stop
  end

  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:assets_precompile'
    invoke :'rails:db_migrate'

    to :launch do
      invoke :start
    end
  end
end

task :restart do
  invoke :stop
  invoke :start
end

task :setup => :environment do
  queue! %[mkdir -p "#{deploy_to}/shared/log"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/log"]
 
  queue! %[mkdir -p "#{deploy_to}/shared/tmp/pids"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/tmp"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/tmp/pids"]
 
  queue! %[mkdir -p "#{deploy_to}/shared/config"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/config"]
 
  queue! %[touch "#{deploy_to}/shared/config/database.yml"]
  queue!  %[echo "-----> Be sure to edit 'shared/config/database.yml'."]
  queue! 'sudo gem install bundler'
end

desc 'Starts the application'
task :start => :environment do
  queue "cd #{app_path}; sudo start discourse"
end

desc 'Stops the application'
task :stop => :environment do
  queue "cd #{app_path}; sudo stop discourse"
end
