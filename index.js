function camelCase(name) {
  return name.charAt(0).toUpperCase() + 
    name.slice(1).replace(/-(\w)/g, (m, n) => n.toUpperCase());
}

const req = require.context('./components', true, /^\.\/[^_][\w-]+\/index\.jsx?$/);

req.keys().forEach((mod) => {
  let v = req(mod);
  if (v && v.default) {
    v = v.default;
  }
  const match = mod.match(/^\.\/([^_][\w-]+)\/index\.jsx?$/);
  if (match && match[1]) {
    exports[camelCase(match[1])] = v;
  }
});
