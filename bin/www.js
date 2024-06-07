const app = require("../index.js");
const syncDb = require("./sync-db.js");

syncDb().then((_) => {
      console.log('Sync_ DATABASE')
  app.listen(3000, function () {
    console.log("Server is listening on port 3000!");
  });
});
