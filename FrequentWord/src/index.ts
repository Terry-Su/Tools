import FS from 'fs-extra'
import PATH from 'path'
import readline from 'readline'
const PATH_CACHE = PATH.resolve( __dirname, '../.cache' )
const PATH_OUTPUT_FILE = PATH.resolve( __dirname, '../dist/output.txt' )
export const runText = ( sourceText, option?: { shouldRemoveCacheFirst?: boolean, useJSMemory?: boolean, outputString?: string } ) => {
  /**
  # Flow
  --> clean .cache
  --> loop text by char
  # example files' names and contents in .cache
  foo
    1
  bar
    2
    1
   */
  option = { shouldRemoveCacheFirst: true, useJSMemory: true, outputString: '', ...option }
  const { shouldRemoveCacheFirst, useJSMemory } = option
  let { outputString } = option
  const useFileMemory = !useJSMemory
  let map: { [wordName: string]: number } = {}

  shouldRemoveCacheFirst && FS.removeSync( PATH_CACHE )
  
  function dealWithWord( wordName ) {
    if ( useFileMemory ) {
      const potentialFilePath = PATH.resolve( PATH_CACHE, `${wordName}.txt` )
      if ( !FS.existsSync( potentialFilePath ) )
        FS.outputFileSync( potentialFilePath, '1', { encoding: 'utf8' } )
      else {
        const str = FS.readFileSync( potentialFilePath, { encoding: 'utf8' } )
        const count = +( str.replace( /\-.*/g, '' ) )
        FS.outputFileSync( potentialFilePath, `${count + 1}\-${str}`, { encoding: 'utf8' } )
      }
    } else {
      // # use js memory  
      if ( map[ wordName ] === undefined ) {
        map[ wordName ] = 1
      } else {
        map[ wordName ] = map[ wordName ] + 1
      }
    }
  }

  let wordName = ''
  for ( let i = 0; i < sourceText.length; i++ ) {
    const char = sourceText[ i ]
    if ( /[a-zA-Z\-]/.test( char ) )
      wordName = `${wordName}${char.toLowerCase()}`
    else {
      wordName.trim() !== '' && dealWithWord( wordName )
      wordName = ''
    }
  }

  if ( useJSMemory ) {
    /**
    # output string
    ```
    foo 10
    bar 10
    zoo 5
    ```
    */
    // # arr example: [ undefined,...., ['zoo'], ..., [ 'foo', 'bar' ] ]
    let arr: string[][] = []
    for ( const wordName in map ) {
      const index = map[ wordName ] - 1
      arr[ index ] = arr[ index ] === undefined ? [ wordName ] : [ ...arr[ index ], wordName ]
    }
    for ( let i = arr.length - 1; i >= 0; i-- ) {
      if ( arr[ i ] === undefined ) { continue }
      for ( const wordName of arr[ i ] ) {
        outputString = `${outputString}${wordName}\n`
      }
    }
    FS.outputFileSync( PATH_OUTPUT_FILE, outputString, { encoding: 'utf8' } )
  }
}

export const runTextFile = ( filePath, option, callback ) => {
  FS.removeSync( PATH_CACHE )

  option = { useJSMemory: true, ...option }
  const { useJSMemory } = option

  var lineReader = readline.createInterface( {
    input: FS.createReadStream( filePath )
  } )

  // # for using js memory
  let map = {}

  lineReader.on( 'line', function ( line ) {
    // outputString = runText( line, { ...option, outputString } )
    let wordName = ''
    function dealWithWord( wordName ) {
      if ( useJSMemory ) {
        if ( map[ wordName ] === undefined ) {
          map[ wordName ] = 1
        } else {
          map[ wordName ] = map[ wordName ] + 1
        }
      }
    }
    for ( let i = 0; i < line.length; i++ ) {
      const char = line[ i ]
      if ( /[a-zA-Z\-]/.test( char ) )
        wordName = `${wordName}${char.toLowerCase()}`
      else {
        wordName.trim() !== '' && dealWithWord( wordName )
        wordName = ''
      }
    }

  } )

  lineReader.on( 'close', () => {
    if ( useJSMemory ) {
      /**
      # output string
      ```
      foo 10
      bar 10
      zoo 5
      ```
      */
      // # arr example: [ undefined,...., ['zoo'], ..., [ 'foo', 'bar' ] ]
      let arr: string[][] = []
      for ( const wordName in map ) {
        const index = map[ wordName ] - 1
        arr[ index ] = arr[ index ] === undefined ? [ wordName ] : [ ...arr[ index ], wordName ]
      }
      let outputString = ``
      for ( let i = arr.length - 1; i >= 0; i-- ) {
        if ( arr[ i ] === undefined ) { continue }
        for ( const wordName of arr[ i ] ) {
          outputString = `${outputString}${wordName}  ${i + 1}\n`
        }
      }
      FS.outputFileSync( PATH_OUTPUT_FILE, outputString, { encoding: 'utf8' } )
    }
    callback()
  } )
}


