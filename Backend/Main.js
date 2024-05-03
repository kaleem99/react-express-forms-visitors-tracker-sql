const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser"); // For Express versions below 4.16
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 8080;
app.use(express.json()); // For Express 4.16 and above
app.use(cors()); // Enable CORS for all routes

// Connect to SQLite database
const TableName = "Visitors";
const dbPath = "path/to/your/new/database.db";

// const db = new sqlite3.Database("database.db", (err) => {
//   if (err) {
//     console.error("Error connecting to database:", err.message);
//   } else {
//     console.log("Connected to the SQLite database.");
//   }
// });

app.post("/create-database/:name", (req, res) => {
  const dbPath = `databases/${req.params.name}`;

  if (!fs.existsSync(dbPath)) {
    const db = new sqlite3.Database(dbPath);

    db.close((err) => {
      if (err) {
        console.log("Error cannpt create Database", err);

        res.status(500).json({ message: "Error creating database" });
      } else {
        console.log("Database created successfully");
        res.status(200).json({ message: "Database created successfully" });
      }
    });
  } else {
    res.status(400).json({ message: "Database file already exists" });
  }
});
// Route to add a new visitor
app.post(`/add-${TableName}:name`, (req, res) => {
  // const { name, assistedBy, age, date, time } = req.body;
  const dbName = req.params.name;
  const dbPath = `databases/${dbName}.db`;

  const db = new sqlite3.Database(dbPath);
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ message: "Request body is empty." });
  }

  // db.run(
  //   `INSERT INTO ${TableName} (name, assistedBy, age, date, time) VALUES (?, ?, ?, ?, ?)`,
  //   [name, assistedBy, age, date, time],
  //   (err) => {
  //     if (err) {
  //       console.error("Error inserting data:", err.message);
  //       return res.status(500).json({ message: "Failed to add data." });
  //     }
  //     res.json({ message: "User data added successfully." });
  //   }
  // );
  const columns = Object.keys(body).join(", "); // Get column names dynamically
  const placeholders = Object.keys(body)
    .map(() => "?")
    .join(", "); // Generate placeholders for values

  const values = Object.values(body); // Get values dynamically

  const sql = `INSERT INTO ${TableName} (${columns}) VALUES (${placeholders})`;

  db.run(sql, values, (err) => {
    if (err) {
      console.error("Error inserting data:", err.message);
      return res.status(500).json({ message: "Failed to add data." });
    }
    res.json({ message: "User data added successfully." });
  });
  // console.log(req.body);
  // res.json("DONE");
});

// Route to fetch all visitors
app.get(`/get-all-${TableName}:name`, async (req, res) => {
  const dbName = req.params.name;
  // console.log(dbName);
  const dbPath = `databases/${dbName}.db`;
  // console.log(dbPath)
  const db = new sqlite3.Database(dbPath);
  db.all(`SELECT * FROM ${TableName};`, (err, rows) => {
    if (err) {
      console.error("Error fetching visitors:", err.message, 100);
      return res.status(500).send("Error fetching visitors.");
    } else {
      // console.log(rows);
      res.json(rows);
    }
  });
});
app.get(`/get-columns-${TableName}:name`, (req, res) => {
  const dbName = req.params.name;
  const dbPath = `databases/${dbName}.db`;
  const db = new sqlite3.Database(dbPath);

  db.all(`PRAGMA table_info(${TableName})`, (err, tableInfo) => {
    if (err) {
      console.log("Error fetching table info:", err.message);
    } else {
      const columnNames = tableInfo.map((column) => ({
        name: column.name,
        pk: column.pk,
        type: column.type,
      }));
      // console.log("Column names:", columnNames);
      res.json(columnNames);
    }
  });
});
app.get(`/get-single-${TableName}:num/:name`, (req, res) => {
  const index = req.params.num;
  const dbName = req.params.name;
  const dbPath = `databases/${dbName}.db`;
  const db = new sqlite3.Database(dbPath);

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

app.delete(`/delete-all-${TableName}:name`, (req, res) => {
  const dbName = req.params.name;
  const dbPath = `databases/${dbName}.db`;
  const db = new sqlite3.Database(dbPath);
  db.run(`DELETE FROM ${TableName};`, (err, rows) => {
    if (err) {
      res.status(500).send("Error could not delete all visitors.");
    } else {
      res.json("All visitors deleted successfully");
    }
  });
});
app.delete(`/delete-${TableName}:num/:name`, (req, res) => {
  const index = req.params.num;
  // console.log("DELETE");
  const dbName = req.params.name;
  const dbPath = `databases/${dbName}.db`;
  const db = new sqlite3.Database(dbPath);
  db.run(`DELETE FROM ${TableName} WHERE id = ${index};`, (err, rows) => {
    if (err) {
      res.status(500).send("Error could not delete visitors " + index);
    } else {
      res.json(`visitor ${index} deleted successfully`);
    }
  });
});
app.put(`/update-${TableName}:num/:name`, (req, res) => {
  const index = req.params.num;
  const updatedData = req.body;
  // console.log(req.body, "DDDDD");
  // console.log(updatedData.data, 166, index);
  const columnNames = updatedData.slice(1).map((col) => Object.keys(col)[0]);
  const valueNames = updatedData.slice(1).map((col) => Object.values(col)[0]);
  // console.log(valueNames, 168);
  const updateValues = columnNames
    .map((columnName) => `${columnName} = ?`)
    .join(", ");
  // console.log(updateValues, "UPDATE VALUES", 173);
  // const queryParams = [...valueNames, index];

  const dbName = req.params.name;
  const dbPath = `databases/${dbName}.db`;
  const db = new sqlite3.Database(dbPath);
  // console.log(queryParams, "QUERY PARAMS");
  // console.log(`UPDATE ${TableName} SET ${updateValues} WHERE id = ?`);
  // // console.log(updateValues, "UPDATE VALUES");
  // db.run(
  //   `UPDATE ${TableName} SET ${updateValues} WHERE id = ${index}`,
  //   queryParams,
  //   (err, rows) => {
  //     if (err) {
  //       res.status(500).send("Error updating visitor " + index);
  //     } else {
  //       // console.log(res)
  //       res.json(`Visitor ${index} updated successfully`);
  //     }
  //   }
  // );
  // const index = req.params.num;
  // console.log(req.body, "BODY");
  // const [index, name, assistedBy, age, date, time] = req.body.map(
  //   (col) => Object.values(col)[0]
  // );
  // console.log(`UPDATE ${TableName} SET ${updateValues} WHERE id = ?`);
  // console.log(index, name, assistedBy, age, date, time);
  // console.log(
  //   `UPDATE ${TableName} SET name = ?, assistedBy = ?, age = ?, date = ?, time = ? WHERE id = ?`
  // );
  // res.json("SEND");
  // console.log(index, 2000);
  console.log(valueNames, index);
  console.log(updateValues, "UPDATE VALUES");
  valueNames.push(index);
  db.run(
    `UPDATE ${TableName} SET ${updateValues} WHERE id = ?`,
    valueNames,
    (err, rows) => {
      if (err) {
        res.status(500).send("Error updating visitor " + index);
      } else {
        res.json(`Visitor ${index} updated successfully`);
      }
    }
  );
});

// db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log(rows);
//   }
// });
// app.post(`/create-database:name`, (req, res) => {
//   const databaseName = req.params.name;
//   db.run(`CREATE DATABASE ${databaseName};`, (err, rows) => {
//     if (err) {
//       res.json("Error creating database");
//     } else {
//       res.json(`${databaseName} has been created successfully`);
//     }
//   });
// });
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
