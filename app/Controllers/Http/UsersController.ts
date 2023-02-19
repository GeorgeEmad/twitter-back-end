import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
    public async userInfo({ request }: HttpContextContract) {
        const validations =  schema.create({
          user_id: schema.number([rules.exists({ table: 'user', column: 'id' })]),
        })
        let { user_id } = await request.validate({ schema: validations })
        const user_related_data = 
          await User.query()
            .where('id', Number(user_id))
            .preload('posts')
            .preload('user_likes')
            .preload('user_likes')
            .preload("followers")
            .preload("following")
        return { user_related_data }
    }
}
