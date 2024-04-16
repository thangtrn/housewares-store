# script

"scripts": {
   "start": "yarn run build && cross-env NODE_ENV=production node dist/server.js",
   "dev": "cross-env NODE_ENV=development nodemon",
   "build": "swc src -d dist --source-maps --copy-files",
   "build:tsc": "tsc && tsc-alias",
   "lint": "eslint --ext .ts src",
   "lint:fix": "yarn run lint -- --fix",
},

# dependencies

bcrypt
compression
cookie-parser
cors
dotenv
express
helmet
jsonwebtoken
morgan
reflect-metadata
swagger-jsdoc
swagger-ui-express
winston
winston-daily-rotate-file

yarn add bcrypt compression cookie-parser cors dotenv express helmet jsonwebtoken morgan reflect-metadata swagger-jsdoc swagger-ui-express winston winston-daily-rotate-file


# devDependencies

@swc/cli
@swc/core
@types/bcrypt
@types/compression
@types/cookie-parser
@types/cors
@types/express
@types/jsonwebtoken
@types/morgan
@types/node
@types/swagger-jsdoc
@types/swagger-ui-express
@typescript-eslint/eslint-plugin
@typescript-eslint/parser
cross-env
eslint  // require version < 9.0.0
eslint-config-prettier
eslint-plugin-prettier
node-config
nodemon
prettier
ts-node
tsc-alias
tsconfig-paths
typescript

yarn add -D @swc/cli @swc/core @types/bcrypt @types/compression @types/cookie-parser @types/cors @types/express @types/jsonwebtoken @types/morgan @types/node @types/swagger-jsdoc @types/swagger-ui-express @typescript-eslint/eslint-plugin @typescript-eslint/parser cross-env eslint eslint-config-prettier eslint-plugin-prettier node-config node-gyp nodemon prettier ts-node tsc-alias tsconfig-paths typescript

