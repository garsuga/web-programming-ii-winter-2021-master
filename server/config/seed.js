import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(!config.seedDB) {
    return Promise.resolve();
  }

  // Seed the MongoDB server here as needed for local development...
}
