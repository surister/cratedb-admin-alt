# CrateDB Alt panel - 0.0.7

This is an Admin panel that intends to support all the features from CrateDB 5.4+ and add extra
functionality to make the lives of CrateDB users easy.

## Features:

- Statistics: View your Node load, queries per second and query duration in live charts.
- Health: View your node health and node checks live.
- Console: Modern console with CrateDB syntax highlighting, code completion, different console tabs,
  cancel current running query, query history, auto format, live update.
- Tables: View the system and your user tables and views information, size, records, view schema,
  show create, drop table, data sampling, table querying and table creation from the UI.
- Cluster: View your cluster live information such as version, os info, loads, heap usage, disk
  usage and live view of the current running jobs.
- Users: View current existing users, users permissions, add new permission, revoke permissions,
  drop user, create user, alter user.
- Logs: Actions from the Admin UI (Example: drop table, create user, drop user..) are logged and can
  be filtered depending on the severity.

![](https://raw.githubusercontent.com/surister/crate-admin-alt/master/screenshots/overview.png)
![](https://raw.githubusercontent.com/surister/crate-admin-alt/master/screenshots/console.png)
![](https://raw.githubusercontent.com/surister/crate-admin-alt/master/screenshots/tables.png)
![](https://raw.githubusercontent.com/surister/crate-admin-alt/master/screenshots/cluster.png)
You can see more screenshots in `/screenshots`

## Local project setup

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
docker run -p 3000:80 surister/cratedbaltadmin:0.0.7
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

Bear in mind that if you run the admin panel from another port, it will have to match
the `http.cors.allow-origin` setting.

## Limitations

While it is my intention to fully support everything, it's a daunting task, it is a very complex
product, and it will take some time.

An example of a current limitation (As of Nov 9 2023), when creating tables in the UI, certain
features are yet not supported, such as
Table constraints, Column constraints, Column renaming, Storage options, Generation expressions...

As of the writing of this, these limitations exists only on table creation.

Other features such as Repositories, Blobs, Node logs, Support for notebooks are not yet implemented
but will eventually be, if you want a feature or have some ideas, please feel free to open an issue.

## Contributing

This project is currently being developed by me, but it's open for contributions, also if you
have some ideas, feature request or happen to find a bug, please let me know in an issue, so it can be addressed.

## Notice

Copyright 2023 surister

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the “Software”), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, IN INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
