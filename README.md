# Pager Api

### Clone project
```
$ git clone git@github.com:duvanmonsa/pager_api.git
```
### Install Postgrest Docker
If you already have postgrest jump to the next step.
```
$ docker run -d --name pager_postgrest -v my_dbdata:/var/lib/postgresql/data -p 54320:5432 postgres:11
```

### Create development.env
create a `development.env` and set your own data for postgrest connection.
```
$ NODE_ENV=development
  PORT=4000
  JWT_SECRET=YOUR_JWT_KEY
  DB_NAME=postgres
  DB_USERNAME=postgres
  DB_HOSTNAME=127.0.0.1
  DB_PASSWORD=null
  DB_PORT=54320
```
### installation
```
$ npm install
```

### run migrations
```
$ npm run migrate:dev
```

### seed fake data into the DB
```
$ npm run seed:dev
```

### run the project
```
$ npm start
```

## Test Project

### Create test.env
create a `test.env` and set your own postgrest connection for tests.
```
$ NODE_ENV=development
  PORT=4000
  JWT_SECRET=YOUR_JWT_KEY
  DB_NAME=postgres
  DB_USERNAME=postgres
  DB_HOSTNAME=127.0.0.1
  DB_PASSWORD=null
  DB_PORT=54320
```
### Run the tests
```
$ npm run test
```