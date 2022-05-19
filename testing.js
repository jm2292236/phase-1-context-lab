/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    // Eliminate duplicated dates
    // (This is important in case the person clocked in and out more than one time in the same day)
    let uniqueDates = eligibleDates.filter((date, index) => {
        return eligibleDates.indexOf(date) === index;
    });

    const payable = uniqueDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    let empObj = {
        'firstName': firstName, 
        'familyName': familyName,
        'title': title,
        'payPerHour': payPerHour,
        'timeInEvents': [],
        'timeOutEvents': []
    }
    return empObj;
}

// Creates multiple employee records
function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord);
}

// Add a time in event to the employee record
function createTimeInEvent(timeStamp) {
    let dateArr = timeStamp.split(' ')
    let timeInObj = {
        'type':"TimeIn",
        'hour': dateArr[1],
        'date': dateArr[0],
    };
    this.timeInEvents.push(timeInObj);

    return this;
}

// Add a time out event to the employee record
function createTimeOutEvent(timeStamp) {
    let dateArr = timeStamp.split(' ')
    let timeOutObj = {
        'type':"TimeOut",
        'hour': dateArr[1],
        'date': dateArr[0]
    };
    this.timeOutEvents.push(timeOutObj);

    return this;
}

// Calculate the number of hours worked on a date
function hoursWorkedOnDate(date) {
    let hourOut, hourIn;
    let timeOutIndex = 0;
    let totalHours = 0;
    for (const out of this.timeOutEvents) {
        if (out['date'] === date) {
            hourOut = out['hour']

            hourIn = this.timeInEvents[timeOutIndex].hour;        
            totalHours += (hourOut-hourIn)/100;
        }
        timeOutIndex++;
    };

    return totalHours;
}

// Calculate the total wage earned by an employee on a specific date
function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function calculatePayroll(arrEmployees) {
    const payroll = arrEmployees.reduce(function(totalEmployee, employee) {
            return totalEmployee + allWagesFor.call(employee)
        }, 0);

    return payroll;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((firstName, index, srcArray) => srcArray[index]);
}


