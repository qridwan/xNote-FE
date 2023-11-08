import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import useAuth from "../hooks/useAuth";

export default function AuthRoute({ children }: { children: ReactElement }) {
	const isLoggedIn = useAuth();

	return !isLoggedIn ? children : <Navigate to="/" />;
}
