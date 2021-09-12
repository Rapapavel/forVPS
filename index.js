const AmoCRM = require( 'amocrm-js' );
const crm = new AmoCRM({
    domain: 'fincellandrew',
    auth: {
      client_id: 'b57aed5a-7d0b-4e59-8bcd-4908b54d4f5a',
      client_secret: 'pfoPQWTyYpFASCg4sY8oYoZEARoiplHQKq1rbBIsRIveM7XGqWSi9z1RrguKRIiD',
      redirect_uri: 'https://c8d4-212-106-41-155.ngrok.io',
      server: {
        port: 3000
      }
    },
});

(async () => {
  const url = crm.connection.getAuthUrl();
  console.log({
    url
  });
  const order1 = await crm.request.post('/api/v4/webhooks');
  const order = await crm.request.get('/api/v4/webhooks');
  const order3 =  await crm.request.get('/api/v4/catalogs');
  const order4 =  await crm.request.get('/api/v4/catalogs/7507/custom_fields');


  //console.log(order4.data._embedded.custom_fields);


      const express = require( 'express' );
      const PORT = 3000;
      const app = express()
      var bodyParser = require('body-parser');
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.post('/', function(req, res){
      var resp = JSON.stringify(req.body); //преобразует в строку

      var obj = JSON.parse(resp)

      if(typeof obj.leads === 'undefined')
      {
      }
      else
      {
        if(typeof obj.leads.update === 'undefined')
        {
        }
        else
        {
          var leadid = obj.leads.update[0].id;
          //console.log(obj.leads.status[0].name);
          getlead(leadid);
        }
      }

      res.json({ message: 'goodbye'})
      })
      app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))





async function getlead(leadid)
{
  const leadinfo = await crm.request.get('/api/v4/leads/' + leadid);
/*
  var _name = leadinfo.data.name
  var _price = leadinfo.data.price
  var _seller = leadinfo.data.custom_fields_values[0].field_name
  var _size = leadinfo.data.custom_fields_values[1].field_name
  var _price_buy = leadinfo.data.custom_fields_values[2].field_name
  var _payment = leadinfo.data.custom_fields_values[3].field_name
  */
  console.log(leadinfo.data._embedded);
}




async function addElement()
{
  const response = await crm.request.post( '/api/v2/catalog_elements',

        {
           add: [
              {
                 catalog_id: "7507" ,
                 name: "Карандаш3",

                 custom_fields: [
                {
                   id: "854651" ,
                   values: [
                      {
                         value: "abcd"
                      }
                   ]
                } ,
                {
                   id: "854657" ,
                   values: [
                      {
                         value: 1
                      }
                   ]
                }
             ]

              }
           ]
        }
    )
}






async function updateElement()
{
  const response = await crm.request.post( '/api/v2/catalog_elements',

        {
           update: [
              {
                 catalog_id: "7507" ,
                 id: "226975",
                 name: "Карандаш3333",

                 custom_fields: [
                {
                   id: "854651" ,
                   values: [
                      {
                         value: "abcd"
                      }
                   ]
                } ,
                {
                   id: "854657" ,
                   values: [
                      {
                         value: 1
                      }
                   ]
                }
             ]

              }
           ]
        }
    )
}


async function getElements()
{
 const myarr =  await crm.request.get('/api/v4/catalogs/7507/elements');
 var test = JSON.stringify(myarr.data._embedded);
 var test2 = JSON.parse(test)

 for (i = 0; i < test2.elements.length; i++)
 {
   console.log(test2.elements[i].name);
 }

}







})();









const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/chinook.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});


    db.run('CREATE TABLE mybase(name text)', function(err) {
    if (err)
    {

      db.run(`INSERT INTO mybase(name) VALUES(?)`, ['primer'], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      });



      let sql = `SELECT name name FROM mybase ORDER BY name`;
      db.all(sql, [], (err, rows) => {
      if (err) {
       throw err;
      }
      rows.forEach((row) => {
       console.log(row.name);
      });
      });


    }
    else
    {

    }

    });





function sendJson()
{


var rp = require('request-promise');
var options = {
    method: 'POST',
    uri: 'https://script.google.com/macros/s/AKfycbxQkijCE7rBUzbEirorvU1gHZLjTjlZGI2X7tODfJ6SBXM06xRyoT-ijt272PDzdhL9mw/exec',
    body: {
        some: 'primer'
    },
    json: true // Automatically stringifies the body to JSON
};

rp(options)
    .then(function (parsedBody) {
        // POST succeeded...
    })
    .catch(function (err) {
        // POST failed...
    });




};

sendJson();
