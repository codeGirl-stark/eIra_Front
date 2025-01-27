import DefaultLayout from "@/components/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Loader from "@/common/Loader"; 
import styles from "../styles/common.module.css"
import { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

interface User {
    specialite: string;
    years_of_experience: number;
    phone_number: string;
    bio: string;
}


export const ProfilMedecin: FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [profileExists, setProfileExists] = useState(false); // Nouvel état pour vérifier l'existence du profil
    const [profilePicture, setProfilePicture] = useState("/avatar.png");
    

    // État pour stocker les données du profil
    const [profile, setProfile] = useState<User>({
        specialite : "",
        years_of_experience : 0,
        phone_number : "",
        bio:""
    });


    // Charger les données du profil utilisateur
    useEffect(() => {
        const fetchProfileData = async () => {
            
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/doctorLogin");
                return;
            }
            
            axios.get(`${apiUrl}medecin/profile/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,  // Si authentification requise
                }
            })
            .then(response =>{
                if (response.status === 200) {
                    setProfileExists(true); // Le profil existe
                    setProfile(response.data)
                    
                } else {
                    setProfileExists(false);
                }
            })
            .catch(error =>{
                //alert(error)
                console.log(error);
                setProfileExists(false);
            })
        };
        fetchProfileData();
    }, [apiUrl]);


    const InfohandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile({ 
            ...profile, 
            [name]: value 
        });
       
    };


    //Modifier le profil
    const InfohandleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        const access = localStorage.getItem('access_token');
        if (!access) {
            router.push("/doctorLogin");
            return;
        }
    
        setIsSubmitted(true);

        const form = new FormData();


        for (const key in profile) {
            form.append(key, profile[key as keyof User] as Blob | string);
        }

        if (profileExists) {
            // Mettre à jour le profil existant
            axios.patch(`${apiUrl}medecin/profile/`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${access}`,
                },
            })
            .then(response =>{
                alert('Profil mis à jour avec succès');
                router.push("/profilMedecin");
                setIsSubmitted(false)
            })
            .catch(error =>{
                setIsSubmitted(false)
                //alert(error)
                console.error("Erreur lors de la mise à jour :", error)
            })
        } else {
            axios.post(`${apiUrl}medecin/profile/`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${access}`,
                },
            })
            .then(response =>{
                alert('Profil créé avec succès');
                router.push("/profilMedecin");
                setProfileExists(true); // Marquer le profil comme existant
                setIsSubmitted(false)
            })
            .catch(error =>{
                setIsSubmitted(false)
                //alert(error)
                console.error("Erreur lors de la mise à jour :", error)
            })
        }
    };
    
    //Supprimer le profil
    const handleDelete = async (id : any) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer votre profil ?")) {
            setLoading(true);
            console.error(null);

            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                router.push("/doctorLogin");
                return;
            }

            await axios.delete(`${apiUrl}medecin/profile/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
                .then(response =>{
                    alert("Patient supprimé avec succès !"); // Enregistre les Patients dans le state
                    router.push("/profilMedecin");                    
                    setLoading(false)
                })
                .catch(error =>{
                    alert(error.response.data.erreur)
                    console.error('Erreur lors de la suppression du profil');
                    setLoading(false)
                })
        }
    };


    /** 
     * CRUD DE LA PHOTO DE PROFIL
    */
    //Récupérer la photo de profil du user
    useEffect(() => {
        const fetchProfilePicture = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/profilMedecin");
                setIsSubmitted(false)
            }

            axios.get(`${apiUrl}medecin/photoProfile/`,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,  // Si authentification requise
                }
            })
            .then(response =>{
                // Récupérer l'avatar (ou une valeur par défaut si l'avatar est null ou non défini)
                const avatarUrl = response.data[0].avatar
                ? response.data[0].avatar // URL de l'avatar si disponible
                : "/avatar.png"; // Avatar par défaut

                // Définir la photo de profil dans le state
                setProfilePicture(avatarUrl);
            })
            .catch(error =>{
                //alert(error)
                console.error("Error fetching profile picture", error)
            })
        };

        fetchProfilePicture();

    }, [apiUrl]);


    //Récupérer les valeurs du champs de photo 
    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    //Ajouter une photo de profil
    const handleFileSubmit = async(event : any) =>{
        event.preventDefault();

        if (!selectedFile) {
            alert('Veuillez choisir un fichier avant de soumettre.');
            return;
        }
        setIsSubmitted(true)
        const formData = new FormData();
        formData.append('avatar', selectedFile);

        const access = localStorage.getItem('access_token')
        if (!access) {
            router.push("/doctorLogin");
            return;
        }

        axios.post(
            `${apiUrl}medecin/photoProfile/`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,  // Si authentification requise
                }
            }
        )
        .then(response =>{
            setIsSubmitted(false)
            router.push('/profilMedecin')
            setSelectedFile(null);
        })
        .catch(error =>{
            setIsSubmitted(false)
            alert(error.message)
            console.error("erreur lors du chargement de la photo", error)
        })
    }

     //Supprimer le profil
     const handleFileDelete = async (id : any) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer votre avatar ?")) {
            setLoading(true);
            console.error(null);

            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                router.push("/doctorLogin");
                return;
            }

            await axios.delete(`${apiUrl}medecin/photoProfile/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
                .then(response =>{
                    alert("Avatar supprimé avec succès !"); // Enregistre les Patients dans le state
                    router.push("/profilMedecin");                    
                    setLoading(false)
                })
                .catch(error =>{
                    alert(error.response.data.erreur)
                    console.error('Erreur lors de la suppression de la phpto');
                    setLoading(false)
                })
        }
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
            <Breadcrumb pageName="Votre profil" />
 
            <form>
                <div className="flex flex-col lg:flex-row lg:gap-10">
                    <div className="w-full">

                        {/* SECTION INFORMATIONS PERSONNELLES */}
                        <div className="rounded-lg border mb-10 border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                            <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                                <h3 className="text-base lg:text-sm text-black dark:text-white">
                                    Informations Personnelles
                                </h3>
                            </div>
                                <div className="flex flex-col gap-5 p-10">
                                    <div className="flex flex-row">
                                        <div className="mr-5">
                                            <label className="mb-3 block text-sm text-black dark:text-white">
                                                Spécialité
                                            </label>
                                            <input
                                                type="text"
                                                name="specialite"
                                                value={profile.specialite}
                                                onChange={InfohandleChange}
                                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                                required
                                            />
                                            
                                        </div>

                                        <div>
                                            <label className="mb-3 block text-sm text-black dark:text-white">
                                                Expérience
                                            </label>
                                            <input
                                                type="number"
                                                name="years_of_experience"
                                                value={profile.years_of_experience}
                                                onChange={InfohandleChange}
                                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            NUMÉRO DE TÉLÉPHONE
                                        </label>
                                        <input
                                            type="text"
                                            name="phone_number"
                                            value={profile.phone_number}
                                            onChange={InfohandleChange}
                                            className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                           Bio
                                        </label>
                                        <textarea 
                                            name="bio"
                                            value={profile.bio}
                                            onChange={InfohandleChange}
                                            className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            placeholder="Entrez une description.."
                                            >
                                        </textarea>
                                    </div>
                                    {isSubmitted?(
                                <div className="flex justify-end">
                                    <button type="submit" className={styles.waitingButton}>
                                        <span className={styles.waitingSpan}></span>
                                    </button>
                                </div>
                            ):(
                                <div className="flex justify-between">
                                    <button onClick={handleDelete} className="flex justify-center rounded-md bg-red-700 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                                        Supprimer
                                    </button>

                                    <button onClick={InfohandleSubmit} className="flex justify-center rounded-md bg-blue-500 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                                        Enregistrer
                                    </button>
                                </div>                                    
                            )}   
                                </div>
                        </div>
                        {/* FIN SECTION INFORMATIONS PERSONNELLES */}
                    </div>

                    <div className="w-full">  
                        {/* SECTION MODIFIER PHOTO DE PROFIL*/}
                        <div className="rounded-lg border mb-10 border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                                <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                                    <h3 className="text-base lg:text-sm text-black dark:text-white">
                                        Photo de profil
                                    </h3>
                                </div>
                            <div className="flex flex-col gap-5 p-5">
                                <div className="flex">
                                    <div className="">
                                        <div className="rounded-full">
                                            <Image 
                                                src={profilePicture}
                                                unoptimized 
                                                alt="Profile Picture" 
                                                width={60} 
                                                height={30} 
                                            />
                                        </div>
                                    </div>
                                    <div className="py-3 px-5">
                                        <h4 className="text-xs xl:text-base dark:text-white">Editer la photo de profil</h4>
                                        <div className="flex justify-start">
                                            <button className="mr-3 text-gray-400">Supprimer</button>
                                            <button className="text-gray-400">Modifier</button>
                                        </div>
                                    </div>
                                </div>

                                <div>  
                                    {/* <input
                                            type="file"
                                            name="photo"
                                            onChange={handleChange}
                                            accept="image/png, image/jpeg, application/pdf"
                                            className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-10 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        /> */}
                                    <div
                                        id="FileUpload"
                                        className="mb-5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-blue-50 p-5 dark:bg-blue-950 dark:border-gray-500 dark:text-white sm:py-7.5"
                                    >
                                        <input
                                            type="file"
                                            name="photo"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                        />
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-gray-500 dark:bg-blue-950">
                                                <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                    fill="#3C50E0"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                    fill="#3C50E0"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                    fill="#3C50E0"
                                                />
                                                </svg>
                                            </span>
                                            <p>
                                                <span className="text-primary">Cliquez pour télécharger</span> ou
                                                faites glisser et déposez
                                            </p>  
                                            <p className="mt-1.5">PNG, JPG ou JPEG</p>
                                            <p>(max, 200 X 200px)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            <div className="flex justify-end">
                                <button onClick={handleFileSubmit} className="flex  justify-center rounded-md bg-blue-500 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                                    Enregistrer
                                </button>
                            </div>  
                        </div>
                        {/* FIN SECTION MODIFIER PHOTO DE PROFIL */}  
                    </div>
                </div>    
            </form>
        </DefaultLayout>
    );
};

export default ProfilMedecin;
