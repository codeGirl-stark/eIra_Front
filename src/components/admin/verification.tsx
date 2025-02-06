import { useEffect } from 'react';
import { useRouter } from 'next/router';


const TokenCheck = () => {
    const router = useRouter();

    useEffect(() => {
        const checkTokenExpiration = () => {
            const refresh = localStorage.getItem('refresh_token');
        
            if (!refresh) {
                console.log("Le refresh_token est absent");
                return;
            }
        
            try {
                // Diviser le token en trois parties (header, payload, signature)
                const tokenParts = refresh.split('.');
        
                if (tokenParts.length !== 3) {
                    console.log("erreur");
                    return;
                }
        
                // Décoder la partie payload (2ème partie) du JWT
                const payload = JSON.parse(atob(tokenParts[1]));
                const expirationTime = payload.exp * 1000; // L'expiration est en secondes, convertir en millisecondes
        
                // console.log("Temps actuel:", new Date().getTime());
                // console.log("Date d'expiration du token:", expirationTime);
        
                // Comparer la date actuelle à l'expiration du token
                if (new Date().getTime() > expirationTime) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    console.log("Deconnexion");
                    router.push('/admin/login');
                } else {
                    console.log("ok");
                }
            } catch (error) {
                console.log("Erreur lors de la vérification du token :", error);
            }
        };

        const refresh = localStorage.getItem('refresh_token')
        const access = localStorage.getItem('access_token')
        if (access && refresh) {
            checkTokenExpiration();
            const interval = setInterval(checkTokenExpiration, 60 * 1000); // Vérifier toutes les minutes

            return () => clearInterval(interval);
        } else {
            router.push('/admin/login');
        }
        
    }, [router]);

    return null; // Ce composant n'a pas besoin de rendre quoi que ce soit
};

export default TokenCheck;