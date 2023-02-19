import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Follow from 'App/Models/Follow'

export default class FollowsController {

    public async create_follow({auth, request, response }: HttpContextContract) {
        const validations =  schema.create({
            user_followed_id:  schema.number([rules.exists({ table: 'user', column: 'id' })]),
        })
        let {user_followed_id} = await request.validate({ schema: validations })
        const created_follow = await Follow.create({
            follower_id: auth.user?.id,
            user_followed_id: user_followed_id,
          })
          return response.created(created_follow)
    }
}
