import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user'

  public async up () {
    this.schema.alterTable('user', (table) => {
      table.string('remember_me_token').nullable()
    })

  }

  public async down () {
    this.schema.alterTable('user', (table) => {
      table.dropColumn('remember_me_token')
    })
  }
}
