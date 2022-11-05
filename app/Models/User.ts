import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, hasMany, HasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import  Post from './Post'
import  Follow from './Follow'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public description: string

  @column()
  public gender: 'male' | 'female'

  @column()
  public age: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Post, {
    foreignKey: 'user_id',
  })
  public posts: HasMany<typeof Post>

  @hasMany(() => Follow, {
    foreignKey: 'user_followed_id',
  })
  public followers: HasMany<typeof Follow>

  @hasMany(() => Follow, {
    foreignKey: 'follower_id',
  })
  public following: HasMany<typeof Follow>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }


}

