// micro templating, sort-of
function getHTMLFromMicroTemplate(src, data) {
  // replace {{tags}} in source
  return src.replace(/\{\{([\w\-_\.]+)\}\}/gi, function(match, key) {
    // walk through objects to get value
    var value = data;
    key.split('.').forEach(function(part) {
      // console.log(value);
      value = value[part];
    });
    return value;
  });
}


export { getHTMLFromMicroTemplate as microTemplating };
