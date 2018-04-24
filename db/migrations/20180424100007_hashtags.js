const TABLE_NAME = 'hashtags'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table) {
    table.increments()
    table.string('hashtag').notNullable()
    table.integer('campaigns_id').references('campaigns.id').notNullable()
    table.json('hashtagAnalysis').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
