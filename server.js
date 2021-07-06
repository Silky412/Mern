const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');//added
require('./models/db');
const app = express();

const PORT = process.env.PORT || 5000; //if 5000 is not avaialble tthen will pick any

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cors')());
app.use(require('helmet')());
app.use('/api/students', require('./routes/students'));
//required in deployment
// Production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// till here

app.listen(PORT, () => console.log(`App running on port ${PORT}`)  );