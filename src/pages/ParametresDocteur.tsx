import DefaultLayout from "@/components/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Loader from "@/common/Loader"; 
import { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";


interface User {
    email: string;
    username: string;
    new_username : string;
}


export const ParamètresAdmin: FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);
    

    // État pour stocker les données du profil
    const [profile, setProfile] = useState<User>({
        email : "",
        username : "",
        new_username : "",
    });

     //Récupérer les informations de l'utilisateur
     useEffect(() => {
        const fetchUser = async () => {
        const access = localStorage.getItem('access_token');
        if (!access) {
            router.push("/doctorLogin");
            return;
        }
        
        axios.get(`${apiUrl}/admin_app/infoDocteur/`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,  // Si authentification requise
            }
        })
        .then(response =>{
            if (response.status === 200) {
                setProfile(response.data)
            } else {
                alert("Echec de la récupération des données")
                console.error('Failed to fetch user data');
            }
        })
        .catch(error =>{
            alert(error?.response?.data?.erreur || "Erreur lors de la récupération des données !");
            console.log(error);
        })
        };
        
        fetchUser()
    }, [apiUrl]);


    const InfohandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile({ 
            ...profile, 
            [name]: value 
        });
       
    };


    //Modifier les paramètres
    const InfohandleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        const access = localStorage.getItem('access_token');
        if (!access) {
            router.push("/doctorLogin");
            return;
        }
    
        const form = new FormData();


        for (const key in profile) {
            form.append(key, profile[key as keyof User] as Blob | string);
        }

        // Mettre à jour le profil existant
        axios.post(`${apiUrl}/admin_app/change-pseudo/`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${access}`,
            },
        })
        .then(() =>{
            alert('Pseudo modifié avec succès');
            window.location.reload();
        })
        .catch(error =>{
            alert(error?.response?.data?.erreur || "Erreur lors de la mise à jour !");
            console.error("Erreur lors de la mise à jour :", error)
        })
    };
    

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [router]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Simule un chargement de données
    }, []);

    return loading ? (
        // Spinner de chargement
        <Loader/>
    ) : (
        <DefaultLayout>
            <Breadcrumb pageName="Paramètres du compte" />
 
            <form>
            <div className="w-full">
                        {/* SECTION INFORMATIONS PERSONNELLES */}
                        <div className="rounded-lg border mb-10 border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                            <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                                <h3 className="text-base lg:text-sm text-black dark:text-white">
                                    Informations de connexion
                                </h3>
                            </div>
                                <div className="flex flex-col gap-5 p-10">
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={profile.email}
                                            readOnly
                                            className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                        
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Pseudo
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={profile.username}
                                            onChange={InfohandleChange}
                                            className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Nouveau pseudo
                                        </label>
                                        <input
                                            type="text"
                                            name="new_username"
                                            value={profile.new_username}
                                            onChange={InfohandleChange}
                                            className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <Link href="/changePassword" className="dark:text-white flex ">
                                            <svg 
                                                className="fill-current duration-300 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" 
                                                height="18px" 
                                                viewBox="0 -960 960 960" 
                                                width="24px" 
                                                fill="none">
                                                <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                                            </svg>
                                                Modifier votre mot de passe
                                        </Link>
                                        
                                        <button onClick={InfohandleSubmit} className="flex justify-center rounded-md bg-blue-500 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                                            Modifier le pseudo
                                        </button>
                                    </div>  
                                </div>
                        </div>
                        {/* FIN SECTION INFORMATIONS PERSONNELLES */}
                    </div>   
            </form>
        </DefaultLayout>
    );
};

export default ParamètresAdmin;
