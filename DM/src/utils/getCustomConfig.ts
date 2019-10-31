import FS from 'fs-extra'
import PATH from 'path'

interface Config {
  siteUrl?: string
  searchName?: string
  scriptStr?: string
  downloadPath?: string
}

export default function getCustomConfig(): Config {
  try {
      const customConfigFilePath = PATH.resolve( __dirname, "../../config.ts" )
      if ( FS.pathExistsSync( customConfigFilePath ) ) {
          return require( customConfigFilePath )
      }
    } catch( e ) {}
  return {}
}