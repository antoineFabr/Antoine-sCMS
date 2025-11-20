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
  async getByName({ params, response }: HttpContext) {
    const name = params.name

    try {
      
      const artiste = await Artiste.findBy('pseudo', name)
      if (!artiste) {
        return response.status(404).send('artiste pas trouvé')
      }
      return response.status(200).send(artiste)
    } catch (err) {
      logger.error({ err: err }, `erreur lors de la récuperation de l'artiste ${name}`)
      return response.status(500).send(`erreur lors de la recuperation de l'artiste ${name}`)
    }
  }
  async modify({ request, params, response }: HttpContext) {
    const id = params.id
    try {
      if (isNaN(Number(id))) {
        return response.status(404).send("l'id de l'artiste doit etre un nombre")
      }
      const payload = await request.validateUsing(ArtisteValidator)

      const artiste = await Artiste.findByOrFail('id', id)
      if (!artiste) {
        return response.status(404).send("l'artiste n'a pas été trouvé")
      }
      artiste.merge(payload)
      await artiste.save()

      return response.status(200).send("l'artiste a bien été modifié")
    } catch (err) {
      logger.error({ err: err }, `erreur lors de la modification de l'artiste ${id}`)
      return response.status(500).send(`erreur lors de la modification de l'artiste ${id}`)
    }
  }
  async delete({ params, response }: HttpContext) {
    const id = params.id
    try {
      if (isNaN(Number(id))) {
        return response.status(404).send("l'id de l'artiste doit etre un nombre")
      }

      const artiste = await Artiste.findByOrFail('id', id)
      if (!artiste) {
        return response.status(404).send("l'artiste n'a pas été trouvé")
      }
      await artiste.delete()

      return response.status(200).send(`l'artiste ${id} a bien été supprimer !`)
    } catch (err) {
      logger.error({ err: err }, `Erreur lors de la suppression de l'artiste ${id}`)
      return response.status(500).send(`Erreur lors de la suppression de l'artiste ${id}`)
    }
  }
}
