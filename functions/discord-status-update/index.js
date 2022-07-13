const MC = require('minecraft-server-util')
const { Client, Intents, WebhookClient, MessageEmbed } = require('discord.js')
const moment = require('moment')

exports.main = async function (req, res) {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
  client.login(process.env.DISCORD_BOT_TOKEN)
  const webhookClient = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK_URL
  })

  let serverStatus = { players: { online: 0 }, err: null }
  try {
    serverStatus = await MC.status(process.env.MC_SERVER_IP, 25565, {
      timeout: 1000 * 5,
      enableSRV: true
    })
  } catch (e) {
    if (e) serverStatus = { error: 'Failed to fetch server status' }
  }
  const isOnline = serverStatus.players
  console.log({ serverStatus })
  const statusEmbed = new MessageEmbed()
  statusEmbed.setTitle('CUHK Minecraft Server').setColor('0xba66ff')
  if (serverStatus.favicon) statusEmbed.set_thumbnail((url = serverStatus.favicon))
  statusEmbed.addField(
    'Status',
    serverStatus.err
      ? ':red_circle: Failed to Fetch'
      : isOnline
      ? ':green_circle: Online'
      : ':red_circle: Offline',
    true
  )
  statusEmbed.addField('Version', serverStatus?.version?.name ?? '1.19', true)
  statusEmbed.addField('Address', process.env.MC_SERVER_IP, true)
  statusEmbed.addField(
    'Players',
    `${serverStatus?.players?.online ?? 0}/${serverStatus?.players?.max ?? 20}`,
    true
  )

  statusEmbed.setFooter(
    `last update: ${moment(new Date()).utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss')}`
  )

  const urlEmbeds = []

  if (!isOnline)
    urlEmbeds.push(
      new MessageEmbed()
        .setTitle('Start Server')
        .setColor('0xdda728')
        .setURL('https://asia-east2-mcs-cuhk.cloudfunctions.net/start-mc-server')
    )

  const message = await webhookClient.editMessage('992362771989676152', {
    content: ' ',
    embeds: [statusEmbed, ...urlEmbeds]
  })

  res.status(200).send(`MC server status updated on DC`)
}
