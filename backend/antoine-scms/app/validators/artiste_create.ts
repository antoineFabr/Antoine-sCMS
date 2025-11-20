import vine from '@vinejs/vine'

export const ArtisteValidator = vine.compile(
  vine.object({
    pseudo: vine.string(),
    description: vine.string(),
  })
)
