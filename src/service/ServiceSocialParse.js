import Parse from './../service/Parse'
const facebookAppId = '522089405633524'


export function getFacebookStatus() {
    console.log('obtendo status facebook')
    FB.getLoginStatus(({ authResponse }) => {
        console.log('LOGIN STATUS')
        console.log(authResponse)

        if (!authResponse)
            inicializaSDKParseFacebook()
    });
}

export function inicializaSDKParseFacebook() {
    console.log('inicializando sdk parse facebook')
    Parse.FacebookUtils.init({ // this line replaces FB.init({
        appId      : facebookAppId, // Facebook App ID
        cookie     : true,  // enable cookies to allow Parse to access the session
        xfbml      : true,  // initialize Facebook social plugins on the page
        version    : 'v10.0' // point to the latest Facebook Graph API version, found in FB's App dashboard.
    });
}

export async function LoginParseFacebook() {
    try {
        // const users = await Parse.FacebookUtils.logIn("user_likes, email");
        // console.log(users)
        // if (!users.existed()) {
        //     console.log("User signed up and logged in through Facebook!");
        // } else {
        //     console.log("User logged in through Facebook!");
        //     FB.api('/me?fields=id,name,email,public_profile,permissions', function (response) {
        //         console.log(response)
        //             users.set('username', response.name);
        //             users.set('email', response.email);
        //             alert('User logged in and sign up through Facebook, with username: ' + users.get('username') + ' and email: ' + users.get('email'));                
        //         });
        // }
    } catch(error) {
        console.log("User cancelled the Facebook login or did not fully authorize.");
        console.log(error);
    }
}


export function LoginParseFacebook1() {
    unlink()
    getFacebookStatus()
    Parse.FacebookUtils.logIn(null, { 
       success: function(user) {
           console.log("sucess")
           console.log(user)
          if (!user.existed()) { 
            FB.api('/me?fields=id,name,email,permissions', function (response) { 
                console.log(response)

            //   user.set('username', response.name); 
            //   user.set('email', response.email); 
            //   user.save(); 

              alert("You're registered and logged with via Facebook!");

              //redirect to dashboard
            }); 


          } else {
             alert("You're logged in with Facebook!"); 
             //redirect to dashboard page
          }
        },
         error: function(user, error) {
          alert("User cancelled the Facebook login or did not fully authorize.");
        }
     });
}

function link() {
    const User = Parse.Object.extend(Parse.User)
    const user = new User()
    user.set
    if (!Parse.FacebookUtils.isLinked(user)) {
        Parse.FacebookUtils.link(user, null, {
            success: function(user) {
                alert("Woohoo, user logged in with Facebook!");
            },
            error: function(user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    }
    else {
        alert("Can't link user to facebook because he is already linked");
    }
}

async function unlink() {
    var user = Parse.User.current();
    console.log(user)
    await Parse.FacebookUtils.unlink(user);
    
    alert("The user is no longer associated with their Facebook account.");
}