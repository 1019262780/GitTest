var dataObj = require("../../data/data.js");
import {
  $wuxFilterBar
} from '../../components/wuxfilterbar'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['动态', '关注'],
    currentTab: 0,
    items: [{
      type: 'filter',
      label: '../../images/icon/1.png',
      value: 'filter',
      children: [{
        type: 'checkbox',
        label: '竞赛类别（复选）',
        value: 'genre',
        children: [{
          label: '全部',
          value: '1',
        },
        {
          label: '工科类',
          value: '2',
        },
        {
          label: '理科类',
          value: '3',
        },
        {
          label: '商科类',
          value: '4',
        },
        {
          label: '文体类',
          value: '5',
        },
        {
          label: '艺术类',
          value: '6',
        },
        {
          label: '综合类',
          value: '7',
        },

        ],
      },
      {
        type: 'radio',
        label: '竞赛级别',
        value: 'grade',
        children: [{
          label: '全部',
          value: '1',
        },
        {
          label: '校级',
          value: '2',
        },
        {
          label: '市级',
          value: '3',
        },
        {
          label: '省级',
          value: '4',
        },
        {
          label: '国家级',
          value: '5',
        },
        {
          label: '国际级',
          value: '6',
        },
        {
          label: '自由',
          value: '7',
        },
        ]
      },
      {
        type: 'radio',
        label: '排序方式',
        value: 'way',
        children: [{
          label: '最热',
          value: '1',
        },
        {
          label: '最新',
          value: '2',
        },
        {
          label: '近期报名',
          value: '3',
        },
        ]
      }
      ],
      groups: ['001', '002', '003'], //判断元素是否同组
    },],
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shareDynamic = wx.getStorageSync("shareDynamic");
    this.setData({
      shareDynamic: dataObj.shareDynamic
    })
    this.$wuxFilterBar = $wuxFilterBar.init({
      items: this.data.items,
      onChange: (checkedItems, items) => {
        console.log(this, checkedItems, items)
        const params = {}
        checkedItems.forEach((n) => {
          if (n.value === 'filter') {
            console.log("选中的标题内容为：" + n.value);
            n.children.filter((n) => n.selected).forEach((n) => {
              if (n.value === 'query') {
                console.log("选中的具体内容为：" + n.value);

                const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                params.query = selected;
                var arr = params.query;
                var newarr = arr.split(" ");
                console.log(typeof params.query);
                console.log("最终选中的内容为：" + newarr);
              }
            })
          }
        })
      },
    })

  },
  shareTap:function(event){
    var shareId = event.currentTarget.dataset.shareId;
    var shareDynamic = wx.getStorageSync("shareDynamic");
    var sharedetail = shareDynamic[shareId - 1];
    shareDynamic[shareId-1]=sharedetail;
    wx.setStorageSync("shareDynamic", shareDynamic);
    this.setData({
      shareDynamic: dataObj.shareDynamic
    })
    wx.navigateTo({
      url: "shareDynamic/shareDynamic?id=" + shareId,
    })
  },
  searchtap: function () {
    wx.navigateTo({
      url: 'search/search',
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    return {
      title: "优赛分享圈",
      path: "/pages/share/share",
      success: function (res) {
        console.log("成功", res)
      }
    }
  }
})