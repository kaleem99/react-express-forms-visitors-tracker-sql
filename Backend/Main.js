const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser"); // For Express versions below 4.16
const cors = require("cors");
const fs = require("fs");
const session = require("express-session");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();
const port = 8080;
const secretKey = crypto.randomBytes(32).toString("hex");
console.log(secretKey, "SS");
app.use(express.json()); // For Express 4.16 and above
// app.use(cors()); // Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);
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
const dbData = new sqlite3.Database("Users");

dbData.serialize(() => {
  dbData.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)"
  );
});
const createDirectoryIfNotExists = (directoryPath) => {
  // Check if the directory exists
  if (!fs.existsSync(directoryPath)) {
    // Directory doesn't exist, create it
    fs.mkdirSync(directoryPath);
    console.log(`Directory '${directoryPath}' created successfully.`);
  } else {
    console.log(`Directory '${directoryPath}' already exists.`);
  }
};
createDirectoryIfNotExists("./databases");
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  // First, check if the user already exists in the database
  dbData.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error("Error checking user existence:", err);
      res.status(500).json({ message: "Error checking user existence" });
      return; // Stop further execution
    }

    if (row) {
      console.log("User already exists, return a 400 response");
      res.json({ message: "User already exists, Please" });
    } else {
      // User doesn't exist, proceed to create the user and database
      const hashedPassword = bcrypt.hashSync(password, 10);

      dbData.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err) => {
          if (err) {
            console.error("Error creating user:", err);
            res.status(500).json({ message: "Error creating user" });
            return; // Stop further execution
          }

          // Create the database
          const dbPath = `./databases/${email}`;
          if (!fs.existsSync(dbPath)) {
            const db = new sqlite3.Database(dbPath);

            db.close((err) => {
              if (err) {
                console.error("Error creating database", err);
                res.status(500).json({ message: "Error creating database" });
              } else {
                console.log("Database created successfully");
                res.status(201).json({ message: "User created successfully" });
              }
            });
          } else {
            res.status(400).json({ message: "Database file already exists" });
          }
        }
      );
    }
  });
});

// app.post("/create-database/:name", (req, res) => {
//   const dbPath = `./databases/${req.params.name}`;

//   if (!fs.existsSync(dbPath)) {
//     const db = new sqlite3.Database(dbPath);

//     db.close((err) => {
//       if (err) {
//         console.error("Error creating database", err);
//         res.status(500).json({ message: "Error creating database" });
//       } else {
//         console.log("Database created successfully");
//         res.status(200).json({ message: "Database created successfully" });
//       }
//     });
//   } else {
//     res.status(400).json({ message: "Database file already exists" });
//   }
// });
// Route to add a new visitor
app.get("/dashboard", (req, res) => {
  console.log(req.session.user, 100);

  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized", type: false });
  }
  res.json({ message: "Welcome to the dashboard", type: true });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // First, check if the user already exists in the database
  dbData.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error("Error checking user existence:", err);
      res.status(500).json({ message: "Error checking user existence" });
      return; // Stop further execution
    }

    if (row) {
      // console.log(bcrypt.compareSync(password, row.password));
      if (bcrypt.compareSync(password, row.password)) {
        // console.log("User already exists, return a 400 response");
        console.log(row);
        req.session.user = email;
        console.log(req.session.user);
        // const token = jwt.sign({ userId: row.id }, "your_secret_key", {
        //   expiresIn: "1h",
        // });

        res.json({
          message: "Logging you in",
          token: secretKey,
          email: email,
        });
      } else {
        res.json({ message: "Incorrect password please try again" });
      }
    } else {
      // User doesn't exist, proceed to create the user and database
      res.json({ message: "Account doesn't exist please signup" });
    }
  });
});
app.post(`/addTableRow/:name/:tableName`, (req, res) => {
  // const { name, assistedBy, age, date, time } = req.body;
  const dbName = req.params.name;
  const tableName = req.params.tableName;
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

  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

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
app.post(`/get-all-Visitors`, async (req, res) => {
  const dbName = req.body.email;
  const tableName = req.body.selectedTable;
  console.log(dbName, 220);
  const dbPath = `databases/${dbName}.db`;
  console.log(dbPath, 222, "PATH");
  const db = new sqlite3.Database(dbPath);
  db.all(`SELECT * FROM ${tableName};`, (err, rows) => {
    if (err) {
      console.error(`Error fetching $tableName}`, err.message, 100);
      return res.status(500).send("Error fetching visitors.");
    } else {
      // console.log(rows);
      console.log(rows, "ROWS");
      res.json(rows);
    }
  });
  // res.json({ message: "Done Working" });
});
app.post(`/checkTableColumns`, (req, res) => {
  const { tableName, email } = req.body;
  const dbName = `${email}.db`;
  const dbPath = `databases/${dbName}`;
  const db = new sqlite3.Database(dbPath);

  db.all(`PRAGMA table_info(${tableName})`, (err, tableInfo) => {
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

app.delete(`/deleteTable/:table/:name`, (req, res) => {
  const dbName = req.params.name;
  const tableName = req.params.table;
  const dbPath = `databases/${dbName}.db`;
  const db = new sqlite3.Database(dbPath);
  console.log("delete", tableName);
  db.run(`DROP TABLE ${tableName};`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error could not delete " + tableName);
    } else {
      console.log(rows);
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

app.post("/get-all-tables", (req, res) => {
  const { email } = req.body;
  const dbName = `${email}.db`;
  const dbPath = `databases/${dbName}`;
  const db = new sqlite3.Database(dbPath);
  console.log(db, email);
  const query = `
  SELECT name FROM sqlite_master 
  WHERE type='table' AND name NOT LIKE 'sqlite_%';
`;
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    // Extract table names from the result rows
    const tableNames = rows.map((row) => row.name);
    console.log(tableNames);
    res.json({ tables: tableNames });
  });
});
app.post("/createTable", (req, res) => {
  const { tableName, columns, email } = req.body;
  const dbName = `${email}.db`;
  const dbPath = `databases/${dbName}`;
  const db = new sqlite3.Database(dbPath);
  console.log(tableName, columns, email);
  // Construct SQL query to create the table dynamically
  const columnsWithId = ["id INTEGER PRIMARY KEY AUTOINCREMENT", ...columns];

  const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsWithId.join(
    ", "
  )})`;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create table" });
    }

    res.status(200).json({ message: "Table created successfully" });
  });
});

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
