import axios from "axios";

let defaultOpts = {
  method: "get",
  responseType: "json",
  timeout: 6000,
}

export default (opts, data) => {
  if (typeof opts === "string") { // 这种情况只能用于get请求
    let combinedOpts = Object.assign({}, defaultOpts, { url: opts });
    combinedOpts["params"] = data;
    return axios(combinedOpts).then(res => res.data);
  } else {
    let combinedOpts = Object.assign({}, defaultOpts, opts);
    const { method, data } = combinedOpts;
    if (method === "get") {
      combinedOpts["params"] = data;
    }
    return axios(combinedOpts).then(res => res.data);
  }
}
