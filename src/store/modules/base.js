import {getStore, setStore} from '@/util/store';
// import languageConfig from '@/config/language';

const base = {
  state: {
    showSidbar: false,
    cashierData: [],
    loginType: getStore({name: 'loginType'}) || 1,
    userInfo: getStore({name: 'userInfo'}) || {},
    unLock: getStore({name: 'unLock'}) || 1,
    dateSelect: getStore({name: 'dateSelect'}) || {date: 9, afterDay: "", day: ""},
    reloadCashier: false,
    bordTabStatus: 1,
    reloadPage: false,
    goodIntroduce: {
      title: "",
      content: "",
      imgs: []
    },
    businessLicenseUrl:"",
    cateringPermitUrl:"",
    selectLeft:0
  },
  mutations: {
    SET_DATE(state, dateSelect) {
      state.dateSelect.date = dateSelect.date;
      state.dateSelect.afterDay = dateSelect.afterDay || "";
      state.dateSelect.day = dateSelect.day || "";
      setStore({
        name: 'dateSelect',
        content: state.dateSelect
      })
    },
    SET_SHOWSIDBAR(state, showSidbar) {
      state.showSidbar = showSidbar;
    },
    SET_CASHIERDATA(state, cashierData) {
      state.cashierData = cashierData;
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
      setStore({
        name: 'userInfo',
        content: state.userInfo
      })
    },
    SET_UNLOCK(state, unLock) {
      state.unLock = unLock;
      // setStore({
      //     name: 'unLock',
      //     content: state.unLock
      // })
    },
    SET_RELOADCASHIER(state, reloadCashier) {
      state.reloadCashier = reloadCashier;
    },
    SET_BORDTABSTATUS(state, bordTabStatus) {
      state.bordTabStatus = bordTabStatus;
    },
    SET_GOODINTRODUCE(state, goodIntroduce) {
      state.goodIntroduce = goodIntroduce;
    },
    SET_RELOADPAGE(state, reloadPage) {
      state.reloadPage = reloadPage;
    },
    SET_BUSINESSLICENSEURL(state, businessLicenseUrl) {
      state.businessLicenseUrl = businessLicenseUrl;
    },
    SET_CATERINGPERMITURL(state, cateringPermitUrl) {
      state.cateringPermitUrl = cateringPermitUrl;
    },
    SET_SELECTLEFT(state, selectLeft) {
      state.selectLeft = selectLeft;
    },
    LOGIN_TYPE(state, data) {
      state.loginType = data;
      setStore({
        name: 'loginType',
        content: state.loginType
      })
    }
  },

  actions: {},
};

export default base;
