sudo sysctl -w vm.max_map_count=262144 &&
docker run --rm -d \
      --name=crate01 \
      --net=crate \
      -p 4201:4200 \
      --env CRATE_HEAP_SIZE=2g \
      crate -Chttp.cors.enabled=true \
            -Chttp.cors.allow-origin=http://localhost:3000
