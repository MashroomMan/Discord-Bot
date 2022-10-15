const { SlashCommandBuilder, PermissionsBitField, GuildAuditLogsEntry } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('audit')
        .setDescription('Display audit logs')
        .addUserOption(option => option.setName('target').setDescription('The user you want to test for audit permissions')),
  async execute(interaction) {

    const user = interaction.options.getMember('target');
    const isAdmin = interaction.member.permissions.has(PermissionsBitField.Flags.ViewAuditLog);

    if (user) {
      const isUserAdmin = user.permissions.has(PermissionsBitField.Flags.ViewAuditLog);

      if (isUserAdmin) { return interaction.reply({ content: `${user.user.username} can view audit logs`, ephemeral: true }); }
      else { return interaction.reply({ content: `${user.user.username} does not have permission to do this.`, ephemeral: true }); }
    }

    if (isAdmin) {
      // console.log(interaction.guild.fetchAuditLogs());
      // for (const entry in interaction.guild.fetchAuditLogs()) {
      //   console.log(entry);
      // }
      const entries = [];
      const auditLogs = interaction.guild.fetchAuditLogs()
      .then(audit => {

        // console.log(audit.entries.first());
        for (let entry of audit.entries.values()) {
          if (entry.changes.length > 0) {
            console.log(entry);
            // console.log(entry.changes[0].new);
          }
          // console.log(`${entry.executor.username}#${entry.executor.discriminator} `);
          console.log('\n');
        }

        // console.log(audit.entries.get("1020478715332931665"));
        // entries.push(audit.entries);
        // console.log(entries);
      })
      .catch(console.error);

      // console.log(entries);
      // console.log(fetch(auditLogs));
      // auditLogs.then(function(logs) {
      //   console.log(logs);
      // })
      // .catch(console.error);

      // console.log(Promise.resolve(auditLogs));

      // const printAuditLogs = () => {
      //   auditLogs.then((a) => {
      //     console.log(a);
      //   });
      // };

      // printAuditLogs();

      // console.log(auditLogs);

      // interaction.reply({ content: 'You can view audit logs', ephemeral: true });
    }
    else { interaction.reply({ content: 'You do not have permission to do this.', ephemeral: true }); }
  },

};