var app = angular.module("NTPApp", ['ngRoute', 'LocalStorageModule']);
app.config(function($routeProvider) {
    $routeProvider.when("/samolet", {
        templateUrl: 'templates/samolet.html',
        controller: 'samoletController'
    })

    $routeProvider.when("/polosa", {
        templateUrl: 'templates/polosa.html',
        controller: 'polosaController'
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


app.controller('polosaController', function($scope,localStorageService) {

    document.getElementById("reisList").innerHTML = localStorageService.get('key');

    $scope.createPolosa = function()
    {
        reisi.push(new Polosa($scope.nomerPolosi));

        var options = "";
        for (var i = 0; i < reisi.length; i++)
            options += `<option value = ${reisi[i].getId()} />`;
        document.getElementById("polosaList").innerHTML = options;
        $scope.createPolosa_message = `Создана полоса - ${reisi[reisi.length - 1].getId()}`;

        localStorageService.set('key', options);
    }

})

var reisi = [];

app.controller('AppController', function($scope,localStorageService) {
    document.getElementById("polosaList").innerHTML = localStorageService.get('key');
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
        console.log(JSON.stringify(reisi[groupIndex]));
        var samoleti = reisi[groupIndex].getSamoleti();
        var samIndex;
        for(var i = 0; i < samoleti.length; i++) {
            samIndex = i;
        }
        $scope.tipSamoleta = reisi[groupIndex].samoleti[samIndex].getTipSamoleta();
        $scope.bortNomer = reisi[groupIndex].samoleti[samIndex].getBortNomer();
        $scope.samoletCounter = reisi[groupIndex].getSamoletCounter();
        $scope.aviaKompaniya = reisi[groupIndex].getAviaKompaniya();

        var list = "";
        for (var i = 0; i < samoleti.length; i++)
        {
            var s = samoleti[i];
            list += s.getId()+ " " + s.getTipSamoleta() + " " + s.getBortNomer() + "\n";
        }
        $scope.samoleti = list;

        $scope.status_type = "";
        if($scope.status_type === "Подготовка"){
            $scope.status_message = "Подготовка";
        } else if ($scope.status_type === "Полет"){
            $scope.status_message = "Полет";
        } else if ($scope.status_type === "Выполнение") {
            $scope.status_message = "Выполнение";
        }

    }


});


Reis.idCounter = 0;
function Reis(nomer, aviaKomp, kolPas) {
	this.id = ++Reis.idCounter;
    this.nomerReisa = nomer;
    this.aviaKompaniya = aviaKomp;
    this.kolPassazhirov = kolPas;
    this.samoleti = [];
    this.samoletCounter = 0;


	this.getId = function()	{return this.id;}
	this.getNomerReisa = function() {return this.nomerReisa;}
	this.setNomerReisa = function(value) { this.nomerReisa = value;}
	this.getAviaKompaniya = function() { 	return this.aviaKompaniya;}
	this.setAviaKompaniya = function(value) {	this.aviaKompaniya = value;}
	this.getKolPassazhirov = function() { return this.kolPassazhirov;}
	this.setKolPassazhirov = function(value){	this.kolPassazhirov = value;}

	this.addSamolet = function(samolet) {
		this.samoleti[this.samoletCounter] = samolet;
		this.samoletCounter++;
	}

	this.getSamoletCounter = function() {
		return this.samoleti.length;
	}

	this.getSamoleti = function () {
        return this.samoleti;
    }

}

Samolet.idCounter = 0;
function Samolet(tipValue, nomerValue){
	this.id = ++Samolet.idCounter;
	this.tipSamoleta = tipValue;
	this.bortNomer = nomerValue;
	this.getId = function () {  return this.id;}
	this.getTipSamoleta = function()	{	return this.tipSamoleta;}
	this.setTipSamoleta = function(value)	{	this.tipSamoleta = value; }
	this.getBortNomer = function() {	return this.bortNomer;}
	this.setBortNomer = function(value) {	this.bortNomer = value;}
}

Polosa.idCounter = 0;
function Polosa(nomerVal) {
    this.id = ++Polosa.idCounter;
    this.nomerPolosi = nomerVal;
    this.svoboden = new Boolean(true);

    if(this.svoboden) {
        console.log("Сваободен");
    }
    else {
        console.log("Занят");
    }


    this.getId = function () {    return this.id;}
    this.getNomerPolisi = function() {  return this.nomerPolosi;}
    this.setNomerPolosi = function(value) {     this.nomerPolosi = value; }
}

