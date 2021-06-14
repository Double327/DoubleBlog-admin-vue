let MyLocalStorage = {
    Cache: {
        /**
         * 存放缓存
         * @param key 缓存键值
         * @param stringVal 缓存内容
         * @param time 缓存时间
         * @returns {boolean}
         */
        put: function (key, stringVal, time) {
            try {
                if (!localStorage) {
                    return false;
                }
                if (!time || isNaN(time)) {
                    time = 24 * 60 * 60;
                }
                let cacheExpireDate = (new Date() - 1) + time * 1000;
                let cacheVal = {val: stringVal, exp: cacheExpireDate};
                localStorage.setItem(key, JSON.stringify(cacheVal));
            } catch (e) {
                console.log(e);
            }
        },
        /**
         * 获取缓存
         * @param key 缓存键值
         * @returns {null|string|boolean|*}
         */
        get: function (key) {
            try {
                if (!localStorage) {
                    return false;
                }
                let cacheVal = localStorage.getItem(key);
                let result = JSON.parse(cacheVal);
                let now = new Date() - 1;
                if (!result) {
                    return null;
                }
                if (now > result.exp) {
                    this.remove(key);
                    return "";
                }
                return result.val;
            } catch (e) {
                console.log(e);
            }
        },
        /**
         * 清除缓存
         * @param key 缓存键值
         * @returns {boolean}
         */
        remove: function (key) {
            if (!localStorage) {
                return false;
            }
            localStorage.removeItem(key);
        },
        /**
         * 清空所有缓存
         * @returns {boolean}
         */
        clear: function () {
            if (!localStorage) {
                return false;
            }
            localStorage.clear();
        }
    }
}

export default MyLocalStorage;
