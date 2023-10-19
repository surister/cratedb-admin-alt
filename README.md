# CrateDB Alt panel

### Current version 0.0.2

![](https://raw.githubusercontent.com/surister/crate-admin-alt/master/screenshots/console.png)
![](https://raw.githubusercontent.com/surister/crate-admin-alt/master/screenshots/tables.png)

You can see more screenshots in `/screenshots`
## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install

# bun
bun install
```

## Run with docker
```shell
docker run -p 3000:80 cratedbaltadmin:latest
```

## Solving the cors 'issue'
In order to be able to query CrateDB's API you will need to start the cluster with these options:
```
-Chttp.cors.enabled=true
-Chttp.cors.allow-origin=http://localhost:3000
```

https://cratedb.com/docs/crate/reference/en/5.4/config/node.html#cross-origin-resource-sharing-cors

An example in docker would be:

```shell
docker run --rm -d \
      --name=crate01 \
      --net=crate \
      -p 4200:4200 \
      --env CRATE_HEAP_SIZE=2g \
      crate -Cnetwork.host=_site_ \
            -Cnode.name=crate01 \
            -Chttp.cors.enabled=true \
            -Chttp.cors.allow-origin=http://localhost:3000
```

Bear in mind that if you run the admin panel from another port, it will have to match the `http.cors.allow-origin` setting.