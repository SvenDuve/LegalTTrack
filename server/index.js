

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const dbPath = 'data/legalttracker.db';

console.log('Hello World Casper!');


const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb(); // Call the function to initialize the database
    }
});





function initDb() {
    // Database table creation logic
    // Example: Creating a 'clients' table
    db.run(`CREATE TABLE IF NOT EXISTS time_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pid TEXT NOT NULL,
        client TEXT NOT NULL,
        department TEXT NOT NULL,
        project TEXT NOT NULL,
        counterparty TEXT,
        start_time DATETIME NOT NULL,
        end_time DATETIME NOT NULL
    );`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Table 'time_entries' created or already exists.");
        }
    });
}


initDb();

app.use(express.json()); // for parsing application/json



app.get('/', (req, res) => {

    res.send('Hello Sven, Paul, Emma und Mama, spielt ihr heute Doppelkopf?');

});

app.get('/api/clients', (req, res) => {
    // Fetch or compute the clients data
    const fs = require('fs');
    fs.readFile('data/clients.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred')
        }
        const clientsData = JSON.parse(data);
        res.json(clientsData);
    });
});

app.get('/api/departments/:client', (req, res) => {
    // Fetch or compute the clients data
    const fs = require('fs');
    fs.readFile('data/departments.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred')
        }
        let departmentsData = JSON.parse(data);
        let clientDepartments = departmentsData[req.params.client]
        if (!clientDepartments) {
            return res.status(404).send('Client not found')
        }
        res.json(clientDepartments);
    });
});

app.get('/api/projects/:client', (req, res) => {
    // Fetch or compute the clients data
    const fs = require('fs');
    fs.readFile('data/projects.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred')
        }
        let projectsData = JSON.parse(data);
        let clientProjects = projectsData[req.params.client]
        if (!clientProjects) {
            return res.status(404).send('Client not found')
        }
        res.json(clientProjects);
    });
});

app.get('/api/counterparties', (req, res) => {
    // Fetch or compute the clients data
    const fs = require('fs');
    fs.readFile('data/counterparties.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred')
        }
        let counterpartiesData = JSON.parse(data);
        console.log(data)
        res.json(counterpartiesData);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

