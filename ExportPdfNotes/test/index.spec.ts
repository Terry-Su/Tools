import init from "../src/index"
import PATH from 'path'

describe( "long asynchronous specs", function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000
  it( "", done => {
    init( PATH.resolve( __dirname, '../tmp/test2.pdf' ), PATH.resolve( __dirname, '../tmp/output' ) )
  } )
} )