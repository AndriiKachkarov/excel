console.log('module.js');


// eslint-disable-next-line require-jsdoc
async function start() {
  return await Promise.resolve('async');
}

start().then(((value) => {
  console.log(value);
}));
