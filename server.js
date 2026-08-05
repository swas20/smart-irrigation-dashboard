const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ==========================
// DATA STORAGE
// ==========================
let system = {
  updated: Date.now(),
  summary: {
    monitor: 0,
    customers: 0,
    loss: 0,
    percent: 0
  },
  nodes: []
};

// ==========================
// ESP32 SENDS DATA HERE
// ==========================
app.post("/update", (req, res) => {

  system = req.body;
  system.updated = Date.now();

  console.log("Received update");

  res.json({
    success: true
  });

});

// ==========================
// DASHBOARD READS HERE
// ==========================
app.get("/data", (req, res) => {

  res.json(system);

});

// ==========================
// DASHBOARD SENDS COMMANDS
// ==========================
let command = null;

app.post("/command", (req, res) => {

  command = req.body;

  console.log(command);

  res.json({
    success: true
  });

});

// ==========================
// ESP32 CHECKS FOR COMMANDS
// ==========================
app.get("/command", (req, res) => {

  if(command){

    res.json(command);

    command = null;

  }else{

    res.json({
      node:"",
      action:""
    });

  }

});

// ==========================
app.listen(PORT, ()=>{

    console.log("Server running on port",PORT);

});
