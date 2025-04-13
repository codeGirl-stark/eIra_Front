import Entete from "@/components/Entete"; 
import { useState,useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/connect.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";


export const Login : React.FC = () =>{

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e : any) => {
        e.preventDefault()

        if(email && password) {
            setIsSubmitted(true);
        }
        
        axios.post(`${apiUrl}/admin_app/login/`, 
            {
                "email":email, 
                "password":password,
            })
            .then(response =>{
                const { refresh, access } = response.data;

                localStorage.setItem('refresh_token', refresh);
                localStorage.setItem('access_token', access);

                const val = localStorage.getItem('access_token');

                setIsSubmitted(false)

                if (!val) {
                    router.push('/medecin/login');
                } else {

                    axios.get(`${apiUrl}/admin_app/protected/`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${access}`,  // Si authentification requise
                        }
                    })
                    .then(response =>{
                        if (response.data.role = "doctor") {
                            router.push('/medecin/dashboard')
                        } else {
                            alert("Cette interface est dédiée uniquement aux médecins.")
                        }
                    })
                    .catch(error =>{
                        setIsSubmitted(false)
                        alert(error?.response?.data?.erreur || "Erreur lors de la connexion !");
                    })
                }

            }) .catch(error =>{
                setIsSubmitted(false)
                console.error("login failed", error)

                // Vérifie les erreurs pour différents champs
                if (error.response && error.response.data) {
                    const data = error.response.data;
                    let errorMessage = "Erreur lors de la connexion : ";
            
                    // Vérification pour chaque champ
                    if (data.email) {
                        errorMessage += error.response.data.email[0];  // Affiche le premier message d'erreur pour le champ email
                    } else {
                        errorMessage += error.response.data.non_field_errors[0];
                    }
            
                    alert(errorMessage);
                } else {
                    alert("Une erreur s'est produite lors de la communication avec le serveur.");
                }
            });
    }


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
                    console.log("Le refresh_token n'est pas valide : mauvais format JWT");
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
                    console.log("Token expiré, redirection vers la page de connexion");
                    router.push('/medecin/login');
                } else {
                    console.log("Le token est toujours valide");
                }
            } catch (error) {
                console.log("Erreur lors de la vérification du token :", error);
            }
        };

        checkTokenExpiration();
        const interval = setInterval(checkTokenExpiration, 60 * 1000); // Check every minute

        return () => clearInterval(interval);
    }, [apiUrl]);


    return (
        <>
            <Entete />
            
            <div className={styles.login}>
                <Image 
                    src="/accueil.jpeg"
                    alt="une image de medecine"
                    width={500}
                    height={200}
                    className={styles.image}
                />

                <div className={styles.section} >
                    <div className={styles.logo}>
                        <Image 
                            src="/image.png"
                            alt="logo de la plateforme"
                            width={100}
                            height={100}
                            className=""
                        />
                        <Link href="../../" className={styles.h1}>EIra |</Link>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            height="24px" 
                            viewBox="0 -960 960 960" 
                            width="24px" 
                            fill="#000000"
                            className="mt-10 ml-2"
                        >
                            <path d="M540-80q-108 0-184-76t-76-184v-23q-86-14-143-80.5T80-600v-240h120v-40h80v160h-80v-40h-40v160q0 66 47 113t113 47q66 0 113-47t47-113v-160h-40v40h-80v-160h80v40h120v240q0 90-57 156.5T360-363v23q0 75 52.5 127.5T540-160q75 0 127.5-52.5T720-340v-67q-35-12-57.5-43T640-520q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T800-407v67q0 108-76 184T540-80Zm220-400q17 0 28.5-11.5T800-520q0-17-11.5-28.5T760-560q-17 0-28.5 11.5T720-520q0 17 11.5 28.5T760-480Zm0-40Z"/>
                        </svg>
                    </div>
                    
                    <div>
                        <form onSubmit={handleSubmit} className={styles.form} >

                            <label className={styles.label} >
                                <Image 
                                    src="/icones/mail.svg"
                                    alt="identité"
                                    width={20}
                                    height={20}
                                    className="mr-5"
                                />
                                <input 
                                    type="email"
                                    placeholder="Email"
                                    value = {email} 
                                    onChange = {(e) => setEmail(e.target.value)}
                                    required
                                />                       
                            </label>

                            <label className={styles.label}>
                                <Image 
                                    src="/icones/pass.svg"
                                    alt="identité"
                                    width={20}
                                    height={20}
                                    className="mr-5"
                                />
                                <input 
                                    type="password"
                                    placeholder="Mot de passe"
                                    value = {password} 
                                    onChange = {(e) => setPassword(e.target.value)}
                                    required
                                />                      
                            </label>
                            {isSubmitted?(<button type="submit" className={styles.waitingButton}><span className={styles.waitingSpan}></span></button>):(
                            <button type="submit" className={styles.submitButton}>Connexion</button>
                        )} 
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login;