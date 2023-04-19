const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')


const exphdbs = require('express-handlebars')

app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantAfterSearch = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
  if (restaurantAfterSearch.length === 0) {
    res.render('error', { keyword: keyword })
  } else {
    res.render('index', { restaurants: restaurantAfterSearch, keyword: keyword })
  }

})
app.listen(port, () => {
  console.log(`the express is running on http://localhost:${port}`)
})