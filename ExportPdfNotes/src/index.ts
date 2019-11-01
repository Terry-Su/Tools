/**
# Target
Export pdf notes

# Important Points
* export a json
* if pdf has a navigation, result can be built with navagation structure
* if not, only display all notes in result    

 */


import pdfjsLib from 'pdfjs-dist' 

const init = ( inputPdfPath, outputFolderPath ) => {
    var loadingTask = pdfjsLib.getDocument( inputPdfPath )
loadingTask.promise.then( function( doc ) {
  var numPages = doc.numPages
  console.log( '# Document Loaded' )
  console.log( 'Number of Pages: ' + numPages )
  console.log()

  doc.getOutline().then( data => {
    console.log( data )
  } )

  var lastPromise // will be used to chain promises
  lastPromise = doc.getMetadata().then( function ( data ) {
    console.log( '# Metadata Is Loaded' )
    console.log( '## Info' )
    console.log( JSON.stringify( data.info, null, 2 ) )
    console.log()
    if ( data.metadata ) {
      console.log( '## Metadata' )
      console.log( JSON.stringify( data.metadata.getAll(), null, 2 ) )
      console.log()
    }
  } )

  var loadPage = function ( pageNum ) {
    return doc.getPage( pageNum ).then( function ( page ) {
      console.log( '# Page ' + pageNum )
      var viewport = page.getViewport( { scale: 1.0, } )
      console.log( 'Size: ' + viewport.width + 'x' + viewport.height )
      console.log()
    //   page.getAnnotations().then( data => {
        
    //       console.log( data )
    //   } )

    page.getAnnotations().then(
        function ( annotations ) {
    
          let textInAnnotations = ""
          for ( let annotation of annotations ) {
    
             textInAnnotations = textInAnnotations + " - " + annotation.annotationText
    
          }
    
          console.log( "Text in annotations: " + textInAnnotations )
    
        } )

      page.getOperatorList().then( data => {
        console.log( data )
    } )
      return page.getTextContent().then( function ( content ) {
        // Content contains lots of information about the text layout and
        // styles, but we need only strings at the moment
        var strings = content.items.map( function ( item ) {
          return item.str
        } )
        console.log( '## Text Content' )
        console.log( strings.join( ' ' ) )
      } ).then( function () {
        console.log()
      } )
    } )
  }
  // Loading of the first page will wait on metadata and subsequent loadings
  // will wait on the previous pages.
  for ( var i = 1; i <= numPages; i++ ) {
    lastPromise = lastPromise.then( loadPage.bind( null, i ) )
  }
  return lastPromise
} ).then( function () {
  console.log( '# End of Document' )
}, function ( err ) {
  console.error( 'Error: ' + err )
} )
}

export default init