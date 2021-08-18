import { registerWebPlugin } from '@capacitor/core';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { Plugins } from '@capacitor/core';
import { FacebookLoginResponse } from '@capacitor-community/facebook-login';
import {getPerfil1} from './ServiceUsuario.js'
import Parse from './../service/Parse'
import * as serviceSocialParse from './ServiceSocialParse.js'


export function login() {
    serviceSocialParse.LoginParseFacebook1()
}








