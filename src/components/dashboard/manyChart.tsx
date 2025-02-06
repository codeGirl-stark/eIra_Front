import axios from 'axios';
import { useRouter } from 'next/router';
import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';


interface ClassificationsInterface {
    clasT_0: { count: number; percentage: number };
    clasT_1: { count: number; percentage: number };
    clasT_2: { count: number; percentage: number };
    clasT_3: { count: number; percentage: number };
    clasT_4: { count: number; percentage: number };
    clasT_5: { count: number; percentage: number };
    clasT_6: { count: number; percentage: number };
    clasT_7: { count: number; percentage: number };
    clasT_8: { count: number; percentage: number };
    clasN_0: { count: number; percentage: number };
    clasN_1: { count: number; percentage: number };
    clasN_2: { count: number; percentage: number };
    clasN_3: { count: number; percentage: number };
    clasM_0: { count: number; percentage: number };
    clasM_1: { count: number; percentage: number };
    clasM_2: { count: number; percentage: number };
}

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [data1, setData1] = useState<number[]>([]);
    const [data2, setData2] = useState<number[]>([]);
    const [data3, setData3] = useState<number[]>([]);
    const [statistiques, setStatistiques] = useState<ClassificationsInterface | null>(null);

    const [options] = useState<ApexOptions>({
        legend: {
          show: false,
          position: 'top',
          horizontalAlign: 'left',
        },
        colors: ['orange', 'red','green'],
        chart: {
          fontFamily: 'Satoshi, sans-serif',
          height: 335,
          type: 'area',
          dropShadow: {
            enabled: true,
            color: '#623CEA14',
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
          },
      
          toolbar: {
            show: false,
          },
        },
        responsive: [
          {
            breakpoint: 1024,
            options: {
              chart: {
                height: 300,
              },
            },
          },
          {
            breakpoint: 1366,
            options: {
              chart: {
                height: 350,
              },
            },
          },
          {
              breakpoint: 1520,
              options: {
                chart: {
                  height: 400,
                },
              },
            },
        ],
        stroke: {
          width: [2, 2],
          curve: 'straight',
        },
        // labels: {
        //   show: false,
        //   position: "top",
        // },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 4,
          colors: '#fff',
          strokeColors: ['#3056D3', '#80CAEE'],
          strokeWidth: 3,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          hover: {
            size: undefined,
            sizeOffset: 5,
          },
        },
        xaxis: {
          type: 'category',
          categories: ['Tx Nx Mx', 'T0 N0 M0', 'T1a N1a M1', 'T1b N1b', 'T2', 'T3a', 'T3b', 'T4a', 'T4b'],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              colors: "gray", // Rendre les labels visibles en mode sombre
            },
          },
        },
        yaxis: {
          title: {
            style: {
              fontSize: '0px',
            },
          },
          min: 0,
          max: 100,
          labels: {
            style: {
              colors: "gray", // Change la couleur des labels en mode sombre
            },
          },
        },
      });

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
                    alert(error?.response?.data?.erreur || "Erreur lors de la récupération des statstiques !");
                    console.log(error)
                })
        }
    
        fetchPatient();
    }, [apiUrl]);

    useEffect(() => {
        if (statistiques && Object.keys(statistiques).length > 0) {
            const dataValues1 = [
                statistiques.clasT_0?.percentage ?? 0,
                statistiques.clasT_1?.percentage ?? 0,
                statistiques.clasT_2?.percentage ?? 0,
                statistiques.clasT_3?.percentage ?? 0,
                statistiques.clasT_4?.percentage ?? 0,
                statistiques.clasT_5?.percentage ?? 0,
                statistiques.clasT_6?.percentage ?? 0,
                statistiques.clasT_7?.percentage ?? 0,
                statistiques.clasT_8?.percentage ?? 0,
            ]
            const dataValues2 = [
                statistiques.clasN_0?.percentage ?? 0,
                statistiques.clasN_1?.percentage ?? 0,
                statistiques.clasN_2?.percentage ?? 0,
                statistiques.clasN_3?.percentage ?? 0,
            ]
            const dataValues3 = [
                statistiques.clasM_0?.percentage ?? 0,
                statistiques.clasM_1?.percentage ?? 0,
                statistiques.clasM_2?.percentage ?? 0,
            ]

            setData1(dataValues1)
            setData2(dataValues2)
            setData3(dataValues3)
        }

    }, [statistiques]);


  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Classification T',
        data: [],
      },

      {
        name: 'Classification N',
        data: [],
      },

      {
        name: 'Classification M',
        data: [],
      },
    ],
  });

   // Utilisez useEffect pour mettre à jour l'état lorsque data1 est disponible
   useEffect(() => {
        if (data1.length > 0 && data2.length > 0 && data3.length > 0) {

            setState(prevState => ({
                ...prevState,
                series: [
                    {
                        name: 'Classification T',
                        data: data1,
                    },
                    {
                        name: 'Classification N',
                        data: data2,
                    },
                    {
                        name: 'Classification M',
                        data: data3,
                    },
                ],
            }));

        }
    }, [data1, data2, data3]);



  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-10 rounded-sm dark:text-white border border-stroke bg-white px-5 pt-5 pb-5 shadow-default dark:border-gray-500 dark:bg-blue-950 sm:px-7.5 xl:col-span-8">
      <h3 className="text-sm font-semibold text-gray-400 mb-4">Classifications</h3>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-orange-500">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-orange-500"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-orange-500">Classification T</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-red-500">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-red-500"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-red-500">Classification N</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-green-600">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-green-600"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-green-600">Classification M</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;