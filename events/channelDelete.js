const { AuditLogEvent } = require('discord.js');

module.exports = {
  name: 'channelDelete',
  async execute(channel) {
    const logs = channel.guild.channels.cache.find(chan => chan.name === 'logs');
    const entry = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete }).then(audit => audit.entries.first());

    const user = entry.executor.tag;

    logs.send(`${user} deleted channel: #${channel.name}`);
  },
};