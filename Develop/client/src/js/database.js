import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Open the database connection
  const jateDb = await openDB("jate", 1);

  // Start a new transaction with read-write access
  const tx = jateDb.transaction("jate", "readwrite");

  // Retrieve the object store from the transaction
  const store = tx.objectStore("jate");

  // Use the put() method to update an existing entry or add a new entry
  const request = store.put({ id: 1, value: content });

  // Wait for the request to complete and obtain the result
  const result = await request;

  // Log a success message with the result
  console.log("🚀 - data saved to the database!", result);
};



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Log a message indicating that text has been retrieved from the database
  console.log("Text has been retrieved from the database.");

  // Open the database connection
  const jateDb = await openDB("jate", 1);

  // Start a new transaction with read-only access
  const tx = jateDb.transaction("jate", "readonly");

  // Retrieve the object store from the transaction
  const store = tx.objectStore("jate");

  // Use the getAll() method to retrieve all entries from the object store
  const request = store.getAll();

  // Wait for the request to complete and obtain the result
  const result = await request;

  // Log the value of the result
  console.log("result.value", result.value);

  // Return the retrieved values
  return result.value;
};


initdb();
