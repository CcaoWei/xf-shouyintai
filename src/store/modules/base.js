import { getStore, setStore } from '@/util/store';
// import languageConfig from '@/config/language';

const base = {
    state: {
        showSidbar: false,
        cashierData: [],
        userInfo: getStore({ name: 'userInfo' }) || { pic: "https://img.cct58.com/201612/16/09-35-35-26-14.jpg", roldName: "管理人员" },
        unLock: getStore({ name: 'unLock' }) || 1,
        dateSelect: getStore({ name: 'dateSelect' }) || { date: 9, afterDay: "", day: "" },
        reloadCashier: false,
        userDept: getStore({ name: "userDept" }) || { deptName: sessionStorage.getItem("userinfo") },
        agreement: false,
    },
    mutations: {
        SET_AGREEMENT (state, agreement) {
            state.agreement = agreement;
        },
        SET_DATE (state, dateSelect) {
            state.dateSelect.date = dateSelect.date;
            state.dateSelect.afterDay = dateSelect.afterDay || "";
            state.dateSelect.day = dateSelect.day || "";
            setStore({
                name: 'dateSelect',
                content: state.dateSelect
            })
        },
        SET_SHOWSIDBAR (state, showSidbar) {
            state.showSidbar = showSidbar;
        },
        SET_USERDEPT (state, userDept) {
            state.userDept = userDept;
        },
        SET_CASHIERDATA (state, cashierData) {
            state.cashierData = cashierData;
        },
        SET_USERINFO (state, userInfo) {
            state.userInfo = userInfo;
            setStore({
                name: 'userInfo',
                content: state.userInfo
            })
        },
        SET_UNLOCK (state, unLock) {
            state.unLock = unLock;
            // setStore({
            //     name: 'unLock',
            //     content: state.unLock
            // })
        },
        SET_RELOADCASHIER (state, reloadCashier) {
            state.reloadCashier = reloadCashier;
        },
    },

    actions: {},
};

export default base;
