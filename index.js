const AmoCRM = require( 'amocrm-js' );
const crm = new AmoCRM({
    domain: 'sortageru',
    auth: {
      client_id: 'b8f8c774-92d9-4b0d-881e-ceea9e3ff879',
      client_secret: 'sZ6hA1RCC6LNI9danvMB6p0F5qSJnue3PO1arnnGgCdN0WCTgcXAqWb3J0uyKu0Y',
<<<<<<< HEAD
      redirect_uri: 'https://203065.fornex.cloud',
=======
      redirect_uri: 'https://1e1e-2a01-ba80-e-17-1b1-00-1.ngrok.io',
>>>>>>> a360ccfdccaf5777f93709e39fccda988edd7b13
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
  console.log(order3)
  const order4 =  await crm.request.get('/api/v4/catalogs/7507/custom_fields');


<<<<<<< HEAD

=======
  //console.log(order4.data._embedded.custom_fields);
  
>>>>>>> a360ccfdccaf5777f93709e39fccda988edd7b13


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




<<<<<<< HEAD
=======

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



  sendJson(manager_id, type_price, type_delivery, comment, manager_name, data_created, comment_delivery, leadid);


//const leadsall = await crm.request.get('/api/v4/contacts/15124417?with=leads');

 //console.log(leadinfo.data);
 //console.log(leadsall.data);
}




>>>>>>> a360ccfdccaf5777f93709e39fccda988edd7b13
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






function sendJson(manager_id, type_price, type_delivery, comment, manager_name, data_created, comment_delivery, leadid, username, userphone)
{
var rp = require('request-promise');
var options = {
    method: 'POST',
    uri: 'https://script.google.com/macros/s/AKfycbxU_egXOvjiR1kt97oqk78aA7K44MQJqdfdS8CKunXmC3i9f5AkBq3vRpfdfNzKvC_O/exec',
    body: {
        manager_id: manager_id,
        type_price: type_price,
        type_delivery: type_delivery,
        comment: comment,
        manager_name: manager_name,
        data_created: data_created,
        comment_delivery: comment_delivery,
        lead_id: leadid,
        username: username,
        userphone: userphone
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



<<<<<<< HEAD

async function getlead(leadid)
{
  const mytoken = await crm.connection.getToken();

  const request = require('request');
  var auth = 'Bearer ' + mytoken.access_token;
  var adress = 'https://sortageru.amocrm.ru/api/v4/leads/' + leadid + '?with=contacts'
  var options = {
    url: adress,
    method: 'GET',
    json: true,
    headers: {
      'User-Agent': 'my request',
      'Authorization': auth,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
=======
/*
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/chinook.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});
>>>>>>> a360ccfdccaf5777f93709e39fccda988edd7b13

  var callback = async (error, response, body) =>
  {

  var getuserid = body._embedded.contacts[0].id;
  const userinfo = await crm.request.get('/api/v4/contacts/' + getuserid);



var username = null;
var userphone = null;

if (userinfo.data.name !== undefined)
{
  username = userinfo.data.name;
}

if (userinfo.data.custom_fields_values !== null)
{
  userphone = userinfo.data.custom_fields_values[0].values[0].value;
}



 const leadinfo = await crm.request.get('/api/v4/leads/' + leadid);

 var type_price = null;
 var type_delivery = null;
 var comment = null;
 var comment_delivery = null;

if ( leadinfo.data.custom_fields_values !== undefined)
{

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

      case 'Примечание по доставке':
        comment_delivery = expr.values[0].value;
        break;

      case 'Телефон (доп)':
        userphone = expr.values[0].value;
        break;

      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
   }
   );
  }
}

<<<<<<< HEAD
=======
    });
*/
>>>>>>> a360ccfdccaf5777f93709e39fccda988edd7b13


  let unix_timestamp = leadinfo.data.created_at;
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var data_created = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  var manager_id = leadinfo.data.responsible_user_id;
  const managerinfo = await crm.request.get('/api/v4/users/' + manager_id);
  var manager_name = managerinfo.data.name

<<<<<<< HEAD



const talksinfo = await crm.request.get('/api/v4/talks');
//console.log(talksinfo.data._embedded.talks)
/*
if (talksinfo.data._embedded.talks._embedded.leads[0].id == leadid)
=======
function sendJson(manager_id, type_price, type_delivery, comment, manager_name, data_created, comment_delivery, leadid)
>>>>>>> a360ccfdccaf5777f93709e39fccda988edd7b13
{
  console.log(talksinfo.data.origin)
}

*/


 //console.log(talksinfo11.data, "/////////", talksinfo22)


  sendJson(manager_id, type_price, type_delivery, comment, manager_name, data_created, comment_delivery, leadid, username, userphone);
  //console.log(manager_id, type_price, type_delivery, comment, manager_name, data_created, comment_delivery, leadid, username, userphone);
  }



request(options, callback);


}





async function pooost()
{
  const request = require('request');
  var auth = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEyNmMyYjQ4MjhmNzYxNWQ3NjhmOTVjZTliYWEwNDYwMDI1MzJlZjQ3M2I3ZjlkNTQ4YjhiZGNjYjk3ZDNmMDI5ZDY0MTc5MDI0NzU3OWNhIn0.eyJhdWQiOiJiOGY4Yzc3NC05MmQ5LTRiMGQtODgxZS1jZWVhOWUzZmY4NzkiLCJqdGkiOiIxMjZjMmI0ODI4Zjc2MTVkNzY4Zjk1Y2U5YmFhMDQ2MDAyNTMyZWY0NzNiN2Y5ZDU0OGI4YmRjY2I5N2QzZjAyOWQ2NDE3OTAyNDc1NzljYSIsImlhdCI6MTYzMjkyMTIwOSwibmJmIjoxNjMyOTIxMjA5LCJleHAiOjE2MzMwMDc2MDksInN1YiI6Ijc0Mjg1MjAiLCJhY2NvdW50X2lkIjoyOTY5NTg2NCwic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImNybSIsIm5vdGlmaWNhdGlvbnMiXX0.VkHqitcO6EsJKmuQkjEidgPUqHlIQeIwS_Wx4nWZuhN6zeb9GtbQH2ArF878CvhjqFWYVNskJX6a5wdTmwju01Zd8cfJqiiFe5TiD1e5jDsXCKmpQAyQw4btdZ_XUFbj6vcDMsvoxcnWrmcJATg1LL8VQzKXVs3-9wZ8YWS6jpEPfflm9FIxpA_E-cUO7b4mjk9zqgT95JWjnh8ONyOxUqTKBozhZAiGY7O2B763KI3SSoThdPvLTxTqrN-EDxK3I9PLuIf7QG14aiGqU5MLM_GyzpfpDqTVaUwzWW0t2Z4wU0uOj3tQwV6D6WObe2H7UDeipKna6gWpKaYhR24TSQ'
  var adress = 'https://sortageru.amocrm.ru/oauth2/access_token'
  var options = {
    url: adress,
    method: 'POST',
<<<<<<< HEAD
    json: true,
    client_id: 'b8f8c774-92d9-4b0d-881e-ceea9e3ff879',
    client_secret: 'sZ6hA1RCC6LNI9danvMB6p0F5qSJnue3PO1arnnGgCdN0WCTgcXAqWb3J0uyKu0Y',
    redirect_uri: 'https://40a3-62-148-157-138.ngrok.io',
    grant_type: 'authorization_code',
=======
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
>>>>>>> a360ccfdccaf5777f93709e39fccda988edd7b13

    code: 'def502004889870e522e244a2b76c10584e78205068d04488f7c205abc9f050a7cfc6e63541f09744126fc46f7676cddafff3aeed36ff2c6e29a0a49449a5ff754a4eff07015147c1b369bf7d945733fdc789c442a213dfead9a4ac47e2dfee6163e58eacb42a446b96827d0ffd5c66c5ef2c1e382506c461fb12d23b2439d4213dd23577346ce04ee7fbe321a646a3806e1ccf564b16c8961b0ddf8a3a92bed644fe244f43afc6e3c744194ef737695bdc2b96fdaf528d601266abf6295b6bd50c58e286698fabcdd6a6161f7211b7dcf8aeddc99fcb2d009883ea3acb4610350b063633d6d7f1639233ef95086cc62b233a9e2f2fb7d7b2851600ea299ca586a5f0b899c1acb808b4bb35d8135464e295f8a30e8c2a645409917af676676e9b481f63cf036166b02151ff7ff9b641a21d578028884cfb7557f22416b2db3ee3ffe92491a6395cbf16aebbfd7ffc01874dd2ff46b13c0b1152ab024f6ce8af118a1dd4c7ce2424fa83a5fbc9d92f462bd2328fce1aead3a2b5212605e82175b9a1097d32210e62c29d96f8cd6c94b7986450ad5dfcd1e9c0be87b7c29090e8a6c75e024fd00b0a5b7e94586afeb34edc83cf966dc472f2c58eb713801557814c85ad74203685edbf1cefb062d28'

  };

  var callback = async (error, response, body) =>
  {
    console.log(body)
  }

<<<<<<< HEAD
    request(options, callback);


  }

  //pooost();
=======
};
>>>>>>> a360ccfdccaf5777f93709e39fccda988edd7b13
