import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Oeuvre from '#models/oeuvre'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

type PageBlock = {
  id: string
  type: string
  props: Record<string, any>
}

export default class Artiste extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pseudo: string

  @column()
  declare description: string

  @column({
    prepare: (value: PageBlock[]) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare pageLayout: PageBlock[] | null

  @column()
  declare templateModel: string

  @manyToMany(() => Oeuvre, {
    pivotTable: 'oeuvre_artiste',
  })
  declare oeuvres: ManyToMany<typeof Oeuvre>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
