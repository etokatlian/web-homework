# Divvy Homework Assignment

## To run this project locally:

1. Run `docker-compose up -d` from root of project. This will spin up a docker instance with Mongodb.
2. Navigate into /webserver directory and run:
   * `npm install`
   * `npm run seed`
   * `npm run start`
3. Navigate into /webapp directory and run:
   * `npm install`
   * `npm run start`

You should now be able to view the app on `localhost:3000` in your browser.

<br />
<br />

## Objectives completed
--------
- [x] Added UI functionality to Create, Read, Update, Delete Transactions.
- [x] Added server-side (Node) GraphQL resolvers and updated schema to support update/delete mutations.
- [x] Added functionality to view transaction amounts as Roman Numerals.
- [x] Added histogram to view transaction spending, per category, per day (viewable in integer and Roman numeral format).
- [x] Added database seeding via CSV file and npm script.
- [x] Improved User experience in UI:
  * Better navigation with breaadcrumbs + navigation drawer.
  * Better styling via Material UI + emotionJS styled components.
  * Nested Table views (using static data).
  * Multiple routes : 
    1. /transactions
    2. /transactions/create
    3. /transactions/metrics
    4. /transactions/{transactionId}/edit


