import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Roles from '#models/roles'

export default class extends BaseSeeder {
  async run() {
    await Roles.createMany([
      {
        role: 'visitor',
      },
      {
        role: 'admin',
      },
      {
        role: 'creator',
      },
    ])
    // Write your database queries inside the run method
  }
}
