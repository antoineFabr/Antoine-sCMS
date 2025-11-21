import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Artiste from '#models/artiste'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Artiste.createMany([
      {
        pseudo: 'DJ Snake',
        description:
          'Producteur et DJ français, connu pour ses hits électro et ses collaborations internationales.',
      },
      {
        pseudo: 'Angèle',
        description: 'Chanteuse belge mêlant pop et électro avec des textes engagés.',
      },
      {
        pseudo: 'Orelsan',
        description:
          'Rappeur et réalisateur français, reconnu pour ses textes introspectifs et son humour.',
      },
      {
        pseudo: 'Charlotte de Witte',
        description: 'DJ et productrice belge, figure majeure de la scène techno mondiale.',
      },
      {
        pseudo: 'Stromae',
        description:
          'Auteur-compositeur belge, célèbre pour son mélange unique de musique électronique et de chanson française.',
      },
    ])
  }
}
