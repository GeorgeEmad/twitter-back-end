import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

//Authentication and Register
Route.post('/api/user/login', 'AuthController.user_login') //login
Route.post('/api/user/register', 'AuthController.user_register') //register
Route.post('/api/user/logout', 'AuthController.user_logout') //logout


/**
 * User info
 */
// Route.group(() => {
  // User info
  Route.post('/api/user/info', 'UsersController.userInfo')

  // Post
  // Route.post('/api/request/create', 'RequestsController.create') //create request
  // Route.post('/api/request/cancel', 'RequestsController.cancel')
// }).middleware(['auth:Users'])






// /**
//  * Admins only
//  */
// Route.group(() => {
//   // User
//   Route.post('/api/user/create', 'UsersController.create') //Add user
//   Route.delete('/api/user/delete/:id', 'UsersController.delete') //delete user
//   Route.put('/api/user/update', 'UsersController.update') //edit user
//   // Team
//   Route.post('/api/team/create', 'TeamsController.create') //Add team
//   Route.delete('/api/team/delete/:id', 'TeamsController.destroy') //Delete team
//   Route.post('/api/team/get', 'TeamsController.get_teams') //get teams or team members
//   // Team members
//   Route.post('/api/team/member/create', 'TeamMembersController.addTeamMembers') //Add team member
//   // Request
//   Route.put('/api/request/toggle', 'RequestsController.changeToDone') //Toggle status
//   Route.post('/api/request/all', 'RequestsController.searchByName') //search requests by name and get all
//   // CSV
//   Route.post('/api/csv/upload', 'CsvsController.createOrUpdateFromCsv')
//   Route.post('/api/csv/export', 'CsvsController.exportCsv')
//   // Item
//   Route.post('/api/item/add', 'ItemsController.create')
//   Route.put('/api/item/update', 'ItemsController.update')
//   Route.delete('/api/item/delete/:id', 'ItemsController.delete')
// }).middleware(['auth:Admins'])
// /**
//  * Admins and Users
//  */
// Route.group(() => {
//   // Users
//   Route.post('/api/user/all', 'UsersController.searchByName') //search user by name and get all
//   // Dashboard
//   Route.get('/api/dashboard/bdays', 'UsersController.upcomingBdays') //upcoming bdays
//   Route.get('/api/dashboard/leaderboard', 'UsersController.leaderboard') //leaderboard
//   // Items
//   Route.get('/api/items/all', 'ItemsController.getAll') //get all items
//   //Logout
//   Route.post('/api/logout', 'AuthController.logout') //logout
// }).middleware(['auth:Users,Admins'])
