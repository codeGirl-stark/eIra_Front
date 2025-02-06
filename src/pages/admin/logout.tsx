import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            //setUser(null); // Assurez-vous que setUser est passé en tant que prop ou géré globalement
            router.push('/admin/login');
        };

        logout();
    }, [router]);

    return null; // Pas besoin de retour d'affichage pour cette page
};

export default Logout;
