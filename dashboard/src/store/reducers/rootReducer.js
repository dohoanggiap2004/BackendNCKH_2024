import { combineReducers } from 'redux';
import authReducer from './authReducer';
import itemReducer from "./itemReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import voucherReducer from "./voucherReducer";
import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";
import colorReducer from "./colorReducer";
// Kết hợp các reducer
const rootReducer = combineReducers({
  auth: authReducer,
  item: itemReducer,
  product: productReducer,
  order: orderReducer,
  voucher: voucherReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  color: colorReducer,
});

export default rootReducer;
