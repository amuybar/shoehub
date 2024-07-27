// const { createClient } = require("@sanity/client");

// // Initialize the Sanity client
// const client = createClient({
//   projectId: "b7k3bebw",
//   dataset: "production",
//   apiVersion: "2024-07-01",
//   useCdn: false,
//   token:
//     "skqMz7F3YYgS9Sn0pjiSaJv4KXQijlPVAcbnoBiXN4Q9wn7wl4sVdhvNYxbY3GZneBnOPMLlqbdgXT6tMp3S9YBIll00LGGGnYEOWH6sx8jNe3HCLK17TjhiV3iz6gmDyTdn1EPuGSiU9R3PoTZdHdlP22xD2I2eJ9Au0dOKWydj5BGfrWAn",
// });

// // Function to delete documents with untitled images
// const deleteUntitledFiles = async () => {
//   try {
//     console.log("Fetching documents with untitled images...");

//     // Query for documents with untitled images
//      const query = `*[_type == "shoe" && (!defined(slug) || slug == "" || !defined(price) || price == 0)]`;
//     const results = await client.fetch(query);

//     console.log(`Found ${results.length} documents with untitled images.`);

//     // Loop through and delete each document
//     for (const doc of results) {
//       console.log(`Deleting document with ID: ${doc._id}`);
//       await client.delete(doc._id);
//     }

//     console.log("Deletion complete.");
//   } catch (error) {
//     console.error("Error fetching or deleting documents:", error);
//   }
// };

// // Run the script
// deleteUntitledFiles();
