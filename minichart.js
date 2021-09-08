// java script minimalist charts

colors = ["#E74C3C","#9B59B6","#5499C7","#52BE80","#F4D03F","#F4D03F"];

// data format:
function piechart(cvs, data, name=null, vertical=false) {
    var canvas = document.getElementById(cvs);
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    var r = w/2 -30;
    var cx = w/2;
    var cy = r+30;
    w -= 30;
    h -= 30;
    
    var total=0;
    var pct=new Array(data.length);
    var onec=2*Math.PI;
    ctx.font = "20px Georgia";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 10;
    ctx.shadowColor = "black";
    
    for(i=0;i<data.length;i++) total+=data[i];
    for(i=0;i<data.length;i++) pct[i]=data[i]/total;
    
    var st=0;
    for(i=0;i<data.length;i++) {
        ang=st+pct[i]*onec;
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(r*Math.cos(st)+cx,r*Math.sin(st)+cy)
        ctx.arc(cx,cy,r,st,ang);
        ctx.lineTo(cx,cy);
        ctx.fillStyle = colors[i];
        ctx.fill();
        
        ctx.fillStyle = 'yellow';
        th=(st+ang)/2;
        px=cx+(r+30)*Math.cos(th)/2-15;
        py=cy+(r+30)*Math.sin(th)/2+8;
        ctx.fillText(((pct[i])*100).toFixed(0)+"%",px,py);
        st+=pct[i]*onec;
    }
    
    // put a nice belly button
    ctx.beginPath();
    ctx.arc(cx,cy,20,0,2*Math.PI)
    ctx.fillStyle = 'white';
    ctx.fill();
    
    if(name == null) return;
    if(name.length != data.length) return;
    
    var bln=canvas.width/data.length;
    var yo = cy+r+30;
    
    if (vertical) {
        var xo=30;
        for(i=0;i<data.length;i++) {
            ctx.fillStyle = colors[i];
            ctx.fillRect(xo+10, yo, 25, 25);
            ctx.fillText(name[i], xo+40, yo+20);
            yo+=30;
        }
    } else {
        var xo=0;
        for(i=0;i<data.length;i++) {
            ctx.fillStyle = colors[i];
            ctx.fillRect(xo+10, yo, 25, 25);
            ctx.fillText(name[i], xo+40, yo+20);
            xo+=bln;
        }
    }
}

function barchart(cvs, data, name=null, vertical=false, barh=30) {
    var canvas = document.getElementById(cvs);
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    ofx= 10;
    ofy= 10;
    
    w -= ofx*2;
    h -= ofy*2;
    
    var total=0;
    var pct=new Array(data.length);
    ctx.font = "20px Georgia";
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.shadowBlur = 10;
    ctx.shadowColor = "black";
    
    for(i=0;i<data.length;i++) total+=data[i];
    for(i=0;i<data.length;i++) pct[i]=data[i]/total;
    
    var st=0;
    for(i=0;i<data.length;i++) {
        dis=pct[i]*w;
        ctx.beginPath();
        ctx.rect(st+ofx,ofy,dis,barh)
        ctx.fillStyle = colors[i];
        ctx.fill();
        
        if (pct[i]>0.1) {
            ctx.fillStyle = 'yellow';
            ctx.fillText(((pct[i])*100).toFixed(0)+"%",ofx+st+10,barh);
        }
        st+=pct[i]*w;
    }
    
    if(name == null) return;
    if(name.length != data.length) return;
    
    var bln=canvas.width/data.length;
    var yo = barh+2*ofy;
    var xo=ofx;
    
    if (vertical) {
        for(i=0;i<data.length;i++) {
            ctx.fillStyle = colors[i];
            ctx.fillRect(xo+10, yo, 25, 25);
            ctx.fillText(name[i], xo+40, yo+20);
            yo+=30;
        }
    } else {
        for(i=0;i<data.length;i++) {
            ctx.fillStyle = colors[i];
            ctx.fillRect(xo+10, yo, 25, 25);
            ctx.fillText(name[i], xo+40, yo+20);
            xo+=bln;
        }
    }
    
}
