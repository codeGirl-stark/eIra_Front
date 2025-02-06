import axios from "axios";
import Loader from "@/common/Loader";
import { useRouter } from "next/router";
import {useState, useEffect} from "react";
import dynamic from 'next/dynamic';
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import CircleChart from "@/components/dashboard/circleChart";
import BarChartComponent from "@/components/dashboard/barChart";
import LineChart from "@/components/dashboard/lineChart";
import CardDataStats from "@/components/dashboard/CardDataStats";


interface DefaultInterface {
  total_patients: { count: number; percentage: number };
  total_dossiers: { count: number; percentage: number };
  homme: { count: number; percentage: number };
  femme: { count: number; percentage: number };
  ado: { count: number; percentage: number };
  jeune: { count: number; percentage: number };
  adulte: { count: number; percentage: number };
  carcinome: { count: number; percentage: number };
  effra: { count: number; percentage: number };
  embon: { count: number; percentage: number };
  refrac: { count: number; percentage: number };
  ageDecouverte_agedecouverte1: { count: number; percentage: number };
  ageDecouverte_agedecouverte2: { count: number; percentage: number };
  ageDecouverte_agedecouverte3: { count: number; percentage: number };
  ageDecouverte_agedecouverte4: { count: number; percentage: number };
  ageDecouverte_agedecouverte5: { count: number; percentage: number };
  typeHisto_0: { count: number; percentage: number };
  typeHisto_1: { count: number; percentage: number };
  typeHisto_2: { count: number; percentage: number };
  typeHisto_3: { count: number; percentage: number };
  typeHisto_4: { count: number; percentage: number };
  typeHisto_5: { count: number; percentage: number };
  stade_0: { count: number; percentage: number };
  stade_1: { count: number; percentage: number };
  stade_2: { count: number; percentage: number };
  stade_3: { count: number; percentage: number };
  stade_4: { count: number; percentage: number };
  risque_0: { count: number; percentage: number };
  risque_1: { count: number; percentage: number };
  risque_2: { count: number; percentage: number };
  activiteCumule_cumul1: { count: number; percentage: number };
  activiteCumule_cumul2: { count: number; percentage: number };
  activiteCumule_cumul3: { count: number; percentage: number };
  activiteCumule_cumul4: { count: number; percentage: number };
  activiteCumule_cumul5: { count: number; percentage: number };
}


