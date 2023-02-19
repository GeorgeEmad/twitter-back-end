import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Like from 'App/Models/Like'

export default class LikesController {

    public async create_like({auth, request, response }: HttpContextContract) {
        const validations =  schema.create({
          post_id:  schema.number([rules.exists({ table: 'post', column: 'id' })])
        })
        let { post_id } = await request.validate({ schema: validations })
        const created_like = await Like.create({
            user_id: auth.user?.id,
            post_id: post_id,
          })
          return response.created(created_like)
    }

    // public async unlike({auth, request, response }: HttpContextContract) {
 
    // }

}
