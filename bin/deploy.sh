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
  printf "You can display more information about usage with -h or --help.\n"
  exit 1
}

help() {
  cat <<EOF
# USAGE
sh deploy.sh [your-stack-name] [OPTIONS]

# DESCRIPTION
The version command allows Dotig to print its version and to check for a new release.

# OPTIONS
If [your-stack-name] is not provided:
-h, --help          Print this help.

If [your-stack-name] is provided:
--orchestrator string    Orchestrator to use (swarm|kubernetes|all)
--prune                  Prune services that are no longer referenced
--resolve-image string   Query the registry to resolve image digest and
                          supported platforms
                          ("always"|"changed"|"never") (default "always")
--with-registry-auth     Send registry authentication details to Swarm agents

# BUGS
If you find any bug, you can report it on https://github.com/ArmandPhilippot/apcom/issues.
EOF

  exit
}

deploy() {
  [ $# -eq 0 ] && error
  [ "$1" = "-h" ] || [ "$1" = "--help" ] && help

  _stack_name="$1"
  shift

  loadenvs
  docker stack deploy -c docker-compose.yml "$@" "$_stack_name"
}

deploy "$@"
