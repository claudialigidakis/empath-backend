const TABLE_NAME = 'usernames'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table) {
    table.increments()
    table.string('username').notNullable()
    table.integer('campaigns_id').references('campaigns.id').notNullable()
    table.json('usernameAnalysis').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
