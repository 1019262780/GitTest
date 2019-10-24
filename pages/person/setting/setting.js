// pages/person/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  ziliaoTap: function () {
    wx.navigateTo({
      url: '../../personal/personal'
    })
  },
  aboutUsTap: function () {
    wx.navigateTo({
      url: '../../person/aboutUs/aboutUs'
    })
  },
  newsTap: function () {
    wx.navigateTo({
      url: '../../person/news/news'
    })
  },
  useTap: function () {
    wx.navigateTo({
      url: '../../person/use/use'
    })
  },
  changeTap: function () {
    wx.navigateTo({
      url: '../../person/change/change'
    })
  },
  zhangTap: function () {
    wx.navigateTo({
      url: '../../person/zhanghao/zhanghao'
    })
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