export const Dashboard: React.FC = () =>  {
  const ChartOne = dynamic(() => import('@/components/dashboard/manyChart'), { ssr: false });

  const router = useRouter();
  const [nom, setNom] = useState("")
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState<boolean>(true);
  const [statistiques, setStatistiques] = useState<DefaultInterface | null>(null);

  const [tranche, setTranche] = useState<number[]>([]);
  const [trancheLabels, setTrancheLabels] = useState<string[]>([]);

  const [typeHisto, setTypeHisto] = useState<number[]>([]);
  const [typeHistoLabels, setTypeHistoLabels] = useState<string[]>([]);

  const [stade, setStade] = useState<number[]>([]);
  const [stadeLabels, setStadeLabels] = useState<string[]>([]);

  const [risque, setRisque] = useState<number[]>([]);
  const [risqueLabels, setRisqueLabels] = useState<string[]>([]);


  const [data2, setData2] = useState<number[]>([]);
  const [labels2, setLabels2] = useState<string[]>([]);

  const [cumulData, setCumulData] = useState<number[]>([]);
  const [cumulLabels, setCumulLabels] = useState<string[]>([]);

  const [decouvData, setDecouvData] = useState<number[]>([]);
  const [decouvLabels, setDecouvLabels] = useState<string[]>([]);


  //Récupérer les statistiques
  useEffect(() => {
    const fetchPatient = async () => {
        const access = localStorage.getItem('access_token');
        if (!access) {
            router.push("../../doctorLogin");
            return;
        }

        await axios.get(`${apiUrl}/medecin/statistiques/`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,
            }
        })
            .then(response =>{
                setStatistiques(response.data); // Enregistre les Patients dans le state
            })
            .catch(error =>{
                alert(error?.response?.data?.erreur || "Erreur lors du chargement des statistiques !");
                console.log(error)
            })
    }

    fetchPatient();
}, [apiUrl]);


 //Récupérer les informations de l'utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      const access = localStorage.getItem('access_token');
      if (!access) {
          router.push("../../doctorLogin");
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
              const mot = response.data.username.replace(/^dr/, "");
              setNom(mot)
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
    

  useEffect(() => {
    // 📌 Data de tranche d'age
    const fetchTrancheData = async () => {
      const response = [
        { category: "Adolescent", value: statistiques?.ado.percentage },
        { category: "Jeune", value: statistiques?.jeune.percentage },
        { category: "Adulte", value: statistiques?.adulte.percentage },
      ];

      // Filtrage des valeurs undefined et extraction des valeurs
      const validData = response.filter(item => item.value !== undefined);

      setTranche(validData.map((item) => item.value as number)); // On peut être sûr que value est un number
      setTrancheLabels(validData.map((item) => item.category));
    };

    const fetchTypeHistoData = async () => {
      const response = [
        { typeHistologique: "Papillaire", valeur: statistiques?.typeHisto_0.percentage },
        { typeHistologique: "Vesiculaire", valeur: statistiques?.typeHisto_1.percentage },
        { typeHistologique: "PapilloVesiculaire", valeur: statistiques?.typeHisto_2.percentage },
        { typeHistologique: "Medullaire", valeur: statistiques?.typeHisto_3.percentage },
        { typeHistologique: "Anaplasique", valeur: statistiques?.typeHisto_4.percentage },
        { typeHistologique: "Autres", valeur: statistiques?.typeHisto_5.percentage },
      ];

      
      // Filtrage des valeurs undefined et extraction des valeurs
      const validData =  response.filter(item => !isNaN(Number(item.valeur)));

      setTypeHisto(validData.map((item) => item.valeur as number)); // On peut être sûr que value est un number
      setTypeHistoLabels(validData.map((item) => item.typeHistologique));
    };


    const fetchStadeData = async () => {
      const response = [
        { Stade: "I", stadevalue: statistiques?.stade_0.percentage },
        { Stade: "II", stadevalue: statistiques?.typeHisto_1.percentage },
        { Stade: "III", stadevalue: statistiques?.typeHisto_2.percentage },
        { Stade: "IVA", stadevalue: statistiques?.typeHisto_3.percentage },
        { Stade: "IVB", stadevalue: statistiques?.typeHisto_4.percentage },
      ];

      
      // Filtrage des valeurs undefined et extraction des valeurs
      const validData =  response.filter(item => !isNaN(Number(item.stadevalue)));

      setStade(validData.map((item) => item.stadevalue as number)); // On peut être sûr que value est un number
      setStadeLabels(validData.map((item) => item.Stade));
    };


    const fetchRisqueData = async () => {
      const response = [
        { Risque: "Faible", risquevalue: statistiques?.risque_0.percentage },
        { Risque: "Intermediare", risquevalue: statistiques?.risque_1.percentage },
        { Risque: "Haut", risquevalue: statistiques?.risque_2.percentage }
      ];

      
      // Filtrage des valeurs undefined et extraction des valeurs
      const validData =  response.filter(item => !isNaN(Number(item.risquevalue)));

      setRisque(validData.map((item) => item.risquevalue as number)); // On peut être sûr que value est un number
      setRisqueLabels(validData.map((item) => item.Risque));
    };

    fetchTrancheData();
    fetchTypeHistoData();
    fetchStadeData();
    fetchRisqueData();

  }, [statistiques]);

 

  useEffect(() => {
    // Simulation des données (Remplace par une API si nécessaire)
    const fetchData2 = async () => {
      const response = [
          { month: "Carcinome", count: statistiques?.carcinome?.percentage ?? 0 },
          { month: "Effraction Capsulaire", count: statistiques?.effra?.percentage ?? 0 },
          { month: "Embole Vasculaire", count: statistiques?.embon?.percentage ?? 0 },
          { month: "Refractaire", count: statistiques?.refrac?.percentage ?? 0 },
      ];


      // Vérifier si les valeurs sont valides
      const validData = response.filter(item => typeof item.count === 'number' && !isNaN(item.count));

      // Passage des données au graphique après validation
      setData2(validData.map(item => item.count)); // On utilise count directement
      setLabels2(validData.map(item => item.month));
  };

    fetchData2();
  }, [statistiques]);


  //Datas pour lineChart
  useEffect(() => {
    // 📌 Simulation des données (Remplace par une API)
    const fetchData3 = async () => {
      // Création des données avec les bonnes clés
      const response = [
        { type: "Moins de 25ans", decouvaleur: statistiques?.ageDecouverte_agedecouverte1.percentage },
        { type: "Entre 25 et 50", decouvaleur: statistiques?.ageDecouverte_agedecouverte2.percentage },
        { type: "Entre 50 et 80", decouvaleur: statistiques?.ageDecouverte_agedecouverte3.percentage },
        { type: "Entre 80 et 100", decouvaleur: statistiques?.ageDecouverte_agedecouverte4.percentage },
        { type: "Plus de 100ans", decouvaleur: statistiques?.ageDecouverte_agedecouverte5.percentage },
      ];

       // Filtrage des valeurs undefined et NaN, puis conversion en nombre si nécessaire
    const validData = response
    .filter(item => typeof item.decouvaleur === 'number' && !isNaN(item.decouvaleur))
    .map(item => ({
      ...item,
      // Assure-toi que la valeur est un nombre valide
      valeur: item.decouvaleur ?? 0, // Si undefined, donne une valeur par défaut (par exemple, 0)
    }));

    // Passage des données au graphique après validation
    setDecouvData(validData.map(item => item.valeur));
    setDecouvLabels(validData.map(item => item.type));
  };


  //Age de découverte
  const fetchCumulData = async () => {
    // Création des données avec les bonnes clés
    const response = [
      { cumulType: "Moins de 10", cumulvaleur: statistiques?.activiteCumule_cumul1.percentage },
      { cumulType: "Entre 10 et 30", cumulvaleur: statistiques?.activiteCumule_cumul2.percentage },
      { cumulType: "Entre 30 et 50", cumulvaleur: statistiques?.activiteCumule_cumul3.percentage },
      { cumulType: "Entre 50 et 100", cumulvaleur: statistiques?.activiteCumule_cumul4.percentage },
      { cumulType: "Plus de 100", cumulvaleur: statistiques?.activiteCumule_cumul5.percentage },
    ];

      // Filtrage des valeurs undefined et NaN, puis conversion en nombre si nécessaire
    const validData = response
    .filter(item => typeof item.cumulvaleur === 'number' && !isNaN(item.cumulvaleur))
    .map(item => ({
      ...item,
      // Assure-toi que la valeur est un nombre valide
      valeur: item.cumulvaleur ?? 0, // Si undefined, donne une valeur par défaut (par exemple, 0)
    }));

    // Passage des données au graphique après validation
    setCumulData(validData.map(item => item.valeur));
    setCumulLabels(validData.map(item => item.cumulType));
  };


  fetchData3();
  fetchCumulData();
}, [statistiques]);  // Ajout de 'statistiques' dans le tableau des dépendances



useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simule un chargement de données
}, []);

  

