<!DOCTYPE html >
 < html >
  < head > < meta charset = "utf-8" > < title > ECharts Gallery < /title><script>window.alogObjectConfig = {
sample: '1',

    product: '773',
    page: '773_1',
    monkey_page: '',
    speed_page: '',

    speed: {
        sample: '1'
    },

    monkey: {
        sample: '1'
    },

    exception: {
        sample: '1'
    },

    feature: {
        sample: '1'
    },

    cus: {
        sample: '1'
    }
};
void

function (a, b, c, d, e, f, g) {
    a.alogObjectName = e, a[e] = a[e] || function () {
        (a[e].q = a[e].q || []).push(arguments)
    }, a[e].l = a[e].l || +new Date, d = "https:" === a.location.protocol ? "https://fex.bdstatic.com" + d : "http://fex.bdstatic.com" + d;
    var h = !0;
    if (a.alogObjectConfig && a.alogObjectConfig.sample) {
        var i = Math.random();
        a.alogObjectConfig.rand = i, i > a.alogObjectConfig.sample && (h = !1)
    }
    h && (f = b.createElement(c), f.async = !0, f.src = d + "?v=" + ~(new Date / 864e5) + ~(new Date / 864e5), g = b.getElementsByTagName(c)[0], g.parentNode.insertBefore(f, g))
}(window, document, "script", "/hunter/alog/alog.min.js", "alog"), void

function () {
    function a() {}
    window.PDC = {
        mark: function (a, b) {
            alog("speed.set", a, b || +new Date), alog.fire && alog.fire("mark")
        },
        init: function (a) {
            alog("speed.set", "options", a)
        },
        view_start: a,
        tti: a,
        page_ready: a
    }
}();
void

function (n) {
    var o = !1;
    n.onerror = function (n, e, t, c) {
        var i = !0;
        return !e && /^script error/i.test(n) && (o ? i = !1 : o = !0), i && alog("exception.send", "exception", {
            msg: n,
            js: e,
            ln: t,
            col: c
        }), !1
    }, alog("exception.on", "catch", function (n) {
        alog("exception.send", "exception", {
            msg: n.msg,
            js: n.path,
            ln: n.ln,
            method: n.method,
            flag: "catch"
        })
    })
}(window); <
/script><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" type="text/css
" href="
dep / bootstrap / css / bootstrap.css "><link rel="
stylesheet " type="
text / css " href="
css / main.css "><link rel="
shortcut icon " href="
favicon.png "><link rel="
stylesheet " href="
dep / select2 / css / select2.min.css "><link rel="
stylesheet " href="
dep / select2 / css / select2.bootstrap.min.css "><link rel="
stylesheet " href="
dep / jsonview / jquery.jsonview.min.css "><link rel="
stylesheet " href="
dep / slick / slick.css "><link rel="
stylesheet " href="
dep / slick / slick - theme.css "><link rel="
stylesheet " href="
dep / highlight / github.css "><!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries--><!--[if lt IE 9]><script src="
https: //oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script><script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]--><script>window.paceOptions = {
    ajax: {
        trackMethods: ['GET', 'POST']
    }
} < /script><script src="dep/pace / pace.min.js "></script></head><script>alog('speed.set', 'ht', +new Date); < /
    script > <!--[if lte IE 8]><body class="lower-ie"><div id="lowie-main"><img src="./img / forie.png "></div><script>var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?99f7569c6c41b300eebba455946c8b45";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })(); <
