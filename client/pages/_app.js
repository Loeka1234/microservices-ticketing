import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Header } from "../components/header";
import { buildClient } from "./../api/build-client";

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<>
			<Header currentUser={currentUser} />
			<Component {...pageProps} />
		</>
	);
};

AppComponent.getInitialProps = async appContext => {
	const axios = buildClient(appContext.ctx);
	const { data } = await axios.get("/api/users/currentuser");

	let pageProps = {};
	if (appContext.Component.getInitialProps)
		pageProps = await appContext.Component.getInitialProps(appContext.ctx);

	return { pageProps, currentUser: data.currentUser };
};

export default AppComponent;
