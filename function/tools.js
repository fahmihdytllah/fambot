const fs = require('fs-extra')
const request = require('request')
const { spawn, exec, execSync } = require('child_process');

const addMetadata = (packname, author) => {
         if (!packname) packname = 'Fahmi';
         if (!author) author = 'FaMBoT';
         author = author.replace(/[^a-zA-Z0-9]/g, '');
         let name = `${author}_${packname}`;
         if (fs.existsSync(`./src/${name}.exif`)) return `./src/${name}.exif`;
         const json = {
            'sticker-pack-name': packname,
            'sticker-pack-publisher': author,
         };
         const littleEndian = Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
         const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00];

         let len = JSON.stringify(json).length;
         let last;

         if (len > 256) {
            len = len - 256;
            bytes.unshift(0x01);
         } else {
            bytes.unshift(0x00);
         }
         if (len < 16) {
            last = len.toString(16);
            last = '0' + len;
         } else {
            last = len.toString(16);
         }

         const buf2 = Buffer.from(last, 'hex');
         const buf3 = Buffer.from(bytes);
         const buf4 = Buffer.from(JSON.stringify(json));

         const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4]);

         fs.writeFile(`./src/${name}.exif`, buffer, (err) => {
            return `./src/${name}.exif`;
         });
      }
      
const sendStickerFromUrl = async (to, url) => {
         var names = Date.now() / 10000;
         var download = function (uri, filename, callback) {
            request.head(uri, function (err, res, budy) {
               request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
         };
         download(url, './src/sticker' + names + '.png', async function () {
            console.log('selesai');
            let filess = './src/sticker' + names + '.png';
            let asw = './src/sticker' + names + '.webp';
            exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
               let media = fs.readFileSync(asw);
               client.sendMessage(to, media, MessageType.sticker, { quoted: mek });
               fs.unlinkSync(filess);
               fs.unlinkSync(asw);
            });
         });
      };

const sendMediaURL = async (to, url, text = '', mids = []) => {
         if (mids.length > 0) {
            text = normalizeMention(to, text, mids);
         }
         const fn = Date.now() / 10000;
         const filename = fn.toString();
         let mime = '';
         var download = function (uri, filename, callback) {
            request.head(uri, function (err, res, budy) {
               mime = res.headers['content-type'];
               request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
         };
         download(url, filename, async function () {
            console.log('done');
            let media = fs.readFileSync(filename);
            let type = mime.split('/')[0] + 'Message';
            if (mime === 'image/gif') {
               type = MessageType.video;
               mime = Mimetype.gif;
            }
            if (mime.split('/')[0] === 'audio') {
               mime = Mimetype.mp4Audio;
            }
            client.sendMessage(to, media, type, { quoted: mek, mimetype: mime, caption: text, contextInfo: { mentionedJid: mids } });
            fs.unlinkSync(filename);
         });
      };
        

module.exports = {
    addMetadata,
    sendStickerFromUrl,
    sendMediaURL
}