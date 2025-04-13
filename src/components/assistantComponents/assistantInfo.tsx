import { useState, useEffect, ReactNode, FC } from 'react';
import { useRouter } from "next/router";
import axios from "axios";


interface User {
    id: number;
    username: string;
    prenom: string;
    email: string;
}

interface UserInfoProps {
    children: (user: User | null) => ReactNode;
}

const UserInfo: FC<UserInfoProps> = ({ children }) => {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [user,setUser] = useState(null)
    const router = useRouter()

    const fetchUser = async () => {
        const access = localStorage.getItem('access_token');
        if (!access) {
            router.push("/assistant/login");
            return;
        }

        axios.get(`${apiUrl}/admin_app/userInfo`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,  // Si authentification requise
            }
        })
        .then(response =>{
            if (response.status === 200) {
                setUser(response.data);
            } else {
                alert("Echec de la récupération des données")
                console.error('Failed to fetch user data');
            }
        })
        .catch(error =>{
            alert(error?.response?.data?.erreur || "Erreur lors de la récupération du profil !");
            console.log(error);
        })
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        router.push('/assistant/login');
    };

    useEffect(() => {
        const checkTokenExpiration = () => {
            const refresh = localStorage.getItem('refresh_token');
            if (refresh && new Date().getTime() > parseInt(refresh)) {
                logout();
            } else {
                fetchUser();
            }
        };
        checkTokenExpiration();
        //console.log(user)
        const interval = setInterval(checkTokenExpiration, 60 * 1000); // Vérifier toutes les minutes
        return () => clearInterval(interval);
    }, [router]);

    return <>{children(user)}</>;
} 

export default UserInfo;