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

    const payable = eligibleDates.reduce(function (memo, d) {
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
        'hour': parseInt(dateArr[1].slice(0,2) + '00'),
        'date': dateArr[0]
    };
    this.timeInEvents.push(timeInObj);

    return this;
}

// Add a time out event to the employee record
function createTimeOutEvent(timeStamp) {
    let dateArr = timeStamp.split(' ')
    let timeOutObj = {
        'type':"TimeOut",
        'hour': parseInt(dateArr[1].slice(0,2) + '00'),
        'date': dateArr[0]
    };
    this.timeOutEvents.push(timeOutObj);

    return this;
}

// Calculate the number of hours worked on a date
function hoursWorkedOnDate(date) {
    let hourOut, hourIn;
    let timeOutIndex = 0;
    for (const out of this.timeOutEvents) {
        if (out['date'] === date) {
            hourOut = out['hour']

            let timeInIndex = 0;
            for (const inV of this.timeInEvents) {
                if (inV['date'] === date || timeInIndex === timeOutIndex) {
                    hourIn = inV['hour']
                    break;
                }
                timeInIndex++;
            };
        
        }
        timeOutIndex++;
    };

    return (hourOut-hourIn)/100;
}
// function hoursWorkedOnDate(date) {
//     let hourOut, hourIn;
//     for (const out of this.timeOutEvents) {
//         if (out['date'] === date) {
//             hourOut = out['hour']
//         }
//     };

//     for (const inV of this.timeInEvents) {
//         if (inV['date'] === date) {
//             hourIn = inV['hour']
//         }
//     };

//     return (hourOut-hourIn)/100;
// }

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
