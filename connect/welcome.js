const {
	MessageType,
	Presence
} = require("@adiwajshing/baileys");
const fs = require("fs");

const { getBuffer, sleep } = require ("../lib/functions")
let setting = JSON.parse(fs.readFileSync('./setting.json'));
let { botName } = setting
const welcome = JSON.parse(fs.readFileSync("./database/welcome.json"))

module.exports = async(Ardy, anj) => {
  const isWelcome = welcome.includes(anj.jid)
  const mdata = await Ardy.groupMetadata(anj.jid)
  const groupName = mdata.subject
  if (anj.action === 'add') {
    if (anj.participants[0] === Ardy.user.jid) {
      await sleep(5000)
      Ardy.updatePresence(anj.jid, Presence.composing)
      Ardy.sendMessage(anj.jid, `Hai aku ${botName}, silahkan kirim #menu`, MessageType.text)
    } else if (isWelcome) {
      //console.log(anj.announce)
      try {
        var pic = await Ardy.getProfilePicture(anj.participants[0])
      } catch {
        var pic = 'https://images-ext-1.discordapp.net/external/zEOf_L2M0gnSXhi8wfvaV5LoPIK1MmX1i0fxGPL1dCI/https/i.pinimg.com/564x/dc/1e/73/dc1e7366e0233fc1a6585ea88138b9d8.jpg?width=547&height=701'
      }
      bufff = await getBuffer(pic)
      Ardy.sendMessage(anj.jid, bufff, MessageType.image, {caption: `Hai @${anj.participants[0].split("@")[0]}, selamat datang di ${groupName}`, contextInfo: {"mentionedJid": [anj.participants[0]]}})
      console.log("اهلا بك في نقابة"+groupName)
    }
  } else if (anj.action === "remove") {
    //console.log(anj)
    if (isWelcome) {
      try {
        var pic = await Ardy.getProfilePicture(anj.participants[0])
      } catch {
        var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
      }
      bufff = await getBuffer(pic)
      Ardy.sendMessage(anj.jid, bufff, MessageType.image, {caption: `Sayonara @${anj.participants[0].split("@")[0]}`, contextInfo: {"mentionedJid": [anj.participants[0]]}})
      console.log("وداعا شرفتنا في "+groupName)
    }
  }
}
