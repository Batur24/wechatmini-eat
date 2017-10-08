import { log, random } from '../../utils/util.js'

var app = getApp()
Page({
  data: {
    motto: '今天想吃什么',
    menu: '今天吃什么？吃什么？',
    beginButton: '开始选餐',
    menus: [],
    newMenu: "",
    addMenuDisplay: true,
    begin: false,
    userInfo: {},
    timer: undefined
  },

  onLoad: function () {
    log('onLoad')
    let that = this
    wx.setNavigationBarTitle({
      title: '今天吃什么'
    })

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
      begin: !this.data.begin
    })
  },

  setTimer: function (newTimer) {
    this.setData({
      timer: newTimer
    })
  },

  beginSelectMenu: function () {
    let that = this;
    that.toggleBeginStatus();
    if (that.data.begin) {
      let timer = setInterval(function () {
        that.setData({
          menu: random(that.data.menus),
          addMenuDisplay: false,
          beginButton: '停止'
        })
      }, 100);
      that.setTimer(timer)
    } else {
      clearInterval(that.data.timer);
      that.setData({
        beginButton: '开始选餐'
      })
    }
  },

  InputMenu: function (e) {
    this.data.newMenu = e.detail.value
  },

  userLogin: function () {
    let that = this;
    wx.request({
      url: 'https://batur.91laysen.cn/login/',
      data: {
        name: this.userInfo.nickName
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
