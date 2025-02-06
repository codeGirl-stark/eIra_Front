import DefaultLayout from "@/components/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Loader from "@/common/Loader"; 
import styles from "../styles/common.module.css"
import { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";


interface PasswordInterface {
    [key: string]: any;
    old_password : string;
    new_password : string;
}


export const ChangePassword: FC = () =>{
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    // État pour stocker les données du password
    const [password, setPassword] = useState<PasswordInterface>({
        old_password : "",
        new_password : "",
    });

    const InfohandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPassword({ 
            ...password, 
            [name]: value 
        });
       
    };


    //Modifier les paramètres
    const InfohandleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        const access = localStorage.getItem('access_token');
        if (!access) {
            router.push("/docteurLogin");
            return;
        }
        setIsSubmitted(true)

        const form = new FormData();


        for (const key in password) {
            form.append(key, password[key as keyof PasswordInterface] as Blob | string);
        }

        // Mettre à jour le profil existant
        axios.post(`${apiUrl}/admin_app/change-password/`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${access}`,
            },
        })
        .then(() =>{
            alert('Mot de passe modifié avec succès');
            router.push("/ParametresDocteur");
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
            <Breadcrumb pageName="Modifier le mot de passe" />

            <Link href="/ParametresDocteur">
                <button 
                    type="button"
                    className="flex mb-5 justify-center rounded-md text-sm lg:text-base uppercase font-bold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-opacity-90"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="currentColor">
                        <path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z"/>
                    </svg>
                </button>
            </Link>

            <form onSubmit={InfohandleSubmit}>
                <div className="flex justify-center items-center p-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-auto w-full">
                        <div className="flex flex-col gap-9">
                        {/* File upload */}
                            <div className="rounded-lg border border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                                <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                                    <h3 className="font-medium text-base lg:text-lg text-black dark:text-white">
                                        Modifier le Mot de Passe
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5 p-10">
                                <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Ancien mot de passe
                                        </label>
                                        <input
                                            type="text"
                                            name="old_password"
                                            value={password.old_password}
                                            onChange={InfohandleChange}
                                            className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Nouveau mot de passe 
                                        </label>
                                        <input
                                            type="text"
                                            name="new_password"
                                            value={password.new_password}
                                            onChange={InfohandleChange}
                                            className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>
                                    {isSubmitted?(
                                        <div className="flex justify-end">
                                            <button type="submit" className={styles.waitingButton}>
                                                <span className={styles.waitingSpan}></span>
                                            </button>
                                        </div>
                                    ):(
                                        <div className="flex justify-end">
                                            <button className="flex btn-wide justify-center rounded-md bg-blue-500 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                                                Modifier
                                            </button>
                                        </div>                                    
                                    )} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            
        </DefaultLayout>
      )
}

export default ChangePassword;