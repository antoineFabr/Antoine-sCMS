/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import ArtistesController from '#controllers/artistes_controller'
import OeuvresController from '#controllers/oeuvres_controller'
import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'

// /api
router
  .group(() => {
    router.post('/register', [UsersController, 'create'])
    router.post('/login', [UsersController, 'login'])

    router
      .group(() => {
        router.get('/me', [AuthController, 'authentificate'])
      })
      .prefix('auth')
      .use([middleware.auth()]) // Auth uniquement pour /auth/me

    // /artiste
    router
      .group(() => {
        router.get('/', [ArtistesController, 'getAll'])
        router.post('/', [ArtistesController, 'create'])
        router.get('/:name', [ArtistesController, 'getByName'])
        router.put('/:id', [ArtistesController, 'modify'])
        router.delete('/:id', [ArtistesController, 'delete'])
      })
      .prefix('artiste')

    // /oeuvre
    router
      .group(() => {
        // Routes publiques
        router.get('/', [OeuvresController, 'getAll'])
        router.get('/:name', [OeuvresController, 'getByName'])

        // Routes protégées (sous-groupe séparé)
        router
          .group(() => {
            router.post('/', [OeuvresController, 'create'])
            router.put('/:id', [OeuvresController, 'modify'])
            router.delete('/:id', [OeuvresController, 'delete'])
          })
          .use([middleware.auth(), middleware.roleCheck()]) // Passer les rôles en paramètre
      })
      .prefix('oeuvre')
  })
  .prefix('api')
