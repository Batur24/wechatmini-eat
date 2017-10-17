import { log } from '../../utils/util.js'

var app = getApp()

Page({

  data: {
    userInfo: {}
  },

  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})