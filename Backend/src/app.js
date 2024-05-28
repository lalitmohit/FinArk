
import express from 'express';
import pool from './db.js';
import moment from 'moment';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
const app = express();
app.use(express.json());
const port = 8000;

// app.use(cors());

// const allowedOrigins = [
//   // 'http://localhost:8000',
//   // 'http://localhost:5173',
//   'http://localhost:3000',
//   // 'http://13.51.36.205:3000',
//   // "*" // Add the second port here
// ];
// app.use(cors({
//   origin: allowedOrigins,
//   methods: 'GET, POST, PUT, DELETE',
//   // allowedHeaders: 'Content-Type, Authorization',
//   // credentials: true,
// }));


const allowedOrigins = [
  'http://localhost:3000',
  'http://13.51.36.205:3000',
  // Add more origins as needed
  "*",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

app.use(cors(corsOptions));


// Endpoint to create users table
app.post('/create-users', async (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      email VARCHAR(255) NOT NULL PRIMARY KEY,
      password VARCHAR(255) NOT NULL
    )
  `;

  try {
    const connection = await pool.getConnection();
    await connection.query(createTableQuery);
    connection.release();
    res.send('Table created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating table');
  }
});


// Register API
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = `
      INSERT INTO users (email, password)
      VALUES (?, ?)
    `;
    const connection = await pool.getConnection();
    await connection.execute(insertQuery, [email, hashedPassword]);
    connection.release();
    res.status(201).send('User registered successfully');
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).send('Email already exists');
    }
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    connection.release();

    if (rows.length === 0) {
      return res.status(401).send('Invalid email or password');
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid email or password');
    }

    res.status(201).json({status:"201", message: 'Login successful', user: { email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in user');
  }
});



// Endpoint to create the table
app.post('/create-table', async (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contests (
      contestName VARCHAR(255) NOT NULL,
      contestId VARCHAR(255) NOT NULL PRIMARY KEY,
      createdDate DATETIME NOT NULL,
      contestStatus ENUM('active', 'ended') NOT NULL
    )
  `;

  try {
    const connection = await pool.getConnection();
    await connection.query(createTableQuery);
    connection.release();
    res.send('Table created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating table');
  }
});

// Endpoint to insert a contest
app.post('/contests', async (req, res) => {
  const { contestName, contestId, createdDate, contestStatus } = req.body;
  
  // Parse and format the date
  const formattedDate = moment(createdDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

  const insertQuery = `
    INSERT INTO contests (contestName, contestId, createdDate, contestStatus)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const connection = await pool.getConnection();
    await connection.execute(insertQuery, [contestName, contestId, formattedDate, contestStatus]);
    connection.release();
    res.status(200).json({status:"200", message: 'Contest added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding contest');
  }
});

// Endpoint to get all contests
app.get('/contests', async (req, res) => {
  const selectQuery = `
    SELECT * FROM contests
  `;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(selectQuery);
    connection.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving contests');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




