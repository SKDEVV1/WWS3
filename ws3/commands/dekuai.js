const Deku = require("dekuai")
const deku = new Deku();

module.exports = {
  name,
  description: "Interact with dekuai",
  async run ({ api, event, send, args }){
    const prompt = args.join(" ");
    if (!prompt) return send(`Please enter your question!
    
Example: ${api.prefix + name} what is love?`);
    send("Please wait... 🔎");
const q = "hi",
    cid = "40", // (conversational id) 
    model = "Cblackbox";
  const response = await deku[model](q, cid)
  return console.log(response) 
}

  if (!deku || !deku.data.status)
    throw new Error();
    send(`${gpt.data.result}

🤖 `);
    } catch(err){
      send(err.message || err);
      return;
    }
  }
}
main()
