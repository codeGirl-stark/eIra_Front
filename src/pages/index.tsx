import { useRouter } from "next/router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, ArrowRight, Users, Hospital, Stethoscope } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Entete from "@/components/Entete";


export default function Home() {
  const router = useRouter()

  const handleUserTypeChange = (value: string) => {
    router.push(`/${value}/login`);
  };

  return (
    <>
      <Entete />
      <div className="min-h-screen flex flex-col">
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

      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Pour les Institutions",
                description: "Accédez à une vue d’ensemble sur les activités médicales, gérez les comptes utilisateurs et garantissez un suivi rigoureux des patients.",
                icon: <Hospital className="h-8 w-8" />,
              },
              {
                title: "Pour les Médecins",
                description: "Simplifiez la gestion de vos consultations et de vos dossiers patients pour vous concentrer pleinement sur le soin.",
                icon: <Stethoscope className="h-8 w-8" />,
              },
              {
                title: "Pour les Assistants",
                description: "Soutenez efficacement votre médecin en assurant l'organisation des rendez-vous et la mise à jour des informations patient.",
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
                  <Link 
                    href="fonctionnement" 
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-50 dark:text-white dark:bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
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
    </div>
    </>
  );
}


