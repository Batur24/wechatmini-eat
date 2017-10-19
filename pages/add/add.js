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

  formSubmt: function (e) {
    let that = this;
    let menuName = e.detail.value.menuName;
    wx.request({
      url: app.globalData.url + '/addmenu/',
      data: {
        name: that.data.userInfo.nickName,
        menu: menuName
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
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