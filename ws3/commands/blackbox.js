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
      send("Wait kupal kaba ?");

      const gpt = await axios.get('https://joshweb.click/api/blackboxai', {
        params: {
          q: prompt,
          uid: event.sender.id
        }
      });

      if (!gpt || !gpt.data.status) {
        throw new Error("Failed to get a valid response from the API.");
      }

      return send(`${gpt.data.result}

🤖 Eto na  yung hinahanap mo kupal 
AI by Khaile`);
    } catch (err) {
      send(err.message || "An unexpected error occurred.");
    }
  }
};
