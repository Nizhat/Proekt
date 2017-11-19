var app = angular.module("NTPApp", ['ngRoute', 'LocalStorageModule']);
app.config(function($routeProvider) {
    $routeProvider.when("/samolet", {
        templateUrl: 'templates/samolet.html',
        controller: 'samoletController'
    })

    $routeProvider.otherwise({
        redirectTo: '/'
    });
})


app.controller('samoletController', function($scope,localStorageService) {

    document.getElementById("reisList").innerHTML = localStorageService.get('key');

    $scope.dobavitSamolet = function()
    {
        if ($scope.tip_Samoleta === undefined || $scope.bortNomer_Samoleta === undefined || $scope.reis_model === undefined)
        {
            $scope.message_Samolet = "Пожалуйста, заполните все поля.";
            return;
        }

        var reisIndex;
        for (var i = 0; i < reisi.length; i++)
            if (reisi[i].getNomerReisa() === $scope.reis_model)
                reisIndex = i;
        if (reisIndex === undefined)
        {
            $scope.message_Samolet = "Рейс не найден.";
            return;
        }

        
        reisi[reisIndex].addSamolet(new Samolet($scope.tip_Samoleta, $scope.bortNomer_Samoleta));
        $scope.message_Samolet = "Самолет добавлен в рейс " + $scope.reis_model + ".";
    }

})

var reisi = [];

app.controller('AppController', function($scope,localStorageService) {
    
    $scope.addReis = function()
    {

        if ($scope.nomer_Reisa === undefined || $scope.aviaKompaniya_Reisa === undefined || $scope.kolPassazhirov_reisa === undefined)
        {
            $scope.message_Reisa = "Пожалуйста, заполните все поля.";
            return;
        }
        
        reisi.push(new Reis($scope.nomer_Reisa, $scope.aviaKompaniya_Reisa, $scope.kolPassazhirov_reisa));
        var options = "";
        for (var i = 0; i < reisi.length; i++)
            options += "<option value = " + reisi[i].getNomerReisa() + " />";
        document.getElementById("reisList").innerHTML = options;
        $scope.message_Reisa = "Рейс добавлен.";
        localStorageService.set('key', options);
    }


    $scope.print = function() {
        var groupIndex;
        for (var i = 0; i < reisi.length; i++)
            if (reisi[i].getNomerReisa() === $scope.reis_model)
                groupIndex = i;
        $scope.tipSamoleta = reisi[groupIndex].getTipSamoleta();
        $scope.bortNomer = reisi[groupIndex].getBortNomer();
        $scope.samoletCounter = reisi[groupIndex].getSamoletCounter();
        $scope.aviaKompaniya = reisi[groupIndex].getAviaKompaniya();

        var list = "";
        var samoleti = reisi[groupIndex].getSamoleti();
        for (var i = 0; i < samoleti.length; i++)
        {
            var s = samoleti[i];
            list += s.getId()+ " " + s.getTipSamoleta() + " " + s.getBortNomer() + "\n";
        }
        $scope.samoleti = list;
    }


});


Reis.idCounter = 0;
function Reis(nomer, aviaKomp, kolPas) {
	var id = ++Reis.idCounter;
	var nomerReisa = nomer;
	var aviaKompaniya = aviaKomp;
	var kolPassazhirov = kolPas;
	var samoleti = [];
	var samoletCounter = 0;


	this.getId = function()	{return id;}
	this.getNomerReisa = function() {return nomerReisa;}
	this.setNomerReisa = function(value) { nomerReisa = value;}
	this.getAviaKompaniya = function() { 	return aviaKompaniya;}
	this.setAviaKompaniya = function(value) {	aviaKompaniya = value;}
	this.getKolPassazhirov = function() { return kolPassazhirov;}
	this.setKolPassazhirov = function(value){	kolPassazhirov = value;}

	this.addSamolet = function(samolet) {
		samoleti[samoletCounter] = samolet;
		samoletCounter++;
	}

	this.getSamoletCounter = function() {
		return samoleti.length;
	}

	this.getSamoleti = function () {
        return samoleti;
    }
}

Samolet.idCounter = 0;
function Samolet(tipValue, nomerValue){
	var id = ++Samolet.idCounter;
	var tipSamoleta = tipValue;
	var bortNomer = nomerValue;

	this.getId = function () {  return id;}
	this.getTipSamoleta = function()	{	return tipSamoleta;}
	this.setTipSamoleta = function(value)	{	tipSamoleta = value; }
	this.getBortNomer = function() {	return bortNomer;}
	this.setBortNomer = function(value) {	bortNomer = value;}
}


