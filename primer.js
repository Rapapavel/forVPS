
  const fetch = require('node-fetch');

  let todo = {
      userId: 123,
      title: "loren impsum doloris",
      completed: false
  };

  fetch('https://script.google.com/macros/s/AKfycbxQkijCE7rBUzbEirorvU1gHZLjTjlZGI2X7tODfJ6SBXM06xRyoT-ijt272PDzdhL9mw/exec', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .then(json => console.log(json));
