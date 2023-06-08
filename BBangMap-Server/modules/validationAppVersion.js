const INVALID_APP_VERSION = -1;
module.exports = {
  getAppVersion: (req, res, next) => {
    let appVersion = req.headers.app_version;

    if (appVersion != null) {
      let versionArr = appVersion.split('.');

      if (versionArr.length >= 2 && versionArr[1] !== '') {
        appVersion = versionArr[0] + '.' + versionArr[1];
      } else {
        appVersion = INVALID_APP_VERSION;
      }
    } else {
      appVersion = null;
    }
    console.log("appVersion module : ",appVersion);

    req.header.appVersion = appVersion;
    next();
  },
};
