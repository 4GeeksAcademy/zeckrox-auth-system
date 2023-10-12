import React, { useState, useEffect, useContext } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Account = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	async function check (){
		await actions.checkToken()
		if(!store.token) navigate("/login")
	}

	useEffect(() => {
		check()
	}, []);

	const info = store.profile
	
	return (<div className="container w-50 py-5">
		<h1>Hello! here is your account information</h1>
		<h3><b>ID:</b> {info && info.id}</h3>
		<h3><b>Email:</b> {info && info.email}</h3>
		<h3><b>Password:</b> {info && info.password}</h3>
		<p>Don't worry its all between you and me 😉</p>
	</div>
	);
};
