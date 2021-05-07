import { barCode, returnDetails } from '@/api/stock'

const stock = {
    state: {
        inOrdersMsg: {},
        outOrdersMsg: {},
        goodsMsgs: [],
        returnDetails: {}
    },
    mutations: {
        BAR_CODE (state, data) {
            state.goodsMsgs = data.map(item => {
                return {
                    id: item.id,
                    img: item.img,
                    title: item.title,
                    quantity: item.quantity,
                    color: item.color,
                    unit: item.unit,
                    stock: item.stock,
                    newPrice: item.newPrice,
                    oldPrice: item.oldPrice,
                    size: item.size
                }
            })
            // console.log(state.goodsMsgs);
        },
        // 入库
        IN_ORDERSMSG (state, data) {
            state.inOrdersMsg = data
        },
        // 出库
        OUT_ORDERSMSG (state, data) {
            state.outOrdersMsg = data
        },
        RETURN_DETAILS (state, data) {
            state.returnDetails = data;
        }
    },
    actions: {
        // 条形码请求商品
        barCode ({ commit }, code) {
            barCode(code).then(res => {
                // console.log(res.data.data);
                commit('BAR_CODE', res.data.data)
            }).catch(error => {
                console.log(error);
            })
        },
        returnDetails ({ commit }, code) {
            returnDetails(code).then(res => {
                // console.log(res.data.data);
                commit('RETURN_DETAILS', res.data.data)
            }).catch(error => {
                console.log(error);
            })
        }
    }
}

export default stock;
