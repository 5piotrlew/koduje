(function () {
    'use strict';

    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointY,
        grabPointX,
        createNote,
        addNoteBtnEl,
        init,
        testLocalStorage,
        saveNote,
        deleteNote;


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

    createNote = function () {
        var stickerEl = document.createElement('div'),
            barEl = document.createElement('div'),
            textareaEl = document.createElement('textarea');

        var transformCSSValue = "translateX(" + Math.random() * 400 + "px) translateY(" + Math.random() * 400 + "px)";

        stickerEl.style.transform = transformCSSValue;

        barEl.classList.add('bar');
        stickerEl.classList.add('sticker');

        stickerEl.append(barEl);
        stickerEl.appendChild(textareaEl);

        stickerEl.addEventListener('mousedown', onDragStart, false);

        document.body.appendChild(stickerEl);
    };

    testLocalStorage = function () {
        var foo = 'foo';
        try {
            localStorage.setItem(foo, foo);
            localStorage.removeItem(foo);
            return true;
        } catch (e) {
            return false;
        }
    };

    init = function () {

        if (!testLocalStorage()) {
            var message = "We are sorry but you cannot use localStorage";

        } else {
            saveNote = function (note) {
                //tutaj zapiszemy nasza notatke  
            };

            deleteNote = function (note) {
                //tutaj usuniemy konkretna notatke
            };

            loadNotes = function () {
                // tutaj zaladujemy wszystkie notatki
            };
            loadNotes();
        }

        addNoteBtnEl = document.querySelector('.addNoteBtn');
        addNoteBtnEl.addEventListener('click', createNote, false);
        document.addEventListener('mousemove', onDrag, false);
        document.addEventListener('mouseup', onDragEnd, false);
    };

    init();


})();