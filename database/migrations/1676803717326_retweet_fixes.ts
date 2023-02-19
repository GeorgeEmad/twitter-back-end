import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  public async up () {
    this.schema.alterTable('post', (table) => {
      table.integer('retweet_post_id').references('post.id').onDelete('CASCADE')
    })

    this.schema.dropTable("retweet");
  }

  public async down () {



    this.schema.createTable("retweet", (table) => {
      table.increments('id')
      table.integer('user_id').notNullable().references('user.id').onDelete('CASCADE')
      table.integer('post_id').notNullable().references('post.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.alterTable('post', (table) => {
      table.dropColumn('retweet_post_id')
    })

  }
}
