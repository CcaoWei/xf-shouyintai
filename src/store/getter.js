const getters = {
  showSidbar: (state) => state.base.showSidbar,
  cashierData: (state) => state.base.cashierData,
  loginType: (state) => state.base.loginType,
  userInfo: (state) => state.base.userInfo,
  unLock: (state) => state.base.unLock,
  dateSelect: (state) => state.base.dateSelect,
  reloadCashier: (state) => state.base.reloadCashier,
  // 库存管理
  ordersList: (state) => state.stock.ordersList,
  orderDetails: (state) => state.stock.orderDetails,
  inOrdersMsg: (state) => state.stock.inOrdersMsg,
  outOrdersMsg: (state) => state.stock.outOrdersMsg,
  goodsMsgs: (state) => state.stock.goodsMsgs,
  // returnOrders:(state) => state.stock.returnOrders,
  returnDetails: (state) => state.stock.returnDetails,
  bordTabStatus: (state) => state.base.bordTabStatus,
  goodIntroduce: (state) => state.base.goodIntroduce,
  reloadPage: (state) => state.base.reloadPage,
  businessLicenseUrl: (state) => state.base.businessLicenseUrl,
  cateringPermitUrl: (state) => state.base.cateringPermitUrl,
  selectLeft: (state) => state.base.selectLeft,

};
export default getters;
