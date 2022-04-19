var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    xMax = win.innerWidth || docElem.clientWidth || body.clientWidth,
    yMax = win.innerHeight|| docElem.clientHeight|| body.clientHeight;

    var TxtRotate = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };
    
    TxtRotate.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];
    
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
    
      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
    
      var that = this;
      var delta = 300 - Math.random() * 100;
    
      if (this.isDeleting) { delta /= 2; }
    
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
    
      setTimeout(function() {
        that.tick();
      }, delta);
    };
    
    window.onload = function() {
      var elements = document.getElementsByClassName('txt-rotate');
      for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #eee }";
      document.body.appendChild(css);
    };

function showOS() {
      var x = document.getElementById("kepos");
      var y = document.getElementById("site");
      if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
      } else {
        x.style.display = "none";
        y.style.display = "block";
      }
    }

var mydragg = function() {
    return {
      move: function(divid, xpos, ypos) {
        divid.style.left = xpos + 'px';
        divid.style.top = ypos + 'px';
      },
      startMoving: function(divid, container, evt) {
        var windows = document.getElementsByClassName('window');
        for (var i = 0; i < windows.length; i++) {
          if (windows[i].id != divid.id && windows[i].id != 'infobox') {
            windows[i].style.zIndex = 0;
          } else {
            windows[i].style.zIndex = 100;
          }
        }
        evt = evt || window.event;
        var posX = evt.clientX,
          posY = evt.clientY,
          //divTop = divid.style.top,
          divTop = document.defaultView.getComputedStyle(divid, null).getPropertyValue("top"),
          divLeft = document.defaultView.getComputedStyle(divid, null).getPropertyValue("left"),
          //divLeft = divid.style.left,
          eWi = parseInt(divid.style.width),
          eHe = parseInt(divid.style.height),
          cWi = parseInt(document.getElementById(container).style.width),
          cHe = parseInt(document.getElementById(container).style.height);
        document.getElementById(container).style.cursor = 'move';
        divTop = divTop.replace('px', '');
        divLeft = divLeft.replace('px', '');
        var diffX = posX - divLeft,
          diffY = posY - divTop;
        document.onmousemove = function(evt) {
          evt = evt || window.event;
          var posX = evt.clientX,
            posY = evt.clientY,
            aX = posX - diffX,
            aY = posY - diffY;
          if (aX < 0) aX = 0;
          if (aY < 0) aY = 0;
          if (aX > xMax*0.719 ) aX= xMax*0.719;
          if (aY > yMax*0.447 ) aY= yMax*0.447;
          if (aX + eWi > cWi) aX = cWi - eWi;
          if (aY + eHe > cHe) aY = cHe - eHe;
          mydragg.move(divid, aX, aY);
        }
      },
      stopMoving: function(container) {
        var a = document.createElement('script');
        document.getElementById(container).style.cursor = 'default';
        document.onmousemove = function() {}
      },
    }
  }();