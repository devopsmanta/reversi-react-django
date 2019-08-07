import { combineReducers } from 'redux';

import auth from './auth';
import game from './game';
import result from './result';
import spinner from './spinner';
import profile from './profile';

export default combineReducers({ auth, game, result, spinner, profile });
