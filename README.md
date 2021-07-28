# AMP API

The Node.js + Express API for AMP.

## Getting Started

This project was built with Node 14 LTS. The use of [nvm](https://github.com/nvm-sh/nvm) is recommended. Install dependencies with `npm ci`.

## Testing

```
npm test
npm run coverage
```
## Database
The database is set up using Postgres and [TypeORM](https://typeorm.io/#/) as the ORM layer. It is seeded with a tool called [typeorm-seeder](https://github.com/w3tecch/typeorm-seeding). 

Upon running the application the ORM will generate the tables in the database. You will then have to load the orm config with `docker run amp-api_api npm run seed:config` which will load the orm configuration file location at `ormconfig.ts` you will then have to seed the database with the command `docker run amp-api_api npm run seed:run` this will provide fake data for testing into the postgres database.

In order to connect to the local database the host must be host.docker.internal instead of localhost (if using pgadmin)

### Migrations
Due to the way typeorm is installed commands which pass an argument must be structured with a `--` between the command and the flags for example:
`npm run typeorm typeorm migration:generate -- -n PostRefactoring`
In order to run a migration: `npm run typeorm migrate:run`
In order to generate a migration: `npm run typeorm migrate:generate -- -n NAME`
More documentation for migrations can be found [here](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md)


## Env File
Obtain this information from a teammate before running docker compose
## Docker

This project will build and run locally with Docker:

```
docker-compose --env-file .env up
docker-compose exec api npm run dynamo:seed:local
```

## Keycloak

In order to run keycloak locally you must edit your /etc/hosts file (assuming you are on a mac). The express API looks for keycloak at the URL of its container name at http://keycloak:8080

The JWT issued by keycloak must be signed by the same URL which the express API is communicating with. In order to do this your keycloak instance must be accessible in the browser at keycloak.com.

To edit /etc/hosts on mac

`sudo nano private/etc/hosts`

Add the following line to your /etc/hosts file.

`127.0.0.1	keycloak`

Once you have ran docker-compose up you will now be able to access keycloak in your browser at keycloak:8080/auth.

Keycloak loads with an example realm. The realm has one client, one role and no users. You *must* add a user and map them to the example role in order for authentication to work.

Navigate to http://localhost:8080/auth/admin

Login

username: admin
password: admin

Go to Users and select Add User,

1.) give username and password
2.) navigate to role mappings
3.) select the example role and click add selected

The end result should be a request for keycloak login when running the frontend and a successful authorization flow with the user you created.

An example authentication flow is curretly
- Fetch the bearer token from keycloak
   ```curl -s -X POST http://keycloak:8080/auth/realms/example/protocol/openid-connect/token -H 'content-type: application/x-www-form-urlencoded' -d 'username=someuser&password=somepassword&grant_type=password&client_id=nodejs-app'```
- Make a request to a protected URL with the bearer token
  `curl -v http://localhost:3000/protected_route -H "Authorization: Bearer $YOUR_BEARER_TOKEN_HERE"`

To stop: `docker-compose down`

Note that when dependencies are added or updated, they must _additionally_ be installed in the docker container: `docker-compose run api npm ci`
