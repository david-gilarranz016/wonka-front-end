# Webshell Generator Frontend

## Description

This repository contains a simple web application to facilitate the interaction with the
[Web Shell generator](https://github.com/david-gilarranz016/wonka-generator/). It has been
designed to simplify the Web Shell generation process by allowing the usage of a simple,
easy to use graphical interface.

Note that **direct usage** of this repository by end users is **discouraged**. Instead, it is
preferred to make use of the docker compose file provided by the
[deployment repository](https://github.com/david-gilarranz016/wonka-deployment/) to streamline the
process of setting up the infrastructure.

## Instructions for Users

If a user prefers to build and deploy the application manually, the following steps must be performed:

1. Clone the GitHub repository:

```bash
git clone https://github.com/david-gilarranz016/wonka-front-end.git
cd wonka-front-end
```

2. Build the docker image:

```bash
docker build -t wonka/front-end .
```

3. Run the generated docker image. Note that it is necessary to provide the API URL as an environment
variable:

```bash
docker run -d -p 8081 -e 'APP_API_BASE=http://localhost:8080' wonka/front-end
```

## Instructions for Developers

The project includes a set of unit tests in order to verify the quality of the developed application.
It is strongly recommended to keep growing the test base if any modifications are to be made, as well as
running the existent tests to verify that the changes introduced have not broken the code.

In order to run the unit tests, it is first imperative to install the testing dependencies specified
in the `package.json` file. To do so, the following command can be used:

```bash
npm install
```

Once the required dependencies have been installed, the developer can run the unit tests by issuing the
following command:

```bash
npm run test:unit
```
