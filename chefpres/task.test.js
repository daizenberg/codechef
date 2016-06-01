/* global it describe */
'use strict'

const chai = require('chai')
const X = require('./task').X

let assert = chai.assert

describe('class X', function () {
  describe('x', function () {
    it('returns the correct text', function () {
      let x = new X('str')
      assert.equal(x.x(), 'str')
    })
  })
})
