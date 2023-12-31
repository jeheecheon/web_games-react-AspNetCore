import { Route, Routes } from "react-router-dom";
import AppRoutes from "../utils/AppRoutes"
import { Suspense, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import CustomPacmanLoader from "./PacmanLoader";
import PacmanLoader from "react-spinners/PacmanLoader";
import '../assets/styles/AuthRoutes.css';
import Games from "../pages/games";

export default function AuthRoutes() {
    const { user, setUser } = useContext(UserContext);

    return (
        <>

            <Routes>
                {AppRoutes.map((route, idx) => {
                    const { element, isPrivate, path, index, sub_routes } = route;

                    // Home index 페이지
                    if (path === undefined) {
                        if (isPrivate) {
                            if (user.isAuthenticated)
                                return <Route key={idx} index element={element} />
                        }
                        else
                            return <Route key={idx} index element={element} />
                    }
                    else if (path.includes("/games")) {
                        if (isPrivate && !user.isAuthenticated)
                            return;

                        return <Route key={idx} element={<Games />} path={path}>
                            {sub_routes.map((s_route, s_idx) => {
                                return (
                                    <Route key={s_idx} path={s_route.path} element={s_route.element} />
                                );
                            })}
                        </Route>

                    }
                    //로그인 한 상태
                    else if (user.isAuthenticated) {
                        // 회원관련 페이지 제외
                        if (!path.includes("account"))
                            return <Route key={idx} path={path} element={element} />
                    }

                    // 로그인 안 한 상태
                    else {
                        // 로그인 없이 접근 가능한 페이지만 포함
                        if (!isPrivate)
                            return <Route key={idx} path={path} element={element} />

                    }
                })}
            </Routes>
        </>
    );
}

