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
  <a href="//react.org" target="blank"><img src="https://create-react-app.dev/img/logo.svg" width="320" alt="React Logo" /></a>
</p>

<p align="center">
  A JavaScript library for building user interfaces.
</p>

---

# React Starter Project
[React](https://reactjs.org/) is a popular JavaScript framework for building frontend user interfaces for web applications. This project is an example application bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and packaged into an Architect Component.

This starter application will show how easy it is to deploy an application both locally and in a remote environment.

## Requirements
Before you can run this example application, you will need to install the [Architect CLI](https://github.com/architect-team/architect-cli).

## Running Locally
The `architect.yml` file is declarative, allowing the Architect Component it describes to be run in any environment, from local development to production.

Once the deployment has completed, you can reach your new service by going to https://app.localhost.architect.sh.

```sh
# Clone the repository and navigate to this directory
$ git clone git@github.com:architect-templates/react.git
$ cd ./react

# Deploy locally using the dev command
$ architect dev architect.yml
```
## Deploying to the Cloud

Want to try deploying this to a cloud environment? Architect's got you covered there, too! It only takes a minute to
[sign up for a free account](https://cloud.architect.io/signup).

You can then [deploy the application](https://docs.architect.io/getting-started/introduction/#deploy-to-the-cloud) by running the command below. Note that “example-environment” is the free environment that is created with your Architect account.

```sh
# Register and tag the node-rest-api component with Architect Cloud's component registry
$ cd ../node-rest-api
$ architect register architect.yml

# Deploy to Architect Cloud
$ cd ../react
$ architect deploy architect.yml -e example-environment
```

---
# Additional Learning
After you feel comfortable deploying with Architect, check out the powerful features we've added into this component!

Additional features within this component:
* [Adding a dependency](#adding-a-dependency)

# Adding a dependency
Using a microservice framework allows you to decouple an application and alleviate many of the problems that come with a monolithic architecture. Architect provides first class support for microservce architecture through the use of dependencies.

This example application is configured to connect to the [Node.js Starter Project](https://github.com/architect-templates/node-rest-api) REST API for its backend as a [dependency](https://docs.architect.io/components/dependencies/), but you can modify the `architect.yml` file to connect to any REST API backend that has been registered to your account as an Architect Component.

We also leverage Architect's [service referencing syntax](https://docs.architect.io/components/service-discovery/#service-referencing-syntax) to populate network information, which allows Architect to seamlessly promote this stack from local dev all the way through to production!

## Registering Dependencies
Since this application uses the [Node.js Starter Project](https://github.com/architect-templates/node-rest-api) as an external dependency, packaged into an independent Architect Component, you will need to clone that repository as well as this repository. Dependencies allow you to package the parts of your application stack independently rather than declaring them as services within the same `architect.yml` file, allowing reuse of your components.

Once you have cloned the Node.js Starter Project, you will need to use the [`link` command](https://docs.architect.io/deployments/local-environments/#local-registration) before starting the React application locally. This command tells Architect to look for the source code for this dependency locally rather than pulling down a Component that has been registered in Architect Cloud.

```sh
# Clone the Node.js Starter Project repository.
# Navigate to the repository's top-level directory, and link the project.
$ git clone git@github.com:architect-templates/node-rest-api.git
$ cd ./node-rest-api
$ architect link .
$ cd ../
```

After linking, some sections of the `architect.yml` file and the application code will need to be uncommented.

### Update the architect.yml file
In the `architect.yml`, uncomment lines 14 and 15. These lines let Architect know that the `react` component depends on the `node-rest-api`. Additionally, it tells Architect to use the latest linked version available with the `latest` tag.

```yml
dependencies:
  node-rest-api: latest
```

Uncomment line 38 which includes the environment variable, `REACT_APP_API_ADDR`, and save the file. This environment variable will provide the address for the React App to communicate with the API backend. Everything inside of `${{}}` is part of the [service referencing syntax](https://docs.architect.io/components/service-discovery/#service-referencing-syntax).

```yml
environment:
  REACT_APP_API_ADDR: ${{ dependencies.node-rest-api.services.api.interfaces.main.ingress.url }}
```

### Update the application
Open the file `/src/App.js`, uncomment lines 2 and 10, and save the file. The uncommented JavaScript file includes a form and a table to input and display a list of your favorite movies.

## Relaunch the component
Now that the dependency has been added, the component should be restarted to reflect the changes in the `architect.yml` file. If the app hasn't already been restarted, do so by hitting `Ctrl-C`. Then run:

```sh
$ architect dev .
```

to see the new changes.
