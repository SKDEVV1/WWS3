const axios = require('axios');

module.exports = {
  name: 'autopost',
  description: 'Toggles autoposting on or off, or triggers an immediate post if on.',
  execute: async (senderId, args, api) => {
    const action = args[0]; // Get the action (on/off)

    if (action === 'on') {
      api.autopostEnabled = true;
      const message = { text: "Autoposting is now enabled!" };
      await api.sendMessage(senderId, message, api.PAGE_ACCESS_TOKEN);
    } else if (action === 'off') {
      api.autopostEnabled = false;
      const message = { text: "Autoposting is now disabled!" };
      await api.sendMessage(senderId, message, api.PAGE_ACCESS_TOKEN);
    } else {
      if (api.autopostEnabled) {
        try {
          const { content, author } = (await axios.get(`https://api.realinspire.tech/v1/quotes/random`)).data[0];
          await api.publishPost(`💭 Remember...\n${content}\n-${author}`, api.PAGE_ACCESS_TOKEN);
          const message = { text: "Autopost has been triggered successfully!" };
          await api.sendMessage(senderId, message, api.PAGE_ACCESS_TOKEN);
          console.log("Manual autopost triggered.");
        } catch (error) {
          console.error('Error triggering autopost:', error.message);
          const errorMessage = { text: "Failed to trigger autopost. Please try again later." };
          await api.sendMessage(senderId, errorMessage, api.PAGE_ACCESS_TOKEN);
        }
      } else {
        const message = { text: "Autoposting is currently disabled. Use '/autopost on' to enable." };
        await api.sendMessage(senderId, message, api.PAGE_ACCESS_TOKEN);
      }
    }
  }
};
