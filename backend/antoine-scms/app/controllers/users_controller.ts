import type { HttpContext } from '@adonisjs/core/http'
import { UserValidator } from '#validators/user'
import { LoginUserValidator } from '#validators/login_user'
import logger from '@adonisjs/core/services/logger'

import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import Roles from '#models/roles'

export default class UsersController {
  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(UserValidator)

      const role = await Roles.findByOrFail('role', 'visitor')

      await role.related('users').create({
        email: payload.email,
        password: payload.password,
      })

      return response.status(200).send('Utilisateur créé avec succès')
    } catch (err) {
      logger.error({ err: err }, 'erreur ')
      return response.status(403).send(err)
    }
  }

  async login({ request, session, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(LoginUserValidator)

      const user = await User.findBy('email', payload.email)

      if (!user) {
        return response.status(404).send('utilisateur inconu')
      }

      const passwordValid = await hash.verify(user.password, payload.password)
      if (!passwordValid) {
        return response.status(403).send('password incorrect')
      }

      await session.put('id', user.id)
      await session.put('role', user.role_id)

      await auth.use('web').login(user)
      return response.status(200).send('utilisateur connecté')
    } catch (err) {
      return response.status(500).send("l'utilisateur n'a pas pu se connecter")
    }
  }
}
