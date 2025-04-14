import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Entete from "@/components/Entete";
import { Faq } from "@/components/HomeComponents/faqComp";
import { SectionTitle } from "@/components/HomeComponents/SectionTitle";
import { Phone, Mail } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FAQ () {
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
        title="Foire aux questions"
    >
        Vous avez des questions ? Nous avons les réponses. 
        Retrouvez ici les interrogations les plus fréquentes à propos de l’utilisation de l’application eIra. 
        Si vous ne trouvez pas ce que vous cherchez, n’hésitez pas à nous contacter.
    </SectionTitle>

    <Faq />

      {/* Footer */}
      <footer className="bg-blue-50 dark:bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5  dark:text-white ">
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
  