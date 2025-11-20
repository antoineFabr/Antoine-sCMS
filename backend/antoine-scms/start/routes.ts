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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/register', [UsersController, 'create'])

    router.post('/login', [UsersController, 'login'])

    router
      .group(() => {
        router.get('/', [ArtistesController, 'getAll'])
        router.post('/', [ArtistesController, 'create'])
        router.get('/:name', [ArtistesController, 'getByName'])
        router.put('/:id', [ArtistesController, 'modify'])
        router.delete('/:id', [ArtistesController, 'delete'])
      })
      .prefix('artiste')
    router.group(() => {
      router.get('/',[OeuvresController,"getAll"])
      router.post("/", [OeuvresController, "create"])
      router.get("/:name",[OeuvresController, "getByName"])
      router.put("/:id", [OeuvresController, "modify"])
      router.delete("/:id", [OeuvresController, "delete"])
    }).prefix("oeuvre")
  })
  .prefix('api')
