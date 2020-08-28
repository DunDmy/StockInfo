
//Imported Functions
import { combineReducers } from 'redux';
import { searchStock } from './SearchReducer';
import { updateSidebar } from './SidebarReducer';


// const that combines all redusers. Add reducers when needed
export const allReducers = combineReducers({
	searchStock, updateSidebar
});