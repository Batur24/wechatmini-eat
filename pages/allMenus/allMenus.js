// pages/allMenus/allMenus.js

import { log, toggleData } from '../../utils/util.js'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    menu_amount: 0,
    menus: [],
    delSign: "",
    delList: [],
    iconColor: "gray",
    clickDelete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '菜单'
    });
    this.setData({
      userInfo: app.globalData.userInfo
    });
    this.getAllMenu(app.globalData.userInfo.nickName)
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
        app.globalData.allMenus = userMenus
        that.setData({
          menus: userMenus ,
          menu_amount: userMenus.length
        })
      }
    })
  },

  deleteMenu: function() {
    wx.navigateTo("/pages/delete/delete")
    /*
    this.setData({
      clickDelete: true
    })
    */
  },

  toggleSelectMenu: function(event) {
    let that = this
    let menu = event.currentTarget.dataset.menu
    if(that.data.delSign == "x"){
      let delList = that.data.delList
      delList = toggleData(menu, delList)
      that.setData({
        delList: delList
      })
    }
  },

  globalData: {
    allMenus: null
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