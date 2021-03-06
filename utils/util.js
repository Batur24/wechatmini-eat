function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function random(items) {
  var item = items[Math.floor(Math.random() * items.length)]
  return item
}

function sleep(ms) {
  setTimeout(function(){}, ms);
}

const log = (msg) => {
  console.log(msg)
}

const toggleData = (item, items) => {
  let index = items.indexOf(item);
  if(index > -1){
    items.splice(index, 1)
  }else{
    items.push(item)
  }
  return items
}

function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

module.exports = {
  formatTime: formatTime,
  random: random,
  sleep: sleep,
  log: log,
  toggleData: toggleData,
  remove: remove
}
