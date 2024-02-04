import PouchDB from 'pouchdb';
import { boot } from 'quasar/wrappers';

const pouchdb = new PouchDB('lives-db');

export default boot(({ app }) => {
  app.config.globalProperties.$pouchdb = pouchdb;
});

export { pouchdb };
