const app = require("./app");
require("./database")
const config = require("./config");

const PORT = config.PORT || 5000;

app.listen(PORT, () => console.log(`Server iniciado en el puerto: ${PORT}`))