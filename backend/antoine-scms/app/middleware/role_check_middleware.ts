import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleCheckMiddleware {
  public async handle({ auth, response }: HttpContext, next: NextFn) {
    const user = auth.getUserOrFail()

    if (!auth.isAuthenticated) {
      return response.status(401).send('Utilisateur non connecté')
    }

    const role = user.role_id
    //role_id 1 est l'id du role admin
    if (role != 1) {
      return response.status(403).send('Accès refusé')
    }

    await next()
  }
}