return loading ? (
    // Spinner de chargement
    <Loader/>
  ) : (
    <DefaultLayout>

        <Breadcrumb pageName={`Bienvenu docteur ${nom} `}/>
        
        {statistiques && statistiques.total_patients.count > 0  ?(
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
              <CardDataStats title="Hommes" total={statistiques.homme.count.toString()} rate={`${statistiques.homme.percentage} %`} >
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
                  d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-720q-111 0-196 66.5T171-564q20-5 41.5-19.5T262-654q15-31 44-48.5t64-17.5h220q35 0 64 17.5t44 48.5q28 57 50.5 71t40.5 19q-28-103-112.5-169.5T480-800Zm0 640q134 0 227.5-94T800-482q-71-7-109-44.5T626-618q-5-11-14.5-16.5T591-640H370q-12 0-21.5 5.5T334-618q-27 55-66 92.5T160-481q0 134 93.5 227.5T480-160ZM360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-720Z"/>
                </svg>
              </CardDataStats>
              <CardDataStats title="Femmes" total={statistiques.femme.count.toString()} rate={`${statistiques.femme.percentage} %`} >
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
                    d="M480-240q134 0 227-93.5T800-560q0-31-5-59.5T779-675q-27 17-57 26t-62 9q-54 0-101.5-24.5T480-734q-31 45-78.5 69.5T300-640q-32 0-62-9t-57-26q-11 27-16 55.5t-5 59.5q0 133 93.5 226.5T480-240ZM360-470q21 0 35.5-14.5T410-520q0-21-14.5-35.5T360-570q-21 0-35.5 14.5T310-520q0 21 14.5 35.5T360-470Zm240 0q21 0 35.5-14.5T650-520q0-21-14.5-35.5T600-570q-21 0-35.5 14.5T550-520q0 21 14.5 35.5T600-470ZM300-720q58 0 99-41t41-99v-18q-68 8-125 43t-95 89q18 12 38 19t42 7Zm360 0q22 0 42-6.5t38-19.5q-38-54-94.5-89T520-878v18q0 58 41 99t99 41ZM88-80q-35 0-59-26T8-167l36-395q8-84 45.5-157t96-126.5q58.5-53.5 134-84T480-960q85 0 160.5 30.5t134 84Q833-792 870.5-719T916-562l36 395q3 35-21 61t-59 26H88Zm392-80q-125 0-225-69.5T110-408L88-160h784l-22-248q-45 109-144.5 178.5T480-160Zm40-718Zm-80 0Zm40 718h392H88h392Z"/>
                </svg>
              </CardDataStats>
              <CardDataStats title="Patient Total" total={statistiques.total_patients.count.toString()} rate={`${statistiques.total_patients.percentage} %`}>
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

              <CardDataStats title="Dossier Total" total={statistiques.total_dossiers.count.toString()} rate={`${statistiques.total_dossiers.percentage} %`} >
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
                    d="M240-320h320v-80H240v80Zm0-160h480v-80H240v80Zm-80 320q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/>
                </svg>
              </CardDataStats>
            </div>

            <div className="flex flex-col lg:flex-row">
              <CircleChart title="Tranche d&apos;âge des patients" data={tranche} labels={trancheLabels} />
              <BarChartComponent data={data2} labels={labels2} />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
              <CircleChart title="Type Histologique"  data={typeHisto} labels={typeHistoLabels} />
              <CircleChart title="Stade" data={stade} labels={stadeLabels} />
              <CircleChart title="Risques"  data={risque} labels={risqueLabels} />
            </div>

            <div className="mb-5 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
              <LineChart title="Activités Cumulées" data={cumulData} labels={cumulLabels} />
              <LineChart title="Âge de découverte"  data={decouvData} labels={decouvLabels} />
            </div>

            <ChartOne />
          </>) : 
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
              <CardDataStats title="Hommes" total="0" rate="00%" >
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
              <CardDataStats title="Femmes" total="0" rate="00%" >
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
              <CardDataStats title="Patient Total" total="0" rate="00%">
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

              <CardDataStats title="Dossier Total" total="0" rate="00%" >
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

export default Dashboard;