// *********** Tests ***************
const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],    // 28 hrs   $1260  
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],    // 33 hrs   $1155
    ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]], // 21 hrs   $3150
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],  // 16 hrs   $240
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],  // 39 hrs   $4875
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]  // 6 hrs    $1800
  ]

  let employeeRecords = createEmployeeRecords(csvDataEmployees)
  employeeRecords.forEach(function (rec) {
    let timesInRecordRow = csvTimesIn.find(function (row) {
      return rec.firstName === row[0]
    })
    
    let timesOutRecordRow = csvTimesOut.find(function (row) {
        return rec.firstName === row[0]
    })

    timesInRecordRow[1].forEach(function(timeInStamp){
        createTimeInEvent.call(rec, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
      createTimeOutEvent.call(rec, timeOutStamp)
      console.log("*" + timeOutStamp.substr(0, 10) + "*");
      console.log("wagesEarnedOnDate: " + wagesEarnedOnDate.call(rec, timeOutStamp.substr(0, 10)));
    })
  }) 

  const payroll = calculatePayroll(employeeRecords)
  console.log(payroll);

  function Thor() {
    // Thor
    const thor = createEmployeeRecord(["Thor", "Odinsson", "Electrical Engineer", 45]);
    let timesInRecordRow = csvTimesIn.find(function (row) {
        return thor.firstName === row[0]
    })
    console.log(" timesInRecordRow: " + timesInRecordRow);
    
    let timesOutRecordRow = csvTimesOut.find(function (row) {
        return thor.firstName === row[0]
    })
    console.log("timesOutRecordRow: " + timesOutRecordRow);

    timesInRecordRow[1].forEach(function(timeInStamp){
        createTimeInEvent.call(thor, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
        createTimeOutEvent.call(thor, timeOutStamp)
        console.log("*" + timeOutStamp.substr(0, 10) + "*");
        console.log("wagesEarnedOnDate: " + wagesEarnedOnDate.call(thor, timeOutStamp.substr(0, 10)));
    })
    console.log("Thor: " + allWagesFor.call(thor));
}

function Loki() {
    // Thor
    const loki = createEmployeeRecord(["Loki", "Laufeysson-Odinsson", "HR Representative", 35]);
    let timesInRecordRow = csvTimesIn.find(function (row) {
        return loki.firstName === row[0]
    })
    console.log(" timesInRecordRow: " + timesInRecordRow);
    
    let timesOutRecordRow = csvTimesOut.find(function (row) {
        return loki.firstName === row[0]
    })
    console.log("timesOutRecordRow: " + timesOutRecordRow);

    timesInRecordRow[1].forEach(function(timeInStamp){
        createTimeInEvent.call(loki, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
        createTimeOutEvent.call(loki, timeOutStamp)
        console.log("*" + timeOutStamp.substr(0, 10) + "*");
        console.log("wagesEarnedOnDate: " + wagesEarnedOnDate.call(loki, timeOutStamp.substr(0, 10)));
    })
    console.log("Loki: " + allWagesFor.call(loki));
}

function Natalia() {
    // Thor
    const natalia = createEmployeeRecord(["Natalia", "Romanov", "CEO", 150]);
    let timesInRecordRow = csvTimesIn.find(function (row) {
        return natalia.firstName === row[0]
    })
    console.log(" timesInRecordRow: " + timesInRecordRow);
    
    let timesOutRecordRow = csvTimesOut.find(function (row) {
        return natalia.firstName === row[0]
    })
    console.log("timesOutRecordRow: " + timesOutRecordRow);

    timesInRecordRow[1].forEach(function(timeInStamp){
        createTimeInEvent.call(natalia, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
        createTimeOutEvent.call(natalia, timeOutStamp)
    })
    timesOutRecordRow[1].forEach(function(timeOutStamp){
        console.log("*" + timeOutStamp.substr(0, 10) + "*");
        console.log("wagesEarnedOnDate: " + wagesEarnedOnDate.call(natalia, timeOutStamp.substr(0, 10)));
    })
    console.log("Natalia: " + allWagesFor.call(natalia));
}

function Darcey() {
    // Thor
    const darcey = createEmployeeRecord(["Darcey", "Lewis", "Intern", 15]);
    let timesInRecordRow = csvTimesIn.find(function (row) {
        return darcey.firstName === row[0]
    })
    console.log(" timesInRecordRow: " + timesInRecordRow);
    
    let timesOutRecordRow = csvTimesOut.find(function (row) {
        return darcey.firstName === row[0]
    })
    console.log("timesOutRecordRow: " + timesOutRecordRow);

    timesInRecordRow[1].forEach(function(timeInStamp){
        createTimeInEvent.call(darcey, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
        createTimeOutEvent.call(darcey, timeOutStamp)
        console.log("*" + timeOutStamp.substr(0, 10) + "*");
        console.log("wagesEarnedOnDate: " + wagesEarnedOnDate.call(darcey, timeOutStamp.substr(0, 10)));
    })
    console.log("Darcey: " + allWagesFor.call(darcey));
}

function Jarvis() {
    // Thor
    const jarvis = createEmployeeRecord(["Jarvis", "Stark", "CIO", 125]);
    let timesInRecordRow = csvTimesIn.find(function (row) {
        return jarvis.firstName === row[0]
    })
    console.log(" timesInRecordRow: " + timesInRecordRow);
    
    let timesOutRecordRow = csvTimesOut.find(function (row) {
        return jarvis.firstName === row[0]
    })
    console.log("timesOutRecordRow: " + timesOutRecordRow);

    timesInRecordRow[1].forEach(function(timeInStamp){
        createTimeInEvent.call(jarvis, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
        createTimeOutEvent.call(jarvis, timeOutStamp)
        console.log("*" + timeOutStamp.substr(0, 10) + "*");
        console.log("wagesEarnedOnDate: " + wagesEarnedOnDate.call(jarvis, timeOutStamp.substr(0, 10)));
    })
    console.log("Jarvis: " + allWagesFor.call(jarvis));
}

function Anthony() {
    // Thor
    const anthony = createEmployeeRecord(["Anthony", "Stark", "Angel Investor", 300]);
    let timesInRecordRow = csvTimesIn.find(function (row) {
        return anthony.firstName === row[0]
    })
    console.log(" timesInRecordRow: " + timesInRecordRow);
    
    let timesOutRecordRow = csvTimesOut.find(function (row) {
        return anthony.firstName === row[0]
    })
    console.log("timesOutRecordRow: " + timesOutRecordRow);

    timesInRecordRow[1].forEach(function(timeInStamp){
        createTimeInEvent.call(anthony, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
        createTimeOutEvent.call(anthony, timeOutStamp)
        console.log("*" + timeOutStamp.substr(0, 10) + "*");
        console.log("wagesEarnedOnDate: " + wagesEarnedOnDate.call(anthony, timeOutStamp.substr(0, 10)));
    })
    console.log("Anthony: " + allWagesFor.call(anthony));
}

Thor();
Loki();
Natalia();
Darcey();
Jarvis();
Anthony();
