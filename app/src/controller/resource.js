/**
 * Created by Administrator on 2016/6/20.
 */
import Vue from 'vue'
import axios from 'axios'
import utils from '../utils/utils'

var outExports = {};

var models = {
};

var domains = "/api"
if(window.location.port=="8080") {
  domains = window.location.protocol + "//" + window.location.hostname + ":5200/api"
}

var getMethods = {
  hello: domains + "/hello"
};

var postMethods = {
};

var jsonpMethods = {
};

function turnJson(json) {
  return json;
}

function httpError(response, callback) {
  if (response.status == 200) {
    requestError(response.data, callback)
  }
  if (response.status == 404) {
    callback.call('',"404")
  }
}

function requestError(data, callback) {
  if(data.code=="000000"){
    callback.call('', data.data);
  }else{

  }


}

Object.keys(getMethods).forEach(function (key) {
  outExports[key] = function (jsondata, callback) {
    var newJson = turnJson(jsondata);
    axios.get(getMethods[key], newJson).then((response)=> {
        httpError(response, callback);
      }, (response)=> {
        httpError(response, callback);
      }
    )
  };
});

Object.keys(postMethods).forEach(function (key) {
  outExports[key] = function (jsondata, callback) {
    var newJson = turnJson(jsondata);
    axios.post(postMethods[key], newJson).then((response)=> {
        httpError(response, callback);
      }, (response)=> {
        httpError(response, callback);
      }
    )
  };
});

Object.keys(jsonpMethods).forEach(function (key) {
  outExports[key] = function (jsondata, callback) {
    var newJson = turnJson(jsondata);
    axios.jsonp(jsonpMethods[key], newJson).then((response)=> {
        httpError(response, callback);
      }, (response)=> {
        httpError(response, callback);
      }
    )
  };
});

export default outExports;





