import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Entete from "@/components/Entete";
import { SectionTitle } from "@/components/HomeComponents/SectionTitle";
import { Key, Folders, CalendarRange, ShieldCheck, ChartColumn, Handshake, Users, Hospital, Stethoscope, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Fonctionnement() {
    const router = useRouter()

    const handleUserTypeChange = (value: string) => {
        router.push(`/${value}/login`);
    };

   return <>
    <Entete />
          {/* Header */}
          <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center font-medium text-indigo-500 dark:text-gray-100">
                <span>
                  <Image src="/logo.png" alt="Logo" width={120} height={50} />
                </span>
              </Link>
            </div>
            <Select onValueChange={handleUserTypeChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sélectionner un profil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="institution">Institution</SelectItem>
                <SelectItem value="medecin">Médecin</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

    <SectionTitle
        title="Fonctionnement de l'application"
    >
        eIra est une plateforme conçue pour simplifier la gestion des patients en irathérapie. 
        Elle permet aux médecins de centraliser les dossiers médicaux, d&apos;organiser les visites et de suivre efficacement l&apos;évolution des traitements. 
        Grâce à une interface intuitive et sécurisée, eIra optimise votre gestion quotidienne pour vous faire gagner du temps et améliorer la prise en charge des patients.
    </SectionTitle>

    <div className="flex items-center justify-center text-center mb-5 font-bold dark:text-white">
        <Key />
        <h1 className="text-xl">Création et accès aux comptes</h1>
    </div>

    {/* Comptes Content */}
    <main className="flex-grow bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Institution",
                description: "Accès créé par l'administrateur principal, reçoit un identifiant sécurisé, peut créer et gérer les comptes des médecins.",
                icon: <Hospital className="h-8 w-8" />,
              },
              {
                title: "Médecin",
                description: "Créé par l’institution, peut créer et gérer les comptes de ses assistants, Accède à ses patients et à leurs dossiers médicaux.",
                icon: <Stethoscope className="h-8 w-8" />,
              },
              {
                title: "Assistant",
                description: "Créé par le médecin, aide à la gestion pratique des patients de son medecin.",
                icon: <Users className="h-8 w-8" />,
              },
            ].map((card, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {card.icon}
                    <CardTitle>{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{card.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

       {/* Section2 Content */}
    <main className="flex-grow bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Ajout et gestion des patients",
                description: "Formulaire rapide d’enregistrement d’un nouveau patient, historique médical consultable à tout moment, création et accès au dossier médical du patient. ",
                icon: <Folders className="h-8 w-8" />,
              },
              {
                title: "Planification des rendez-vous",
                description: "Création des rendez-vous, vue par jour, semaine ou mois, suppression automatique de visites passées. ",
                icon: <CalendarRange className="h-8 w-8" />,
              },
            ].map((card, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {card.icon}
                    <CardTitle>{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{card.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

       {/* Section3 Content */}
    <main className="flex-grow bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sécurité et gestion des accès",
                description: "Chaque utilisateur a un niveau d’accès précis, toutes les données sont chiffrées et sauvegardées, historique des connexions et des actions.",
                icon: <ShieldCheck className="h-8 w-8" />,
              },
              {
                title: "Statistiques et rapports",
                description: "Vue analytique des consultations par période, répartition des patients par pathologie, par médecin, etc., export des données au format SQL ou CSV .",
                icon: <ChartColumn className="h-8 w-8" />,
              },
              {
                title: "Collaboration simplifiée",
                description: "L’institution supervise l’ensemble des actions, centralisation des données dans un seul outil.",
                icon: <Handshake className="h-8 w-8" />,
              },
            ].map((card, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {card.icon}
                    <CardTitle>{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{card.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-50 dark:bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 mt-10 dark:text-white ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
              <div className="space-y-3">
                <a href="tel:+33123456789" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-5 w-5" />
                  <span>+33 1 23 45 67 89</span>
                </a>
                <a href="mailto:contact@company.com" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                  <span>contact@company.com</span>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens Utiles</h3>
              <p><Link href="fonctionnement" >Fonctionnement de l&apos;application</Link></p> 
              <p><Link href="faq" >FAQ</Link></p> 
              
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Eira. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
   </>
  }
  