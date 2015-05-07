angular.module('image-gallery', [])

.directive('imgGallery', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            imgData: '=',
            galleryIndex: '@'
        },
        template:
            '<section class="img-gal-sc" data-ng-keyup="keyNav($event)" tabindex="0">' +
                '<div class="img-box">' +
                    '<img data-ng-src="{{imgData[galleryIndex].i}}" data-ng-hide="loadingImage">' +
                    '<div class="loader-box" data-ng-show="loadingImage">' +
                        'Loading' +
                    '</div>' +
                '</div>' +
                '<div class="title-box">' +
                    '<p class="img-title" data-ng-bind="imgData[galleryIndex].t"></p>' +
                '</div>' +
                '<div class="gallery-close" data-ng-click="closeGallery()">' +
                    '<i class="r-icon r-icon-cross"></i>' +
                '</div>' +
                '<div class="gal-nav nav-l" data-ng-if="enableNav" data-ng-click="showPrev()">' +
                    '<i class="r-icon r-icon-carat-left2"></i>' +
                '</div>' +
                '<div class="gal-nav nav-r" data-ng-if="enableNav" data-ng-click="showNext()">' +
                    '<i class="r-icon r-icon-carat-right2"></i>' +
                '</div>' +
            '</section>',
        link: function(scope, elm, attrs) {
            elm.focus();
            if (!scope.galleryIndex) {
                scope.galleryIndex = 0;
            }

            scope.$watch('galleryIndex', function(val) {
                scope.loadingImage = true;
                var currentImage = new Image();
                currentImage.src = scope.imgData[scope.galleryIndex].i;
                currentImage.onload = function() {
                    $timeout(function() {
                        scope.loadingImage = false;
                    });
                };
            });

            if (scope.imgData && scope.imgData.length > 1) {
                scope.enableNav = true;
            }
            else {
                scope.enableNav = false;
            }

            scope.closeGallery = function() {
                angular.element(elm).remove();
            };

            scope.showNext = function() {
                if (scope.galleryIndex === scope.imgData.length - 1) {
                    scope.galleryIndex = 0;
                } else {
                    scope.galleryIndex++;
                }
            };

            scope.showPrev = function() {
                if (scope.galleryIndex === 0) {
                    scope.galleryIndex = scope.imgData.length - 1;
                } else {
                    scope.galleryIndex--;
                }
            };

            scope.keyNav = function(event) {
                if (event.keyCode === 27) {
                    scope.closeGallery();
                }

                if (scope.enableNav) {
                    if (event.keyCode === 39) {
                        scope.showNext();
                    }
                    else if (event.keyCode === 37) {
                        scope.showPrev();
                    }
                }
            };
        }
    };
}]);