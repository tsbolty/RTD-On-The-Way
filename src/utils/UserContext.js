import React, { createContext } from "react";

const UserContext = createContext({
	name: "",
	email: "",
	hungry: false,
	height: 70,
	isAuthenticated: false,
	changeUserValues: () => undefined
});

export default UserContext;
