To start the project, run the following command:

install dependencies:

```bash
npm install
```

To create the database (postgres), run the following command:
```bash
docker compose up --build
```

To insert data into the database, run the following command:

```bash
npm run init-db
```
it will insert events, users and roles into the database.

To run the project, run the following command:

```bash
npm run dev
```

for running tests, run the following command:

```bash
npm run test
```

it will test all the endpoints and return the coverage.

users wich will be created:

```bash
username: user1
password: password1
```

```bash
username: user2
password: password2
```

```bash
username: user3
password: password3
```


```bash
