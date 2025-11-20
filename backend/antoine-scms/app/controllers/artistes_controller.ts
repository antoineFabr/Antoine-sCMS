import type { HttpContext } from '@adonisjs/core/http'
import Artiste from '#models/artiste'
import logger from '@adonisjs/core/services/logger'
import { ArtisteValidator } from '#validators/artiste_create'

export default class ArtistesController {
  async getAll({ response }: HttpContext) {
    try {
      const artistes: Artiste[] = await Artiste.all()

      return response.status(200).send(artistes)
    } catch (err) {
      logger.error({ err: err }, "Erreur de recuperation d'artiste")
      return response.status(500).send('Erreur serveur')
    }
  }
  async create({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(ArtisteValidator)

      await Artiste.create({
        pseudo: payload.pseudo,
        description: payload.description,
      })

      return response.status(200).send('Artiste créé avec succès !')
    } catch (err) {
      logger.error({ err: err }, "erreur de création d'artiste")
      return response.status(500).send("erreur de création d'artiste")
    }
  }
  async getById({}: HttpContext) {}
  async modify({}: HttpContext) {}
  async delete({}: HttpContext) {}
}
