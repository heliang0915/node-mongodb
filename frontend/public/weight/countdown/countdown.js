/**
 var val = $('.count-time').text();
 val = Number(val);
 countdown([val],'count-time','{d}天{h}小时{m}分钟{s}秒',function(){window.location.reload();});
**/
define(function(){
	function countdown(number,className,setDate){
		var arr=number;
		var format=setDate;
		var flag = format.indexOf('ms');
		var time = flag === -1?1000:100;
		var tex = flag===-1?'{d}天{h}小时{m}分钟{s}秒':'{d}天{h}小时{m}分钟{s}秒{ms}毫秒';
		
		$('.'+className).each(function(index,item){
			(function(index,item){
				item.timer=setInterval(function(){countTime(index,item,tex)},time);
			})(index,item)
		});
		function countTime(numIndex,obj,tex){
			if(arr[numIndex]>time){
				arr[numIndex]-=time;
				var num=arr[numIndex];//获取总毫秒数
				var day=24*60*60*1000;//获取一天的总毫秒数
				var hour=60*60*1000;//获取一小时的总毫秒数
				var min=60*1000;//获取一分钟的总毫秒数
				var sed=1000;//获取秒
				var mSed=100;//获取毫秒
				var setDay=Math.floor(num/day);//计算天
				var remainder=num%day;//计算不足一天的剩余总秒数
				var setHour=Math.floor(remainder/hour);//计算小时
				var remainder=remainder%hour;//计算不足一小时的剩余毫秒数
				var setMin=Math.floor(remainder/min);//计算分钟
				var remainder=remainder%min;//计算不足一分钟的剩余毫秒数
				var setSed=Math.floor(remainder/sed);//计算秒
				var remainder=remainder%sed;//计算不足一秒的剩余毫秒数
				var setMsed=Math.floor(remainder/mSed);//计算毫秒
				var remainder=mSed;
				if(setDay<10){
					setDay='0'+setDay;
				}
				if(setHour<10){
					setHour='0'+setHour;
				}
				if(setMin<10){
					setMin='0'+setMin;
				}
				if(setSed<10){
					setSed='0'+setSed;
				}
				if(setMsed<10){
					setMsed='0'+setMsed;
				}
				if(!format){
					var text = tex;
				}
				text=format
					.replace('{d}',setDay)
					.replace('{h}',setHour)
					.replace('{m}',setMin)
					.replace('{s}',setSed)
					.replace('{ms}',setMsed);
					$(obj).html(text);
			}else{
				clearInterval(obj.timer);
				$(obj).html(flag===-1?'00天00小时00分钟00秒':'00天00小时00分钟00秒00毫秒');
			}
			
		}
	}
	return countdown;
});