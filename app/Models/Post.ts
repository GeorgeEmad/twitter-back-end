import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Like from './Like'
export default class Post extends BaseModel {
  static get table() {
    return 'post'
  } 
  @column({ isPrimary: true })
  public id: number

  @column()
  public retweet_post_id: number
  
  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public user_id: number

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Like, {
    foreignKey: 'post_id',
  })
  public post_likes: HasMany<typeof Like>

  @belongsTo(() => Post, {
    localKey:'id',
    foreignKey: 'retweet_post_id',
  })
  public retweet_post: BelongsTo<typeof Post>

}
