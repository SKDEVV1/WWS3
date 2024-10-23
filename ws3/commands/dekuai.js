const Deku = require("dekuai");
const deku = new Deku();
const name = "dekuai";

module.exports = {
  name,
  description: "Interact with dekuai",
  async run({ api, event, send, args }) {
    const prompt = args.join(" ");
    if (!prompt) return send(`Please enter your question! 

Example: ${api.prefix + name} what is love?`);
    
    send("Please wait... 🔎");
    try {
      const q = prompt,
            cid = "40", // (conversational id)
            model = "Cblackbox";
      const response = await deku[model](q, cid);
      
     
      if (!response || !response.data || !response.data.status) throw new Error("Unexpected response format.");
      
      send(`${response.data.result}

🤖 `);
    } catch (err) {
      send(err.message || "An error occurred.");
      return;
    }
  }
}
