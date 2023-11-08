import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ReactElement } from "react";

export default function PrivateRoute({ children }: { children: ReactElement }) {
	const isLoggedIn = useAuth();

	return isLoggedIn ? children : <Navigate to="/" />;
}
