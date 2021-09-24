const AmoCRM = require( 'amocrm-js' );
const crm = new AmoCRM({
    domain: 'sortageru',
    auth: {
      client_id: 'b8f8c774-92d9-4b0d-881e-ceea9e3ff879',
      client_secret: 'sZ6hA1RCC6LNI9danvMB6p0F5qSJnue3PO1arnnGgCdN0WCTgcXAqWb3J0uyKu0Y',
      redirect_uri: 'https://fornex.com/api/vps/34-202853/',
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
      var leadid = obj.leads.status[0].id;

      getlead(leadid);

      res.json({ message: 'goodbye'})
      })
      app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))





async function getlead(leadid)
{
  const leadinfo = await crm.request.get('/api/v4/leads/' + leadid);


 var type_price = null;
 var type_delivery = null;
 var comment = null;
 var comment_delivery = null;

  var array = leadinfo.data.custom_fields_values;

  if ( array != null )
  {
    array.forEach(expr  => {
    switch (expr.field_name)
    {
      case 'Тип оплаты':
        type_price = expr.values[0].value;
        break;

      case 'Тип доставки':
        type_delivery = expr.values[0].value;
        break;

      case 'Комментарий':
        comment = expr.values[0].value;
        break;

      case 'Комментарий (доставка)':
        comment_delivery = expr.values[0].value;
        break;

      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
   }
   );
  }


  let unix_timestamp = leadinfo.data.created_at;
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var data_created = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  var manager_id = leadinfo.data.responsible_user_id;
  const managerinfo = await crm.request.get('/api/v4/users/' + manager_id);
  var manager_name = managerinfo.data.name



  //sendJson(manager_id, type_price, type_delivery, comment, manager_name, data_created, comment_delivery, leadid);


const leadsall = await crm.request.get('/api/v4/contacts/15124417?with=leads');

 console.log(leadinfo.data);
 //console.log(leadsall.data);
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








/*
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
*/




function sendJson(manager_id, type_price, type_delivery, comment, manager_name, data_created, comment_delivery, leadid)
{


var rp = require('request-promise');
var options = {
    method: 'POST',
    uri: 'https://script.google.com/macros/s/AKfycbxQkijCE7rBUzbEirorvU1gHZLjTjlZGI2X7tODfJ6SBXM06xRyoT-ijt272PDzdhL9mw/exec',
    body: {
        manager_id: manager_id,
        type_price: type_price,
        type_delivery: type_delivery,
        comment: comment,
        manager_name: manager_name,
        data_created: data_created,
        comment_delivery: comment_delivery,
        lead_id: leadid
    },
    json: true
};

rp(options)
    .then(function (parsedBody) {
        // POST succeeded...
    })
    .catch(function (err) {
        // POST failed...
    });


};
