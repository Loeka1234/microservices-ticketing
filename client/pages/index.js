import { buildClient } from "./../api/build-client";

const HomePage = ({ currentUser }) => {
	return <h1>{currentUser ? "You are signed in" : "You are not signed in"}</h1>;
};

HomePage.getInitialProps = async context => {
	const { data } = await buildClient(context).get("/api/users/currentuser");
	return data;
};

export default HomePage;
