import { Vaccines } from "../hook/useGetVaccine";




export const fakeVaccines: Vaccines = {
  vaccines: [
    {
      vaccineName: "Pfizer-BioNTech COVID-19 Vaccine",
      quantity: 5000,
      price: 25.99,
      description: "This vaccine is used to prevent COVID-19.",
      picture: "https://example.com/pfizer-biontech.jpg",
      source: "Manufactured by Pfizer and BioNTech",
      injectionRoute: "Intramuscular injection",
      warning: "Do not take if allergic to any ingredient in the vaccine.",
      unwantedEffects: "Mild pain at injection site, fatigue, headache",
      mothOld: 12,
      postInjectionReact: "Monitor for any severe allergic reactions.",
      type: "mRNA",
      createdDate: new Date(),
      lastModifiedDate: new Date(),
    },
    {
      vaccineName: "Moderna COVID-19 Vaccine",
      quantity: 4500,
      price: 27.5,
      description: "This vaccine is used to prevent COVID-19.",
      picture: "https://example.com/moderna.jpg",
      source: "Manufactured by Moderna",
      injectionRoute: "Intramuscular injection",
      warning:
        "Consult a healthcare provider if you have any medical concerns.",
      unwantedEffects: "Pain at injection site, fatigue, fever",
      mothOld: 18,
      postInjectionReact: "Monitor for any allergic reactions.",
      type: "mRNA",
      createdDate: new Date(),
      lastModifiedDate: new Date(),
    },
  ],
  limit: 10,
  page: 1,
  totalPage: 20,
};

