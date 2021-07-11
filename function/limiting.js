//***config***//
const fs = require("fs-extra")
const config = require('../config.json')

const checkLimit = (sender, _limit) => {
            let found = false;
            for (let lmt of _limit) {
               if (lmt.id === sender) {
                  let limitCounts = config.limitawal - lmt.limit;
                  if (limitCounts <= 0) return `Limit request anda sudah habis\n`
                  return `「❗」Limit Count\nSisa Limit Anda : ${limitCounts}\n\nNOTE : Untuk Mendapatkan Limit Bisa Lewat Naik Level Di Group Atau Buy limit.`
                  found = true;
               }
            }
            if (found === false) {
               let obj = { id: sender, limit: 0 };
               _limit.push(obj);
               fs.writeFileSync('./database/limit.json', JSON.stringify(_limit));
               return `limit anda : ${limitCounts}`
            }
         };

         const isLimit = (sender, _limit) => {
            let position = false;
            for (let i of _limit) {
               if (i.id === sender) {
                  let limits = i.limit;
                  if (limits >= config.limitawal) {
                     position = true;
                     return true;
                  } else {
                     _limit;
                     position = true;
                     return false;
                  }
               }
            }
            if (position === false) {
               const obj = { id: sender, limit: 1 };
               _limit.push(obj);
               fs.writeFileSync('./database/limit.json', JSON.stringify(_limit));
               return false;
            }
         };

const limitAdd = (sender, _limit) => {
   let position = false;
   Object.keys(_limit).forEach((i) => {
      if (_limit[i].id == sender) {
         position = i;
      }
   });
   if (position !== false) {
      _limit[position].limit += 1;
      fs.writeFileSync('./database/limit.json', JSON.stringify(_limit));
   }
};
         
module.exports = { 
	checkLimit,
	isLimit,
	limitAdd
}