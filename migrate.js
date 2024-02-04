const axios = require('axios');
const PouchDB = require('pouchdb');

const apiUrl = 'http://localhost:1337/api/posts/find?limit=10';

const dbName = 'lives-db';

const db = new PouchDB(dbName);

async function getData() {
  try {
    db.allDocs().then((docs) => {
      console.log(docs.rows[0].value);
    });
    // const response = await axios.get(apiUrl);
    // for (const doc of response.data) {
    //   console.log('adding');
    //   doc._id = doc.id.toString();
    //   delete doc.id;
    //   await db.put(doc);
    // }
    console.log('Données ajoutées à PouchDB avec succès !');
  } catch (error) {
    console.error('Echec de la récupération des données :', error);
  }
}
getData();
