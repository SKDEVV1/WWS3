const axios = require("axios");
const name = "blackbox";

module.exports = {
  name,
  description: "Interact with Blackbox",
  async run({ api, event, send, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
      // Send the usage instruction to the user instead of throwing an error
      return send(`Usage: ${api.prefix + name} [your question]`);
    }

    try {
      send("Please wait... 🔎");

      // Make the API request with the correct query and user ID
      const gpt = await axios.get(`https://joshweb.click/api/blackboxai`, {
        params: {
          q: prompt,             // Question from the user
          uid: event.sender.id   // User ID from the event object
        }
      });

      if (!gpt || !gpt.data.status) {
        throw new Error("Failed to get a valid response from the API.");
      }

      // Send the result back to the user
      return send(`${gpt.data.result}

🤖 WieAI by Neth Aceberos`);
    } catch (err) {
      // Handle errors gracefully
      send(err.message || "An unexpected error occurred.");
    }
  }
};
