
import { log } from '../../utils/util.js'
var app = getApp()

Page({

  data: {
    menus: []
  },

  onLoad: function (options) {
    this.setData({
      menus: app.globalData.allMenus
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    log("abc")    
    log(app.globalData.allMenus)
  },

})