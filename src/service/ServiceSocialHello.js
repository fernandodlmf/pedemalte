import hello from 'hellojs'

export async function loginFacebookHello() {
    try {
        const response = await hello('facebook').login()
        console.log(response)
        await getPerfilFacebookHello()
        await getPerfilPhoto()
    } catch(e){
        throw new Error("Não foi possível realizar o login facebook pelo Hello: " + e.message);
    }    
}

export function logoutFacebookHello() {
    try {
        const response = hello('facebook').logout()
        console.log(response)
    } catch(e){
        throw new Error("Não foi possível realizar o logout facebook pelo Hello: " + e);
    }    
}

export function getPerfilFacebookHello() {
    try {
        const response = hello('facebook').api('/me')
        console.log(response)
    } catch(e){
        throw new Error("Não foi possível realizar o login facebook pelo Hello: " + e.message);
    }    
}

export async function getPerfilPhoto() {
    try {
        const response = await hello('facebook').api('me/photo')
        console.log(response)
    } catch(e){
        throw new Error("Não foi possível realizar o login facebook pelo pgoyo: " + e.message);
    }    
}
