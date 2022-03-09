# Multiple signup demo
Code example used in the tutorial video for preventing multiple signups with FingerprintJS. 
Watch the [video tutorial](https://www.youtube.com/watch?v=jWX9P5_jZn8).

## How to run locally
1. Clone the repository and open the project folder.
2. Run `yarn` to install dependencies.
3. Get a free FingerprintJS public API key [here](https://dashboard.fingerprintjs.com/signup) and replace the FPJS_PUBLIC_API_KEY variable in the `.env` file with your public API key value.
4. Install PostgreSQL on your machine if you don't have it ([Mac](https://medium.com/@viviennediegoencarnacion/getting-started-with-postgresql-on-mac-e6a5f48ee399), [Windows](https://www.microfocus.com/documentation/idol/IDOL_12_0/MediaServer/Guides/html/English/Content/Getting_Started/Configure/_TRN_Set_up_PostgreSQL.htm), [Linux](https://phoenixnap.com/kb/how-to-install-postgresql-on-ubuntu)) and create a new database.
5. Replace placeholders with actual values in the DATABASE_URL variable in the `.env` file and make sure you are able to connect to your database.
6. Run migrations on the database (`0001_initial.sql`, then `0002_add_visitor_id.sql`).
7. Run `yarn start` (it uses `nodemon`, so the server will restart on every change).

You can learn more about FingerprintJS Pro functionality from the [official documentation](https://dev.fingerprintjs.com/docs).
