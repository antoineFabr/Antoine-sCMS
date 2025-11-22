import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import logger from '@adonisjs/core/services/logger'

export default class RoleCheckMiddleware {
  public async handle({ auth, response }: HttpContext, next: NextFn) {
    await auth.check()

    if (!auth.isAuthenticated) {
      return response.status(401).json({ error: 'Non authentifié' })
    }
    const user = auth.getUserOrFail()
    logger.info(user)
    const role = user.role_id === 2 ? 'admin' : 'visitor'

    if (!auth.isAuthenticated) {
      return response.status(401).send('Utilisateur non connecté')
    }

    //role_id 1 est l'id du role admin
    if (role != 'admin') {
      return response.status(403).send('Accès refusé')
    }

    await next()
  }
}
