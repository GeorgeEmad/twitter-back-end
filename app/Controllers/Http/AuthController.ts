import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules} from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'

export default class AuthController {
  /**
   * User login
   * @param param0
   * @returns
   */
   public async user_login({ request, response, auth }: HttpContextContract) {
    const loginSchema = schema.create({
        username: schema.string(),
        password: schema.string(),
      })
    const {username, password} = await request.validate({ schema: loginSchema })
    try {
      const token = await auth.use('Users').attempt(username.toLowerCase(), password)
      return response.status(200).json({token:token, user:token.user})
    } catch (error){
      return response.status(400).send({error:error.responseText})
    }
  }

  public async user_register({ request, response }: HttpContextContract) {
    const registerSchema = schema.create({
        password: schema.string([rules.minLength(6)]),
        username: schema.string([rules.unique({ table: 'user', column: 'username' })]),
        age: schema.number.optional(),
        description: schema.string.optional(),
        gender: schema.enum.optional(['male', 'female'] as const),
    })
    let {username, password, age, description, gender} = await request.validate({ schema: registerSchema })

    username = username.toLowerCase()
    const user = new User()
    user.fill({
      username,
      password,
      age,
      description,
      gender
    })
    await user.save()
    return response.created(user)
  }




  /**
   * Logout
   * @param param0
   * @returns
   */
  public async user_logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200)
  }

}
