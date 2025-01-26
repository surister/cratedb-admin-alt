![Docker Image Version](https://img.shields.io/docker/v/surister/cratedbaltadmin)
![Docker Image Size](https://img.shields.io/docker/image-size/surister/cratedbaltadmin)

# CrateDB Alt panel - 0.3.2

This is an Admin panel that intends to support all the features from CrateDB 5.4+ and add extra
functionality to make the lives of CrateDB users easy.

## Why this tool?

On-prem CrateDB currently ships with the [admin-ui](https://github.com/crate/crate-admin), it is no
longer developed, it is quite dated and lacks certain modern features, it still works fine for
querying though.

Cloud users have their own ui in https://console.cratedb.cloud/.

This admin tool is intended for on-prem users that want to have a modern,
updated and feature rich solution.

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
- Repositories & Snapshots: Create, delete and admin your repositories, create, delete and restore
  the snapshots.
- Notebooks: Full-on notebooks with Markdown support, directly connected to your CrateDB instance
  and automatic save-on disk (local storage)

![](https://raw.githubusercontent.com/surister/crate-admin-alt/master/screenshots/overview.png)
![](https://raw.githubusercontent.com/surister/crate-admin-alt/master/screenshots/console.png)
![](https://raw.githubusercontent.com/surister/crate-admin-alt/master/screenshots/tables.png)
![](https://raw.githubusercontent.com/surister/crate-admin-alt/master/screenshots/cluster_jobs.png)
![](https://raw.githubusercontent.com/surister/crate-admin-alt/master/screenshots/notebooks.png)

You can see more screenshots in `/screenshots`

## Getting started

The easiest way of getting started is to run a docker container:

```shell
docker run -p 9000:80 surister/cratedbaltadmin:latest
```

We also upload different versions, more
in https://hub.docker.com/repository/docker/surister/cratedbaltadmin/general

## Which version should I pick for my CrateDB instance?

If you are running a CrateDB version >=5.4, any version of the admin UI should work, bear in mind
that some features might not be available as they are directly linked to the running CrateDB
version, you should upgrade your CrateDB cluster.

If you are running <5.4, the admin ui might not fully work;
I would only rely on basic console querying, since many features depend on CrateDB >2-3 version;
again, you shouldn't be running such an old version, upgrade your CrateDB cluster!

## Solving the CORS 'issue'

When running CrateDB, please make sure to enable *Cross-Origin
Resource Sharing* in your [CrateDB configuration], like:
```
-Chttp.cors.enabled=true
-Chttp.cors.allow-origin=http://localhost:9000
```

When invoking cratedb-admin-alt, you need to supply the `base_uri` parameter,
like this:
```
http://localhost:9000/?base_uri=http://localhost:4200
```

An incantation example using Docker would be:
```shell
docker run --rm -d \
      --name=crate01 \
      --net=crate \
      -p 4200:4200 \
      --env CRATE_HEAP_SIZE=1g \
      crate -Cnetwork.host=_site_ \
            -Cnode.name=crate01 \
            -Chttp.cors.enabled=true \
            -Chttp.cors.allow-origin=http://localhost:9000
```

Bear in mind that if you run the admin panel from another port, it will have to match
the `http.cors.allow-origin` setting.

## Developer setup

Clone the repo:

`git clone git@github.com:surister/cratedb-admin-alt.git`

Install dependencies:

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

## CrateDB versions.

This panel supports v5.4.3 as the base version, any new version will be added afterward.

For maximum compatibility, any new version feature will be added with a versioned Component, meaning
that those features will only be unlocked if your connected CrateDB cluster supports it.

## Known limitations

While it is my intention to fully support everything, it's a daunting task, it is a very complex
product, and it will take some time.

The following parameters are not supported in the Create table UI:

- routing.allocation.include.{attribute}
- routing.allocation.require.{attribute}
- routing.allocation.exclude.{attribute}

We do not support restoring a snapshot from a partition.
`PARTITION (partition_column = value [, ...])] [, ...]`

## Contributing

This project is currently being developed by me, but it's open for contributions, also if you
have some ideas, feature request or happen to find a bug, please let me know in an issue, so it can
be addressed.


[CrateDB configuration]: https://cratedb.com/docs/crate/reference/en/latest/config/node.html#cross-origin-resource-sharing-cors
