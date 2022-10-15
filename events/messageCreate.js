module.exports = {
  name: 'messageCreate',
  execute(message) {
    // const logs = message.guild.channels.cache.find(channel => channel.name === 'logs');

    // const entry = message.guild.fetchAuditLogs({ type: 'MESSAGE_CREATE' }).then(audit => audit.entries.first());
    // let user = '';

    // // we defined entry above, so we can use it here to check the channel id
    // if (entry.extra.channel.id === message.channel.id
    // // then we are checking if the target is the same as the author id
    // && (entry.target.id === message.author.id)
    // // we are comparing time as audit logs are sometimes slow.
    // && (entry.createdTimestamp > (Date.now() - 5000)
    // // we want to check the count as audit logs stores the amount deleted in a channel
    // && entry.extra.count >= 1)) {
    //   user = entry.executor.username;
    // } else {
    //   // When all else fails, we can assume that the author has deleted their message.
    //   user = message.author.username;
    // }
    // logs.send(`A message was deleted in ${message.channel.name} by ${user}`);
    // console.log(entry);
    console.log(`message is created -> ${message}`);
  },
};