var dataObj = require("../../data/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['历史今日', '关注捷报', '视频', '随便看看'],
    currentTab: 0,
  },



  //点击进入页面详情

  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      newsList: dataObj.newsList,
      newsFollow: dataObj.newsFollow,
      newsFollow1: dataObj.newsFollow1,
      newsFollow2: dataObj.newsFollow2,
      newsFollow3: dataObj.newsFollow3,
      newsLook: dataObj.newsLook
    })
    // var that = this
    // wx.request({
    //   url: '',
    //   data: {},
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    // success: function (res) {
    //   // console.log(res.data)
    //   setTimeout(() => {
    //    that.setData({
    //       isHideLoadMore: true,
    //           newsList:res.data
    //         })
    //   }, 0)

    // }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})