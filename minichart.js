// java script minimalist charts

colors = ["#E74C3C","#9B59B6","#5499C7","#52BE80","#F4D03F","#F4D03F"];

// data format:
function piechart(cvs, data, name=null) {
    var canvas = document.getElementById(cvs);
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    var cx = w/2;
    var cy = h/2;
    w -= 30;
    h -= 30;
    cy-= 30;
    
    var total=0;
    var pct=new Array(data.length);
    var onec=2*Math.PI;
    var r = Math.min(w,h)/2;
    ctx.font = "20px Georgia";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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
        px=cx+r*Math.cos(th)/2;
        py=cy+r*Math.sin(th)/2;
        ctx.fillText(((pct[i])*100).toFixed(0)+"%",px,py);
        st+=pct[i]*onec;
    }
    
    if(name == null) return;
    if(name.length != data.length) return;
    
    var bln=canvas.width/data.length;
    var yo = cy+r+30;
    var xo=0;
    
    for(i=0;i<data.length;i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(xo+10, yo, 25, 25);
        ctx.fillText(name[i], xo+40, yo+20);
        xo+=bln;
    }
    
}
