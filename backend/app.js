const express = require("express");
const cors = require("cors");
const axios = require("axios");
const NodeCache = require("node-cache");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const myCache = new NodeCache({ stdTTL: 24 * 60 * 60 });

const app = express();
app.use(cors());

app.get("/:domainName", async (req, res) => {
  const { domainName } = req.params;

  if (myCache.has(domainName)) {
    const cashedData = myCache.get(domainName);
    return res.status(200).send(cashedData);
  } else {
    const { data } = await axios(
      `https://host.io/api/web/${domainName}?token=${process.env.API_KEY}`
    );
    myCache.set(domainName, data);
    res.status(200).send(data);
  }
});

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
