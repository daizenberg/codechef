'use strict'

const readline = require('readline')
const assert = require('assert')

class City {
  constructor () {
    this.product = null
    this.routes = []
  }
  distanceFrom(B) {

  }
  canReach(cityIndex) {
    if (this.canReachCache[cityIndex] === undefined) {
      this.
    }
    return this.canReachCache[cityIndex]
  }
  this.canReachCache = {}

}

class Graph {
  constructor () {
    this.cities = []
  }
  getProductLocation (baseCity, product) {
    let cities = this.citiesWhichSell(product)
    cities = cities.filter(c => c.canReach(baseCity))
    cities = cities.sort((c1, c2) => {
      let city1 = this.cities[c1]
      let city2 = this.cities[c2]
      let diff = city1.distanceFromB === city2.distanceFromB
      return diff == 0 ? c1-c1 : diff
    })
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

class State {
  constructor (master) {
    this.master = master
  }
  get model () {
    return this.master.model
  }
  setState (state) {
    this.master.setState(state)
  }
  parse (nums) {
    assert('must be overriden')
  }
}

class ExpectNK extends State {
  parse (nums) {
    this.model.N = nums[0]
    this.model.K = nums[1]
    for (let i = 0; i < this.model.N; i++) {
      this.model.cities.push({})
    }
    this.setState(new ExpectB(this.master))
  }
}

class ExpectB extends State {
  parse (nums) {
    this.model.B = nums[0]
    this.setState(new ExpectRoute(this.master, this.model.N - 1))
  }
}

class ExpectRoute extends State {
  constructor (master, remainingRoutes) {
    super(master)
    this.remainingRoutes = remainingRoutes
  }
  parse (nums) {
    this.model.cities[nums[0]].routes.push(nums[1])
    this.model.cities[nums[1]].routes.push(nums[0])
    if (--this.remainingRoutes < 0) {
      this.setState(new ExpectProduct(this.master, this.model.N))
    }
  }
}

class ExpectProduct extends State {
  constructor (master, remainingProducts) {
    super(master)
    this.remainingProducts = remainingProducts
  }
  parse (nums) {
    this.model.cities[--this.remainingProducts].product = nums[0]
    if (this.remainingProducts === 0) {
      this.setState(new ExpectQueriesCnt(this.master))
    }
  }
}

class ExpectQueriesCnt extends State {
  parse (nums) {
    this.setState(new ExpectQuery(this.master, nums[0]))
  }
}

class ExpectQuery extends State {
  constructor (master, remainingQueries) {
    super(master)
    this.remainingQueries = remainingQueries
  }
  parse (nums) {
    this.model.getProductLocation(num[0], num[1])
    if (--this.remainingQueries < 0) {
      this.master.quit()
    }
  }
}

class InputParser {
  constructor (endParse) {
    this.setState(new ExpectNK(this))
    this.model = new Graph()
    this.endParse = endParse
  }
  setState (state) {
    this.state = state
  }
  quit () {
    this.endParse()
  }
  parse (line) {
    let args = line.split(' ').map(s => parseInt(s, 10))
    this.state.parse(args)
  }
}

function main () {
  let inputParser = new InputParser(() => process.exit(0))
  rl.on('line', (l) => inputParser.parse(l))
}

main()
