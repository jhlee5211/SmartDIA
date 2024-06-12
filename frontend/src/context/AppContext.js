import React, {createContext, useReducer, useContext, useEffect} from 'react';

const AppContext = createContext();

const initialState = {
	data: []
};

const reducer = (state, action) => {
	if (action.type === 'SET_DATA') return {...state, data: Object.entries(action.payload).sort((a, b) => b[1] - a[1])};
	return state;
};

const loadState = () => {
	try {
		const serializedState = localStorage.getItem('appData');
		if (serializedState === null) {
			return initialState;
		}
		return JSON.parse(serializedState);
	} catch (e) {
		console.error('Failed to load state from localStorage:', e);
		return initialState;
	}
};

const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('appData', serializedState);
	} catch (e) {
		console.error('Failed to save state to localStorage:', e);
	}
};

export const AppProvider = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState, loadState);

	useEffect(() => {
		saveState(state);
	}, [state.data]);

	return (<AppContext.Provider value={{state, dispatch}}>
			{children}
		</AppContext.Provider>);
};

export const useAppState = () => useContext(AppContext);
