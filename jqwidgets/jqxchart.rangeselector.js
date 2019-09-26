/*
jQWidgets v3.8.2 (2015-Aug)
Copyright (c) 2011-2015 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a){a.extend(a.jqx._jqxChart.prototype,{_moduleRangeSelector:true,_renderXAxisRangeSelector:function(o,m){var q=this;q._isTouchDevice=a.jqx.mobile.isTouchDevice();var h=q.seriesGroups[o];var d=q._getXAxis(o);var k=d?d.rangeSelector:undefined;if(!q._isSelectorRefresh){var p=(k&&k.renderTo)?k.renderTo:q.host;p.find(".rangeSelector").remove()}if(!d||d.visible==false||h.type=="spider"){return false}if(!q._isGroupVisible(o)){return false}if(!k){return false}var f=h.orientation=="horizontal";if(k.renderTo){f=false}if(q.rtl){d.flip=true}var c=f?this.host.height():this.host.width();c-=4;var n=this._getXAxisStats(o,d,c);var j=d.position;if(k.renderTo&&k.position){j=k.position}if(!this._isSelectorRefresh){var l=k.renderTo;var b="<div class='rangeSelector jqx-disableselect' style='position: absolute; background-color: transparent;' onselectstart='return false;'></div>";var e=a(b).appendTo(l?l:this.host.find(".chartContainer"));if(!l){var i=this.host.coord();selectorSize=this._selectorGetSize(d);if(!f){e.css("left",i.left+1);e.css("top",i.top+m.y+(j!="top"?m.height:-selectorSize));e.css("height",selectorSize);e.css("width",c)}else{e.css("left",i.left+1+m.x+(j!="right"?-selectorSize:m.width));e.css("top",i.top);e.css("height",c);e.css("width",selectorSize);m.height=selectorSize}}else{e.css({width:l.width(),height:l.height()});m.width=l.width();m.height=l.height()}this._refreshSelector(o,d,n,e,m,f)}this._isSelectorRefresh=false;return true},_refreshSelector:function(f,e,d,A,c,b){var g={};var u=e.rangeSelector;var k=this.seriesGroups[f];for(var w in u){g[w]=u[w]}delete g.padding;var r=g.minValue;var v=g.maxValue;if(undefined==r){r=Math.min(d.min.valueOf(),d.dsRange.min.valueOf())}if(undefined==v){v=Math.max(d.max.valueOf(),d.dsRange.max.valueOf())}if(this._isDate(d.min)){r=new Date(r)}if(this._isDate(d.max)){v=new Date(v)}var l=e.position;if(u.renderTo&&u.position){l=u.position}g.dataField=e.dataField;g.rangeSelector=undefined;g.type=e.type;g.baseUnit=u.baseUnit||e.baseUnit;g.minValue=r;g.maxValue=v;g.flip=e.flip;g.position=l;var h=5;var q=2,z=2,y=2,C=2;if(!u.renderTo){q=b?0:c.x;z=b?0:this._rect.width-c.x-c.width;y=b?c.y:h;C=b?this._paddedRect.height-this._plotRect.height:h}var n=u.padding;if(n==undefined&&!u.renderTo){n={left:q,top:y,right:z,bottom:C}}else{n={left:((n&&n.left)?n.left:q),top:((n&&n.top)?n.top:y),right:((n&&n.right)?n.right:z),bottom:((n&&n.bottom)?n.bottom:C)}}var t=e.rangeSelector.dataField;for(var w=0;undefined==t&&w<this.seriesGroups.length;w++){for(var s=0;undefined==t&&s<this.seriesGroups[w].series.length;s++){t=this.seriesGroups[w].series[s].dataField}}var m={padding:n,title:u.title||"",description:u.description||"",titlePadding:u.titlePadding,colorScheme:u.colorScheme||this.colorScheme,backgroundColor:u.backgroundColor||this.backgroundColor||"transparent",backgroundImage:u.backgroundImage||"",showBorderLine:u.showBorderLine||(u.renderTo?true:false),borderLineWidth:u.borderLineWidth||this.borderLineWidth,borderLineColor:u.borderLineColor||this.borderLineColor,rtl:u.rtl||this.rtl,greyScale:u.greyScale||this.greyScale,showLegend:false,enableAnimations:false,enableEvents:false,showToolTips:false,source:this.source,xAxis:g,seriesGroups:[{orientation:b?"horizontal":"vertical",valueAxis:{visible:false},type:e.rangeSelector.serieType||"area",series:[{dataField:t,opacity:0.8,lineWidth:1}]}]};A.empty();A.jqxChart(m);var o=this;A.on(o._getEvent("mousemove"),function(){o._unselect();o._hideToolTip()});var x=A.jqxChart("getInstance");if(!x._plotRect){return}var B=x._paddedRect;B.height=x._plotRect.height;if(!b&&l=="top"){B.y+=x._renderData[0].xAxis.rect.height}else{if(b){var p=x._renderData[0].xAxis.rect.width;B.width-=p;if(l!="right"){B.x+=p}}}o._createSliderElements(f,A,B,u);o.addHandler(a(document),o._getEvent("mousemove")+"."+o.element.id,o._onSliderMouseMove,{self:this,groupIndex:f,renderTo:A,swapXY:b});o.addHandler(a(A),o._getEvent("mousedown"),o._onSliderMouseDown,{self:this,groupIndex:f,renderTo:A,swapXY:b});o.addHandler(a(A),o._getEvent("mouseup"),o._onSliderMouseUp,{self:this,groupIndex:f,renderTo:A,swapXY:b})},_createSliderElements:function(r,l,m,n){l.find(".slider").remove();var q=n.colorSelectedRange||"blue";var g=n.colorUnselectedRange||"white";var b=a("<div class='slider' style='position: absolute;'></div>");b.css({background:q,opacity:0.1,left:m.x,top:m.y,width:m.width,height:m.height});b.appendTo(l);if(!this._sliders){this._sliders=[]}while(this._sliders.length<r+1){this._sliders.push({})}var j="<div class='slider' style='position: absolute;  background: "+g+"; opacity: 0.5;'></div>";var c="<div class='slider' style='position: absolute; background: grey; opacity: 0.5;'></div>";var h="<div class='slider jqx-rc-all' style='position: absolute; background: white; border-style: solid; border-width: 1px; border-color: grey;'></div>";this._sliders[r]={element:b,host:l,fullRect:{x:b.coord().left,y:b.coord().top,width:m.width,height:m.height},rect:m,left:a(j),right:a(j),leftTop:a(c),rightTop:a(c),leftBorder:a(c),leftBar:a(h),rightBorder:a(c),rightBar:a(h)};this._sliders[r].left.appendTo(l);this._sliders[r].right.appendTo(l);this._sliders[r].leftTop.appendTo(l);this._sliders[r].rightTop.appendTo(l);this._sliders[r].leftBorder.appendTo(l);this._sliders[r].rightBorder.appendTo(l);this._sliders[r].leftBar.appendTo(l);this._sliders[r].rightBar.appendTo(l);var p=this._renderData[r].xAxis;var e=p.data.axisStats;var o=e.min.valueOf();var f=e.max.valueOf();var i=this._valueToOffset(r,o);var k=this._valueToOffset(r,f);if(i>k){var d=k;k=i;i=d}if(this.seriesGroups[r].orientation!="horizontal"){b.css({left:Math.round(m.x+i),top:m.y,width:Math.round(k-i),height:m.height})}else{b.css({top:Math.round(m.y+i),left:m.x,height:Math.round(k-i),width:m.width})}this._setSliderPositions(r,i,k)},_setSliderPositions:function(e,r,h){var t=this.seriesGroups[e];var d=this._getXAxis(e);var o=d.rangeSelector;var b=t.orientation=="horizontal";if(d.rangeSelector.renderTo){b=false}var j=d.position;if(o.renderTo&&o.position){j=o.position}var l=(b&&j=="right")||(!b&&j=="top");var n=this._sliders[e];var q=b?"top":"left";var f=b?"left":"top";var i=b?"height":"width";var p=b?"width":"height";var k=b?"y":"x";var m=b?"x":"y";var c=n.rect;n.left.css(q,c[k]);n.left.css(f,c[m]);n.left.css(i,r);n.left.css(p,c[p]);n.right.css(q,c[k]+h);n.right.css(f,c[m]);n.right.css(i,c[i]-h+1);n.right.css(p,c[p]);n.leftTop.css(q,c[k]);n.leftTop.css(f,c[m]+(((b&&j=="right")||(!b&&j!="top"))?0:c[p]));n.leftTop.css(i,r);n.leftTop.css(p,1);n.rightTop.css(q,c[k]+h);n.rightTop.css(f,c[m]+(((b&&j=="right")||(!b&&j!="top"))?0:c[p]));n.rightTop.css(i,c[i]-h+1);n.rightTop.css(p,1);n.leftBorder.css(q,c[k]+r);n.leftBorder.css(f,c[m]);n.leftBorder.css(i,1);n.leftBorder.css(p,c[p]);var s=c[p]/4;if(s>20){s=20}if(s<3){s=3}n.leftBar.css(q,c[k]+r-3);n.leftBar.css(f,c[m]+c[p]/2-s/2);n.leftBar.css(i,5);n.leftBar.css(p,s);n.rightBorder.css(q,c[k]+h);n.rightBorder.css(f,c[m]);n.rightBorder.css(i,1);n.rightBorder.css(p,c[p]);n.rightBar.css(q,c[k]+h-3);n.rightBar.css(f,c[m]+c[p]/2-s/2);n.rightBar.css(i,5);n.rightBar.css(p,s)},_resizeState:{},_onSliderMouseDown:function(d){var b=d.data.self;var c=b._sliders[d.data.groupIndex];if(!c){return}if(b._resizeState.state==undefined){b._testAndSetReadyResize(d)}if(b._resizeState.state!="ready"){return}b._resizeState.state="resizing"},_valueToOffset:function(m,k){var l=this.seriesGroups[m];var d=this._sliders[m];var c=d.host.jqxChart("getInstance");var n=c._renderData[0].xAxis;var g=n.data.axisStats;var j=g.min.valueOf();var b=g.max.valueOf();var h=b-j;if(h==0){h=1}var e=this._getXAxis(m);var f=l.orientation=="horizontal"?"height":"width";var i=(k.valueOf()-j)/h;return d.fullRect[f]*(e.flip?(1-i):i)},_offsetToValue:function(o,f){var d=this._sliders[o];var n=this.seriesGroups[o];var e=this._getXAxis(o);var g=n.orientation=="horizontal"?"height":"width";var i=d.fullRect[g];if(i==0){i=1}var j=f/i;var c=d.host.jqxChart("getInstance");var m=c._renderData[0].xAxis;var h=m.data.axisStats;var k=h.min.valueOf();var b=h.max.valueOf();var l=f/i*(b-k)+k;if(e.flip==true){l=b-f/i*(b-k)}if(this._isDate(h.min)||this._isDate(h.max)){l=new Date(l)}else{if(e.dataField==undefined){l=Math.round(l)}if(l<h.min){l=h.min}if(l>h.max){l=h.max}}return l},_onSliderMouseUp:function(o){var j=o.data.self;var f=o.data.groupIndex;var b=o.data.swapXY;var l=j._sliders[f];if(!l){return}if(j._resizeState.state!="resizing"){return}j._resizeState={};j.host.css("cursor","default");var g=!b?"left":"top";var c=!b?"width":"height";var n=!b?"x":"y";var m=l.element.coord()[g];var d=m+(!b?l.element.width():l.element.height());var h=j._offsetToValue(f,m-l.fullRect[n]);var p=j._offsetToValue(f,d-l.fullRect[n]);var i=l.host.jqxChart("getInstance");var k=i._renderData[0].xAxis;var r=k.data.axisStats;if(!r.isTimeUnit&&(p.valueOf()-h.valueOf())>86400000){h.setHours(0,0,0,0);p.setDate(p.getDate()+1);p.setHours(0,0,0,0)}var e=j._getXAxis(f);if(e.flip){var q=h;h=p;p=q}e.minValue=h;e.maxValue=p;j._isSelectorRefresh=true;var s=j.enableAnimations;j._raiseEvent("rangeSelectionChanging",{instance:j,minValue:h,maxValue:p});j.enableAnimations=false;j.update();j.enableAnimations=s;j._raiseEvent("rangeSelectionChanged",{instance:j,minValue:h,maxValue:p})},_onSliderMouseMove:function(t){var o=t.data.self;var v=t.data.renderTo;var i=t.data.groupIndex;var q=o._sliders[i];var d=t.data.swapXY;if(!q){return}var f=q.fullRect;var h=q.element;var w=a.jqx.position(t);var r=h.coord();var p=d?"left":"top";var m=!d?"left":"top";var g=d?"width":"height";var e=!d?"width":"height";var s=!d?"x":"y";if(o._resizeState.state=="resizing"){if(o._resizeState.side=="left"){var n=Math.round(w[m]-r[m]);var l=f[s];if(r[m]+n>=l&&r[m]+n<=l+f[e]){var j=parseInt(h.css(m));var c=Math.max(2,(d?h.height():h.width())-n);h.css(e,c);h.css(m,j+n)}}else{if(o._resizeState.side=="right"){var b=d?h.height():h.width();var n=Math.round(w[m]-r[m]-b);var l=f[s];if(r[m]+b+n>=l&&r[m]+n+b<=l+f[e]){var c=Math.max(2,b+n);h.css(e,c)}}else{if(o._resizeState.side=="move"){var b=d?h.height():h.width();var j=parseInt(h.css(m));var n=Math.round(w[m]-o._resizeState.startPos);if(r[m]+n>=f[s]&&r[m]+n+b<=f[s]+f[e]){o._resizeState.startPos=w[m];h.css(m,j+n)}}}}var u=parseInt(h.css(m))-q.rect[s];var k=u+(d?h.height():h.width());o._setSliderPositions(i,u,k)}else{o._testAndSetReadyResize(t)}},_testAndSetReadyResize:function(b){var q=b.data.self;var k=b.data.renderTo;var o=b.data.groupIndex;var c=q._sliders[o];var g=b.data.swapXY;var m=c.fullRect;var e=c.element;var f=a.jqx.position(b);var h=e.coord();var j=g?"left":"top";var p=!g?"left":"top";var i=g?"width":"height";var l=!g?"width":"height";var d=!g?"x":"y";var n=q._isTouchDevice?30:5;if(f[j]>=h[j]&&f[j]<=h[j]+m[i]){if(Math.abs(f[p]-h[p])<=n){k.css("cursor",g?"row-resize":"col-resize");q._resizeState={state:"ready",side:"left"}}else{if(Math.abs(f[p]-h[p]-(!g?e.width():e.height()))<=n){k.css("cursor",g?"row-resize":"col-resize");q._resizeState={state:"ready",side:"right"}}else{if(f[p]+n>h[p]&&f[p]-n<h[p]+(!g?e.width():e.height())){k.css("cursor","pointer");q._resizeState={state:"ready",side:"move",startPos:f[p]}}else{k.css("cursor","default");q._resizeState={}}}}}else{k.css("cursor","default");q._resizeState={}}},_selectorGetSize:function(b){if(b.rangeSelector.renderTo){return 0}return b.rangeSelector.size||this._paddedRect.height/3}})})(jqxBaseFramework);