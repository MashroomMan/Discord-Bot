const { AuditLogEvent } = require('discord.js');

module.exports = {
  name: 'guildMemberRemove',
  async execute(member) {

    console.log(member);
    const logs = member.guild.channels.cache.find(chan => chan.name === 'logs');
    const entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberKick }).then(audit => audit.entries.first());

    const user = entry.executor.tag;

    console.log(entry.createdTimestamp);

    // If the current time now is greater then the timestamp of the audit log then we know that the person left
    if ((Date.now() - 5000 > entry.createdTimestamp) || (!entry)) {
      logs.send(`${member.user.tag} left the guild.`);
    } else {
      logs.send(`${user} kicked ${member.user.tag}`);
    }
  },
};