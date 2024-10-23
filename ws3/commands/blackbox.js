const axios = require("axios");
const name = "wise";

module.exports = {
  name,
  description: "Interact with Blackbox",
  async run({ api, event, send, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
      return send(`Usage: ${api.prefix + name} [your question]`);
    }

    try {
      send("wait kipal ka eh");

      const gpt = await axios.get(`https://joshweb.click/api/gpt-4o`, {
        params: {
          q: prompt,             
          uid: event.sender.id  
        }
      });

      if (!gpt || !gpt.data.status) {
        throw new Error("Failed to get a valid response from the API.");
      }

      // Send the result back to the user
      return send(`${gpt.data.result}

🤖 AI by khaile`);
    } catch (err) {
      // Handle errors gracefully
      send(err.message || "An unexpected error occurred.");
    }
  }
};
