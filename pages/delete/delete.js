
import { log } from '../../utils/util.js'
var app = getApp()

Page({

  data: {
    menus: [],
    userInfo: null
  },

  onLoad: function (options) {
    let menusObj = []
    app.globalData.allMenus.forEach(item => menusObj.push({ "name": item, "imgStatus": "/images/unSelected.png", "status": false }));
    log(menusObj)
    this.setData({
      menus: menusObj,
      userInfo: app.globalData.userInfo
    })
  },

  toggleSelectMenu: function (e) {
    let that = this;
    let newMenus = this.data.menus;
    let menu = e.currentTarget.dataset.menu;
    let index = newMenus.findIndex(item => item.name == menu.name)
    log(index)
    log(menu)
    log(newMenus)
    if (menu.status) {
      menu.imgStatus = "/images/unSelected.png"
    } else {
      menu.imgStatus = "/images/selected.png"
    }
    menu.status = !menu.status
    newMenus[index] = menu
    this.setData({
      menus: newMenus
    })
  },

  deleteMenu: function (e) {
    let that = this;
    wx.request({
      url: app.globalData.url + '/deletemenu/',
      data: {
        "menus": that.data.menus.filter(menu => menu.status == true),
        "name": that.data.userInfo.nickName
      },
      method: 'POST',
      success: function (res) {
        wx.navigateBack()
        log(res)
      }
    })
  },

  onShow: function () {
    log("abc")
    log(app.globalData.allMenus)
  },

})