/script></body > < ![endif]-- >
<!--[if (gt IE 8)|!(IE)]><!--><body class="fullpage-body"><nav class="navbar navbar-default navbar-static-top"><div class="container-fluid"><button type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false" class="navbar-toggle collapsed"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><div class="navbar-header"><a href="./explore.html" class="navbar-brand"><img src="img/logo.png" alt=""></a></div><div id="navbar-collapse" class="collapse navbar-collapse"><ul class="nav navbar-nav navbar-right"><div id="nav-container"><div class="to-echarts"></div></div><div id="nav-right"></div></ul></div></div></nav><div id="modal-container"></div><div id="editor-main"><div id="code"></div><div id="split-gutter"></div><div id="preview" class="right-container"></div></div><script>void function(e,t){for(var n=t.getElementsByTagName("img"),a=+new Date,i=[],o=function(){this.removeEventListener&&this.removeEventListener("load",o,!1),i.push({img:this,time:+new Date})},s=0;s< n.length;s++)!function(){var e=n[s];e.addEventListener?!e.complete&&e.addEventListener("load",o,!1):e.attachEvent&&e.attachEvent("onreadystatechange",function(){"complete"==e.readyState&&o.call(e,o)})}();alog("speed.set",{fsItems:i,fs:a})}(window,document);
<
/script><script type="text/javascript
" src="
dep / jquery / jquery.min.js "></script><script type="
text / javascript " src="
dep / bootstrap / js / bootstrap.min.js "></script><script src="
dep / slick / slick.min.js "></script><script src="
dep / select2 / js / select2.full.js "></script><script src="
dep / jsonview / jquery.jsonview.js "></script><script src="
dep / bootstrap - suggest / bootstrap - suggest.js "></script><script type="
text / javascript " src="
dep / ace / src - min / ace.js "></script><script type="
text / javascript " src="
dep / ace / src - min / theme - github.js "></script><script type="
text / javascript " src="
dep / ace / src - min / ext - language_tools.js "></script><script src="
js / editor.js ? v = 1525293210825 "></script><script>if ('ace' === 'ace' || 'ace' === 'codemirror') {
galleryEditor.init();
}

else if ('ace' === 'monaco') {
    define('jquery', function () {
        return $;
    });
    require.config({
        paths: {
            'vs': './dep/monaco-editor/min/vs'
        }
    });
    require(['vs/editor/editor.main'], function () {
        galleryEditor.init();
    });
} < /script><script>void function(a,b,c,d,e,f){function g(b){a.attachEvent?a.attachEvent("onload",b,!1):a.addEventListener&&a.addEventListener("load",b)}function h(a,c,d){d=d||15;var e=new Date;e.setTime((new Date).getTime()+1e3*d),b.cookie=a+"="+escape(c)+";path=/;
expires = "+e.toGMTString()}function i(a){var c=b.cookie.match(new RegExp(" ( ^ | )
"+a+" = ([ ^ ;] * )(; | $)
"));return null!=c?unescape(c[2]):null}function j(){var a=i("
PMS_JT ");if(a){h("
PMS_JT ","
",-1);try{a=a.match(/{["
']s["']: (\d + ), ["']r["
    ']:["'
]([\s\ S] + )["']}/),a=a&&a[1]&&a[2]?{s:parseInt(a[1]),r:a[2]}:{}}catch(c){a={}}a.r&&b.referrer.replace(/#.*/,"
    ")!=a.r||alog("
    speed.set ","
    wt ",a.s)}}if(a.alogObjectConfig){var k=a.alogObjectConfig.sample,l=a.alogObjectConfig.rand;d="
    https: "===a.location.protocol?"
    https: //fex.bdstatic.com"+d:"http://fex.bdstatic.com"+d,k&&l&&l>k||(g(function(){alog("speed.set","lt",+new Date),e=b.createElement(c),e.async=!0,e.src=d+"?v="+~(new Date/864e5)+~(new Date/864e5),f=b.getElementsByTagName(c)[0],f.parentNode.insertBefore(e,f)}),j())}}(window,document,"script","/hunter/alog/dp.min.js");

    alog('speed.set', 'drt', +new Date);

    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?99f7569c6c41b300eebba455946c8b45";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })(); <
    /script></body > <!--<![endif]--></html><!--20976792390337166858072818-->
    <
    script >
    var _trace_page_logid = 2097679239; < /script>