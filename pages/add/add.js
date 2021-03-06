import { log } from '../../utils/util'

var app = getApp()
Page({

  data: {
    userInfo: null,
    inputNum: ["n0"],
    menu: []
  },

  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  addMenu: function () {
    let newInputNum = this.data.inputNum;
    newInputNum.push("n" + newInputNum.length);
    this.setData({
      inputNum: newInputNum
    })
  },

  addToMenus: function (e) {
    let tempMenus = this.data.menu;
    let v = e.detail.value;
    tempMenus.push(v);
    tempMenus = Array.from(new Set(tempMenus));
    tempMenus.filter(item => item);
    this.setData({
      menu: tempMenus
    })
  },

  formSubmt: function (e) {
    let that = this;
    wx.request({
      url: app.globalData.url + '/addmenu/',
      data: {
        name: that.data.userInfo.nickName,
        menu: that.data.menu
      },
      method: 'POST',
      success: function (res) {
        app.globalData.allMenus = app.globalData.allMenus.concat(that.data.menu)
        wx.navigateBack()
        }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})