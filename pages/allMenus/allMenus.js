// pages/allMenus/allMenus.js

//import { log } from '../../utils.util'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    menus: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: '菜单'
    });

    app.getUserInfo(function(userInfo){
      that.userInfo = userInfo
      that.setData({
        userInfo:userInfo
      })
      that.getAllMenu(userInfo.nickName)
    });
  },

  getAllMenu: function(username){
    let that = this;
    wx.request({
      url: 'https://batur.91laysen.cn/mymenu/?name=' + username,
      //url: 'http://localhost:5000/mymenu/?name=' + username,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let userMenus = res.data
        console.log(userMenus)        
        that.setData({
          menus: userMenus 
        })
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
    console.log("pull down")
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