import React from 'react';

export interface TMTContext {
	showSnackbar: boolean;
}

const AppContext = React.createContext<TMTContext>({ showSnackbar: false });

export default AppContext;
