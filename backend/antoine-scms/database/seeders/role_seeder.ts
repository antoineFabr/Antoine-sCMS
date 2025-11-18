import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
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
