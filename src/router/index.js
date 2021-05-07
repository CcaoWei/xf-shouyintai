import Vue from 'vue'
import Router from 'vue-router'
import login from "@/view/login/login"
import loginByCode from "@/view/login/loginByCode"
import forget from "@/view/login/forget"
import resetPassWord from "@/view/login/resetPassWord"
import updatePassWord from "@/view/login/updatePassWord"
import register from "@/view/login/register"
import agreement from "@/view/register/agreement"
import registerShop from "@/view/register/addShop"
import editShop from "@/view/register/edit"
import uploadPaper from "@/view/register/uploadPaper"
import verifi from "@/view/login/verifi"
import entrance from '@/components/entrance'//暂时入口
// import test1 from '@/view/test1'
import cashierBase from '@/view/cashier/base'
import goods from '@/view/cashier/goods'
import goodDetail from '@/view/cashier/goodDetail'
import dayReport from '@/view/cashier/dayReport'
import order from '@/view/cashier/order'
import orderResult from '@/view/cashier/orderResult'
import qrcode from '@/view/cashier/qrcode'
import ridetails from '@/view/stockManage/ridetails.vue'
import receipt from '@/view/stockManage/receipt.vue'
import issue from '@/view/stockManage/issue.vue'
import receiptManage from '@/view/stockManage/receiptManage.vue'
import issueManage from '@/view/stockManage/issueManage.vue'
import returnManage from '@/view/stockManage/returnManage.vue'
import orderDetails from '@/view/stockManage/orderDetails.vue'
import returnDetails from '@/view/stockManage/returnDetails.vue'
// import priceManage from "@/view/priceManage/main";
import productList from "@/view/priceManage/index";
import productDetail from "@/view/priceManage/productDetail";
// import salesdata from "@/view/priceManage/salesdata";
// import grossProfit from "@/view/priceManage/grossProfit";
// import orderList from "@/view/priceManage/orderList";
// import orderDetail from "@/view/priceManage/orderDetail";
// import chargeback from "@/view/priceManage/chargeback";
// import chargebackDetail from "@/view/priceManage/chargebackDetail";
// import memberData from "@/view/priceManage/memberData";
// import bestSaleGoods from "@/view/priceManage/bestSaleGoods";
// import passengerFlow from "@/view/priceManage/passengerFlow";
// import passengerUnitPrice from "@/view/priceManage/passengerUnitPrice";
// import datePage from "@/view/priceManage/datePage";
import inventory from "@/view/inventory/base";
import inventoryDetails from "@/view/inventory/details";
import inventoryAdd from "@/view/inventory/add";
import inventoryEdit from "@/view/inventory/edit";
import inventoryErrorDetail from "@/view/inventory/errorDetail";
import stockControl from "@/view/stockControl/base";
import stockControlDetail from "@/view/stockControl/detail";
import storeDashBord from "@/view/storeDashBord/storeDashBord";
import storeDetails from "@/view/storeDashBord/details";
import businessChart from "@/view/businessChart/base";
import orderManage from "@/view/orderManage/base";
import orderManageDetails from "@/view/orderManage/details";
import returnManageBase from "@/view/returnManage/base";
import returnManageDetails from "@/view/returnManage/details";
import storeManagement from '@/view/storeManagement/index';
import editNotice from '@/view/storeManagement/editNotice';
import storeSetup from '@/view/storeManagement/storeSetup';
import addStore from '@/view/storeManagement/addStore';
import shoperManage from "@/view/shoperManage/base";
import shoperAdd from "@/view/shoperManage/add";
import shoperDetails from "@/view/shoperManage/shoperDetails";
import cashierDetails from "@/view/shoperManage/cashierDetails";
import shopownerManage from '@/view/shopownerManage/base.vue';
import shopownerDetails from '@/view/shopownerManage/details.vue';
import shopownerAdd from '@/view/shopownerManage/add.vue';
import handoverDetail from '@/view/shoperManage/handoverDetail.vue';
import shiftRecord from '@/view/shiftRecord/base.vue';
import sRDetail from '@/view/shiftRecord/detail.vue';
import orderlist from '@/view/orderlist/base.vue';
import oLDetail from '@/view/orderlist/detail.vue';
import orderSearch from '@/view/orderlist/search.vue';
import historyDetail from '@/view/orderlist/historyDetail.vue';
import goodsList from '@/view/goodsList/base.vue';
import goodsListDetail from '@/view/goodsList/details.vue';
import goodsListEdit from '@/view/goodsList/edit.vue';
import goodsListIntroduce from '@/view/goodsList/introduce.vue';
import goodsSearch from '@/view/goodsList/search.vue';
import goodsSetting from '@/view/goodsList/goodsSetting';
import goodsType from '@/view/goodsType/base.vue';
import goodsTypeEdit from '@/view/goodsType/edit.vue';
import goodsClass from '@/view/goodsClass/base.vue';
import goodsClassEdit from '@/view/goodsClass/edit.vue';
import goodsBrand from '@/view/goodsBrand/base.vue';
import goodsBrandEdit from '@/view/goodsBrand/edit.vue';
import goodsUnit from '@/view/goodsUnit/base.vue';
import goodsUnitEdit from '@/view/goodsUnit/edit.vue';
import editMember from '@/view/member/edit.vue';
import stockOrder from '@/view/order/order.vue';
import stockOrderEdit from '@/view/order/edit.vue';
import stockOrderDetail from '@/view/order/detail.vue';
import allocation from '@/view/allocation/allocation.vue';
import allocationEdit from '@/view/allocation/edit.vue';
import allocationDetail from '@/view/allocation/detail.vue';
import memberResult from '@/view/member/result.vue';


