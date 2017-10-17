import { log, random } from '../../utils/util.js'

var app = getApp()
Page({
  data: {
    dialogue: '今天吃什么？吃什么？',
    menu: '',
    beginButton: '开始选餐',
    clickTimes: 0,
    menus: [],
    newMenu: "",
    begin: false,
    userInfo: {},
    timer: undefined,
    imgUrls: [
      '/images/banner2.jpg',
      '/images/banner1.jpg',
      '/images/banner4.png',
      '/images/banner3.jpg',
    ],
    autoplay: true,
    indicatorDots: false
  },

  onLoad: function () {
    log('onLoad')
    let that = this

    app.getUserInfo(function (userInfo) {
      that.userInfo = userInfo
      that.setData({
        userInfo: userInfo
      });
      that.userLogin();
      // that.getAllMenu(userInfo.nickName)
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  toggleBeginStatus: function () {
    this.setData({
      begin: !this.data.begin,
      clickTimes: this.data.clickTimes + 1
    })
  },

  setTimer: function (newTimer) {
    this.setData({
      timer: newTimer
    })
  },

  changeDialogue: function (clickTimes) {
    let returnObj = { beginButton: "", dialogue: "你今天吃这个" }
    log(clickTimes)
    switch (clickTimes) {
      case 2:
        returnObj.beginButton = "不行，换一个"
        break
      case 4:
        returnObj.beginButton = "不行，再换一个"
        break
      case 6:
        returnObj.beginButton = "换最后一个"
        break
      case 8:
        returnObj.beginButton = "还想换"
        break
      case 10:
        returnObj.beginButton = ""
        break
    }
    log(returnObj)
    this.setData(returnObj)
},

  beginSelectMenu: function () {
    let that = this;
    that.toggleBeginStatus();
    if (that.data.begin) {
      let timer = setInterval(function () {
        that.setData({
          dialogue: "今天吃什么？吃什么？",
          menu: random(that.data.menus),
          beginButton: '停止'
        })
      }, 100);
      that.setTimer(timer)
    } else {
      clearInterval(that.data.timer);
      that.changeDialogue(that.data.clickTimes);
    }
  },

  InputMenu: function (e) {
    this.data.newMenu = e.detail.value
  },

  userLogin: function () {
    let that = this;
    wx.request({
      url: app.globalData.url + '/login',
      data: {
        name: this.userInfo.nickName,
        menu: "猪肉炖粉条,辣子鸡,手抓饭,桂林米粉,常德牛肉粉"
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        that.setData({
          newMenu: "",
          menus: res.data,
        })
      }
    })
  },

  addMenu: function () {
    let that = this
    let newMenu = this.data.newMenu
    let newMenus = this.data.menus
    if (newMenu === "") return;
    newMenus.push(newMenu)
    wx.request({
      // url: 'http://localhost:5000/addmenu/',
      url: 'https://batur.91laysen.cn/addmenu/',
      data: {
        name: this.userInfo.nickName,
        menu: newMenu
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          newMenu: "",
          menu: newMenus,
        })
      }
    })
  },

  getAllMenu: function (username) {
    let that = this;
    wx.request({
      url: 'https://batur.91laysen.cn/mymenu/?name=' + username,
      //url: 'http://localhost:5000/mymenu/?name=' + username,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let userMenus = res.data
        that.setData({
          menus: userMenus
        })
      }
    })
  }
})
