const AmoCRM = require( 'amocrm-js' );
const crm = new AmoCRM({
    domain: 'sortageru',
    auth: {
      client_id: 'b8f8c774-92d9-4b0d-881e-ceea9e3ff879',
      client_secret: 'sZ6hA1RCC6LNI9danvMB6p0F5qSJnue3PO1arnnGgCdN0WCTgcXAqWb3J0uyKu0Y',
      redirect_uri: 'http://203065.fornex.cloud',
      server: {
        port: 80
      }
    },
});

(async () => {
try
{
    const url = crm.connection.getAuthUrl();
    console.log({ url });
    const order1 = await crm.request.post('/api/v4/webhooks');
    const order = await crm.request.get('/api/v4/webhooks');

//express part
        const express = require( 'express' );
        const PORT = 80;
        const app = express()
        var bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.post('/', function(req, res){
        var resp = JSON.stringify(req.body);
        var obj = JSON.parse(resp)
        
        if (obj.leads.status[0].id !== undefined)
        {
          var leadid = obj.leads.status[0].id;
          getlead(leadid);
        }

        res.json({ message: 'goodbye'})
        })
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
}
catch (error)
{
  //console.error(error)
}



})();





function sendJson(manager_id, type_price, type_delivery, comment, manager_name, data_created, comment_delivery, leadid, username, userphone, source, manager2_name)
{
var rp = require('request-promise');
var options = {
    method: 'POST',
    uri: 'https://script.google.com/macros/s/AKfycbz6BmFx_F78rFREnLisdQ6bRse2yOO3phF88vr97D-QVxLLDS0/exec',
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
        userphone: userphone,
        source: source,
        manager2_name: manager2_name
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




async function getlead(leadid)
{
  try
  {
    const mytoken = await crm.connection.refreshToken();
    const request = require('request');
    var auth = 'Bearer ' + mytoken.data.access_token;
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

    var callback = async (error, response, body) =>
    {

      try
      {
       // console.log(body)
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
       var source = null;
       var type = null;

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

            case 'Источник':
              source = expr.values[0].value;
              break;

            case 'Тип':
              type = expr.values[0].value;
              break;

            default:
              console.log(`Sorry, we are out of ${expr}.`);
          }
         }
         );
        }
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
        var manager2_name = null;


        sendJson(manager_id, type_price, type_delivery, comment, manager_name, data_created, comment_delivery, leadid, username, userphone, source, manager2_name);

      }
      catch (error)
      {
        //console.error(error);
      }
    }

  request(options, callback);

  }
  catch (error)
  {
    //console.error(error);
  }

}
