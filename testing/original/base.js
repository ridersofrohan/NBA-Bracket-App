var Tournament = function() {
    var defaults = {
        width: 3,
        color: '#BBB',
        radius: 15,
        regionSelector: '.region'
    };

    return {
        init: function(options) {
            this.options = $.extend(defaults, options);
            this.canvas = document.getElementById('canvas');
            this.ctx = this.canvas.getContext('2d');

            this.bindEvents();
            this.render();
        },

        bindEvents: function() {
            $(window).on('resize', this.render.bind(this));

            $('.team').on({
                mouseenter: function(e) {
                    $('.team-' + $(this).attr('data-team'))
                        .addClass('team-hover')
                        .css('background', $(this).css('border-left-color'));
                },
                mouseleave: function(e) {
                    $('.team-' + $(this).attr('data-team'))
                        .removeClass('team-hover')
                        .css('background', '');
                }
            });
        },

        render: function() {
            var w = $(document).width();
            var h = $(document).height();
            this.canvas.width  = w * 2; // retina
            this.canvas.height = h * 2; // retina
            this.canvas.style.width  = w + 'px';
            this.canvas.style.height = h + 'px';
            this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
            this.ctx.scale(2, 2); // retina

            var that = this;

            $(this.options.regionSelector).each(function() {
                var rightAlign = $(this).hasClass('region-right');

                $(this).find('.round').each(function(round) {
                    var $nextGames = $(this).next('.round').find('.game');
                    if (!$nextGames.length) return;

                    $(this).find('.game').each(function(i) {
                        var $winner   = $(this).find('.team-winner'),
                            $nextGame = $nextGames.eq( Math.floor(i/2) ),

                            color = $winner.length ? $winner.css('border-left-color') : that.options.color,
                            width = $winner.length ? that.options.width : 0.5,

                            calcFn = rightAlign ? that.calcLeft : that.calcRight,
                            start  = calcFn( $winner.length ? $winner : $(this) );

                        if (round == 0) {
                            // s-curve
                            var endNode = $nextGame;
                            if ($winner.length) {
                                endNode = $nextGame.find('.team-' + $winner.attr('data-team'));
                            }
                            calcFn  = rightAlign ? that.calcRight : that.calcLeft;
                            var end = calcFn(endNode);
                            var radiusAdjust = Math.min(that.options.radius, Math.abs(start.y - end.y)/2);
                            that.drawSCurve(start, end, color, width, that.options.radius, radiusAdjust);
                        } else {
                            // single curve for collapsed columns
                            var end = that.calcCenter($nextGame);
                            that.drawCurve(start, end, 'horizontal', color, width, that.options.radius);
                        }
                    }); // /game
                }); // /round
            }); // /region
        },

        // Calculate center points
        // +-----+
        // |     x
        // +-----+
        calcRight: function ($object) {
            return {
                x: $object.offset().left + $object.outerWidth(),
                y: $object.offset().top  + $object.outerHeight() / 2
            };
        },
        // +-----+
        // x     |
        // +-----+
        calcLeft: function ($object) {
            return {
                x: $object.offset().left,
                y: $object.offset().top  + $object.outerHeight() / 2
            };
        },
        // +-----+
        // |  x  |
        // +-----+
        calcCenter: function ($object) {
            return {
                x: $object.offset().left + $object.outerWidth()  / 2,
                y: $object.offset().top  + $object.outerHeight() / 2
            };
        },

        drawLine: function (start, end) {
            this.ctx.moveTo( start.x, start.y );
            this.ctx.lineTo(   end.x,   end.y );
        },

        // one curve
        drawCurve: function (start, end, orientation, color, width, radius, radius2) {
            if (!radius2) radius2 = radius;
            this.ctx.beginPath();

            if (orientation == 'horizontal') {
                var anchor = { x:   end.x, y: start.y };
            } else {
                var anchor = { x: start.x, y:   end.y };
            }

            // calculate the point a certain distance along the line
            var m1 = this.lineDistanceFromEnd(start, anchor, radius);
            var m2 = this.lineDistanceFromEnd(end,   anchor, radius2);

            this.drawLine(start, m1);
            this.ctx.bezierCurveTo(m1.x, m1.y, anchor.x, anchor.y, m2.x, m2.y);
            this.drawLine(m2, end);
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth   = width;
            this.ctx.lineCap     = 'square';
            this.ctx.stroke();
            this.ctx.closePath();
        },

        // two curves
        drawSCurve: function (start, end, color, width, radius, radius2) {
            var midpoint = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
            if (!radius2) radius2 = radius;

            this.drawCurve(start,    midpoint, 'horizontal', color, width, radius, radius2);
            this.drawCurve(midpoint, end,      'vertical',   color, width, radius2, radius);
        },

        lineDistanceFromEnd: function (start, end, d) {
            var x = end.x, y = end.y;

            if (end.x - start.x < 0) x += d; // left
            if (end.x - start.x > 0) x -= d; // right
            if (end.y - start.y < 0) y += d; // up
            if (end.y - start.y > 0) y -= d; // down

            return { x: x, y: y };
        }

    };
};

var tournament = new Tournament();
tournament.init();
