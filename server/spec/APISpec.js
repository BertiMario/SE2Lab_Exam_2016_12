//test of the APIs

//lib for sending requests
var request = require("request");

//set base URL
var base_url = "http://localhost:5000/";

//library for JSON requests
requestJSON = require('request-json');
var client = requestJSON.createClient(base_url);


// Test for homepage
describe("Test /", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

// Test for /showList
describe("Test /showList", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "showList/", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});
 
// Test for /searchStudent
describe("Test /searchStudent", function() {
	//set the data
	var data = {ID: '1'};
	
	//legal request
	it("to returns status code 200", function(done) {
	  client.post(base_url + "searchStudent/", data, function(err, res, body) {
		expect(body).toEqual(
			{
				ID: "1",
				SSN: "AB45", 
				name: "Mattia",
				address: "via Roma",
				mark: "5"
			}
		);

		done();
	  });
	});
	
	//student non existing
	data1 = {ID: "10" };
	it("to returns status code 406", function(done) {
	  client.post(base_url + "searchStudent/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(404);
		done();
	  });
	});
	
	//wrong parameter
	data2 = {name: "1" };
	it("to returns status code 406", function(done) {
	  client.post(base_url + "searchStudent/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});


});
////////////////////////////////////////////////////////////////////

//Test fatti da Berti Mario 172136
describe("Test /deleteStudent", function() {
	//set the data
	var data = {ID: '1'};
	
	//legal id student request
	it("to returns status code 200", function(done) {
	  client.post(base_url + "deleteStudent/", data, function(err, res, body) {
		expect(res.statusCode).toBe(200);
        expect(body).toEqual(
            {
				ID: "1",
				SSN: "AB45", 
				name: "Mattia",
				address: "via Roma",
				mark: "5"
			}
		);
		done();
	  });
	});
	
	//student id non existing
	data1 = {ID: "10" };
	it("to returns status code 404", function(done) {
	  client.post(base_url + "deleteStudent/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(404);
		done();
	  });
	});
		
	//wrong parameter
	data2 = {name: "1" };
	it("to returns status code 406", function(done) {
	  client.post(base_url + "deleteStudent/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});
    
	//legal ssn student request
	data3 = {SSN: "AB45" };
	it("to returns status code 200", function(done) {
	  client.post(base_url + "deleteStudent/", data3, function(err, res, body) {
		expect(res.statusCode).toBe(200);
        expect(body).toEqual(
        {
				ID: "1",
				SSN: "AB45", 
				name: "Mattia",
				address: "via Roma",
				mark: "5"
			}
		);
		done();
	  });
	});

 //student ssn non existing
	data4 = {SSN: "AB99" };
	it("to returns status code 404", function(done) {
	  client.post(base_url + "deleteStudent/", data4, function(err, res, body) {
		expect(res.statusCode).toBe(404);
		done();
	  });
	});
});