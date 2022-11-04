# It is an opinionated starter code for a node.js express app

## It is configured with the following

1. Well folder structure that follows MVC pattern and Typescript
2. Basic Authentication functions
3. Jasmine for unit testing `npm run test`
4. Basic CRUD operations using the PostgreSQL database
5. Migrations using db-migrate
6. Dotenv package
7. Prettier for formatting script: `npm run format`.
8. Eslint for linting script: `npm run lint`

## A preview of the package.json file for a full list of dependencies and scripts

```javascript:

"scripts": {
        "build": "npx tsc",
        "start": "tsc-watch --onSuccess \"node ./dist/server.js\"",
        "start:prod": "npm run build && nodemon ./dist/server.js",
        "test": "SET ENV=test && db-migrate --env test up && npm run build && npx jasmine && db-migrate db:drop test",
        "lint": "eslint --ignore-path .eslintignore --ext .ts .",
        "format": "prettier --ignore-path .prettierignore --write \"**/*.ts\""
    },
    "devDependencies": {
        "@types/bcrypt": "^5.0.0",
        "@types/express": "^4.17.14",
        "@types/jasmine": "^4.3.0",
        "@types/node": "^18.11.0",
        "@types/pg": "^8.6.5",
        "@typescript-eslint/eslint-plugin": "^5.41.0",
        "@typescript-eslint/parser": "^5.41.0",
        "@types/jsonwebtoken": "^8.5.9",
        "bcrypt": "^5.1.0",
        "db-migrate": "^0.11.13",
        "db-migrate-pg": "^1.2.2",
        "eslint": "^8.26.0",
        "eslint-config-prettier": "^8.5.0",
        "eslint-plugin-prettier": "^4.2.1",
        "jasmine-spec-reporter": "^7.0.0",
        "nodemon": "^2.0.20",
        "supertest": "^6.3.0",
        "ts-node": "^10.9.1",
        "tsc-watch": "^5.0.3",
        "typescript": "^4.8.4"
    },
    "dependencies": {
        "dotenv": "^16.0.3",
        "express": "^4.18.2",
        "jasmine": "^4.4.0",
        "jsonwebtoken": "^8.5.1",
        "pg": "^8.8.0"
    }
```
