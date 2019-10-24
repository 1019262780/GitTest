var dataObj = require("../../../data/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHistory: true,
    searchContent: "",
    searchFlag: false,//判断输入框是否有输入
    historyList: [],
    searchList: [{ postId: 1, name: "“汇新杯”新兴科技+互联网创新大赛", description: "为深入贯彻落实党的十九大报告中提出的“加快建设创...", cover: "http://106.12.109.65/yousai_img/banner%20(1).png" }]
  },
  // 一进页面，自动显示搜索历史记录
  showHistory: function () {
    this.setData({ showHistory: true },
      this.loadHistory()
    )
  },
  // 加载getStorage中的historyList
  loadHistory() {
    let that = this;
    wx.getStorage({
      key: 'historyList',
      success: function (res) {
        let historyList = res.data;
        that.setData({ historyList })
      },
      fail: function () {
        let historyList = [];
        wx.setStorage({
          key: 'historyList',
          data: historyList,
        })
        that.setData({ historyList })
      }
    })
  },

  // 点击搜索
  search: function () {
    var that = this;
    let searchContent = this.data.searchContent;
    //去掉前后空格,判断输入框内是否有searchContent，没有就退出
    searchContent = searchContent.replace(/^\s+|\s+$/g, "");
    if ((!searchContent.length > 0) && searchContent.length == "") { return false }
    // 然后把input框内的searchContent，setStorage到historyList
    let historyList = this.data.historyList;
    historyList.push(searchContent);
    //利用es6 中的Set 去重
    historyList = Array.from(new Set(historyList))
    wx.setStorage({
      key: 'historyList',
      data: historyList,
    })
    this.setData({ showHistory: false, searchContent })
    // TO DO 。。search API

  },
  // 在输入框输入时
  searchInput: function (e) {
    const searchContent = e.detail.value;
    this.setData({ searchContent })
  },
  // 点击历史记录中的记录
  bindSearchHistory: function (e) {
    this.setData({
      searchContent: e.currentTarget.dataset.history
    })
    this.search()
  },
  // 清空搜索记录
  clearHistory: function () {
    wx.setStorage({
      key: 'historyList',
      data: [],
    })
    this.loadHistory()
  },
  // 查看详情
  detail(e) {
    const postId = parseInt(e.currentTarget.dataset.postId);
    wx.navigateTo({
      url: '/pages/index/detail/detail?id=' + postId
    });
  },
  // 推荐
  recommend: (e) => {
    console.log(e)
    const postId = e.currentTarget.dataset.postId;
    wx.navigateTo({ url: '/pages/index/detail/detail?id=' + postId })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取historyList
  // 如果success，把它存到data里面的historyList
  // 如果fail,就创建一个historyList，
  onLoad: function (options) {
    this.loadHistory();
    var postList = wx.getStorageSync("postList")
    this.setData({
      postList: dataObj.postList
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
