module.exports = {
  name: 'channelDelete',
  async execute(channel) {
    const logs = channel.guild.channels.cache.find(chan => chan.name === 'logs');
    const entry = await channel.guild.fetchAuditLogs({ type: 12 }).then(audit => audit.entries.first());

    const user = entry.executor.username;
    const discriminator = entry.executor.discriminator;

    logs.send(`${user}#${discriminator} deleted channel: #${channel.name}`);

  },
};