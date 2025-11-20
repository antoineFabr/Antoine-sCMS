import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class AuthController {
  async authentificate({ auth, response }: HttpContext) {
    try {
      await auth.check()

      if (!auth.isAuthenticated) {
        return response.status(401).json({ error: 'Non authentifié' })
      }
      const user = auth.getUserOrFail()
      const role = user.role_id === 2 ? 'admin' : 'visitor'
      return response.json({
        id: user.id,
        role: role,
      })
    } catch (err) {
      logger.error({ err: err })
      return response.status(401).json({ error: 'Non authentifié' })
    }
  }
}