Vue.use(Router);
// const datePageRouter = {
//   path: 'datePage',
//   name: '选择时间',
//   component: datePage,
//   props: true
// };
export default new Router({
  // mode:"history",
  routes: [
    {
      path: '/',
      component: login,
      meta: {
        name: '登录'
      },
      props: true
    },
    {
      path: '/entrance',
      component: entrance,
      meta: {
        name: 'entrance',
      },
      children: [

        // {
        //   path: 'salesdata',
        //   name: '销售统计',
        //   component: salesdata,
        //   props: true,
        //   icon: "bar-chart-o",
        //   meta: {
        //     type: 2
        //   },
        //   children: [
        //     datePageRouter,
        //     {
        //       path: 'grossProfit',
        //       name: '毛利统计',
        //       component: grossProfit,
        //       props: true
        //     },
        //     {
        //       path: 'orderList',
        //       name: '订单',
        //       component: orderList,
        //       props: true,
        //       children: [
        //         {
        //           path: 'orderDetail',
        //           name: '订单详情',
        //           component: orderDetail,
        //           props: true,
        //         }
        //       ]
        //     },
        //     {
        //       path: 'chargeback',
        //       name: '退单',
        //       component: chargeback,
        //       props: true,
        //       children: [
        //         {
        //           path: 'chargebackDetail',
        //           name: '退单详情',
        //           component: chargebackDetail,
        //           props: true,
        //         }
        //       ]
        //     },
        //     {
        //       path: 'memberData',
        //       name: '会员统计',
        //       component: memberData,
        //       props: true
        //     },
        //   ]
        // },
        // {
        //   path: 'bestSaleGoods',
        //   name: '畅销商品',
        //   component: bestSaleGoods,
        //   props: true,
        //   icon: "hot-o",
        //   meta: {
        //     type: 2
        //   },
        //   children: [datePageRouter]
        // },
        // {
        //   path: 'passengerFlow',
        //   name: '客流量',
        //   component: passengerFlow,
        //   props: true,
        //   icon: "friends-o",
        //   meta: {
        //     type: 2
        //   },
        //   children: [datePageRouter]
        // },
        // {
        //   path: 'passengerUnitPrice',
        //   name: '客单价',
        //   component: passengerUnitPrice,
        //   props: true,
        //   icon: "after-sale",
        //   meta: {
        //     type: 2
        //   },
        //   children: [datePageRouter]
        // },

        {
          path: 'cashierBase',
          component: cashierBase,
          props: true,
          icon: "cash-on-deliver",
          meta: {
            name: '收银',
            type: 1,
            isKeepAlive: true
          },
          children: [

            {
              path: 'order',
              component: order,
              meta: {
                name: '待收银'
              },
              props: true

            },
            {
              path: 'orderResult',
              component: orderResult,
              meta: {
                name: '结算成功'
              },
              props: true
            },
            {
              path: 'qrcode',
              component: qrcode,
              meta: {
                name: '扫码'
              },
              props: true

            },
          ]
        },
        {
          path: 'goods',
          component: goods,
          props: true,
          icon: "wap-home-o",
          meta: {
            type: 1,
            name: '库存'
          },
          children: [
            {
              path: 'goodDetail',
              component: goodDetail,
              meta: {
                type: 1,
                name: '库存详情'
              },
              props: true

            },
          ]
        },
        {
          path: 'orderlist',
          component: orderlist,
          icon: "completed",
          meta: {
            name: '订单',
            type: 1,
            isKeepAlive: true
          },
          children: [
            {
              path: "oLDetail",
              component: oLDetail,
              meta: {
                name: '订单详情'
              },
              props: true
            },
            {
              path: "search",
              component: orderSearch,
              meta: {
                name: '订单记录'
              },
              props: true
            },
            {
              path: "hsDetail",
              component: historyDetail,
              meta: {
                name: '订单详情'
              },
              props: true
            },
          ]
        },
        {
          path: 'shiftRecord',
          component: shiftRecord,
          icon: "records",
          meta: {
            name: '交接班',
            type: 1,
            isKeepAlive: true
          },
          children: [
            {
              path: "sRDetail",
              component: sRDetail,
              meta: {
                name: '记录详情',
              },
              props: true
            },
          ]
        },
        {
          path: 'dayReport',
          component: dayReport,
          props: true,
          icon: "cashier-o",
          meta: {
            type: 1,
            name: '每日结算',
          }
        },
        {
          path: 'addMember',
          component: editMember,
          props: true,
          icon: "friends-o",
          meta: {
            name: '新增会员',
            type: 1,
            isKeepAlive: true
          },
          children: [
            {
              path: 'result',
              component: memberResult,
              meta: {
                name: '新增成功'
              },
              props: true
            },
          ]
        },
        {
          path: 'stock',
          component: ridetails,
          props: true,
          icon: "description",
          meta: {
            type: 3,
            name: "出入库明细",
          },
          children: [
            {
              path: "receipt",
              component: receipt,
              meta: {
                name: "入库单明细",
              },
              props: true

            },
            {
              path: "issue",
              component: issue,
              meta: {
                name: "出库单明细",
              },
              props: true
            }
          ]
        },
        {
          path: 'addMember',
          component: editMember,
          props: true,
          icon: "friends-o",
          meta: {
            name: '新增会员',
            type: 3,
            isKeepAlive: true
          },
          children: [
            {
              path: 'result',
              component: memberResult,
              meta: {
                name: '新增成功'
              },
              props: true
            },
          ]
        },
        {
          path: 'stockOrder',
          component: stockOrder,
          props: true,
          icon: "debit-pay",
          meta: {
            name: '订货',
            type: 3,
            isKeepAlive: true
          },
          children: [
            {
              path: 'add',
              component: stockOrderEdit,
              meta: {
                name: '新建订货单'
              },
              props: true
            },
            {
              path: 'detail',
              component: stockOrderDetail,
              meta: {
                name: '订货单'
              },
              props: true
            },
          ]
        },
        {
          path: 'allocation',
          component: allocation,
          props: true,
          icon: "debit-pay",
          meta: {
            name: '商品调拨',
            type: 3,
            isKeepAlive: true
          },
          children: [
            {
              path: 'add',
              component: allocationEdit,
              meta: {
                name: '新建调拨单'
              },
              props: true
            },
            {
              path: 'detail',
              component: allocationDetail,
              meta: {
                name: '调拨单'
              },
              props: true
            },
          ]
        },
        {
          path: 'receiptManage',
          component: receiptManage,
          props: true,
          icon: "debit-pay",
          meta: {
            type: 3,
            name: '商品入库',
          },
        },
        {
          path: 'issueManage',
          component: issueManage,
          props: true,
          icon: "credit-pay",
          meta: {
            type: 3,
            name: '出库管理',
          },
        },
        {
          path: 'returnManage',
          component: returnManage,
          props: true,
          icon: "orders-o",
          meta: {
            name: '退货管理',
            type: 3,
            isKeepAlive: true
          },
          children: [
            {
              path: 'orderDetails',
              component: orderDetails,
              meta: {
                name: '订单详情',
              },
              props: true

            },
            {
              path: 'returnDetails',
              component: returnDetails,
              meta: {
                name: '退单详情',
              },
              props: true
            }
          ]
        },
        {
          path: 'inventory',
          component: inventory,
          props: true,
          icon: "browsing-history-o",
          meta: {
            name: '盘点',
            type: 3,
            isKeepAlive: true
          },
          children: [
            {
              path: 'details',
              component: inventoryDetails,
              meta: {
                name: '盘点详情'
              },
              props: true
            },
            {
              path: 'add',
              component: inventoryAdd,
              meta: {
                name: '新建盘点单'
              },
              props: true
            },
            {
              path: 'edit',
              component: inventoryEdit,
              meta: {
                name: '继续盘点'
              },
              props: true
            },
            {
              path: 'errorDetail',
              component: inventoryErrorDetail,
              meta: {
                name: '异常情况'
              },
              props: true
            }
          ]
        },
        {
          path: 'stockControl',
          component: stockControl,
          props: true,
          icon: "points",
          meta: {
            name: '库存管理',
            type: 3
          },
          children: [
            {
              path: 'detail',
              component: stockControlDetail,
              meta: {
                name: '全店库存'
              },
              props: true
            }
          ]
        },
        {
          path: 'storeDashBord',
          component: storeDashBord,
          props: true,
          icon: "discount",
          meta: {
            name: '店铺销售额',
            type: 2,
            isKeepAlive: true
          },
          children: [
            {
              path: 'details',
              component: storeDetails,
              meta: {
                name: '店铺明细'
              },
              props: true,
            },
          ]
        },
        {
          path: 'businessChart',
          component: businessChart,
          props: true,
          icon: "coupon-o",
          meta: {
            name: '营业报表',
            type: 2
          },
          children: []
        },
        {
          path: 'orderManage',
          component: orderManage,
          props: true,
          icon: "after-sale",
          meta: {
            name: '订单管理',
            type: 2,
            isKeepAlive: true
          },
          children: [
            {
              path: 'details',
              component: orderManageDetails,
              meta: {
                name: '订单详情',
              },
              props: true
            },
          ]
        },
        {
          path: 'storeManagement',
          props: true,
          component: storeManagement,
          icon: 'shop-o',
          meta: {
            name: '店铺管理',
            type: 2
          },
          children: [
            {
              path: 'storeSetup',
              component: storeSetup,
              props: true,
              meta: {
                name: '门店设置',
              }
            },
            {
              path: 'editNotice',
              component: editNotice,
              props: true,
              meta: {
                name: '发布通知',
              }
            },
            {
              path: 'addStore',
              component: addStore,
              props: true,
              meta: {
                name: '新增门店',
              }
            },
          ]
        },
        {
          path: 'shopownerManage',
          component: shopownerManage,
          props: true,
          icon: 'manager-o',
          meta: {
            name: "店长管理",
            type: 2,
            isKeepAlive: true
          },
          children: [
            {
              path: 'details',
              component: shopownerDetails,
              meta: {
                name: "店长详情"
              },
              props: true
            },
            {
              path: 'add',
              component: shopownerAdd,
              meta: {
                name: "新增店长"
              },
              props: true
            }
          ]
        },
        {
          path: 'shoperManage',
          component: shoperManage,
          props: true,
          icon: "friends-o",
          meta: {
            name: '店员管理',
            type: 2,
            isKeepAlive: true
          },
          children: [

            {
              path: 'handoverDetail',
              component: handoverDetail,
              meta: {
                name: '交班详情'
              },
              props: true
            },
            {
              path: 'add',
              component: shoperAdd,
              meta: {
                name: '新增店员'
              },
              props: true
            },
            {
              path: 'shoperDetails',
              component: shoperDetails,
              meta: {
                name: '店员详情'
              },
              props: true
            },
            {
              path: 'cashierDetails',
              component: cashierDetails,
              meta: {
                name: '收银员详情'
              },
              props: true
            },
          ]
        },
        {
          path: 'addMember',
          component: editMember,
          props: true,
          icon: "friends-o",
          meta: {
            name: '新增会员',
            type: 2,
            isKeepAlive: true
          },
          children: [
            {
              path: 'result',
              component: memberResult,
              meta: {
                name: '新增成功'
              },
              props: true
            },
          ]
        },
        {
          path: 'verifi',
          component: verifi,
          props: true,
          icon: "bag-o",
          meta: {
            name: '修改密码',
            type: 2,
            isKeepAlive: true
          },
          children: [
            {
              path: 'updatePassWord',
              component: updatePassWord,
              meta: {
                name: '修改密码'
              },
              props: true
            }
          ]
        },
        {
          path: 'storeDashBord',
          component: storeDashBord,
          props: true,
          icon: "discount",
          meta: {
            name: '店铺销售额',
            type: 4,
            isKeepAlive: true
          },
          children: [
            {
              path: 'details',
              component: storeDetails,
              meta: {
                name: '店铺明细'
              },
              props: true,
            },
          ]
        },
        {
          path: 'addMember',
          component: editMember,
          props: true,
          icon: "friends-o",
          meta: {
            name: '新增会员',
            type: 4,
            isKeepAlive: true
          },
          children: [
            {
              path: 'result',
              component: memberResult,
              meta: {
                name: '新增成功'
              },
              props: true
            },
          ]
        },
        {
          path: 'productList',
          component: productList,
          props: true,
          icon: "gold-coin-o",
          meta: {
            name: '销售价格管理',
            type: 4,
            isKeepAlive: true
          },
          children: [
            {
              path: 'productDetail',
              component: productDetail,
              meta: {
                name: '商品详情'
              },
              props: true,
            }
          ]
        },
        {
          path: 'goodsList',
          component: goodsList,
          props: true,
          icon: "cart-o",
          meta: {
            name: '商品列表',
            type: 4,
            isKeepAlive: true
          },
          children: [
            {
              path: 'details',
              component: goodsListDetail,
              meta: {
                name: '商品详情'
              },
              props: true

            },
            {
              path: 'add',
              component: goodsListEdit,
              meta: {
                name: "新增商品",
              },
              props: true,
              children: [
                {
                  path: 'introduce',
                  component: goodsListIntroduce,
                  meta: {
                    name: "商品介绍",
                  },
                  props: true
                }
              ]
            },
            {
              path: 'edit',
              component: goodsListEdit,
              meta: {
                name: "编辑商品",
              },
              props: true,
              children: [
                {
                  path: 'introduce',
                  component: goodsListIntroduce,
                  meta: {
                    name: "商品介绍",
                  },
                  props: true
                }
              ]
            },
            {
              path: 'search',
              component: goodsSearch,
              props: true,
              meta: {
                name: "商品搜索",
                isKeepAlive: true
              },
            },
          ]
        },
        {
          path: 'goodsSetting',
          component: goodsSetting,
          props: true,
          icon: "expand-o",
          meta: {
            name: '商品设置',
            type: 4,
            isKeepAlive: true
          },
          children: [
            {
              path: 'goodsType',
              component: goodsType,
              meta: {
                name: '商品类型',
                isKeepAlive: true
              },
              children: [
                {
                  path: 'add',
                  component: goodsTypeEdit,
                  meta: {
                    name: "新增类型"
                  },
                  props: true
                },
                {
                  path: 'edit',
                  component: goodsTypeEdit,
                  meta: {
                    name: "编辑类型"
                  },
                  props: true,
                },
              ]
            },
            {
              path: 'goodsClass',
              component: goodsClass,
              meta: {
                name: '商品管理分类',
                isKeepAlive: true
              },
              children: [
                {
                  path: 'add',
                  component: goodsClassEdit,
                  meta: {
                    name: "新增管理分类"
                  },
                  props: true
                },
                {
                  path: 'edit',
                  component: goodsClassEdit,
                  meta: {
                    name: "编辑管理分类"
                  },
                  props: true,
                },
              ]
            },
            {
              path: 'goodsBrand',
              component: goodsBrand,
              meta: {
                name: '商品品牌',
                isKeepAlive: true
              },
              children: [
                {
                  path: 'add',
                  component: goodsBrandEdit,
                  meta: {
                    name: "新增商品品牌"
                  },
                  props: true
                },
                {
                  path: 'edit',
                  component: goodsBrandEdit,
                  meta: {
                    name: "编辑商品品牌"
                  },
                  props: true,
                },
              ]
            },
            {
              path: 'goodsUnit',
              component: goodsUnit,
              meta: {
                name: '商品计量单位',
                isKeepAlive: true
              },
              children: [
                {
                  path: 'add',
                  component: goodsUnitEdit,
                  meta: {
                    name: "新增计量单位"
                  },
                  props: true
                },
                {
                  path: 'edit',
                  component: goodsUnitEdit,
                  meta: {
                    name: "编辑计量单位"
                  },
                  props: true,
                },
              ]
            }
          ]
        },
        {
          path: 'orderManage',
          component: orderManage,
          props: true,
          icon: "after-sale",
          meta: {
            name: '订单管理',
            type: 4,
            isKeepAlive: true
          },
          children: [
            {
              path: 'details',
              component: orderManageDetails,
              meta: {
                name: '订单详情',
              },
              props: true
            },
          ]
        },
        {
          path: 'returnManageBase',
          component: returnManageBase,
          props: true,
          icon: "cash-back-record",
          meta: {
            name: '退单管理',
            type: 4,
            isKeepAlive: true
          },
          children: [
            {
              path: 'details',
              component: returnManageDetails,
              meta: {
                name: '退单详情'
              },
              props: true
            },
          ]
        },
        {
          path: 'shoperManage',
          component: shoperManage,
          props: true,
          icon: "friends-o",
          meta: {
            name: '店员管理',
            type: 4,
            isKeepAlive: true
          },
          children: [

            {
              path: 'handoverDetail',
              component: handoverDetail,
              meta: {
                name: '交班详情'
              },
              props: true
            },
            {
              path: 'add',
              component: shoperAdd,
              meta: {
                name: '新增店员'
              },
              props: true
            },
            {
              path: 'shoperDetails',
              component: shoperDetails,
              meta: {
                name: '店员详情'
              },
              props: true
            },
            {
              path: 'cashierDetails',
              component: cashierDetails,
              meta: {
                name: '收银员详情'
              },
              props: true
            },
          ]
        },
        {
          path: 'verifi',
          component: verifi,
          props: true,
          icon: "bag-o",
          meta: {
            name: '修改密码',
            type: 4,
            isKeepAlive: true
          },
          children: [
            {
              path: 'updatePassWord',
              component: updatePassWord,
              meta: {
                name: '修改密码'
              },
              props: true
            }
          ]
        },
      ]
    },
    {
      path: '/loginByCode',
      component: loginByCode,
      meta: {
        name: "验证码登录"
      },
      props: true
    },
    {
      path: '/forget',
      component: forget,
      meta: {
        name: "忘记密码"
      },
      props: true
    },
    {
      path: '/resetPassWord',
      component: resetPassWord,
      meta: {
        name: "重置密码"
      },
      props: true
    },
    {
      path: '/register',
      component: register,
      meta: {
        name: "注册账号"
      },
      props: true,
      children: [
        {
          path: 'agreement',
          component: agreement,
          meta: {
            name: '用户协议'
          },
          props: true
        },
        {
          path: 'addShop',
          component: registerShop,
          meta: {
            name: "添加店铺"
          },
          props: true
        },
        {
          path: 'edit',
          component: editShop,
          meta: {
            name: "添加店铺信息",
            isKeepAlive: true
          },
          props: true
        },
        {
          path: 'uploadPaper',
          component: uploadPaper,
          meta: {
            name: "上传证件"
          },
          props: true
        }

      ]
    },
  ]
})
