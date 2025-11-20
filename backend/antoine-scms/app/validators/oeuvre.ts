import vine from '@vinejs/vine'

export const OeuvreValidator = vine.compile(
  vine.object({
    nom: vine.string(),
    description: vine.string(),
    artiste_id: vine.array(vine.number().exists({ table: 'artistes', column: 'id' })),
  })
)
