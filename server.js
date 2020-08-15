'use strict';

require('dotenv').config();
const express = require('express');
var methodOverride = require('method-override')

const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(cors());

// Application Middleware
app.use(express.urlencoded({ extended: true }));


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Set the view engine for server-side templating
app.set('view engine', 'ejs');
app.use(express.static('./public'));

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.log(err));

// ROUTES
app.get('/', getRecipeForm);

function getRecipeForm(request, response) {
  let viewModel = {
    recipes: [
      {
        name: 'Lasagna',
        ingredients: ['Noods', 'Sauce', 'Beef', 'Salt', 'Pepper']
      }
    ]
  }
  response.status(200).render('index', viewModel);
}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch(err => { throw err; })