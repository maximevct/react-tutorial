'use strict'

/**
 * Déclaration d'un fonction contenue dans une variable
 * @return {string} Chaine de caractère contenant "toto"
 */
var toto = function () {
  return 'toto';
};
var tutu = function () { return 'TUTU'; };

/**
 * Déclaration d'un objet contenant des données de types multiples
 * @type {Object}
 */
var obj = {
  toto    : toto,
  tutu    : function () { return 'tutu'; },
  objFunc : function (callback) { callback(this.tutu) },
  tata    : 'tata'
};

/**
 * Déclaration d'une simple variable
 * @type {String}
 */
var titi = 'titi';

/**
 * Déclaration d'une fonction ordinaire
 * @param  {string}   elem     Element à afficher
 * @param  {Function} callback Fonction éxécutée après que l'élément soit affiché
 * @return {void}
 */
function main(elem, callback) {
  console.log('From main : ' + elem);
  callback(obj);
}

/**
 * Déclaration d'une closure
 * @param  {void}
 * @return {function}
 */
var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();

main(obj.tata, function (elem) {
  var tata = 'PATATA';
  console.log('From callback : ' + elem.toto);
  console.log('From callback : ' + tutu());
  obj.objFunc(function (elem) {
    console.log('From callback in object : ' + elem());
    console.log('From callback in object : ' + tata);
  });
});

add();
add();
add();

console.log('From closure : ' + add());
console.log('From closure : ' + add);
