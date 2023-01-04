# Optional services

The best way to handle optional services (e.g. services that exist in some environments but not in others) is to put them into their own components. This repository contains two of Architect's starter projects: a [react frontend](https://github.com/architect-templates/react) and a [node backend](https://github.com/architect-templates/node-rest-api).

The backend component contains only the information needed for itself to run, which in this case includes the service itself and a postgres database. The frontend component however contains both its runtime and a reference to the node-rest-api component via [dependencies](https://docs.architect.io/components/dependencies/). This means that whenever the frontend is deployed to an environment, it will automatically deploy the node-rest-api backend or connect to an existing instance already in the environment.

## Local development

### Running just the backend

```sh
$ architect dev ./node-rest-api
```

### Running the frontend as well as the backend

```sh
# This only has to be done once on your machine
$ architect link ./node-rest-api
```

```sh
# This will automatically deploy the node-rest-api since its cited as a dependency
$ architect dev ./react
```

## Remote deployments

### Deploying just the backend

```sh
$ architect env:create <my-environment> --account <my-account>
$ architect deploy ./node-rest-api --account <my-account> --environment <my-environment>
```

### Deploying the frontend as well as the backend

```sh
$ architect env:create <my-environment> --account <my-account>
$ architect deploy ./react --account <my-account> --environment <my-environment>
```

### Deploying one and then the other

When running the second deploy command, Architect is smart enough to determine that the dependency already exists. The deployment will connect to the existing instance instead of deploying a new one.

```sh
$ architect env:create <my-environment> --account <my-account>
$ architect deploy ./node-rest-api --account <my-account> --environment <my-environment>
$ architect deploy ./react --account <my-account> --environment <my-environment>
```