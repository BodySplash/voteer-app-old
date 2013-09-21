(function (angular, window) {
    "use strict";

    var disqusModule = angular.module('ngDisqus', [ ]);

    disqusModule.provider('$disqus', function() {

        var shortname = 'condorcet';

        function getScriptContainer() {
            return (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
        }

        function getShortname() {
            return shortname || window.disqus_shortname;
        }


        function getScriptSrc(shortname) {
            return '//' + shortname + '.disqus.com/embed.js';
        }

        function buildScriptTag(shortname) {
            var script = document.createElement('script');
            script.type  = 'text/javascript';
            script.async = true;
            script.src   = getScriptSrc(shortname);
            return script;
        }

        function hasScriptTagInPlace(container, shortname) {
            var scripts   = container.getElementsByTagName('script'),
                scriptSrc = getScriptSrc(shortname),
                script, i;

            for (i = 0; i < scripts.length; i += 1) {
                script = scripts[i];
                if (~script.src.indexOf(scriptSrc)) {
                    return true;
                }
            }

            return false;
        }

        function setGlobals(id, url, shortname) {
            window.disqus_identifier = id;
            window.disqus_url        = url;
            window.disqus_shortname  = shortname;
        }

        function buildCommit($window) {
            var uri = new URI($window.location);
            var shortname = getShortname(),
                container = getScriptContainer();
            if (hasScriptTagInPlace(container, shortname)) {
                return;
            }
            setGlobals(uri.fragment("").toString(), uri.fragment("").toString(), shortname);
            container.appendChild(buildScriptTag(shortname));
        }


        this.setShortname = function(sname) {
            shortname = sname;
        };

        this.$get = [ '$window', function($window) {


            function commit() {
                if (!angular.isDefined(getShortname())) {
                    throw new Error('No disqus shortname defined');
                } else {
                    buildCommit($window);
                }
            }

            return {
                commit       : commit,
                getShortname : getShortname
            };
        }];
    });

    disqusModule.directive('disqus', [ '$disqus', function($disqus) {

        return {
            restrict : 'AC',
            replace  : true,
            scope    : {
                id : '=disqus'
            },
            template : '<div id="disqus_thread"></div>',
            link: function link(scope, element, attr) {
                $disqus.commit();
            }
        };
    }]);

})(angular, this);