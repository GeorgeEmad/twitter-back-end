import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Post from 'App/Models/Post'


export default class PostsController {

    public async create_post({auth, request, response }: HttpContextContract) {
        const validations =  schema.create({
        //   user_id: schema.number([rules.exists({ table: 'user', column: 'id' })]),
          content: schema.string([rules.maxLength(255)])
        })
        let { content } = await request.validate({ schema: validations })
        const created_post = await Post.create({
            user_id: auth.user?.id,
            content: content,
          })
          return response.created(created_post)
    }

}
