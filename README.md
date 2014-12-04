# Owl

Prototype front-end for Cantor & Ball Personal History project.

Requirements:

  * Ruby version 2.1.5.
  * PostgreSQL

## Running

To run please execute the following from within the project folder:

```sh
$ sudo gem install rails
$ bundle install --path vendor/bundle
$ bundle exec rake db:create
$ bundle exec rake db:migrate
$ bundle exec unicorn
```

## Deployment

On a new Ubuntu server, run the following as `root`:

```sh
$ sudo apt-get install libpq-dev nodejs
$ adduser owl
$ su - owl
$ curl https://raw.githubusercontent.com/fesplugas/rbenv-installer/master/bin/rbenv-installer | bash
$ exit
$ su - owl
$ rbenv install 2.1.5
$ rbenv local 2.1.5
$ git clone https://github.com/cantorandball/owl.git
$ cd owl
$ cp config/database.yml.sample config/database.yml
$ exit
$ su - postgres
$ createuser owl -P
$ psql -c 'alter user owl  with createdb' postgres
$ exit
$ su - owl
$ cd owl
$ gem install bundler
$ bundle install
$ OWL_DATABASE_PASSWORD=<password> RAILS_ENV="production" bundle exec rake db:create
$ OWL_DATABASE_PASSWORD=<password> SECRET_KEY_BASE=<key> RAILS_ENV="production" bundle exec rake db:migrate
```

Now create a  `/etc/init/owl.conf` with the following contents:

```
description "Owl"

start on runlevel [2345]
stop on runlevel [016]

console log

setuid owl
setgid owl

chdir /home/owl/owl

env OWL_DATABASE_PASSWORD=<password>
env SECRET_KEY_BASE=<key>

exec /home/owl/.rbenv/shims/bundle exec unicorn -D -l 0.0.0.0:8081 -E production
```

hen add the following configuration file to the /etc/nginx/sites-enabled/ph.cantorandball.com.conf folder:

```
server {
  listen 80;
  server_name ph.cantorandball.com;

  location / {
    proxy_pass http://127.0.0.1:8081;
    proxy_set_header Host $http_host;
  }
}
```