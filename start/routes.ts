import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

//Authentication and Register
Route.post('/api/user/login', 'AuthController.user_login') //login
Route.post('/api/user/register', 'AuthController.user_register') //register
Route.post('/api/user/logout', 'AuthController.user_logout') //logout


Route.get('/api/post/:id', 'PostsController.get_post') //get post


Route.group(() => {
  Route.post('/api/user/info', 'UsersController.userInfo') //get all user info
  Route.get('/api/user/timeline', 'UsersController.get_timeline') //get timeline
  Route.post('/api/post/create', 'PostsController.create_post') //create post
  Route.post('/api/like/create', 'LikesController.create_like') // create like
  Route.post('/api/follow/create', 'FollowsController.create_follow') // create follow
}).middleware(['auth:Users'])




