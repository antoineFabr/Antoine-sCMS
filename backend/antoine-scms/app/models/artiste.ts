import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Oeuvre from '#models/oeuvre'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Artiste extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pseudo: string

  @column()
  declare description: string

  @manyToMany(() => Oeuvre, {
    pivotTable: 'oeuvre_artiste',
  })
  declare oeuvres: ManyToMany<typeof Oeuvre>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
