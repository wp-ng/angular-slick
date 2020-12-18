(function (angular) {
  'use strict';

  angular.module('slick', []).directive('slick', [
    '$timeout',
    '$compile',
    '$log',
    function ($timeout, $compile, $log) {
      return {
        restrict: 'AEC',
        scope: {
          initOnload: '@',
          data: '=',
          currentIndex: '=',
          accessibility: '@',
          adaptiveHeight: '@',
          arrows: '@',
          asNavFor: '@',
          appendArrows: '@',
          appendDots: '@',
          autoplay: '@',
          autoplaySpeed: '@',
          centerMode: '@',
          centerPadding: '@',
          cssEase: '@',
          customPaging: '&',
          customPagingScope: '=',
          dots: '@',
          draggable: '@',
          easing: '@',
          fade: '@',
          focusOnSelect: '@',
          infinite: '@',
          initialSlide: '@',
          lazyLoad: '@',
          onBeforeChange: '&',
          onAfterChange: '&',
          onInit: '&',
          onReInit: '&',
          onSetPosition: '&',
          pauseOnHover: '@',
          responsive: '=',
          rtl: '@',
          rows: '@',
          slide: '@',
          slidesPerRow: '@',
          slidesToShow: '@',
          slidesToScroll: '@',
          speed: '@',
          swipe: '@',
          swipeToSlide: '@',
          touchMove: '@',
          touchThreshold: '@',
          useCSS: '@',
          variableWidth: '@',
          vertical: '@',
          dotsClass: '@',
          edgeFriction: '@',
          mobileFirst: '@',
          pauseOnFocus: '@',
          pauseOnDotsHover: '@',
          respondTo: '@',
          useTransform: '@',
          verticalSwiping: '@',
          waitForAnimate: '@',
          zIndex: '@',
          prevArrow: '@',
          nextArrow: '@'
        },
        link: function (scope, element, attrs) {

          var destroySlick, initializeSlick, isInitialized;

          destroySlick = function () {

            return $timeout(function () {

              var slider;

              slider = angular.element(element);

              slider.slick('unslick');

              slider.find('.slick-list').remove();

              return slider;
            });
          };
          initializeSlick = function () {

            return $timeout(function () {

              var currentIndex, customPaging, slider;

              slider = angular.element(element);

              if (scope.currentIndex) {

                currentIndex = scope.currentIndex;
              }

              customPaging = function (slick, index) {

                var customPagingScope;

                customPagingScope = scope.customPagingScope || scope;

                return $compile(scope.customPaging({

                  slick: slick,
                  index: index
                }))(customPagingScope);
              };

              slider.on('init', function (evt, sl) {

                if (attrs.onInit) {

                  scope.onInit();
                }

                //Compile Cloned Slide
                var $clonedSlides = angular.element(evt.currentTarget).find('.slick-cloned');
                if ($clonedSlides.length > 0) {
                  angular.forEach($clonedSlides, function(slide, index) {
                    var $slide = angular.element(slide);
                    var $scope = $slide.scope();

                    $slide.find('[ng-transclude]').removeAttr('ng-transclude');
                    $slide.find('[data-ng-transclude]').removeAttr('data-ng-transclude');

                    var $cloneInner = $compile($slide.html())($scope);

                    $slide.empty().append($cloneInner);
                  });
                }

                if (currentIndex) {

                  return sl.slideHandler(currentIndex);
                }
              });

              slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {

                if (scope.onBeforeChange) {

                  scope.onBeforeChange({
                    event: event,
                    slick: slick,
                    currentSlide: currentSlide,
                    nextSlide: nextSlide
                  });
                }

                if (currentIndex) {

                  currentIndex = currentSlide;
                  scope.currentIndex = currentSlide;

                  return scope.currentIndex;
                }
              });

              slider.on('afterChange', function (event, slick, currentSlide, nextSlide) {

                if (scope.onAfterChange) {

                  scope.onAfterChange({
                    event: event,
                    slick: slick,
                    currentSlide: currentSlide,
                    nextSlide: nextSlide
                  });
                }

                if (currentIndex) {

                  return scope.$apply(function () {

                    currentIndex = currentSlide;

                    scope.currentIndex = currentSlide;

                    return scope.currentIndex;
                  });
                }
              });

              slider.slick({
                accessibility: scope.accessibility !== 'false',
                adaptiveHeight: scope.adaptiveHeight === 'true',
                arrows: scope.arrows !== 'false',
                asNavFor: scope.asNavFor ? scope.asNavFor : void 0,
                appendArrows: scope.appendArrows ? angular.element(scope.appendArrows) : angular.element(element),
                appendDots: scope.appendDots ? angular.element(scope.appendDots) : angular.element(element),
                autoplay: scope.autoplay === 'true',
                autoplaySpeed: scope.autoplaySpeed ? parseInt(scope.autoplaySpeed, 10) : 3000,
                centerMode: scope.centerMode === 'true',
                centerPadding: scope.centerPadding || '50px',
                cssEase: scope.cssEase || 'ease',
                customPaging: attrs.customPaging ? customPaging : void 0,
                dots: scope.dots === 'true',
                dotsClass: scope.dotsClass || 'slick-dots',
                draggable: scope.draggable !== 'false',
                fade: scope.fade === 'true',
                focusOnSelect: scope.focusOnSelect === 'true',
                easing: scope.easing || 'linear',
                edgeFriction: scope.edgeFriction ? parseFloat(scope.edgeFriction) : 0.35,
                infinite: scope.infinite !== 'false',
                initialSlide: scope.initialSlide || 0,
                lazyLoad: scope.lazyLoad || 'ondemand',
                beforeChange: attrs.onBeforeChange ? scope.onBeforeChange : void 0,
                onReInit: attrs.onReInit ? scope.onReInit : void 0,
                onSetPosition: attrs.onSetPosition ? scope.onSetPosition : void 0,
                mobileFirst: scope.mobileFirst === 'true',
                pauseOnHover: scope.pauseOnHover !== 'false',
                pauseOnFocus: scope.pauseOnFocus !== 'false',
                pauseOnDotsHover: scope.pauseOnDotsHover === 'true',
                respondTo: scope.respondTo || 'window',
                responsive: scope.responsive || void 0,
                rtl: scope.rtl === 'true',
                slide: scope.slide || '',
                rows: scope.rows ? parseInt(scope.rows, 10) : (scope.slide === 'div' || scope.slide === '' ? 1 : 0), //Set rows 0 if slide is not empty string or div tag.
                slidesPerRow: scope.slidesPerRow ? parseInt(scope.slidesPerRow, 10) : 1,
                slidesToShow: scope.slidesToShow ? parseInt(scope.slidesToShow, 10) : 1,
                slidesToScroll: scope.slidesToScroll ? parseInt(scope.slidesToScroll, 10) : 1,
                speed: scope.speed ? parseInt(scope.speed, 10) : 300,
                swipe: scope.swipe !== 'false',
                swipeToSlide: scope.swipeToSlide === 'true',
                touchMove: scope.touchMove !== 'false',
                touchThreshold: scope.touchThreshold ? parseInt(scope.touchThreshold, 10) : 5,
                useCSS: scope.useCSS !== 'false',
                useTransform: scope.useTransform !== 'false',
                variableWidth: scope.variableWidth === 'true',
                vertical: scope.vertical === 'true',
                verticalSwiping: scope.verticalSwiping === 'true',
                prevArrow: scope.prevArrow ? angular.element(scope.prevArrow) : void 0,
                nextArrow: scope.nextArrow ? angular.element(scope.nextArrow) : void 0,
                waitForAnimate: scope.waitForAnimate !== 'false',
                zIndex: scope.zIndex ? parseInt(scope.zIndex, 10) : 1000
              });

              return scope.$watch('currentIndex', function (newVal, oldVal) {

                if (currentIndex && newVal && newVal !== currentIndex) {

                  return slider.slick('slickGoTo', newVal);
                }
              });
            });
          };

          if (scope.initOnload) {

            isInitialized = false;

            return scope.$watch('data', function (newVal, oldVal) {

              if (newVal) {

                if (isInitialized) {

                  destroySlick();
                }

                initializeSlick();

                isInitialized = true;

                return isInitialized;
              }
            });
          }
          else {

            return initializeSlick();
          }
        }
      };
    }
  ]);

})(angular);
