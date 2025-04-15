import axios from "axios";
import Link from "next/link";
import Loader from "@/common/Loader";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import styles from "../../../styles/common.module.css"
import decodeJWT from "../../../../utils/decodeToken";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DefaultLayout from "@/components/medecinComponents/Layout/DefaultLayout";


interface FormDataType {
    id : number;
    username : string;
    email : string;
    is_active : boolean;
    doctor : number|null;
    password:string;
}

export const UpdateAssistant: React.FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { id } = router.query; // Récupérer l'ID depuis l'URL
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const [formData, setFormData] = useState<FormDataType>({
        id : 0,
        username : "",
        email : "",
        is_active : false,
        doctor : null,
        password:"",
    });


    //Récupérer le médecin selectionné
    useEffect(() => {
        const fetchInfoAssistant = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/medecin/login");
                return;
            }
    
            await axios.get(`${apiUrl}/admin_app/infoUser/${id}/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,
                }
            })
                .then(response =>{
                    setFormData(response.data)
                })
                .catch(error =>{
                    alert(error?.response?.data?.erreur || "Erreur lors de la récupération des informations !");
                    console.log(error)
                })
        }
    
        fetchInfoAssistant();
    }, [apiUrl, id]);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : value,
        }));
    };


    //Obtenir l'id du medecin depuis de acces_token et l'ajouter au formData
    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
    
        if (accessToken) {
            const decodedToken = decodeJWT(accessToken);
            if (decodedToken && decodedToken.user_id) { // Assurez-vous que le token contient l'ID du médecin
                const doctorId = decodedToken.user_id

                setFormData((prevData) => ({
                    ...prevData,
                    doctor: doctorId, // Supposons que l'ID du médecin est stocké sous "id"
                }));
            } else {
                console.error("Impossible de récupérer l'ID du médecin depuis le token.");
            }
        }
    }, []);


    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const access = localStorage.getItem('access_token');
        if (!access) {
            router.push('/medecin/login')
            return;
        }

        setIsSubmitted(true);

        const form = new FormData();

        for (const key in formData) {
            form.append(key, formData[key as keyof FormDataType] as Blob | string);
        }
        
        axios.patch(`${apiUrl}/admin_app/assistants/${id}/`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,  // Si authentification requise
            }
        })
        .then(() =>{
            setIsSubmitted(false)
            alert('Assistant modifié avec succès');
            router.push(`/medecin/assistants`)
        })
        .catch(error =>{
            alert(error?.response?.data?.erreur || "Erreur lors de la modification !");
            setIsSubmitted(false)
            console.error(error);   
        })
    }

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
            <Breadcrumb pageName={`Détails de l'assistant ${formData.username.replace(/^as/, "")}`} />

            <Link href="/medecin/assistants">
                <button 
                    type="button"
                    className="flex mb-5 justify-center rounded-md text-sm lg:text-base uppercase font-bold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-opacity-90"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="currentColor">
                        <path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z"/>
                    </svg>
                </button>
            </Link>

            <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center lg:p-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-auto w-full">
                        <div className="flex flex-col gap-9">
                        {/* File upload */}
                            <div className="rounded-lg border border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                                <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                                    <h3 className="font-medium text-base lg:text-lg text-black dark:text-white">
                                        Modifier les informations de l&apos;assistant
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5 p-10">
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Email du médecin
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                           Mot de passe
                                        </label>
                                        <input
                                            type="text"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>

                                    <div >
                                        <label className="label ">
                                            <span className="label-text text-sm text-black dark:text-white mr-5">Statut actif de l&apos;assistant</span>
                                            <input 
                                                type="checkbox" 
                                                name="is_active"
                                                checked={formData.is_active}
                                                onChange={handleChange}
                                                className="checkbox checkbox-primary" />
                                        </label>
                                    </div>

                                    <div className="flex flex-col lg:justify-between">  
                                        <Link href={`/medecin/AssistantLog/${formData.id}`} className="dark:text-white flex ">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                height="20px" 
                                                viewBox="0 -960 960 960" 
                                                width="20px" 
                                                fill="none"
                                                className="fill-current duration-300 ease-in-out"
                                            >
                                                <path 
                                                    d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                                            </svg>
                                            <span className="text-sm ml-2">Voir ses actions effectuées</span>
                                        </Link>

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
                </div>
            </form>
            
        </DefaultLayout>
      )
};

export default UpdateAssistant;