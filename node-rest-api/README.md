<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.architect.io/logo/horizontal-inverted.png">
    <source media="(prefers-color-scheme: light)" srcset="https://cdn.architect.io/logo/horizontal.png">
    <img width="320" alt="Architect Logo" src="https://cdn.architect.io/logo/horizontal.png">
  </picture>
</p>

<p align="center">
  A dynamic microservices framework for building, connecting, and deploying cloud-native applications.
</p>

---

<p align="center">
  <a href="//nodejs.org" target="blank"><img src="https://nodejs.org/static/images/logo.svg" width="320" alt="Node.js Logo" /></a>
</p>

<p align="center">
  Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
</p>

---

# Node.js Starter Project
It is extremely common to run a REST API with a backend database as a standalone service so that it can be consumed by
multiple, disparate applications.

In this example, you'll learn how to capture an API written in [Node.js](https://nodejs.org/en/) with a [Postgres](https://www.postgresql.org/)
database backend in an Architect Component to enable automated deployments, networking and network security for your application - wherever it gets deployed.

In the `architect.yml` file for this project, we describe this API as two deployable services. However, we also
leverage Architect's [service discovery](//docs.architect.io/components/service-discovery) features to populate environment
secrets by reference. This not only allows us to automatically connect the services to each other, but it also allows
Architect to build strict network policies to whitelist the traffic between these services. Now we won't have any work ahead
of us to promote this stack from local dev all the way through to production!

[Learn more about the architect.yml file](//docs.architect.io/configuration)

## Using the API
This API implements basic CRUD functionality for a simple `Items` schema consisting of a `name` and a `rating` between 1 and 5.
You could use it to gather data about anything you want to rate, from your favorite restaurants, movies, and more!

### The `Items` Schema:

```
  {
    "name": "string",
    "rating": "integer"
  }
```

The GET request returns the Items records in the following JSON payload:
```
 [
   {
    "name": "string",
    "rating": "integer",
    "created_at": "string",
    "updated_at": "string"
  }
 ]
```

## Running Locally
The `architect.yml` file is declarative, which allows the Architect Component it describes to be run in any environment,
from local development all the way to production. Follow these steps to clone this repository and run the application
locally.

Once the deployment has completed, you can reach your new service by going to https://api.localhost.architect.sh.

```sh
# Clone the repository and navigate to this directory
$ git clone git@github.com:architect-templates/node-rest-api.git
$ cd ./node-rest-api

# Deploy locally using the dev command
$ architect dev architect.yml
```

## Deploying to the Cloud

Want to try deploying this to a cloud environment? Architect's got you covered there, too! It only takes a minute to
[sign up for a free account](https://cloud.architect.io/signup).

You can then [deploy the component](https://docs.architect.io/getting-started/introduction/#deploy-to-the-cloud) by running the command below from the `node-rest-api` directory. Note that “example-environment” is the free environment that is created with your Architect account.

```sh
# Deploy to Architect Cloud
$ architect deploy architect.yml -e example-environment
```
