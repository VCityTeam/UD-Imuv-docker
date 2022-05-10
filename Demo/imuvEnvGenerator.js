const fs = require('fs');

const getImuvEnv = function (fileName) {
  const file = require(fileName);
  return JSON.stringify(file);
};

fs.readFile('.env', 'utf-8', function (errd, data) {
  let newEnvFile = data;
  const lineImuvEnvJson = '\nIMUV_ENV_JSON=' + getImuvEnv(process.argv[2]);
  if (!data.includes('IMUV_ENV_JSON')) {
    newEnvFile = data + lineImuvEnvJson;
  } else {
    const re = /^IMUV_ENV_JSON.+$/gm;
    newEnvFile = data.replace(data.match(re), lineImuvEnvJson);
  }
  fs.writeFile('.env', newEnvFile, function (err, datata) {
    if (err) {
      return console.error(err);
    }
    console.log('RESULT :', lineImuvEnvJson);
  });
});
