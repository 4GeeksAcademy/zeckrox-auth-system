const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			profile:{},
			token: ""
		},
		actions: {
			// Use getActions to call a function within a fuction
			createUser: async (user) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/user",
						{
						method: "POST",
						headers: {
							"Content-Type": "application/json",},
						body: JSON.stringify(user)
						})
					const data = await resp.json()
					if (resp.ok == true){
						return true;
					}
					else{
						return false
					}
					
				} catch (error) {
					throw Error(error)
				}
				
			},
			getUserToken: async (user) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/token",
						{
						method: "POST",
						headers: {
							"Content-Type": "application/json",},
						body: JSON.stringify(user)
						})
					const data = await resp.json()
					if (resp.ok){
						localStorage.setItem("token", data.token);
						setStore({ token: data.token })
						getActions().checkToken()
						return true;
					}
					else{
						return false
					}
					
				} catch (error) {
					throw Error(error)
				}
				
			},
		   checkToken: async () => {
			// retrieve token form localStorage
			const token = localStorage.getItem('token');
			try {
				const resp = await fetch(process.env.BACKEND_URL + "/api/account",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
					})
				const data = await resp.json()
				
				if (data.msg){
					setStore({ token: "" })
					setStore({ profile: {} })
					return false
				}

				else{
					setStore({ token: token })
					setStore({ profile: data })
					return true
				}
				
			} catch (error) {
				throw Error(error)
			}
	  		},
			  logout: async () => {
				try {
					localStorage.setItem("token", "")
					setStore({ token: "" })
					setStore({ profile: {} })
					return true
				} catch (error) {
					throw Error(error)
				}
		   }

		}
	};
};

export default getState;
