angular.module('imgGalleryDemoApp', ['image-gallery'])

.controller('imgGalleryDemoCtrl', ['$scope', '$compile', function ( $scope, $compile ) {
	$scope.imgInfo = [
		{
			'i': 'https://unsplash.it/600/600',
			't': 'Dummy Caption 1'
		},

		{
			'i': 'https://unsplash.it/500/500',
			't': 'Dummy Caption 2'
		},
	];
	$scope.openImgGallery = function() {
		var elm = $compile('<div data-img-gallery data-img-info="imgInfo" data-gallery-index="0"></div>')($scope);
		angular.element(document.querySelector('body')).append(elm);
	};
}]);