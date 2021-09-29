// @start
// @namespace   com.github.heramerom
// @version     0.1
// @name        Time Zone
// @type        action
// @action      Time Zone
// @end

(function () {

    var UrlUtil = Java.type('com.intellij.ide.fileTemplates.impl.UrlUtil')
    var URL = Java.type('java.net.URL')
    var regexUrl = new URL('https://raw.githubusercontent.com/Mount-Huaguo/TimeZone/main/time_zone.json')

    function Repo() {
        this.loading = false
        this.objs = []
        this.result = []
        this.searchKey = ''
        this.page = 1
        this.pageSize = 30
    }

    Repo.prototype.reset = function (searchKey) {
        this.searchKey = searchKey
        this.page = 1
        this.result = []
    }

    Repo.prototype.search = function () {
        if (this.loading) return 'Loading repository ...'
        this.loading = true
        if (this.objs.length == 0) {
            try {
                var source = UrlUtil.loadText(regexUrl)
                this.objs = JSON.parse(source)
            } catch (e) {
                this.loading = false
                return 'Can not load repository.'
            }
        }
        this.loading = false
        var searchKey = this.searchKey ? this.searchKey.toLowerCase() : ''
        if (!searchKey && searchKey.length >= 1 && searchKey.length <= 2) {
            return this.result
        }
        for (var i = 0; i < this.objs.length; i++) {
            var obj = this.objs[i]
            if (!searchKey ||
                (obj.TZDatabaseName && obj.TZDatabaseName.toLowerCase().indexOf(searchKey) != -1) ||
                obj.UTCOffset == searchKey ||
                (obj.ZH_CN && obj.ZH_CN.indexOf(searchKey) != -1)) {
                this.result.push({
                    name: obj.TZDatabaseName,
                    desc: obj.UTCOffset,
                })
                if (this.result.length == this.page * this.pageSize && this.objs.length > this.page * this.pageSize) {
                    this.result.push({
                        name: 'Load More...',
                        hasMore: true,
                    })
                    break
                };
            }
        }
        return this.result
    }

    Repo.prototype.getIndex = function (index) {
        return this.result[index]
    }

    Repo.prototype.nextPage = function () {
        this.page++
        repo.result = []
        return repo.search()
    }

    var repo = new Repo()

    popup.builder().showSearchEverywhere(
        function (searchKey, loadMore) {
            if (loadMore) {
                return repo.nextPage()
            }
            repo.reset(searchKey)
            return repo.search()
        }, function (index) {
            event.document().insertString(event.selectionModel().selectionStart(), repo.getIndex(index).name)
            // print('you select: ' + repo.getIndex(index).name)
        })

})()
