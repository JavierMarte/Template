

function generateUniqueUserId() {
    const timestamp = Date.now().toString(); // Get the current timestamp as a string
    const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    const uniqueId = parseInt(timestamp + randomNumber); // Concatenate the timestamp and random number, and convert to an integer
    userId = uniqueId.toString();
    return uniqueId.toString(); // Return the unique ID as a string
  }


  module.exports = generateUniqueUserId;
