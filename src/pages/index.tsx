import Image from "next/image";

import Navbar from "@/components/HomePage/Navbar";
import { Container } from "@/components/HomePage/Container";
import { Hero } from "@/components/HomePage/Hero";
import { SectionTitle } from "@/components/HomePage/SectionTitle";
import { Benefits } from "@/components/HomePage/Benefits";
import { Faq } from "@/components/HomePage/Faq";
import { Cta } from "@/components/HomePage/Cta";
import Footer from "@/components/HomePage/Footer";
import Entete from "@/components/Entete";

import { benefitOne, benefitTwo } from "@/components/HomePage/data";


export default function Home() {
  return (
    <>
      <Entete />
      
      <Navbar />

      <Container>
        <Hero />
        <SectionTitle
          preTitle="eIra c&apos;est quoi?"
          title="À propos de eIra"
        >
          eIra est une plateforme conçue pour simplifier la gestion des patients en irathérapie. 
          Elle permet aux médecins de centraliser les dossiers médicaux, d&apos;organiser les visites et de suivre efficacement l&apos;évolution des traitements. 
          Grâce à une interface intuitive et sécurisée, eIra optimise votre gestion quotidienne pour vous faire gagner du temps et améliorer la prise en charge des patients.        
        </SectionTitle>

        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />

        <SectionTitle
          preTitle="Quelques captures"
          title="Des fonctionnalités de eIra"
        >
          Plongez au cœur de l’expérience eIra à travers ces aperçus de l’interface.  
          Découvrez comment la plateforme simplifie la gestion des dossiers médicaux,  
          optimise le suivi des patients et facilite l&apos;organisation des consultations.  
        </SectionTitle>

        <div className="p-5 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <Image
              src="/capture/connexion.png"
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
          <Image
              src="/capture/dashboard.png"
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
          <Image
              src="/capture/profil.png"
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
        </div>
        <div className="p-5 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <Image
              src="/capture/newPatient.png"
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
          <Image
              src="/capture/newDossier.png"
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
          <Image
              src="/capture/newVisite.png"
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
        </div>

        <SectionTitle preTitle="FAQ" title="Des questions ? Nous avons les réponses !">
          Vous vous demandez comment eIra peut améliorer votre gestion des patients ? 
          Découvrez les réponses aux questions les plus fréquentes et voyez comment notre solution peut transformer votre quotidien médical.
        </SectionTitle>

        <Faq />

        <SectionTitle
          preTitle="Optimisez votre pratique médicale avec eIra !"
          title="Passez à l’irathérapie moderne dès aujourd’hui !"
        >
          Ne perdez plus de temps avec des dossiers dispersés et une organisation chronophage. 
          eIra vous offre un espace centralisé pour gérer vos patients, planifier vos visites et sécuriser vos données médicales. 
          Faites le choix de l’innovation et simplifiez votre quotidien dès maintenant !
        </SectionTitle>
        <div className="xl:ml-10 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
          <Image
              src="/HomePage/bgEira.jpg"
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
          <Image
              src="/HomePage/yesphone.jpg"
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
        </div>

        

        <Cta />
        <Footer />
      
      </Container>
    </>
  );
}
