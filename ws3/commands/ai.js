const axios = require("axios");
const name = "ai";

module.exports = {
  name,
  description: "Interact with ChatGPT-4o",
  async run({ api, event, send, args }) {
    const prompt = args.join(" ");
    if (!prompt) {
      return send(`Please enter your question! 

Example: ${api.prefix + name} what is love?`);
    }
    send("Please wait... 🔎");

    try {
      const gpt = await axios.get('https://joshweb.click/api/gpt-4o', {
        params: {
          q: prompt,
          uid: event.sender.id
        }
      });

      if (!gpt || !gpt.data.status) throw new Error();

      send(`${gpt.data.result}

🤖 AI by Khaile`);
    } catch (err) {
      send(err.message || "An error occurred.");
    }
  }
};
