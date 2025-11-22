import type { HttpContext } from '@adonisjs/core/http'
import Oeuvre from '#models/oeuvre'
import logger from '@adonisjs/core/services/logger'
import { OeuvreValidator } from '#validators/oeuvre'

export default class OeuvresController {
  async getAll({ response }: HttpContext) {
    try {
      const oeuvres: Oeuvre[] = await Oeuvre.all()

      return response.status(200).send(oeuvres)
    } catch (err) {
      logger.error({ err: err }, "Erreur de recuperation d'oeuvres")
      return response.status(500).send('Erreur serveur')
    }
  }

  async getByName({ params, response }: HttpContext) {
    const name = decodeURIComponent(params.name)

    try {
      const oeuvre = await Oeuvre.findBy('nom', name)
      if (!oeuvre) {
        return response.status(404).send('oeuvre pas trouvé')
      }
      return response.status(200).send(oeuvre)
    } catch (err) {
      logger.error({ err: err }, `erreur lors de la récuperation de l'oeuvre ${name}`)
      return response.status(500).send(`erreur lors de la recuperation de l'oeuvre ${name}`)
    }
  }

  async modify({ request, response, params }: HttpContext) {
    const id = params.id
    try {
      if (isNaN(Number(id))) {
        return response.status(404).send("l'id de l'oeuvre doit etre un nombre")
      }
      const payload = await request.validateUsing(OeuvreValidator)

      const oeuvre = await Oeuvre.findByOrFail('id', id)
      if (!oeuvre) {
        return response.status(404).send("l'oeuvre n'a pas été trouvé")
      }
      oeuvre.merge(payload)
      await oeuvre.save()

      if (payload.artiste_id) {
        await oeuvre.related('artistes').sync(payload.artiste_id)
      }

      return response.status(200).send("l'oeuvre a bien été modifié")
    } catch (err) {
      logger.error({ err: err }, `erreur lors de la modification de l'oeuvre ${id}`)
      return response.status(500).send(`erreur lors de la modification de l'oeuvre ${id}`)
    }
  }
  async delete({ params, response }: HttpContext) {
    const id = params.id
    try {
      if (isNaN(Number(id))) {
        return response.status(404).send("l'id de l'oeuvre doit etre un nombre")
      }

      const oeuvre = await Oeuvre.findByOrFail('id', id)

      await oeuvre.delete()

      return response.status(200).send(`l'oeuvre ${id} a bien été supprimer !`)
    } catch (err) {
      logger.error({ err: err }, `Erreur lors de la suppression de l'oeuvre ${id}`)
      return response.status(500).send(`Erreur lors de la suppression de l'oeuvre ${id}`)
    }
  }
  async create({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(OeuvreValidator)

      const oeuvre = await Oeuvre.create({
        nom: payload.nom,
        description: payload.description,
      })

      await oeuvre.related('artistes').attach(payload.artiste_id)

      return response.status(200).send('Oeuvre créée avec succès !')
    } catch (err) {
      logger.error({ err: err }, "erreur de création d'oeuvre")
      return response.status(500).send("erreur de création d'oeuvre")
    }
  }
}
