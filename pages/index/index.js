var dataObj = require("../../data/data.js");
import {
  $wuxFilterBar
} from '../../components/wuxfilterbar'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: '',
    winWidth: 0,
    winHeight: 0,
    currentData: 0,
    active: false,
    movies: [{
        url: 'http://106.12.109.65/yousai_img/banner%20(1).png'
      },
      {
        url: 'http://106.12.109.65/yousai_img/banner%20(2).png'
      },
      {
        url: 'http://106.12.109.65/yousai_img/banner%20(3).png'
      },
      {
        url: 'http://106.12.109.65/yousai_img/banner%20(4).png'
      },
      {
        url: 'http://106.12.109.65/yousai_img/banner%20(5).png'
      },
      {
        url: 'http://106.12.109.65/yousai_img/banner%20(6).png'
      }
    ],
    beforeColor: "#898285", //指示点颜色
    afterColor: "#FC7745", //当前选中的指示点颜色
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
    }, ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postList = wx.getStorageSync("postList")
    this.setData({
      postList: dataObj.postList
    })
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
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
  getLocation() {
    this.checkLocation();

    let that = this;
    wx.chooseLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude;
        that.setData({
          address: "经纬度：" + longitude + ", " + latitude,
        })
      }
    });
  },
  //校验位置权限是否打开
  checkLocation() {
    let that = this;
    //选择位置，需要用户授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.showToast({ //这里提示失败原因
                title: '授权成功！',
                duration: 1500
              })
            },
            fail() {
              that.showSettingToast('需要授权位置信息');
            }
          })
        }
      }
    })
  },
  // 打开权限设置页提示框
  showSettingToast: function (e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
  },
  searchtap:function(){
    wx.navigateTo({
      url: 'search/search',
    })
  },
  detailsaishi: function(event) {
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'detail/detail?id=' + postId,
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
    if (this.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  //获取当前滑块的index
  bindChange: function(e) {
    this.setData({
      currentData: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(options) {

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