import { useState } from "react";
import { useRequest } from "./../../hooks/use-request";
import { useRouter } from "next/router";

const SignupPage = () => {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
	const { doRequest, errors } = useRequest({
		url: "/api/users/signup",
		method: "post",
		body: {
			email,
			password,
		},
		onSuccess: () => router.push("/"),
	});

	return (
		<form
			onSubmit={async e => {
				e.preventDefault();
				await doRequest();
			}}
		>
			<h1>Sign Up</h1>
			<div className="form-group">
				<label>Email Address</label>
				<input
					value={email}
					onChange={e => setEmail(e.target.value)}
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label>Password</label>
				<input
					value={password}
					onChange={e => setPassword(e.target.value)}
					type="password"
					className="form-control"
				/>
			</div>
			{errors}
			<button className="btn btn-primary" type="submit">
				Sign Up
			</button>
		</form>
	);
};

export default SignupPage;
