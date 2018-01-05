(function () {
    'use strict';

    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointY,
        grabPointX;
        

    onDragStart = function (ev) {
        var boundingClientRect;
        /* ev.targert element ktory bedziemy przeciagac, sprawdzamy czy posiada klase bar ===-1 czyli jezeli nie bedzie posiadal tej klasy to cos zrobimy*/
        if (ev.target.className.indexOf('bar') === -1) {
            return;
        }
        
        draggedEl = this;
        
        boundingClientRect = draggedEl.getBoundingClientRect();
        
        grabPointY = boundingClientRect.top - ev.clientY;
        grabPointX = boundingClientRect.left - ev.clientX;
    };
    
    onDrag = function (ev) {
        if (!draggedEl) {
            return;
        }
        
        var posX = ev.clientX + grabPointX,
            posY = ev.clientY + grabPointY;
        
        if (posX < 0) {
            posX = 0;
        }
        
        if (posY < 0) {
            posY = 0;
        }
        
        draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
    };
    
    onDragEnd = function () {
      draggedEl = null;
        grabPointX = null;
        grabPointY = null;
    };
    
    document.addEventListener('mousemove', onDrag, false);
    document.addEventListener('mouseup', onDragEnd, false);
    document.querySelector('.sticker').addEventListener('mousedown', onDragStart, false);
})();