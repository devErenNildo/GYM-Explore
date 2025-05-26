import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"

import { useRouter } from 'next/navigation';
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { setUser } from "./loginSlice";

export default function ButtonLogin() {
    const t = useTranslations('Navbar');
    const router = useRouter();

    const dispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log("Token:", tokenResponse);

            const accessToken = tokenResponse.access_token;

            const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!res.ok) {
                console.error("Erro ao buscar dados do usuário");
                return;
            }

            const userInfo = await res.json();

            console.log(userInfo.email);
            

            dispatch(
                setUser({
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture,
                })
            );

            router.push("/gyms");
            
        },
        onError: () => {
            console.error("Erro no login");
            alert("Erro ao logar com Google");
        },
    });
    return (
        <Button
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
            onClick={() => login()}
        >
            {t("joinNow")}

        </Button>
    );
}