import type { HttpContext } from '@adonisjs/core/http'
import { UserValidator } from '#validators/user'
import { LoginUserValidator } from '#validators/login_user'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(UserValidator)

      await User.create({
        email: payload.email,
        password: payload.password,
        //role de visiteur
        role_id: 1,
      })

      return response.status(200).send('Utilisateur créé avec succès')
    } catch (err) {
      return response.status(403).send("utilisateur n'a pas pu etre créé")
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
