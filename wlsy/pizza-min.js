(function(e,t){e.pizza=function(n){function v(n){if(!e.isPlainObject(n)&&n.width&&n.height)return new Error("Invalid Param: fillPicSize();");var r=150,i=40,s=e(t).height(),o=e(t).width(),u=n.width/n.height,a=s-r,f=a*u,l={};return f>o-i?(l.width=o-i,l.height=l.width/u):(l.width=a*u,l.height=a),l.width=Math.round(l.width),l.height=Math.round(l.height),l}function m(e){var t=new Date(Number(e));if(t=="Invalid Date")return e;var n={year:t.getUTCFullYear()<1e3?t.getUTCFullYear()+=1900:t.getUTCFullYear(),month:t.getUTCMonth()+1,day:t.getUTCDate(),hours:t.getUTCHours(),minutes:t.getUTCMinutes()<10?"0"+t.getUTCMinutes():t.getUTCMinutes(),seconds:t.getUTCSeconds()<10?"0"+t.getUTCSeconds():t.getUTCSeconds()};return n.year+"年"+n.month+"月"+n.day+"日 "+(n.hours>12?"下午"+(n.hours-12)+"点":"上午"+n.hours+"点")+n.minutes+"分"+n.seconds+"秒"}function g(t,r){arguments.length===1&&(r=t),t=e.extend({kind:"photo",tag:"",photoid:undefined,page:0},t||{});var s="?alt=json&kind="+t.kind+(t.kind=="tag"?"":t.tag!==""?"&tag="+t.tag:"&start-index="+(t.page*n.perPageResults+1)+"&max-results="+n.perPageResults),o=t.photoid?n.papi+"/photoid/"+t.photoid+"?alt=json":n.papi+"/albumid/"+n.albumid+s;e.ajax({url:o,dataType:"jsonp",success:function(n){t.photoid&&(n.feed.entry=[n.feed]);if(t.kind==="tag"){var s=[];return e.each(n.feed.entry,function(e,t){s.push(t.title.$t)}),r.call(null,s)}t.tag!==""&&(i.photo=[]),e.each(n.feed.entry,function(e,t){var n={};n.id=t.gphoto$id.$t,n.size={width:t.gphoto$width.$t,height:t.gphoto$height.$t},n.time=t.exif$tags?t.exif$tags.exif$time.$t:!1,n.meta=t.media$group.media$description.$t,n.tag=t.media$group.media$keywords.$t,n.src=t.media$group.media$content[0].url,i.photo.push(n)}),i.total=n.feed.openSearch$totalResults.$t,i.startIndex=n.feed.openSearch$startIndex.$t,i.itemsPerPage=n.feed.openSearch$itemsPerPage.$t,r.call(null,i)}})}function y(e,t){var r,i=window.devicePixelRatio||1;e.width*i>2045?r=2045:r=e.width*i;var s=t.split("/"),o=s[s.length-1];s[s.length-1]="s"+r,s.push(o);var u=n.picServer?s.join("/").replace("https",n.picServer[0]).replace("googleusercontent.com",n.picServer[1]):s.join("/");return u}function b(){switch(i.nowIndex){case 0:c.addClass("pizzaControlDisabled"),l.removeClass("pizzaControlDisabled");break;case i.total-1:l.addClass("pizzaControlDisabled"),c.removeClass("pizzaControlDisabled");break;default:c.removeClass("pizzaControlDisabled"),l.removeClass("pizzaControlDisabled")}}function E(){e("<style> .pizzaControlDisabled{ opacity: 0.6; cursor: not-allowed;} </style>").appendTo("head"),t.location.hash!==""?(photoid=window.location.hash.substr(1),g({photoid:photoid},function(e){w.show(e),h.html('<a href="/">返回</a>'),h.fadeIn()})):g(function(e){S(e)})}function S(e){w.show(e),p.html(e.total),d.html(e.index),h.fadeIn(),b()}function x(e){w.hide(),a.hide(),f.show()}var r={username:"wlsy638",albumid:"5841401125676210721",picasaServer:"picasaweb.google.com",picServer:undefined,perPageResults:10,papi:undefined},i={photo:[],total:0,nowIndex:0},s=e("#J_PizzaMeta"),o=e("#J_PizzaMetap"),u=e("#J_PizzaImg"),a=e("#J_PizzaWrapper"),f=e("#J_PizzaLoading"),l=e("#J_PizzaNext"),c=e("#J_PizzaPrev"),h=e("#J_PizzaIndex"),p=e("#J_PizzaTotalIndex"),d=e("#J_PizzaNowIndex");n=e.extend(r,n||{}),n.papi=n.papi?n.papi:"https://"+n.picasaServer+"/data/feed/api/user/"+n.username;var w={show:function(t,n){function r(t){var r=v(t.photo[n].size),l=t.photo[n];a.width(r.width).height(r.height).fadeIn("slow",function(){u.attr("src",y(r,l.src)),d.fadeOut("fast",function(){d.html(i.nowIndex+1),d.fadeIn("fast")}),u.one("load",function(){f.hide(),window.location.hash=l.id,_gaq.push(["_trackPageview","/"+l.id]),u.fadeIn("slow",function(){l.time?o.html(l.meta+'<span class="pizzaTg">——定格于'+m(l.time)+" 在"+l.tag+"</span>"):o.html(l.meta+'<span class="pizzaTg">——在'+l.tag+"</span>"),o.width(r.width-20),s.fadeIn("slow"),t.nowIndex<t.photo.length-1&&(e("<img/>")[0].src=y(r,t.photo[n+1].src))})})})}arguments.length===1&&(n=0),f.show(),t.nowIndex=n,t.nowIndex===t.photo.length&&t.nowIndex<t.total?g({page:i.photo.length/i.itemsPerPage},function(e){r(e)}):r(t)},next:function(e,t){arguments.length===1&&(t=e.nowIndex+1||0);if(e.nowIndex===e.total-1)return;this.hide(),this.show(e,t),b()},prev:function(e,t){arguments.length===1&&(t=e.nowIndex-1||0);if(e.nowIndex===0)return;this.hide(),this.show(e,t),b()},hide:function(){s.hide(),u.hide()}};l.on("click",function(e){e.preventDefault(),w.next(i)}),c.on("click",function(e){e.preventDefault(),w.prev(i)}),e(document).keydown(function(e){if(e.keyCode==37||e.keyCode==38)return w.prev(i),!1;if(e.keyCode==39||e.keyCode==40)return w.next(i),!1}),E(),e("body").on("click","#J_Tags",function(t){t.preventDefault(),e("#tags").fadeToggle(),g({kind:"tag"},function(t){var n="";for(var r=0,i=t.length;r<i;r++)n+='<a href="#">'+t[r]+"</a>";e("#tags").html(n)})}),e("body").on("click","#tags a",function(t){t.preventDefault();var n=e(this).html();e("#tags").toggle(),e("#tag").fadeOut(),x(),g({tag:n},function(t){S(t),e("#tag").html('<a href="#">'+n+"<b>⊗</b></a>").fadeIn()})}),e("body").on("click","#tag a",function(t){t.preventDefault(),e("#tag").fadeOut(),x(),i.photo=[],g(function(e){S(e)})})}})(jQuery,window)
