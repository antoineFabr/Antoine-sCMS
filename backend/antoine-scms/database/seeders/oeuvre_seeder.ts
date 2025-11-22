import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Oeuvre from '#models/oeuvre'
import Artiste from '#models/artiste'

export default class extends BaseSeeder {
  async run() {
    const oeuvres = await Oeuvre.createMany([
      {
        nom: 'Turn Down for What',
        description:
          'Single explosif mêlant trap et électro, devenu un hymne des soirées mondiales.',
      },
      {
        nom: 'Taki Taki',
        description:
          'Collaboration reggaeton avec Selena Gomez, Ozuna et Cardi B, aux sonorités latines.',
      },
      {
        nom: 'Balance ton quoi',
        description: 'Titre pop engagé dénonçant le harcèlement et les inégalités de genre.',
      },
      {
        nom: 'Balance ton quoi',
        description: 'Titre pop engagé dénonçant le harcèlement et les inégalités de genre.',
      },
      {
        nom: 'Balance ton quoi',
        description: 'Titre pop engagé dénonçant le harcèlement et les inégalités de genre.',
      },
      {
        nom: 'Balance ton quoi',
        description: 'Titre pop engagé dénonçant le harcèlement et les inégalités de genre.',
      },
      {
        nom: 'Balance ton quoi',
        description: 'Titre pop engagé dénonçant le harcèlement et les inégalités de genre.',
      },
      {
        nom: 'Balance ton quoi',
        description: 'Titre pop engagé dénonçant le harcèlement et les inégalités de genre.',
      },
      {
        nom: 'Tout oublier',
        description: 'Duo familial dansant et nostalgique, devenu un tube incontournable.',
      },
      {
        nom: 'Basique',
        description: 'Morceau rap percutant aux paroles directes sur les évidences de la vie.',
      },
      {
        nom: 'La fête est finie',
        description:
          "Album introspectif explorant les thèmes de la célébrité et du passage à l'âge adulte.",
      },
      {
        nom: 'Rave On Time',
        description:
          'Track techno puissante aux basses profondes, référence des clubs underground.',
      },
      {
        nom: 'Papaoutai',
        description:
          "Chanson sur l'absence paternelle, mêlant rythmes électroniques et émotions profondes.",
      },
      {
        nom: 'Formidable',
        description:
          'Ballade poignante sur la rupture amoureuse, tournée en plan-séquence dans les rues de Bruxelles.',
      },
      {
        nom: 'Santé',
        description:
          "Hommage vibrant aux travailleurs de l'ombre, porté par un clip coloré et festif.",
      },
    ])

    // Récupérer les artistes par leur pseudo
    const djSnake = await Artiste.findBy('pseudo', 'DJ Snake')
    const angele = await Artiste.findBy('pseudo', 'Angèle')
    const orelsan = await Artiste.findBy('pseudo', 'Orelsan')
    const charlotte = await Artiste.findBy('pseudo', 'Charlotte de Witte')
    const stromae = await Artiste.findBy('pseudo', 'Stromae')

    // DJ Snake
    if (djSnake) {
      await oeuvres[0].related('artistes').attach([djSnake.id])
      await oeuvres[1].related('artistes').attach([djSnake.id])
    }

    // Angèle
    if (angele) {
      await oeuvres[2].related('artistes').attach([angele.id])
    }

    // Angèle & Stromae - Tout oublier (collaboration)
    if (angele && stromae) {
      await oeuvres[3].related('artistes').attach([angele.id, stromae.id])
      await oeuvres[4].related('artistes').attach([angele.id, stromae.id])

      await oeuvres[5].related('artistes').attach([angele.id, stromae.id])
      await oeuvres[6].related('artistes').attach([angele.id, stromae.id])
      await oeuvres[7].related('artistes').attach([angele.id, stromae.id])
    }

    // Orelsan
    if (orelsan) {
      await oeuvres[8].related('artistes').attach([orelsan.id])
      await oeuvres[9].related('artistes').attach([orelsan.id])
    }

    // Charlotte de Witte
    if (charlotte) {
      await oeuvres[10].related('artistes').attach([charlotte.id])
    }

    // Stromae
    if (stromae) {
      await oeuvres[11].related('artistes').attach([stromae.id])
      await oeuvres[12].related('artistes').attach([stromae.id])
      await oeuvres[13].related('artistes').attach([stromae.id])
    }
  }
}
