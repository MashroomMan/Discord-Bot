module.exports = {
  name: 'channelCreate',
  execute(channel) {
    console.log(`Channel created: ${channel.name}`);
  },
};