"use client";
import React from "react";
import { Container } from "@/components/HomePage/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "Qu'est-ce que eIra et à qui s'adresse-t-elle ?",
    answer: "eIra est une plateforme conçue pour les médecins spécialisés en irathérapie afin de gérer efficacement les dossiers médicaux, les visites et le suivi des patients. Elle est destinée aux professionnels de santé souhaitant une gestion optimisée et sécurisée de leurs données.",
  },
  {
    question: "Faut-il installer un logiciel pour utiliser eIra ?",
    answer: "Non, eIra est une application 100% web. Vous pouvez y accéder depuis n’importe quel appareil (ordinateur, tablette, mobile) avec une simple connexion Internet.",
  },
  {
    question: "Quels sont les avantages par rapport aux dossiers papier ou aux solutions classiques ? ",
    answer:
      "Contrairement aux dossiers papier ou aux outils non spécialisés, eIra vous permet de centraliser toutes les données patients sur une plateforme unique, d'accéder rapidement aux informations sans risque de perte, de gagner du temps avec des rappels de visites et un suivi intelligent et de renforcer la sécurité des informations médicales.",
  },
  {
    question: "Comment puis-je commencer à utiliser eIra ?",
    answer:
      "C’est simple ! Connectez-vous sur notre plateforme avec vos identifiants et commencez à gérer vos patients en quelques minutes.",
  },
  {
    question: "Est-ce que eIra fonctionne sur mobile ?",
    answer:
      "Oui ! eIra est responsive et s’adapte à tous les écrans (smartphones, tablettes, ordinateurs). Vous pouvez consulter et mettre à jour vos dossiers où que vous soyez.",
  },
  {
    question: "eIra est-elle adaptée aux cliniques ou seulement aux médecins indépendants ?",
    answer:
      "eIra est flexible et peut être utilisée aussi bien par des médecins indépendants que par des structures médicales. Nous proposons des fonctionnalités adaptées aux besoins de chacun.",
  },
  {
    question: "Comment eIra garantit-elle la confidentialité des données des patients ?",
    answer: "La protection des données est notre priorité. eIra utilise des protocoles de sécurité avancés (chiffrement, authentification sécurisée) pour garantir la confidentialité et la conformité aux normes médicales en vigueur.",
  },
  {
    question: "Est-il possible d’obtenir une démonstration avant de s’engager ?",
    answer:
      " Bien sûr ! Vous pouvez demander une démo gratuite pour découvrir comment eIra peut transformer la gestion de vos patients.",
  },
];