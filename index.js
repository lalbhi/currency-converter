const express = require("express");
const bp = require("body-parser");
const path = require("path");
const axios = require("axios");

const app = express();
const port = 8000;

app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,`public`)))



app.set("view engine", "ejs");


app.get("/", (req, res) => {
  
  res.render("home.ejs", { serveroutput: "money" });
});

app.post("/", (req, res) => {
  
  let currency = parseFloat(req.body.currency); 
  let from = req.body.from;
  let to = req.body.to;

  
  let api = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_xBYn4sRu7Il3ewLSvzaVR71c8YUOIwzkFjGx8V70&currencies=${from}%2C${to}`;

 
  axios.get(api)
    .then((response) => {
     
      const rate = response.data.data[to];
      const amount = currency * rate;

     
      res.render("home.ejs",{serveroutput:amount.toFixed(2)});
    })
                 
    .catch((error) => {
     
      console.error("Error fetching currency data:", error);
      res.status(500).send("Error fetching currency data"); 
    });
});


app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
