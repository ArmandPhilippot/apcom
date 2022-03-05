#!/usr/bin/env sh
#
# deploy.sh
#
# Deploy both services using Docker swarm.
#
# The registry domain is set in dotenv file but docker stack cannot read it.
# So a custom deploy script is required to load .env first.
# See: https://github.com/moby/moby/issues/29133

loadenvs() {
  set -a && . ./.env && set +a
}

error() {
  printf "Error: stack name not defined.\n"
  printf "Usage: sh deploy.sh your-stack-name [OPTIONS]\n"
  exit 1
}

deploy() {
  [ $# -eq 0 ] && error

  _stack_name="$1"
  shift

  loadenvs
  docker stack deploy -c docker-compose.yml "$@" "$_stack_name"
}

deploy "$@"
