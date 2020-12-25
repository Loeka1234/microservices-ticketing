import { useEffect } from "react";
import { useRequest } from "./../../hooks/use-request";
import { useRouter } from "next/router";

const SignoutPage = () => {
	const router = useRouter();
	const { doRequest } = useRequest({
		url: "/api/users/signout",
		method: "post",
		body: {},
		onSuccess: () => router.push("/"),
	});

	useEffect(() => {
		doRequest();
	}, []);

	return <div>Signin you out...</div>;
};

export default SignoutPage;
