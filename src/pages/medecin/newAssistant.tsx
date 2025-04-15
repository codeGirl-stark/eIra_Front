import axios from "axios";
import Loader from "@/common/Loader";
import { useRouter } from "next/router";
import {useState, useEffect} from "react";
import styles from "../../styles/common.module.css"
import DefaultLayout from "@/components/medecinComponents/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import decodeJWT from "../../../utils/decodeToken";


interface FormDataType {
    username : string;
    email : string;
    password: string;
    doctor : number|null;
}

export const NewAssistant: React.FC = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState<FormDataType>({
        username : "",
        email:"",
        password:"",
        doctor : null,
    });


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
                console.error("Erreur lors de la création.");
            }
        }
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const access = localStorage.getItem("access_token");
        if (!access) {
            router.push("/medecin/login");
            return;
        }

        if (!formData.doctor) {
            alert("Impossible de récupérer le médecin.");
            return;
        }

        setIsSubmitted(true);

        axios
            .post(`${apiUrl}/admin_app/assistants/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,
                },
            })
            .then(() => {
                setIsSubmitted(false);
                alert("Assistant créé avec succès");
                router.push("/medecin/assistants");
            })
            .catch((error) => {
                alert(error?.response?.data?.error || "Erreur lors de la création de l'assistant !");
                setIsSubmitted(false);
                console.error(error);
            });
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
            <Breadcrumb pageName="Nouvel Assistant" />

            <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center lg:p-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-auto w-full">
                        <div className="flex flex-col gap-9">
                        {/* File upload */}
                            <div className="rounded-lg border border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                                <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                                    <h3 className="font-medium text-base lg:text-lg text-black dark:text-white">
                                        Créer un compte pour un nouvel assistant
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5 p-10">
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Adresse mail de l&apos;assistant
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
                                            Pseudo
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Mot de passe de l&apos;assistant
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
                                    {isSubmitted?(
                                        <div className="flex justify-end">
                                            <button type="submit" className={styles.waitingButton}>
                                                <span className={styles.waitingSpan}></span>
                                            </button>
                                        </div>
                                    ):(
                                        <div className="flex justify-end">
                                            <button className="flex btn-wide justify-center rounded-md bg-blue-500 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                                                Ajouter l&apos;assistant
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
};

export default NewAssistant;
