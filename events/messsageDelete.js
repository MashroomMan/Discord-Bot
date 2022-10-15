module.exports = {
  name: 'messageDelete',
  async execute(message) {
    let user;
    let discriminator;
    let target;

    const logs = message.guild.channels.cache.find(chan => chan.name === 'logs');
    const entry = await message.guild.fetchAuditLogs({ type: 72 }).then(audit => audit.entries.first());

    // we defined entry above, so we can use it here to check the channel id
    if (entry.extra.channel.id === message.channel.id
    // then we are checking if the target is the same as the author id
    && (entry.target.id === message.author.id)
    // we are comparing time as audit logs are sometimes slow.
    && (entry.createdTimestamp > (Date.now() - 5000)
    // we want to check the count as audit logs stores the amount deleted in a channel
    && entry.extra.count >= 1)) {
      user = entry.executor.username;
      discriminator = entry.executor.discriminator;
      target = entry.target.username;
    } else {
      // When all else fails, we can assume that the author has deleted their message.
      user = message.author.username;
      discriminator = message.author.discriminator;
      target = user;
    }

    // console.log(entry);

    // console.log(message.guild.channels.cache.find(channel => channel.name === 'logs'));
    logs.send(`${user}#${discriminator} deleted "${message}" by ${target} in #${message.channel.name}`);
  },
};