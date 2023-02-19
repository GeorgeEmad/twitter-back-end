import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Post from 'App/Models/Post'


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

    public async get_timeline({ auth, request, response }: HttpContextContract) {
      let user_id = auth.user?.id
      //get your followed users then their posts and get your posts
      let user = await User.query().where('id', Number(user_id)).preload("following").firstOrFail();
      let follows_ids = user.following.map((follow)=>{ return follow.user_followed_id })
      follows_ids.push(Number(user_id))
      let timeline_posts = Post.query().whereIn('user_id', follows_ids).orderBy('created_at', 'desc')
      return timeline_posts
  }

}
