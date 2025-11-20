import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Artiste from '#models/artiste'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Oeuvre extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare description: string

  @manyToMany(() => Artiste, {
    pivotTable: 'oeuvre_artiste',
  })
  declare artistes: ManyToMany<typeof Artiste>
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
