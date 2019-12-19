import FS from 'fs-extra'
import PATH from 'path'
import readline from 'readline'
const PATH_CACHE = PATH.resolve( __dirname, '../.cache' )
export const runText = ( sourceText, shouldRemoveCacheFirst = true ) => {
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
  shouldRemoveCacheFirst && FS.removeSync( PATH_CACHE )

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
  function dealWithWord( wordName ) {    
    const potentialFilePath = PATH.resolve( PATH_CACHE, `${wordName}.txt` )
    if ( ! FS.existsSync( potentialFilePath ) ) 
      FS.outputFileSync( potentialFilePath, '1', { encoding: 'utf8' } )
    else {
      const str = FS.readFileSync( potentialFilePath, { encoding: 'utf8' } )
      const count = +( str.replace( /\-.*/g,'' ) )
      FS.outputFileSync( potentialFilePath, `${count + 1}\-${str}`, { encoding: 'utf8' } )
    }
  }
}

export const runTextFile = ( filePath, callback ) => {
  FS.removeSync( PATH_CACHE )

  var lineReader = readline.createInterface( {
    input: FS.createReadStream( filePath )
  } )
  
  lineReader.on( 'line', function ( line ) {
    runText( line, false )
    // console.log( 'Line from file:', line )
  } )

  lineReader.on( 'close', callback )
}


