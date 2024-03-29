import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Post from 'App/Models/Post'


export default class PostsController {

    public async create_post({auth, request, response }: HttpContextContract) {
        const validations =  schema.create({
          content: schema.string([rules.maxLength(255)])
        })
        let { content } = await request.validate({ schema: validations })
        const created_post = await Post.create({
            user_id: auth.user?.id,
            content: content,
          })
          return response.created(created_post)
    }

    public async get_post({request}: HttpContextContract) {
      const validations = schema.create({
        params: schema.object().members({
          id: schema.string({escape: true, trim: true}, [
            rules.exists({ table: 'post', column: 'id' })
          ])
        })
    });
    let query = await request.validate({ schema: validations })
      const post = await Post.query().where('id', Number(query.params.id)).preload("retweet_post").firstOrFail();      
      return post 
  }

  // public async delete_post({request}: HttpContextContract) {}


}
