import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public tableName = 'user'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.string('username', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('description').defaultTo('')
      table.enu('gender', ['male', 'female'], {
        useNative: true,
        enumName: 'user_gender',
        existingType: false,
      }).defaultTo('male')
      table.integer('age').nullable()
      
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
      */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
