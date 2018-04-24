const TABLE_NAME = 'followed_campaigns'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table) {
    table.increments()
    table.boolean('is_owner').notNullable()
    table.integer('user_id').references('users.id').notNullable()
    table.integer('campaigns_id').references('campaigns.id').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
