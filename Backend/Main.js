const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser"); // For Express versions below 4.16
const cors = require("cors");

const app = express();
const port = 8080;
app.use(express.json()); // For Express 4.16 and above
app.use(cors()); // Enable CORS for all routes

// Connect to SQLite database
const TableName = "Visitors";
const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create a simple table if it doesn't exist

// Route to add a new visitor
app.post(`/add-${TableName}`, (req, res) => {
  const { name, assistedBy, age, date, time } = req.body;
  db.run(
    `INSERT INTO ${TableName} (name, assistedBy, age, date, time) VALUES (?, ?, ?, ?, ?)`,
    [name, assistedBy, age, date, time],
    (err) => {
      if (err) {
        console.error("Error inserting data:", err.message);
        return res.status(500).json({ error: "Failed to add data." });
      }
      res.json({ message: "User data added successfully." });
    }
  );
});

// Route to fetch all visitors
app.get(`/get-all-${TableName}`, async (req, res) => {
  db.all(`SELECT * FROM ${TableName};`, (err, rows) => {
    if (err) {
      console.error("Error fetching visitors:", err.message);
      return res.status(500).send("Error fetching visitors.");
    }
    res.json(rows);
  });
});
app.get(`/get-columns-${TableName}`, (req, res) => {
  db.all(`PRAGMA table_info(${TableName})`, (err, tableInfo) => {
    if (err) {
      console.log("Error fetching table info:", err.message);
    } else {
      const columnNames = tableInfo.map((column) => column.name);
      // console.log("Column names:", columnNames);
      res.json(columnNames);
    }
  });
});
app.get(`/get-single-${TableName}:num`, (req, res) => {
  const index = req.params.num;
  console.log(index);
  db.all(`SELECT * FROM ${TableName} WHERE id = ${index};`, (err, rows) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      res.status(500).send("Error fetching users.");
    } else {
      res.json(rows);
    }
  });
});

app.delete(`/delete-all-${TableName}`, (req, res) => {
  db.run(`DELETE FROM ${TableName};`, (err, rows) => {
    if (err) {
      res.status(500).send("Error could not delete all visitors.");
    } else {
      res.json("All visitors deleted successfully");
    }
  });
});
app.delete(`/delete-${TableName}:num`, (req, res) => {
  const index = req.params.num;
  console.log("DELETE");
  db.run(`DELETE FROM ${TableName} WHERE id = ${index};`, (err, rows) => {
    if (err) {
      res.status(500).send("Error could not delete visitors " + index);
    } else {
      res.json(`visitor ${index} deleted successfully`);
    }
  });
});
app.put(`/update-${TableName}:num`, (req, res) => {
  const index = req.params.num;
  const { name, assistedBy, age, date, time } = req.body;
  console.log(name, assistedBy, age, date, time);
  db.run(
    `UPDATE ${TableName} SET name = ?, assistedBy = ?, age = ?, date = ?, time = ? WHERE id = ?`,
    [name, assistedBy, age, date, time, index],
    (err, rows) => {
      if (err) {
        res.status(500).send("Error updating visitor " + index);
      } else {
        res.json(`Visitor ${index} updated successfully`);
      }
    }
  );
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Code for other routes (delete, get-single, etc.) is commented out below
/*



*/

// He doesn't want the Trailer menu, cafe menu Platter Menu, and Franchise all needs to be removed. he will send pics
// Must have booking option also and when someone makes a booking then he must get an email with clients Information and booking details.
// It must have a Our story page/section
// Home Page/section
// he has his on domain which is hosted on afrihost
// we just need to deploy it and use his domain name.
// Business Name is:  SA coffee company
// Facebook page: https://web.facebook.com/sacoffeeco0205/?_rdc=1&_rdr
