const fs = require("fs-extra")
const crypto = require('crypto')

//************LEVEL************//
    const getLevelingXp = (sender, _level) => {
      let position = false
      Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
          position = i
        }
      })
      if (position !== false) {
        return _level[position].xp
      } else {
   	return '0'
    }
    }
    
    const jadiUser = (userid, sender, age, time, serials) => {
      const obj = { id: userid, name: sender, age: age, time: time, serial: serials }
      user.push(obj)
      fs.writeFileSync('./database/user.json', JSON.stringify(user))
    }
    
    const bikinSerial = (size) => {
      return crypto.randomBytes(size).toString('hex').slice(0, size)
    }
    
    const getLevelingLevel = (sender, _level) => {
      let position = false
      Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
          position = i
        }
      })
      if (position !== false) {
        return _level[position].level
      } else {
   	return '0'
    }
    }
    const getLevelingId = (sender, _level) => {
      let position = false
      Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
          position = i
        }
      })
      if (position !== false) {
        return _level[position].id
      }
    }
    const addLevelingXp = (sender, _level, amount) => {
      let position = false
      Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
          position = i
        }
      })
      if (position !== false) {
        _level[position].xp += amount
        fs.writeFileSync('./database/level.json', JSON.stringify(_level))
      }
    }
    
    const addLevelingLevel = (sender, _level, amount) => {
      let position = false
      Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
          position = i
        }
      })
      if (position !== false) {
        _level[position].level += amount
        fs.writeFileSync('./database/level.json', JSON.stringify(_level))
      }
    }
    
    const addLevelingId = (sender, _level) => {
      const obj = {id: sender, xp: 1, level: 1}
      _level.push(obj)
      fs.writeFileSync('./database/level.json', JSON.stringify(_level))
    }
    
module.exports = { 
	getLevelingXp, 
	jadiUser,
	bikinSerial,
	getLevelingLevel, 
	getLevelingId, 
	addLevelingXp,
	addLevelingLevel,
	addLevelingId,
}