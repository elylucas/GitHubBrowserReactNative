import {Encoding} from 'NativeModules'
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

const AUTH_KEY = 'auth';
const USER_KEY = 'user';

class AuthService {
  login(creds, cb) {
    var authStr = creds.username + ':' + creds.password;
    Encoding.base64Encode(authStr, encodedAuth => {
      fetch('https://api.github.com/user', {
        headers: {
          'Authorization' : 'Basic ' + encodedAuth
        }
      })
        .then(response => {
          if(response.status === 200){
            return response;
          } else {
            throw {
              badCredentials: response.status === 401,
              unknownError: response.status !== 401
            }
          }
        })
        .then(response => {
          return response.json();
        }).then(results => {
          AsyncStorage.multiSet([
            [AUTH_KEY, encodedAuth],
            [USER_KEY, JSON.stringify(results)]
          ], (err) =>{
            if(err){ throw err; }
            cb(Object.assign({
              success: true
            }, results));
          })

        })
        .catch(err => {
          cb({ badCredentials: err.badCredentials, unknownError: err.unknownError })
        })
    });
  }

  getAuthInfo(cb){
    AsyncStorage.multiGet([AUTH_KEY, USER_KEY], (err, val) =>{
      if(err){ return cb(err); }
      if(!val){ return cb(); }

      var authInfo = {
        header: {
          Authorization: 'Basic ' + val[0][1]
        },
        user: JSON.parse(val[1][1])
      };

      if(!authInfo.user) {return cb(); }

      cb(null, authInfo);

    })
  }
};

export default AuthService;
