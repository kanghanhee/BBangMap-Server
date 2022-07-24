module.exports = {
    getAppVersion: (req, res, next) => {
        let appVersion = req.headers.app_version;

        if(appVersion != null){
            let versionArr = appVersion.split(".");

            if(versionArr.length>0){
                appVersion = versionArr[0]+"."+versionArr[1];
            }
        }else{
            appVersion = null;
        }

        req.header.appVersion = appVersion;
        next();
    }
}