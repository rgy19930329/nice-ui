import { combineReducers, createStore } from "redux";

const req = require.context(".", true, /reducer\.js$/);
let reducerCombine = {};
req.keys().forEach(mod => {
  let v = req(mod);
  if (v && v.default) {
    v = v.default;
  }
  const match = mod.match(/^\.\/([^_][\w-]+)\/reducer\.js$/);
  if (match && match[1]) {
    reducerCombine[match[1]] = v;
  }
});

const reducers = combineReducers(reducerCombine);

const store = createStore(reducers);

export default store;
