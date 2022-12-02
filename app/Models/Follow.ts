import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Follow extends BaseModel {
  static get table() {
    return 'follow'
  } 
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_followed_id: number

  @column()
  public follower_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'user_followed_id',
  })
  public user_followed: BelongsTo<typeof User>

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'follower_id',
  })
  public follower: BelongsTo<typeof User>

}
