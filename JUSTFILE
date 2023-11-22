default:
  @just --list
mprocs:
    mprocs -c mprocs.yml
restart:
    docker compose down && echo 'Removing fm dirs' && sudo rm -rf fm_* && echo 'Done' && mprocs -c mprocs.yml
gate:
    yarn nix-gateway
guard:
    yarn nix-guardian
kill-ui: # kills all ui processes, sometimes they get stuck
    for port in {3000..3005}; do lsof -i :$port | awk 'NR!=1 {print $2}' | xargs -r kill -9; done
