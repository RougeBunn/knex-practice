equire('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

function searchByItemName(searchTerm) {
    knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log('SEARCH TERM', { searchTerm })
      console.log(result)
    })
}

function paginateItems(page) {
    const limit = 6
    const offset = limit * (page - 1)
    knexInstance
      .select('*')
      .from('shopping_list')
      .limit(limit)
      .offset(offset)
      .then(result => {
        console.log('PAGINATE ITEMS', { page })
        console.log(result)
      })
  }

function productsAddedDaysAgo(daysAgo) {
    knexInstance 
        .select('*') 
        .from('shopping_list') 
        .where( 'date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo) ) 
        .then(result => { 
            console.log(result) 
        })
}

function costPerCategory() {
    knexInstance
        .select('category')
        .count('Price as Total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log('Cost per Category')
            console.log(result)
        })
}