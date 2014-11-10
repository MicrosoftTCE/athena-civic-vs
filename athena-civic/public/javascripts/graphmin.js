function transform(e){return"translate("+e.x+","+e.y+")"}function translateSVG(e,t){return"translate("+e+","+t+")"}function numCommas(e){e+="",x=e.split("."),x1=x[0],x2=x.length>1?"."+x[1]:"";for(var t=/(\d+)(\d{3})/;t.test(x1);)x1=x1.replace(t,"$1,$2");return x1+x2}function getSVG(e){return e}var color=d3.scale.category20(),width=800,height=800,force=d3.layout.force().charge(-70).linkDistance(60).size([width,height]),organizations={},filteredNodes={},porucsCon={},affilCon={},fundingCon={},investingCon={},fundLink={},investLink={},porucsLink={},affilLink={},nodeInit,svg=d3.select(".content").append("svg").attr("xmlns","http://www.w3.org/2000/svg").attr("id","network").attr("height",height).attr("width",width).attr("viewBox","0 0 800 800").attr("preserveAspectRatio","xMidYMid"),aspect=width/height,network=$("#network"),container=network.parent();$(window).on("resize",function(){var e=container.width();network.attr("width",e),network.attr("height",Math.round(e/aspect))}).trigger("resize");var empScale=d3.scale.sqrt().domain([10,13e4]).range([10,50]),twitScale=d3.scale.sqrt().domain([10,1e6]).range([10,50]);d3.json("data/final_data.json",function(e,t){function n(e){s=i(e),d3.select("#info").html(s).style("list-style","square")}function i(e){var t="";if(t+='<h1><a href="'+e.weblink+'" target="_blank">'+e.name+"</a></h1>",t+="<h6>Type of Entity: </h6> <h5>"+e.type+"</h5>",null!==e.location){t+="<br/><h6> Location:  </h6>";var n=[];if(-1!==e.location.indexOf("; ")){t+="<br/> <h5><ul>",n=e.location.split("; ");for(var i=0;i<n.length;i++)t+='<li style="display:block;"><h5><a class="click-location" style="cursor:pointer;">'+n[i]+"</h5></a></li>"}else t+="<h5><ul>",t+='<li style="display:inline-block;"><h5><a class="click-location" style="cursor:pointer;">'+e.location+"</h5></a></li>";t+="</h5></ul><br/>"}else t+="<br/><h6> Location:  </h6> <h5>N/A</h5><br/>";if("Individual"!==e.type&&(t+=null!==e.numemp?"<h6>Employees: </h6> <h5>"+numCommas(e.numemp)+"</h5><br/>":"<h6>Employees: </h6> <h5>N/A</h5><br/>"),null===e.twitterH)t+="<h6>Twitter:  </h6> <h5>N/A</h5><br/>",t+="<h6>Twitter Followers: </h6> <h5>N/A</h5><br/>";else{var o=e.twitterH.replace("@","");o="https://twitter.com/"+o,t+='<h6>Twitter:  </h6> <h5><a href="'+o+'">'+e.twitterH+"</h5></a><br/>",t+="<h6>Twitter Followers:  </h6> <h5>"+numCommas(e.followers)+"</h5><br/>"}var r=[];if(null!==e.people){t+="<br/><h6>Key People:</h6><ul><h5>",r=e.people.split(", ");for(var i=0;i<r.length;i++)t+='<li><a href="http://www.bing.com/search?q='+r[i].replace(" ","%20")+'&go=Submit&qs=bs&form=QBRE" target="_blank">'+r[i]+"</a></li>";t+="</h5></ul>"}var l=[],c=[];if(null===e.fundingR)t+="<br/> <h6>No known funding.</h6><br/>";else{var s,d,u=0,a=[],f=[];if(-1!==e.fundingR.indexOf("; ")){a=e.fundingR.split("; ");for(var i=0;i<a.length;i++)f=a[i].split(":"),l.push(f[0]),c.push(f[1]),"Total"!==l[i]?"Individuals"!==l[i]?"null"===c[i]?(0===u&&(t+="<br/><h6> Received funding from:</h6><ul>",u++),t+='<li><h5><a href="http://www.bing.com/search?q='+l[i].replace(" ","%20")+'&go=Submit&qs=bs&form=QBRE" target="_blank">'+l[i]+'</a></h5>: <strong style="color:rgb(255,185,0);">unknown</strong></li>'):(0===u&&(t+="<br/><h6> Received funding from:</h6><ul>",u++),t+='<li><h5><a href="http://www.bing.com/search?q='+l[i].replace(" ","%20")+'&go=Submit&qs=bs&form=QBRE" target="_blank">'+l[i]+'</a></h5>: $<strong style="color:rgb(127,186,0);">'+numCommas(c[i])+"</strong></li>"):d=c[i]:s=c[i]}else a=e.fundingR.split(":"),"Total"===a[0]?(t+="<br/>",s=a[1]):"Individuals"===a[0]?(t+="<br/>",d=a[1]):(t+="<br/><h6> Received funding from:</h6><ul>",t+='<li><h5><a href="http://www.bing.com/search?q='+a[0].replace(" ","%20")+'&go=Submit&qs=bs&form=QBRE" target="_blank">'+a[0]+"</a></h5>",t+="null"===a[1]?': <strong style="color:rgb(255,185,0);">unknown</strong></li>':': $<strong style="color:rgb(127,186,0);">'+numCommas(a[1])+"</strong></li>");t+="</ul>",isNaN(d)||(t+='<h6>Individuals provided </h6> $<strong style="color:rgb(127,186,0);">'+numCommas(d)+"</strong></h5><h6> in fundings.</h6><br/>"),isNaN(s)||(t+='<h6>Total funding received: </h6> $<strong style="color:rgb(127,186,0);">'+numCommas(s)+"</strong></h5><br/>")}var h,g,y=[],p=[];if(null===e.investmentR)t+="<br/> <h6>No known investments.</h6> <br/>";else{var u=0,m=[],v=[];if(-1!==e.investmentR.indexOf("; ")){m=e.investmentR.split("; ");for(var i=0;i<m.length;i++)v=m[i].split(":"),y.push(v[0]),p.push(v[1]),"Total"!==y[i]?"Individuals"!==y[i]?"null"===p[i]?(0===u&&(t+="<br/><h6> Received investments from:</h6><ul>",u++),t+='<li><h5><a href="http://www.bing.com/search?q='+y[i].replace(" ","%20")+'&go=Submit&qs=bs&form=QBRE" target="_blank">'+y[i]+'</a></h5>: <strong style="color:rgb(255,185,0);">unknown</strong></li>'):(0===u&&(t+="<br/><h6> Received investments from:</h6><ul>",u++),t+='<li><h5><a href="http://www.bing.com/search?q='+y[i].replace(" ","%20")+'&go=Submit&qs=bs&form=QBRE" target="_blank">'+y[i]+'</a></h5>: $<strong style="color:rgb(127,186,0);">'+numCommas(p[i])+"</strong></li>"):g=p[i]:h=p[i]}else m=e.investmentR.split(":"),"Total"===m[0]?(t+="<br/>",h=p[1]):"Individuals"===m[0]?(t+="<br/>",g=p[1]):(t+="<br/><h6> Received investments from:</h6><ul>",t+='<li><h5><a href="http://www.bing.com/search?q='+m[0].replace(" ","%20")+'&go=Submit&qs=bs&form=QBRE" target="_blank">'+m[0]+"</a></h5>",t+="null"===m[1]?': <strong style="color:rgb(255,185,0);">unknown</strong></li>':': $<strong style="color:rgb(127,186,0);">'+numCommas(m[1])+"</strong></li>");t+="</ul>",isNaN(g)||(t+='<h6>Individuals provided </h6> $<strong style="color:rgb(127,186,0);">'+numCommas(g)+"</strong> in investments.<br/>"),isNaN(h)||(t+='<h6>Total investments received: </h6> $<strong style="color:rgb(127,186,0);">'+numCommas(h)+"</strong>.<br/>")}if(null===e.relatedto)t+="<br/><h6>No known relations.</h6><br/>";else{t+="<br/><h6>Related To:  </h6> <ul>";var x=[];if(-1!==e.relatedto.indexOf(", ")){x=e.relatedto.split(", ");for(var i=0;i<x.length;i++)t+='<li><h5><a href="http://www.bing.com/search?q='+x[i].replace(" ","%20")+'&go=Submit&qs=bs&form=QBRE" target="_blank">'+x[i]+"</a></h5></li>"}else t+='<li><h5> <a href="http://www.bing.com/search?q='+e.relatedto.replace(" ","%20")+'&go=Submit&qs=bs&form=QBRE" target="_blank">'+e.relatedto+"</a></h5></li>";t+="</ul>"}return t}function o(){for(var e="",t=[0,0,0,0],n=[],i=[],o=[],r=[],l=0;l<filteredNodes.length;l++)"Individual"===filteredNodes[l].type&&(r.push(filteredNodes[l].name),x.push(filteredNodes[l]),t[3]++),"Non-Profit"===filteredNodes[l].type&&(i.push(filteredNodes[l].name),m.push(filteredNodes[l]),t[1]++),"For-Profit"===filteredNodes[l].type&&(n.push(filteredNodes[l].name),p.push(filteredNodes[l]),t[0]++),"Government"===filteredNodes[l].type&&(o.push(filteredNodes[l].name),v.push(filteredNodes[l]),t[2]++);e+="<h3 style='padding-bottom:10px;'>The Data</h3>",d3.select("#info").html(e).style("list-style","square"),d3.select("#info").append("div").attr("id","breakdown").style("width","100%");var l=d3.scale.linear().domain([0,d3.max(t)]).range([0,$("#breakdown").width()]),c=0,s=0;d3.select("#breakdown").selectAll("div").data(t).enter().append("div").style("width",function(e){return l(e)/5+"%"}).style("height","20px").style("font","8px sans-serif").style("background-color",function(){return 0===c?(c++,"rgb(127,186,0)"):1===c?(c++,"rgb(0,164,239)"):2===c?(c++,"rgb(242,80,34)"):3===c?(c++,"rgb(255,185,0)"):void 0}).style("text-align","right").style("padding","3px").style("margin","1px").style("color","white").text(function(){return 0===s?void s++:1===s?void s++:2===s?void s++:3===s?void s++:void 0});var d="";d+="<h3 style='padding-top:15px; color:rgb(127,186,0);'>For-Profit ("+t[0]+"):</h3> ";for(var l=0;l<n.length;l++)d+=l===n.length-1?"<a class='for-profit-entity' style='font-size:16px; cursor:pointer;'>"+n[l]+"</a>":"<a class='for-profit-entity' style='font-size:16px; cursor:pointer;'>"+n[l]+", </a>";d+="<h3 style='padding-top:15px; color:rgb(0,164,239);'>Non-Profit ("+t[1]+"):</h3> ";for(var l=0;l<i.length;l++)d+=l===i.length-1?"<a class='non-profit-entity' style='font-size:16px; cursor:pointer;'>"+i[l]+"</a>":"<a class='non-profit-entity' style='font-size:16px; cursor:pointer;'>"+i[l]+", </a>";d+="<h3 style='padding-top:15px; color:rgb(242,80,34);'>Government ("+t[2]+"):</h3> ";for(var l=0;l<o.length;l++)d+=l===o.length-1?"<a class='government-entity' style='font-size:16px; cursor:pointer;'>"+o[l]+"</a>":"<a class='government-entity' style='font-size:16px; cursor:pointer;'>"+o[l]+", </a>";d+="<h3 style='padding-top:15px; color:rgb(255,185,0);'>Individual ("+t[3]+"):</h3> ";for(var l=0;l<r.length;l++)d+=l===r.length-1?"<a  class='individual-entity' style='font-size:16px; cursor:pointer;'>"+r[l]+"</a>":"<a  class='individual-entity' style='font-size:16px; cursor:pointer;'>"+r[l]+", </a>";d3.select("#info").append("text").style("padding-bottom","20px").html(d)}function r(){var e="";filteredNodes.forEach(function(e){if(b.push(e.name),k.push(e.location),-1===E.indexOf(e.name)&&null!==e.name&&E.push(e.name),-1===w.indexOf(e.location)&&null!==e.location){var t=e.location.split("; ");t.forEach(function(e){-1===w.indexOf(e)&&w.push(e)})}}),I=I.concat(w),I=I.concat(E),I=I.sort();for(var t=0;t<I.length;t++)e+='<option value="'+I[t]+'">';d3.select(".filter-name-location datalist").html(e)}function l(e){var t=[],i=0;if(-1!==b.indexOf(e))b.forEach(function(t){if(t===e&&t.length===e.length){var n=b.indexOf(e);console.log(e),nodeInit.filter(function(e,t){t===n&&(console.log(e),u(e))})}});else{k.forEach(function(n){if(null!==n){var o=n.split("; ");-1!==o.indexOf(e)&&t.push(i)}i++});fundLink.style("opacity",function(t){return t.source.location===e&&t.target.location===e?(console.log(t.source.location),"1"):"0.05"}),investLink.style("opacity",function(t){return t.source.location===e&&t.target.location===e?"1":"0.05"}),porucsLink.style("opacity",function(t){return t.source.location===e&&t.target.location===e?"1":"0.05"}),affilLink.style("opacity",function(t){return t.source.location===e&&t.target.location===e?"1":"0.05"}),d3.selectAll(".node").style("opacity",function(e,n){return-1===t.indexOf(n)?.05:1}).on("mouseover",null),g.on("mouseout",null).on("mouseover",null).on("click",null),g.filter(function(e,t){return 1==nodeInit[0][t].style.opacity?e:void 0}).on("mouseout",null).on("mouseover",n).on("click",null)}}function c(e){var n=i(e);d3.select("#info").html(n).style("list-style","square"),fundLink.transition().duration(350).delay(0).style("opacity",function(t){return e===t.source||e===t.target?"1":"0.05"}),investLink.transition().duration(350).delay(0).style("opacity",function(t){return e===t.source||e===t.target?"1":"0.05"}),porucsLink.transition().duration(350).delay(0).style("opacity",function(t){return e===t.source||e===t.target?"1":"0.05"}),affilLink.transition().duration(350).delay(0).style("opacity",function(t){return e===t.source||e===t.target?"1":"0.05"});var o=t.fundingR.filter(function(t){return t.source.index===e.index||t.target.index===e.index}).map(function(t){return t.source.index===e.index?t.target.index:t.source.index}),r=t.investingR.filter(function(t){return t.source.index===e.index||t.target.index===e.index}).map(function(t){return t.source.index===e.index?t.target.index:t.source.index}),l=t.porucs.filter(function(t){return t.source.index===e.index||t.target.index===e.index}).map(function(t){return t.source.index===e.index?t.target.index:t.source.index}),c=t.affiliations.filter(function(t){return t.source.index===e.index||t.target.index===e.index}).map(function(t){return t.source.index===e.index?t.target.index:t.source.index});d3.select(this).style("stroke","black"),svg.selectAll(".node").transition().duration(350).delay(0).style("opacity",function(t){return o.indexOf(t.index)>-1||r.indexOf(t.index)>-1||l.indexOf(t.index)>-1||c.indexOf(t.index)>-1||t===e?"1":"0.05"})}function d(){g.style("stroke","white").on("mouseover",c).on("mouseout",d).on("click",u),fundLink.transition().duration(350).delay(0).style("stroke","rgb(111,93,168)").style("opacity","0.2").style("stroke-width","1px").style("z-index","0").each(function(){this.parentNode.insertBefore(this,this)}),investLink.transition().duration(350).delay(0).style("stroke","rgb(38,114,114)").style("opacity","0.2").style("stroke-width","1px").style("z-index","0").each(function(){this.parentNode.insertBefore(this,this)}),porucsLink.transition().duration(350).delay(0).style("stroke","rgb(235,232,38)").style("opacity","0.2").style("stroke-width","1px").style("z-index","0").each(function(){this.parentNode.insertBefore(this,this)}),affilLink.transition().duration(350).delay(0).style("stroke","rgb(191,72,150)").style("opacity","0.2").style("stroke-width","1px").style("z-index","0").each(function(){this.parentNode.insertBefore(this,this)}),d3.selectAll(".node").transition().duration(350).delay(0).style("opacity","1")}function u(e){n(e),fundLink.transition().duration(350).delay(0).style("opacity",function(t){return e===t.source||e===t.target?"1":"0.05"}),investLink.transition().duration(350).delay(0).style("opacity",function(t){return e===t.source||e===t.target?"1":"0.05"}),porucsLink.transition().duration(350).delay(0).style("opacity",function(t){return e===t.source||e===t.target?"1":"0.05"}),affilLink.transition().duration(350).delay(0).style("opacity",function(t){return e===t.source||e===t.target?"1":"0.05"}),g.style("stroke",function(t){return t!==e?"white":"black"}).on("mouseout",null),g.filter(function(t){return t!==e?t:void 0}).on("mouseover",null);var i=t.fundingR.filter(function(t){return t.source.index===e.index||t.target.index===e.index}).map(function(t){return t.source.index===e.index?t.target.index:t.source.index}),o=t.investingR.filter(function(t){return t.source.index===e.index||t.target.index===e.index}).map(function(t){return t.source.index===e.index?t.target.index:t.source.index}),r=t.porucs.filter(function(t){return t.source.index===e.index||t.target.index===e.index}).map(function(t){return t.source.index===e.index?t.target.index:t.source.index}),l=t.affiliations.filter(function(t){return t.source.index===e.index||t.target.index===e.index}).map(function(t){return t.source.index===e.index?t.target.index:t.source.index});svg.selectAll(".node").transition().duration(350).delay(0).style("opacity",function(t){return i.indexOf(t.index)>-1||o.indexOf(t.index)>-1||r.indexOf(t.index)>-1||l.indexOf(t.index)>-1||t===e?"1":"0.05"}),g.filter(function(t){return i.indexOf(t.index)>-1||o.indexOf(t.index)>-1||r.indexOf(t.index)>-1||l.indexOf(t.index)>-1||t===e}).on("mouseover",n).on("click",function(){})}function a(){g.on("mouseover",null).on("mouseout",null).on("click",null)}function f(e){d3.select(this).classed("fixed",e.fixed=!0),g.on("mouseover",c).on("mouseout",d).on("click",u)}function h(){for(var e=[],t=0;t<nodeInit[0].length;t++)"visible"===nodeInit[0][t].style.visibility&&e.push(t);var n=[];return nodeInit.filter(function(t,i){e.indexOf(i)>-1&&n.push(t)}),n}filteredNodes=t.nodes,fundingCon=t.fundingR,investingCon=t.investingR,porucsCon=t.porucs,affilCon=t.affiliations;var a=force.drag().on("dragstart",a).on("drag",a).on("dragend",f);force.nodes(filteredNodes).links(fundingCon).start(),force.nodes(filteredNodes).links(investingCon).start(),force.nodes(filteredNodes).links(porucsCon).start(),force.nodes(filteredNodes).links(affilCon).start(),fundLink=svg.selectAll(".fund").data(fundingCon).enter().append("line").attr("class","fund").style("stroke","rgb(111,93,168)").style("stroke-width","1").style("opacity","0.2").style("visibility","visible"),investLink=svg.selectAll(".invest").data(investingCon).enter().append("line").attr("class","invest").style("stroke","rgb(38,114,114)").style("stroke-width","1").style("opacity","0.2").style("visibility","visible"),porucsLink=svg.selectAll(".porucs").data(porucsCon).enter().append("line").attr("class","porucs").style("stroke","rgb(235,232,38)").style("stroke-width","1").style("opacity","0.2").style("visibility","visible"),affilLink=svg.selectAll(".affil").data(affilCon).enter().append("line").attr("class","affil").style("stroke","rgb(191,72,150)").style("stroke-width","1").style("opacity","0.2").style("visibility","visible"),nodeInit=svg.selectAll(".node").data(filteredNodes).enter().append("g").attr("class","node").style("visibility","visible").call(a);var g=nodeInit.append("circle").attr("r",function(e){return null!==e.numemp?empScale(parseInt(e.numemp)):"7"}).style("fill",function(e){if(null!==e.type){if("Individual"===e.type)return"rgb(255,185,0)";if("Non-Profit"===e.type)return"rgb(0,164,239)";if("For-Profit"===e.type)return"rgb(127,186,0)";if("Government"===e.type)return"rgb(242,80,34)"}}).style("stroke-width","1.5px").style("stroke","white").on("mouseover",c).on("mouseout",d).on("click",u),y=svg.selectAll(".node").append("text").text(function(e){return e.nickname}).attr("transform",function(e){return null!==e.numemp?translateSVG(0,-(empScale(parseInt(e.numemp))+2)):translateSVG(0,-(empScale(parseInt(7))+2))}).style("font","10px sans-serif").style("pointer-events","none").style("text-shadow","0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff"),p=[],m=[],v=[],x=[];o(),d3.selectAll(".for-profit-entity").on("click",function(e,t){u(p[t])}),d3.selectAll(".non-profit-entity").on("click",function(e,t){u(m[t])}),d3.selectAll(".individual-entity").on("click",function(e,t){u(x[t])}),d3.selectAll(".government-entity").on("click",function(e,t){u(v[t])}),d3.selectAll(".click-location").on("click",function(e){console.log(e),l(this.innerHTML)});var b=[],k=[],E=[],w=[],I=[];r(),d3.selectAll("#search-text").on("keydown",function(){if(13===d3.event.keyCode){var e=document.getElementById("search-text").value;l(e)}}),d3.selectAll("option").on("click",function(e,t){var n=d3.selectAll("option")[0][t].value;l(n)}),force.on("tick",function(){fundLink.attr("x1",function(e){return e.source.x=Math.max(50,Math.min(width-50,e.source.x))}).attr("y1",function(e){return e.source.y=Math.max(50,Math.min(height-50,e.source.y))}).attr("x2",function(e){return e.target.x=Math.max(50,Math.min(width-50,e.target.x))}).attr("y2",function(e){return e.target.y=Math.max(50,Math.min(height-50,e.target.y))}).each(function(){this.parentNode.insertBefore(this,this)}),investLink.attr("x1",function(e){return e.source.x=Math.max(50,Math.min(width-50,e.source.x))}).attr("y1",function(e){return e.source.y=Math.max(50,Math.min(height-50,e.source.y))}).attr("x2",function(e){return e.target.x=Math.max(50,Math.min(width-50,e.target.x))}).attr("y2",function(e){return e.target.y=Math.max(50,Math.min(height-50,e.target.y))}).each(function(){this.parentNode.insertBefore(this,this)}),porucsLink.attr("x1",function(e){return e.source.x=Math.max(50,Math.min(width-50,e.source.x))}).attr("y1",function(e){return e.source.y=Math.max(50,Math.min(height-50,e.source.y))}).attr("x2",function(e){return e.target.x=Math.max(50,Math.min(width-50,e.target.x))}).attr("y2",function(e){return e.target.y=Math.max(50,Math.min(height-50,e.target.y))}).each(function(){this.parentNode.insertBefore(this,this)}),affilLink.attr("x1",function(e){return e.source.x=Math.max(50,Math.min(width-50,e.source.x))}).attr("y1",function(e){return e.source.y=Math.max(50,Math.min(height-50,e.source.y))}).attr("x2",function(e){return e.target.x=Math.max(50,Math.min(width-50,e.target.x))}).attr("y2",function(e){return e.target.y=Math.max(50,Math.min(height-50,e.target.y))}).each(function(){this.parentNode.insertBefore(this,this)}),nodeInit.attr("x",function(e){return e.x=Math.max(50,Math.min(width-50,e.x))}).attr("y",function(e){return e.y=Math.max(50,Math.min(height-50,e.y))}),nodeInit.attr("transform",function(e){return translateSVG(e.x,e.y)})}),d3.selectAll("#cb_fund").on("click",function(){var e=h();if(console.log(e.length),document.getElementById("cb_fund").checked){var t=0;d3.selectAll(".fund").style("visibility",function(n){return e.indexOf(n.source)>-1&&e.indexOf(n.target)>-1&&"hidden"===this.style.visibility?(t++,"visible"):"hidden"}),console.log(t)}document.getElementById("cb_fund").checked||d3.selectAll(".fund").style("visibility",function(){return"hidden"}),0!==e.length&&(document.getElementById("cb_individ").checked||document.getElementById("cb_forpro").checked||document.getElementById("cb_nonpro").checked||document.getElementById("cb_gov").checked)||(document.getElementById("cb_fund").checked=!1)}),d3.selectAll("#cb_invest").on("click",function(){var e=h();document.getElementById("cb_invest").checked&&d3.selectAll(".invest").style("visibility",function(t){return e.indexOf(t.source)>-1&&e.indexOf(t.target)>-1&&"hidden"===this.style.visibility?"visible":"hidden"}),document.getElementById("cb_invest").checked||d3.selectAll(".invest").style("visibility",function(){return"hidden"}),0!==e.length&&(document.getElementById("cb_individ").checked||document.getElementById("cb_forpro").checked||document.getElementById("cb_nonpro").checked||document.getElementById("cb_gov").checked)||(document.getElementById("cb_invest").checked=!1)}),d3.selectAll("#cb_porucs").on("click",function(){var e=h();document.getElementById("cb_porucs").checked&&d3.selectAll(".porucs").style("visibility",function(t){return e.indexOf(t.source)>-1&&e.indexOf(t.target)>-1&&"hidden"===this.style.visibility?"visible":"hidden"}),document.getElementById("cb_porucs").checked||d3.selectAll(".porucs").style("visibility",function(){return"hidden"}),0!==e.length&&(document.getElementById("cb_individ").checked||document.getElementById("cb_forpro").checked||document.getElementById("cb_nonpro").checked||document.getElementById("cb_gov").checked)||(document.getElementById("cb_porucs").checked=!1)}),d3.selectAll("#cb_affil").on("click",function(){var e=h();document.getElementById("cb_affil").checked&&d3.selectAll(".affil").style("visibility",function(t){return e.indexOf(t.source)>-1&&e.indexOf(t.target)>-1&&"hidden"===this.style.visibility?"visible":"hidden"}),document.getElementById("cb_affil").checked||d3.selectAll(".affil").style("visibility",function(){return console.log(this.style.visibility),"hidden"}),0!==e.length&&(document.getElementById("cb_individ").checked||document.getElementById("cb_forpro").checked||document.getElementById("cb_nonpro").checked||document.getElementById("cb_gov").checked)||(document.getElementById("cb_affil").checked=!1)}),d3.selectAll("#cb_individ, #cb_nonpro, #cb_forpro, #cb_gov").on("click",function(){function e(){for(var e=arguments,t={},n=[],i=0;i<e.length;i++)for(var o=0;o<e[i].length;o++)t[e[i][o]]!==!0&&(n[n.length]=e[i][o],t[e[i][o]]=!0);return n}var t=[],n=[],i=[],o=[],r=[],l=[],c=[],s=[],d=[],u=[],a=[],f=[],h=[],g=[],y=[],p=[],m=[],v=[],x=[],b=[],k=[],E=[],w=[],I=[],N=[],_=[],B=[],O=[],C=[],L=[],A=[],M=[],R=[],S=[],P=[],q=[],G=[],z=[],F=[],T=[];document.getElementById("cb_individ").checked&&(d3.selectAll(".node").filter(function(e){return"Individual"===e.type?this:void 0}).style("visibility","visible"),r=0,filteredNodes.forEach(function(e){"Individual"===e.type&&(fundingCon.forEach(function(n){(e===n.source||e===n.target)&&t.push(r),r++}),r=0)}),r=0,filteredNodes.forEach(function(e){"Individual"===e.type&&(investingCon.forEach(function(t){(e===t.source||e===t.target)&&n.push(r),r++}),r=0)}),r=0,filteredNodes.forEach(function(e){"Individual"===e.type&&(porucsCon.forEach(function(t){(e===t.source||e===t.target)&&i.push(r),r++}),r=0)}),countIndex0=0,filteredNodes.forEach(function(e){"Individual"===e.type&&(affilCon.forEach(function(t){(e===t.source||e===t.target)&&o.push(countIndex0),countIndex0++}),countIndex0=0)})),document.getElementById("cb_individ").checked||(d3.selectAll(".node").filter(function(e){return"Individual"===e.type?this:void 0}).style("visibility","hidden"),N=0,filteredNodes.forEach(function(e){"Individual"===e.type&&(fundingCon.forEach(function(t){(e===t.source||e===t.target)&&k.push(N),N++}),N=0)}),N=0,filteredNodes.forEach(function(e){"Individual"===e.type&&(investingCon.forEach(function(t){(e===t.source||e===t.target)&&E.push(N),N++}),N=0)}),N=0,filteredNodes.forEach(function(e){"Individual"===e.type&&(porucsCon.forEach(function(t){(e===t.source||e===t.target)&&w.push(N),N++}),N=0)}),N=0,filteredNodes.forEach(function(e){"Individual"===e.type&&(affilCon.forEach(function(t){(e===t.source||e===t.target)&&I.push(N),N++}),N=0)})),document.getElementById("cb_nonpro").checked&&(d3.selectAll(".node").filter(function(e){return"Non-Profit"===e.type?this:void 0}).style("visibility","visible"),u=0,filteredNodes.forEach(function(e){"Non-Profit"===e.type&&(fundingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==l.indexOf(u)||l.push(u),u++}),u=0)}),u=0,filteredNodes.forEach(function(e){"Non-Profit"===e.type&&(investingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==c.indexOf(u)||c.push(u),u++}),u=0)}),u=0,filteredNodes.forEach(function(e){"Non-Profit"===e.type&&(porucsCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==s.indexOf(u)||s.push(u),u++}),u=0)}),u=0,filteredNodes.forEach(function(e){"Non-Profit"===e.type&&(affilCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==d.indexOf(u)||d.push(u),u++}),u=0)})),document.getElementById("cb_nonpro").checked||(d3.selectAll(".node").filter(function(e){return"Non-Profit"===e.type?this:void 0}).style("visibility","hidden"),L=0,filteredNodes.forEach(function(e){"Non-Profit"===e.type&&(fundingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==_.indexOf(L)||_.push(L),L++}),L=0)}),L=0,filteredNodes.forEach(function(e){"Non-Profit"===e.type&&(investingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==B.indexOf(L)||B.push(L),L++}),L=0)}),L=0,filteredNodes.forEach(function(e){"Non-Profit"===e.type&&(porucsCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==O.indexOf(L)||O.push(L),L++}),L=0)}),L=0,filteredNodes.forEach(function(e){"Non-Profit"===e.type&&(affilCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==C.indexOf(L)||C.push(L),L++}),L=0)})),document.getElementById("cb_forpro").checked&&(d3.selectAll(".node").filter(function(e){return"For-Profit"===e.type?this:void 0}).style("visibility","visible"),y=0,filteredNodes.forEach(function(e){"For-Profit"===e.type&&(fundingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==a.indexOf(y)||a.push(y),y++}),y=0)}),y=0,filteredNodes.forEach(function(e){"For-Profit"===e.type&&(investingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==f.indexOf(y)||f.push(y),y++}),y=0)}),y=0,filteredNodes.forEach(function(e){"For-Profit"===e.type&&(porucsCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==h.indexOf(y)||h.push(y),y++}),y=0)}),y=0,filteredNodes.forEach(function(e){"For-Profit"===e.type&&(affilCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==g.indexOf(y)||g.push(y),y++}),y=0)})),document.getElementById("cb_forpro").checked||(d3.selectAll(".node").filter(function(e){return"For-Profit"===e.type?this:void 0}).style("visibility","hidden"),P=0,filteredNodes.forEach(function(e){"For-Profit"===e.type&&(fundingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==A.indexOf(P)||A.push(P),P++}),P=0)}),P=0,filteredNodes.forEach(function(e){"For-Profit"===e.type&&(investingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==M.indexOf(P)||M.push(P),P++}),P=0)}),P=0,filteredNodes.forEach(function(e){"For-Profit"===e.type&&(porucsCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==R.indexOf(P)||R.push(P),P++}),P=0)}),P=0,filteredNodes.forEach(function(e){"For-Profit"===e.type&&(affilCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==S.indexOf(P)||S.push(P),P++}),P=0)})),document.getElementById("cb_gov").checked&&(d3.selectAll(".node").filter(function(e){return"Government"===e.type?this:void 0}).style("visibility","visible"),b=0,filteredNodes.forEach(function(e){"Government"===e.type&&(fundingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==p.indexOf(b)||p.push(b),b++}),b=0)}),b=0,filteredNodes.forEach(function(e){"Government"===e.type&&(investingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==m.indexOf(b)||m.push(b),b++}),b=0)}),b=0,filteredNodes.forEach(function(e){"Government"===e.type&&(porucsCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==v.indexOf(b)||v.push(b),b++}),b=0)}),b=0,filteredNodes.forEach(function(e){"Government"===e.type&&(affilCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==x.indexOf(b)||x.push(b),b++}),b=0)})),document.getElementById("cb_gov").checked||(d3.selectAll(".node").filter(function(e){return"Government"===e.type?this:void 0}).style("visibility","hidden"),T=0,filteredNodes.forEach(function(e){"Government"===e.type&&(fundingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==q.indexOf(T)||q.push(T),T++}),T=0)}),T=0,filteredNodes.forEach(function(e){"Government"===e.type&&(investingCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==G.indexOf(T)||G.push(T),T++}),T=0)}),T=0,filteredNodes.forEach(function(e){"Government"===e.type&&(porucsCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==z.indexOf(T)||z.push(T),T++}),T=0)}),T=0,filteredNodes.forEach(function(e){"Government"===e.type&&(affilCon.forEach(function(t){e!==t.source&&e!==t.target||-1!==F.indexOf(T)||F.push(T),T++}),T=0)}));var $=[],V=[],Q=[],H=[];0!==t.length&&($=e($,t)),0!==l.length&&($=$=e($,l)),0!==a.length&&($=e($,a)),0!==p.length&&($=e($,p)),0!==n.length&&(V=e(V,n)),0!==c.length&&(V=e(V,c)),0!==f.length&&(V=e(V,f)),0!==m.length&&(V=e(V,m)),0!==i.length&&(Q=e(Q,i)),0!==s.length&&(Q=e(Q,s)),0!==h.length&&(Q=e(Q,h)),0!==v.length&&(Q=e(Q,v)),0!==o.length&&(H=e(H,o)),0!==d.length&&(H=e(H,d)),0!==g.length&&(H=e(H,g)),0!==x.length&&(H=e(H,x));var D=[],j=[],K=[],Y=[];0!==k.length&&(D=e(D,k)),0!==_.length&&(D=e(D,_)),0!==A.length&&(D=e(D,A)),0!==q.length&&(D=e(D,q)),0!==E.length&&(j=e(j,E)),0!==B.length&&(j=e(j,B)),0!==M.length&&(j=e(j,M)),0!==G.length&&(j=e(j,G)),0!==w.length&&(K=e(K,w)),0!==O.length&&(K=e(K,O)),0!==R.length&&(K=e(K,R)),0!==z.length&&(K=e(K,z)),0!==I.length&&(Y=e(Y,I)),0!==C.length&&(Y=e(Y,C)),0!==S.length&&(Y=e(Y,S)),0!==F.length&&(Y=e(Y,F));var J=[],U=[],W=[],X=[];document.getElementById("cb_fund").checked||(fundLink.filter(function(e,t){"hidden"===fundLink[0][t].style.visibility&&J.push(t)}),console.log(J)),document.getElementById("cb_invest").checked||(investLink.filter(function(e,t){"hidden"===investLink[0][t].style.visibility&&U.push(t)}),console.log(U)),document.getElementById("cb_porucs").checked||(porucsLink.filter(function(e,t){"hidden"===porucsLink[0][t].style.visibility&&W.push(t)}),console.log(W)),document.getElementById("cb_affil").checked||(affilLink.filter(function(e,t){"hidden"===affilLink[0][t].style.visibility&&X.push(t)}),console.log(X)),d3.selectAll(".fund").style("visibility",function(e,t){return $.indexOf(t)>-1?"visible":"hidden"}),d3.selectAll(".invest").style("visibility",function(e,t){return V.indexOf(t)>-1?"visible":"hidden"}),d3.selectAll(".porucs").style("visibility",function(e,t){return Q.indexOf(t)>-1?"visible":"hidden"}),d3.selectAll(".affil").style("visibility",function(e,t){return H.indexOf(t)>-1?"visible":"hidden"}),d3.selectAll(".fund").style("visibility",function(e,t){return D.indexOf(t)>-1||J.indexOf(t)>-1?"hidden":"visible"}),d3.selectAll(".invest").style("visibility",function(e,t){return j.indexOf(t)>-1||U.indexOf(t)>-1?"hidden":"visible"}),d3.selectAll(".porucs").style("visibility",function(e,t){return K.indexOf(t)>-1||W.indexOf(t)>-1?"hidden":"visible"}),d3.selectAll(".affil").style("visibility",function(e,t){return Y.indexOf(t)>-1||X.indexOf(t)>-1?"hidden":"visible"});for(var Z=0,et=0;et<fundLink[0].length;et++)"hidden"===fundLink[0][et].style.visibility&&Z++;for(var tt=0,et=0;et<investLink[0].length;et++)"hidden"===investLink[0][et].style.visibility&&tt++;for(var nt=0,et=0;et<porucsLink[0].length;et++)"hidden"===porucsLink[0][et].style.visibility&&nt++;for(var it=0,et=0;et<affilLink[0].length;et++)"hidden"===affilLink[0][et].style.visibility&&it++;console.log("counting fund: "+Z),console.log("counting invest: "+tt),console.log("counting porucs: "+nt),console.log("counting affil: "+it),Z===fundLink[0].length&&document.getElementById("cb_fund").checked&&(document.getElementById("cb_fund").checked=!1),Z!==fundLink[0].length&&(document.getElementById("cb_fund").checked||(document.getElementById("cb_fund").checked=!0)),tt===investLink[0].length&&document.getElementById("cb_invest").checked&&(document.getElementById("cb_invest").checked=!1),tt!==investLink[0].length&&(document.getElementById("cb_invest").checked||(document.getElementById("cb_invest").checked=!0)),nt===porucsLink[0].length&&document.getElementById("cb_porucs").checked&&(document.getElementById("cb_porucs").checked=!1),nt!==porucsLink[0].length&&(document.getElementById("cb_porucs").checked||(document.getElementById("cb_porucs").checked=!0)),it===affilLink[0].length&&document.getElementById("cb_affil").checked&&(document.getElementById("cb_affil").checked=!1),it!==affilLink[0].length&&(document.getElementById("cb_affil").checked||(document.getElementById("cb_affil").checked=!0))
}),d3.selectAll("#cb_emp, #cb_numtwit").on("click",function(){document.getElementById("cb_emp").checked&&(g.attr("r",function(e){return null!==e.numemp?empScale(parseInt(e.numemp)):"7"}),y.attr("transform",function(e){return null!==e.numemp?translateSVG(0,-(empScale(parseInt(e.numemp))+2)):translateSVG(0,-(empScale(parseInt(7))+2))})),document.getElementById("cb_numtwit").checked&&(g.attr("r",function(e){return null!==e.followers?parseInt(e.followers)>1e6?"50":twitScale(parseInt(e.followers)):"7"}),y.attr("transform",function(e){return null!==e.followers?parseInt(e.followers)>1e6?translateSVG(0,-52):translateSVG(0,-(twitScale(parseInt(e.followers))+2)):translateSVG(0,-(twitScale(parseInt(7))+2))}))}),d3.select("svg").on("contextmenu",function(){d3.event.preventDefault(),d()})});