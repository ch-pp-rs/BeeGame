'use strict';

angular.module('beeGame', ['ngAnimate']).controller('BeeController', function ($scope, $timeout) {
  var queenBee = {
    life: 100,
    hitPoints: 8,
    quantity: 1,
    type: 'queen',
    id: 'queen1'
  }, children = [
    {
      life: 75,
      hitPoints: 10,
      quantity: 5,
      type: 'worker'
    }, {
      life: 50,
      hitPoints: 12,
      quantity: 8,
      type: 'drone'
    }
  ];

  $scope.setupGame = function () {
    $scope.enemies = [];
    $scope.enemies.push(queenBee);

    angular.forEach(children, function (childBee) {
      for (var i = 0; i < childBee.quantity; i += 1) {
        childBee.id = childBee.type + parseInt(i);
        $scope.enemies.push(angular.copy(childBee));
      }
    });

    $scope.gameOver = false;
  };

  $scope.shootRandomEnemy = function () {
    var hitIndex = Math.floor((Math.random() * $scope.enemies.length) + 1) - 1;

    $scope.enemies[hitIndex].life = $scope.enemies[hitIndex].life - $scope.enemies[hitIndex].hitPoints;

    $scope.enemies[hitIndex].isHit = true;
    $timeout(function () {
      if ($scope.enemies[hitIndex].isHit == true) {
        $scope.enemies[hitIndex].isHit = false;
      }
    }, 3000);

    if ($scope.enemies[hitIndex].life <= 0) {
      $scope.enemies.splice(hitIndex, 1);
    }

    if ($scope.enemies.length === 0 || $scope.enemies[0].type !== 'queen') {
      $scope.enemies = [];
      $scope.gameOver = true;
    }
  };

  $scope.setupGame();
});
