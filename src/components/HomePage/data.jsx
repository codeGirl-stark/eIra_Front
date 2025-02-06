import {
    FaceSmileIcon,
    ChartBarSquareIcon,
    CursorArrowRaysIcon,
    DevicePhoneMobileIcon,
    AdjustmentsHorizontalIcon,
    SunIcon,
  } from "@heroicons/react/24/solid";
  
  import benefitOneImg from "../../../public/HomePage/medecin.jpg";
  import benefitTwoImg from "../../../public/HomePage/meufphone.jpg"
  
  const benefitOne = {
    title: "Pourquoi choisir eIra ?",
    desc: "eIra est une plateforme intuitive qui révolutionne la gestion des patients en irathérapie. Grâce à ses fonctionnalités avancées, vous pouvez :    ",
    image: benefitOneImg,
    bullets: [
      {
        title: "Centraliser les informations",
        desc: "Regroupez et sécurisez tous les dossiers médicaux de vos patients en un seul endroit, accessibles à tout moment.",
        icon: <FaceSmileIcon />,
      },
      {
        title: "Planifier avec précision",
        desc: "Gérez facilement les rendez-vous et les visites médicales grâce à un agenda intelligent et automatisé.",
        icon: <ChartBarSquareIcon />,
      },
      {
        title: "Faciliter le suivi thérapeutique",
        desc: "Accédez rapidement à l'historique des traitements et suivez l'évolution des patients en toute simplicité.",
        icon: <CursorArrowRaysIcon />,
      },
    ],
  };
  
  const benefitTwo = {
    title: "Ce qui distingue eIra des autres solutions",
    desc: "Contrairement aux autres plateformes de gestion médicale, eIra est spécialement conçue pour les besoins des médecins en irathérapie, avec des fonctionnalités uniques qui facilitent leur quotidien.",
    image: benefitTwoImg,
    bullets: [
      {
        title: "Une solution spécialisée",
        desc: "Contrairement aux logiciels généralistes, eIra est spécifiquement pensée pour les professionnels de l'irathérapie, avec des outils adaptés à leur pratique.",
        icon: <DevicePhoneMobileIcon />,
      },
      {
        title: "Un accès rapide et flexible",
        desc: "Consultez et mettez à jour vos dossiers où que vous soyez, depuis votre ordinateur, tablette ou smartphone.",
        icon: <AdjustmentsHorizontalIcon />,
      },
      {
        title: "Une gestion intuitive et automatisée",
        desc: "Simplifiez la gestion des dossiers, réduisez les tâches administratives et gagnez du temps grâce à une interface fluide et ergonomique.",
        icon: <SunIcon />,
      },
    ],
  };
  
  
  export {benefitOne, benefitTwo};