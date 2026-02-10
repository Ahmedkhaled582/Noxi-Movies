const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.use(cors());
server.use(jsonServer.defaults());

server.db = router.db;

server.use(auth);
server.use(router);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});