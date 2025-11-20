import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'oeuvre_artistes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('oeuvre_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('oeuvres')
        .onDelete('CASCADE')

      table
        .integer('artiste_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('artistes')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
