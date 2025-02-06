import axios from "axios";
import Link from "next/link";
import Loader from "@/common/Loader";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DefaultLayout from "@/components/admin/Layout/DefaultLayout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import CardDataStats from "@/components/dashboard/CardDataStats";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);


interface DefaultInterface {
    "total_users": number,
	"total_doctors": number,
    "total_admin": number,
	"total_patients": number,
	"total_dossiers": number,
	"total_logs": number,
	"active_doctors": number,
	"inactive_doctors": number,
	"doctor_percentage_active": number,
	"doctor_percentage_inactive": number,
	"visits_this_week": number,
	"visits_last_week": number,
	"visits_this_month": number,
	"weekly_growth": number,
	"monthly_growth": number
}

export const AdminDashboard: React.FC = () =>  {

    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);
    const [stats, setStats] = useState<DefaultInterface | null>(null);
    const [nom, setNom] = useState("")


    //Récupérer les informations de l'utilisateur
    useEffect(() => {
        const fetchUser = async () => {
        const access = localStorage.getItem('access_token');
        if (!access) {
            router.push("/admin/login");
            return;
        }
        
        axios.get(`${apiUrl}/admin_app/infoAdmin/`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,  // Si authentification requise
            }
        })
        .then(response =>{
            if (response.status === 200) {
                setNom(response.data.username)
            } else {
                alert("Echec de la récupération des données")
                console.error('Failed to fetch user data');
            }
        })
        .catch(error =>{
            alert(error?.response?.data?.erreur || "Erreur lors de la récupération des informations !");
            console.log(error);
        })
        };
        
        fetchUser()
    }, [apiUrl]);


    //Récupérer les statistiques
  useEffect(() => {
    const fetchStatistiques = async () => {
        const access = localStorage.getItem('access_token');
        if (!access) {
            router.push("/admin/login");
            return;
        }

        await axios.get(`${apiUrl}/admin_app/statAdmin/`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,
            }
        })
            .then(response =>{
                setStats(response.data); // Enregistre les Patients dans le state
            })
            .catch(error =>{
              alert(error?.response?.data?.erreur || "Erreur lors de la récupération des statistiques !");
                console.log(error)
            })
    }

    fetchStatistiques();
}, [apiUrl]);

    // Graphique en anneau - Répartition des utilisateurs
    const userDistributionData = {
        labels: ['Médecins', 'Admin'],
        datasets: [{
            data: [stats?.total_doctors, stats?.total_admin],
            backgroundColor: ['#36A2EB', 'purple'],
        }],
    };

    // Graphique en anneau - Médecins actifs/inactifs
    const doctorStatusData = {
        labels: ['Actifs', 'Inactifs'],
        datasets: [{
            data: [stats?.active_doctors, stats?.inactive_doctors],
            backgroundColor: ['#4CAF50', '#F44336'],
        }],
    };


    // Graphique en courbes - Fréquence de visite
    const visitData = {
        labels: ['Semaine passée', 'Semaine en cours', 'Mois en cours'],
        datasets: [{
            label: 'Visites',
            data: [stats?.visits_last_week, stats?.visits_this_week, stats?.visits_this_month],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 165, 0, 0.5)',
            fill: true,
        }],
    };

    // Graphique en barres - Comparaison des ressources
    const resourceData = {
        labels: ['Medecin', 'Patients', 'Dossiers'],
        datasets: [{
            label: 'Total',
            data: [stats?.total_doctors, stats?.total_patients, stats?.total_dossiers],
            backgroundColor: ['pink', '#03A9F4', '#8BC34A'],
        }],
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
    
            <Breadcrumb pageName={`Bienvenu ${nom}`}/>
            {stats && stats.total_users > 0  ?(
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                  <CardDataStats title="Total Utilisateurs" total={stats.total_users.toString()} rate="100%">
                    <svg
                        className="fill-primary dark:fill-white"
                        width="22"
                        height="18"
                        viewBox="0 0 22 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                            fill=""
                        />
                        <path
                            d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                            fill=""
                        />
                        <path
                            d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                            fill=""
                        />
                        </svg>
                    </CardDataStats>

                    <CardDataStats title="Total Médecins" total={stats.total_doctors.toString()} rate="100%">
                        <svg 
                            className="fill-primary dark:fill-white"
                            xmlns="http://www.w3.org/2000/svg" 
                            height="24px" 
                            viewBox="0 -960 960 960" 
                            width="24px" 
                            fill="none"
                        >
                            <path
                                fill="" 
                                d="M540-80q-108 0-184-76t-76-184v-23q-86-14-143-80.5T80-600v-240h120v-40h80v160h-80v-40h-40v160q0 66 47 113t113 47q66 0 113-47t47-113v-160h-40v40h-80v-160h80v40h120v240q0 90-57 156.5T360-363v23q0 75 52.5 127.5T540-160q75 0 127.5-52.5T720-340v-67q-35-12-57.5-43T640-520q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T800-407v67q0 108-76 184T540-80Zm220-400q17 0 28.5-11.5T800-520q0-17-11.5-28.5T760-560q-17 0-28.5 11.5T720-520q0 17 11.5 28.5T760-480Zm0-40Z"/>
                        </svg>
                    </CardDataStats>

                    <CardDataStats title="Total Patients" total={stats.total_patients.toString()} rate="100%">
                        <svg 
                            className="fill-primary dark:fill-white"
                            xmlns="http://www.w3.org/2000/svg" 
                            height="24px" 
                            viewBox="0 -960 960 960" 
                            width="24px" 
                            fill="none"
                        >
                            <path 
                            fill=""
                            d="M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q20 0 40 1.5t40 4.5v81q-20-4-40-5.5t-40-1.5q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32h320v80H160Zm80-80h320-320Zm240-240q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80ZM720 0v-200h-80v-240h240l-80 160h80L720 0Z"/>
                        </svg>
                    </CardDataStats>
    
                    <CardDataStats title="Total Logs" total={stats.total_logs.toString()} rate="100%" >
                        <svg 
                            className="fill-primary dark:fill-white"
                            xmlns="http://www.w3.org/2000/svg" 
                            height="24px" 
                            viewBox="0 -960 960 960" 
                            width="24px" 
                            fill="none"
                        >
                            <path 
                            fill=""
                            d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/>
                        </svg>
                    </CardDataStats>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                    <div className="bg-blue-50 dark:bg-blue-950 p-5 rounded-lg shadow-md">
                        <h2 className="text-slate-400 text-xs font-bold">Répartition des utilisateurs</h2>
                        <Doughnut data={userDistributionData} />
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 p-5 rounded-lg shadow-md">
                        <h2 className="text-slate-400 text-xs font-bold">Médecins actifs/inactifs</h2>
                        <Doughnut data={doctorStatusData} />
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-1 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-6">
                    <div className="bg-blue-50 dark:bg-blue-950 p-5 rounded-lg shadow-md">
                        <h2 className="text-slate-400 text-xs font-bold">Fréquence des visites sur l&apos;application</h2>
                        <Line data={visitData} />
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-1 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                    <div className="bg-blue-50 dark:bg-blue-950 p-5 rounded-lg shadow-md">
                        <h2 className="text-slate-400 text-xs font-bold">Statistiques des ressources</h2>
                        <Bar data={resourceData} />
                    </div>
                </div>
            </>
            ) : 
            <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                  <CardDataStats title="Total Utilisateur" total="0" rate="00%" >
                    <svg
                      className="fill-primary dark:fill-white"
                      width="22"
                      height="16"
                      viewBox="0 0 22 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                        fill=""
                      />
                      <path
                        d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                        fill=""
                      />
                    </svg>
                  </CardDataStats>
                  <CardDataStats title="Total Médecins" total="0" rate="00%" >
                    <svg
                      className="fill-primary dark:fill-white"
                      width="20"
                      height="22"
                      viewBox="0 0 20 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z"
                        fill=""
                      />
                      <path
                        d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z"
                        fill=""
                      />
                      <path
                        d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z"
                        fill=""
                      />
                    </svg>
                  </CardDataStats>
                  <CardDataStats title="Total Patients" total="0" rate="00%">
                    <svg
                      className="fill-primary dark:fill-white"
                      width="22"
                      height="18"
                      viewBox="0 0 22 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                        fill=""
                      />
                      <path
                        d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                        fill=""
                      />
                      <path
                        d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                        fill=""
                      />
                    </svg>
                  </CardDataStats>
    
                  <CardDataStats title="Total Logs" total="0" rate="00%" >
                    <svg
                      className="fill-primary dark:fill-white"
                      width="22"
                      height="18"
                      viewBox="0 0 22 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                        fill=""
                      />
                      <path
                        d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                        fill=""
                      />
                      <path
                        d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                        fill=""
                      />
                    </svg>
                  </CardDataStats>
                </div>
            </>
        }
          
            
            
        </DefaultLayout>
      )
};

export default AdminDashboard;
