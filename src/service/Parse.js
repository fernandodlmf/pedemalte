import Parse from 'parse'
import config from './config'

//const { COLUBRIS_URL, JAVASCRIPTKEY, APPID } = config
const { URL, APPID, JAVASCRIPTKEY } = config

Parse.initialize(APPID, JAVASCRIPTKEY)
Parse.serverURL = URL


export default Parse
