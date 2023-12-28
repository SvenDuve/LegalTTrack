const express = require('express');
const app = express();

console.log('Hello World Casper!');

app.use(express.json()); // for parsing application/json



app.get('/', (req, res) => {

    res.send('Hello World Casper!');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// fs.readFile('data/clients.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   let jsonData = JSON.parse(data);
//   console.log(jsonData);
//   jsonData.forEach(client => {
//         if(client.value === "client1"){
//             console.log(client.label);
//         }
//     })

// });

// fs.readFile('data/departments.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     let jsonData = JSON.parse(data);
//     console.log(jsonData);
//     jsonData.forEach(department => {
//         if (department.value === "client1"){
//         return console.log(department.data);
//         }
//     })
    
// });

