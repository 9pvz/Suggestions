const { Client, Intents, MessageEmbed } = require('discord.js');
const fs = require('fs'); // أضف هذا السطر

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '!'; // Replace with your desired prefix
const config = require('./config.json');
client.on('ready', () => {
    console.log(`𒋝━━━━━━✘✘✘━━━━━━𒋝`)
    console.log('')
    console.log(`Logged In As : ${client.user.tag}`)
    console.log(`Bot Name : ${client.user.username}`)
    console.log(`The Bot Is Ready Now`)
    console.log(`ID : ${client.user.id}`)
    console.log(`Server Numbers : ${client.guilds.cache.size}`)
    console.log(`USERS : [" ${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()} "]`)
    console.log(`Channels : [ " ${client.channels.cache.size} " ]`)
    console.log('✘ ◈ Developer By : Anase Boubrad')
  console.log('')
    console.log('𒋝━━━━━━✘✘✘━━━━━━𒋝')
  });
///////////////////////// Anase Boubtad //////////////////////////////////  

client.on('messageCreate', async message => {
    try {
      if (message.author.bot || !message.content.startsWith(prefix)) return;
  
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
  
      if (command === 'setchannel') {
        const targetChannel = message.mentions.channels.first();
  
        if (!targetChannel) {
          return message.channel.send('Please mention a valid channel to set as the response channel.');
        }
  
        config.channelID = targetChannel.id;
        saveConfig();
        return message.channel.send(`Responses will be sent in <#${config.channelID}>.`);
      } else if (command === 'setemoji1') {
        const customEmoji1 = args.join('');
  
        if (!customEmoji1) {
          return message.channel.send('Please provide a valid emoji.');
        }
  
        config.emoji1 = customEmoji1;
        saveConfig();
        return message.channel.send(`The emoji has been set to ${config.emoji1}.`);
      } else if (command === 'setemoji2') {
        const customEmoji2 = args.join('');
  
        if (!customEmoji2) {
          return message.channel.send('Please provide a valid emoji.');
        }
  
        config.emoji2 = customEmoji2;
        saveConfig();
        return message.channel.send(`The emoji has been set to ${config.emoji2}.`);
      } else if (command === 'setimage') {
        const customFontLink = args.join('');
  
        if (!customFontLink) {
          return message.channel.send('Please provide a valid image link.');
        }
  
        config.fontLink = customFontLink;
        saveConfig();
        return message.channel.send(`The image link has been set to ${config.fontLink}.`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
  
client.on("messageCreate", async message => {
    try {
      if (message.channel.id !== config.channelID || message.author.bot) return;
  
      const content = `**الاقــتــراح  : ${message.content} **`;
  
      await message.delete();
      message.channel.send({ content: ` **تــم الاقــتــراح من طــرف : <@${message.author.id}> **` });
  
      const sentMessage = await message.channel.send({ content });
      await sentMessage.react(config.emoji1);
      await sentMessage.react(config.emoji2);

      await message.channel.send({ files: [config.fontLink] });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
  
  function saveConfig() {
    fs.writeFile('./config.json', JSON.stringify(config, null, 2), err => {
      if (err) console.error('Error saving config.json:', err);
    });
  }
    



  client.on('messageCreate', async message => {
    try {
      if (message.author.bot || !message.content.startsWith(prefix)) return;
  
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
  
      if (command === 'setavatar') {
        // Check if the member has the Administrator permission
        if (!message.member.permissions.has('ADMINISTRATOR')) {
          return message.channel.send('You do not have permission to use this command.');
        }
  
        const imageUrl = args[0];
        if (!imageUrl) {
          return message.channel.send('Please provide a valid image URL.');
        }
  
        await client.user.setAvatar(imageUrl);
        return message.channel.send('The bot avatar has been updated successfully.');
      } else if (command === 'setusername') {
        // Check if the member has the Administrator permission
        if (!message.member.permissions.has('ADMINISTRATOR')) {
          return message.channel.send('You do not have permission to use this command.');
        }
  
        const newUsername = args.join(' ');
        if (!newUsername) {
          return message.channel.send('Please provide a new username for the bot.');
        }
  
        await client.user.setUsername(newUsername);
        return message.channel.send(`The bot username has been updated to "${newUsername}" successfully.`);
      }
  
///////////////////////// Anase Boubtad //////////////////////////////////  
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
  
  client.on('messageCreate', async message => {
    try {
      if (message.author.bot || !message.content.startsWith(prefix)) return;
  
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
  
      if (command === 'help') {
        const helpEmbed = new MessageEmbed()
          .setColor('BLUE')
          .setTitle('Bot Help')
          .setThumbnail('https://cdn.discordapp.com/attachments/1136055898100482118/1136057964860542986/logo.png')
          .setImage('https://cdn.discordapp.com/attachments/1134581740007075971/1136046022515241030/39.2.png')
          .setDescription('Here are some available commands:')
          .addFields(
            { name: `${prefix}setchannel <#channel>`, value: 'Set the response channel.' },
            { name: `${prefix}setemoji1 <emoji>`, value: 'Set the first emoji to be used in bot responses.' },
            { name: `${prefix}setemoji2 <emoji>`, value: 'Set the second emoji to be used in bot responses.' },
            { name: `${prefix}setimage <image_link>`, value: 'Set the image link to be used in bot responses.' },
            { name: `${prefix}setavatar [Attachment]`, value: 'Set the bot avatar to the attached image.' },
            { name: `${prefix}setusername [New Username]`, value: 'Set the bot username to the provided name.' }
          )
          .setFooter('Replace <> with the appropriate values.');
  
        // Send the help message to the user's DM
        message.author.send({ embeds: [helpEmbed] })
          .then(() => message.channel.send('A help message has been sent to your DM.'))
          .catch(() => message.channel.send('Failed to send the help message to your DM. Please make sure your DMs are enabled.'));
      } else if (command === 'setchannel') {
        // ...
        // اكمل بقية الأوامر هنا
        // ...
      } else if (command === 'setemoji1') {
        // ...
        // اكمل بقية الأوامر هنا
        // ...
      } else if (command === 'setemoji2') {
        // ...
        // اكمل بقية الأوامر هنا
        // ...
      } else if (command === 'setimage') {
        // ...
        // اكمل بقية الأوامر هنا
        // ...
      } else if (command === 'setavatar') {
        // ...
        // اكمل بقية الأوامر هنا
        // ...
      } else if (command === 'setusername') {
        // ...
        // اكمل بقية الأوامر هنا
        // ...
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
    
// قم بتعيين توكن البوت
client.login("MTEzNjA2NjgwNDcwNDM1MDI5MA.Gycmaw.QamcdaLaQ0DqaEmIsKQbfot8WqrppcYx7M0Tx4"); 
 