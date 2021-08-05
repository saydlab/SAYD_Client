import createDataContext from './createDataContext'

const mainReducer = (state,action) =>{
    switch (action.type){
        case 'add_wallet_amount':
            return {...state,WalletAmount:action.payload}
        default:
            return {...state}
    }
}

const addWalletAmount = dispatch => async (walletAmount,rechargeAmount) =>{

    let totalAmount = walletAmount + rechargeAmount

    await dispatch({type:'add_wallet_amount',payload:totalAmount})
}

const payServiceBill = dispatch => async (walletAmount,billAmount) =>{

    let totalAmount = walletAmount - billAmount
    console.log(totalAmount)
    await dispatch({type:'add_wallet_amount', payload:totalAmount})
    return
}
export const { Context, Provider } = createDataContext(
    mainReducer,
    {
        addWalletAmount,payServiceBill
    },
    {
        WalletAmount:5000
    }
)