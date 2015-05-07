angular.module('image-gallery', [])

.directive('imgGallery', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            imgInfo: '=',
            galleryIndex: '@'
        },
        template:
            '<section class="img-gal-sc" data-ng-keyup="keyNav($event)" tabindex="0">' +
                '<div class="img-box">' +
                    '<img data-ng-src="{{imgInfo[galleryIndex].i}}" data-ng-hide="loadingImage">' +
                    '<div class="loader-box" data-ng-show="loadingImage">' +
                        'Loading' +
                    '</div>' +
                '</div>' +
                '<div class="title-box">' +
                    '<p class="img-title" data-ng-bind="imgInfo[galleryIndex].t"></p>' +
                '</div>' +
                '<div class="gallery-close" data-ng-click="closeGallery()">' +
                    '<i class="r-icon r-icon-cross"></i>' +
                '</div>' +
                '<div class="gal-nav nav-l" data-ng-if="enableKeyNav" data-ng-click="showPrevImg()">' +
                    '<i class="r-icon r-icon-carat-left2"></i>' +
                '</div>' +
                '<div class="gal-nav nav-r" data-ng-if="enableKeyNav" data-ng-click="showNextImg()">' +
                    '<i class="r-icon r-icon-carat-right2"></i>' +
                '</div>' +
            '</section>',
        link: function(scope, elm, attrs) {
            console.log(elm)
            elm[0].focus();
            console.log(scope);
            if (!scope.galleryIndex) {
                scope.galleryIndex = 0;
            }

            scope.$watch('galleryIndex', function(val) {
                scope.loadingImage = true;
                var currentImage = new Image();
                currentImage.src = scope.imgInfo[scope.galleryIndex].i;
                currentImage.onload = function() {
                    $timeout(function() {
                        scope.loadingImage = false;
                    });
                };
            });

            if (scope.imgInfo && scope.imgInfo.length > 1) {
                scope.enableKeyNav = true;
            }
            else {
                scope.enableKeyNav = false;
            }

            scope.closeGallery = function() {
                angular.element(elm).remove();
            };

            scope.showNextImg = function() {
                console.log('next')
                if (scope.galleryIndex === scope.imgInfo.length - 1) {
                    scope.galleryIndex = 0;
                } else {
                    scope.galleryIndex++;
                }
            };

            scope.showPrevImg = function() {
                console.log('prev')

                if (scope.galleryIndex === 0) {
                    scope.galleryIndex = scope.imgInfo.length - 1;
                } else {
                    scope.galleryIndex--;
                }
            };

            scope.keyNav = function(event) {
                if (event.keyCode === 27) {
                    scope.closeGallery();
                }

                if (scope.enableKeyNav) {
                    if (event.keyCode === 39) {
                        scope.showNextImg();
                    }
                    else if (event.keyCode === 37) {
                        scope.showPrevImg();
                    }
                }
            };
        }
    };
}]);