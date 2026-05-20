$(document).ready(function() {
    $('.menu a').each(function(index, elemento){
        $(this).css({
            'top':'-200px'
        });

        $(this).animate({
            top:'0'
        }, 2000 + (index*500)); 
         
    });
    //Efecto Header
    if($(window).width() > 800){
        //Si la ventana es mayor a 800px
        $('header .contTexto').css({
            opacity:0, //El texto este oculto
            marginTop: 0
        });

        $('header .contTexto').animate({
            opacity: 1,
            marginTop: '-52px'
        }, 1500); //Tardar 1.5 segundos
    }
    //Scroll Elementos Menu
    var getOffsetTop = function(selector) {
        var elemento = $(selector);
        return elemento.length ? elemento.offset().top : 0;
    };

    $('#btn-acerca-de').on('click', function(e){
        e.preventDefault(); //retira el enlace por defecto
        $('html, body').animate({
            scrollTop: getOffsetTop('#acerca-de') //Envia a esta posición
        }, 500); //tarda medio segundo
    });

    $('#btn-fotos').on('click', function(e){
        e.preventDefault(); //retira el enlace por defecto
        $('html, body').animate({
            scrollTop: getOffsetTop('#fotos') //Envia a esta posición
        }, 500); //tarda medio segundo
    });

    $('#btn-ubicacion').on('click', function(e){
        e.preventDefault(); //retira el enlace por defecto
        $('html, body').animate({
            scrollTop: getOffsetTop('#ubicacion') //Envia a esta posición
        }, 500); //tarda medio segundo
    });

    // Lightbox: al hacer clic en una imagen de la galería mostrarla a tamaño real y dimensiones
    $('.cont-fotos').on('click', '.numb img', function(e){
        var src = $(this).attr('src');
        var alt = $(this).attr('alt') || '';
        var $lightbox = $('#lightbox');
        var $img = $lightbox.find('.lightbox__img');
        var $dims = $lightbox.find('.lightbox__dims');

        $img.css('visibility','hidden').attr('src', src).attr('alt', alt);
        $dims.text('Cargando...');
        $lightbox.addClass('open').attr('aria-hidden','false');

        $img.off('load').on('load', function(){
            var w = this.naturalWidth || 0;
            var h = this.naturalHeight || 0;
            $dims.text(w + ' x ' + h + ' px');
            $img.css('visibility','visible');
        });
    });

    // Cerrar lightbox al hacer clic en overlay o botón cerrar
    $('#lightbox .lightbox__overlay, #lightbox .lightbox__close').on('click', function(){
        var $lightbox = $('#lightbox');
        $lightbox.removeClass('open').attr('aria-hidden','true');
        $lightbox.find('.lightbox__img').attr('src','').attr('alt','');
        $lightbox.find('.lightbox__dims').text('');
    });

    // Evitar que clics dentro del contenido cierren el modal
    $('#lightbox .lightbox__content').on('click', function(e){
        e.stopPropagation();
    });

    // Cerrar con tecla Escape
    $(document).on('keydown', function(e){
        if(e.key === 'Escape'){
            var $lightbox = $('#lightbox');
            if($lightbox.hasClass('open')){
                $lightbox.removeClass('open').attr('aria-hidden','true');
                $lightbox.find('.lightbox__img').attr('src','').attr('alt','');
                $lightbox.find('.lightbox__dims').text('');
            }
        }
    });

});