const Telegrambot = require("node-telegram-bot-api");
const token = "7344391287:AAHbJHAIvC0VkcYBkcG4QUlTh8fnX5ev77s";
const prefix = ".";

const sock =  new Telegrambot(token, { polling: true });
const gempa = new RegExp(`^${prefix}gempa$`);
sock.onText(gempa,async(callback) => {
    const BMKG = "https://data.bmkg.go.id/DataMKG/TEWS/";

    const apiCall = await fetch(BMKG + "autogempa.json")
    const {
        Infogempa: { 
            gempa: {
                Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Shakemap
            }
        }
    } = await apiCall.json()

    const img = BMKG + Shakemap
    const result = 
`Jam: ${Jam}
Magnitude: ${Magnitude}
Tanggal: ${Tanggal}
Wilayah: ${Wilayah}
Potensi: ${Potensi}
Kedalaman: ${Kedalaman}`

    sock.sendPhoto(callback.from.id,  img, { caption: result })

}) 