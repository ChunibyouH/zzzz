// ==UserScript==
// @name         智联 培训屏蔽
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://sou.zhaopin.com/jobs/*
// @grant        none
// ==/UserScript==

(function () {
  var cooKie = {
    setCookie: function (name, value) {
      document.cookie = name + '=' + value + '; expires=Thu, 01 Jan 2099 00:00:00 GMT';
    },
    getCookie: function (cname) {
      var name = cname + '=';
      var ca = document.cookie.split('; ');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) { //字符首次出现的位置
          return 'ok';
        }
      }
      return 'xx';
    },
    pb: function () {
      $('#newlist_list_content_table a').each(function () {
        if (cooKie.getCookie($(this).text()) === 'ok') {
          $(this).parents('table').remove();
        }
      });
    }
  };
  
  //启动屏蔽

  $('#newlist_list_content_table a').each(function () {
    if (cooKie.getCookie($(this).text()) === 'ok') {
      $(this).parents('table').remove();
    }
  });
  //
  $('#newlist_list_content_table .gsmc').eq(0).removeClass();
  $('#newlist_list_content_table .gsmc').each(function () {
    $(this).html('<a class=\'zzzz\'>屏蔽→ </a>' + $(this).html());
    //console.log($(this).html());
  });
  $('.zzzz').css('color', 'red');
  //单击屏蔽
  $('.zzzz').click(function () {
    //$(this).next();
    var str = $(this).next().text();
    if (confirm('确定屏蔽 ' + str + ' 吗?')) {
      console.log('ok');
      cooKie.setCookie(str, str);
      cooKie.pb();
    } else {
      console.log('xx');
    }    //console.log($(this).next().text());

  });
}) ();
