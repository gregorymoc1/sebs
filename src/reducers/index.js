import {combineReducers} from 'redux';
import {SET_PROPERTY, SET_DATE, SET_SERVICE_TYPE, SET_SERVICES, SET_BASE_SERVICE} from "../actions";

function property(state = [], action) {
  switch (action.type) {
    case SET_PROPERTY:
      return action.property;
    default:
      return state;
  }
}

function date(state = [], action) {
  switch (action.type) {
    case SET_DATE:
      return action.date;
    default:
      return state;
  }
}

function serviceType(state = [], action) {
  switch (action.type) {
    case SET_SERVICE_TYPE:
      return action.serviceType;
    default:
      return state;
  }
}

function services(state = [], action) {
  switch (action.type) {
    case SET_SERVICES:
      return action.services;
    default:
      return state;
  }
}

function baseService(state = [], action) {
  switch (action.type) {
    case SET_BASE_SERVICE:
      return action.baseService;
    default:
      return state;
  }
}

const rootReducer = combineReducers({property, date, serviceType, services, baseService});
export default rootReducer;