// Your code here

function createEmployeeRecord(arrayEmployee){
    const [firstName, familyName, title, payPerHour] = arrayEmployee;
    return{
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}
function createEmployeeRecords(employeeData){
    return employeeData.map(arrayEmployee => createEmployeeRecord(arrayEmployee) )
}
const employeeDataArray = [
    ['Patrick', 'Kipkoech', 'Software Engineer', 5],
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
];

const employeeRecords = createEmployeeRecords(employeeDataArray);
//console.log(employeeRecords);

function createTimeInEvent(employeeRecord,dateTime){
    const [date,hour] = dateTime.split(" ")

    const timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(hour,10),
        date: date
    }
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}
const updateInRecord = createTimeInEvent(employeeRecords[0], "2024-10-09 0900")
//console.log(updateInRecord)

function createTimeOutEvent(employeeRecord, dateTime){
    const [date,hour] = dateTime.split(" ")

    const timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(hour,10),
        date: date
    }
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}
const updateOutRecord = createTimeOutEvent(employeeRecords[0], "2024-10-09 1700")
//console.log(updateOutRecord)

function hoursWorkedOnDate(employeeRecord, date){
    const timeIn = employeeRecord.timeInEvents.find(event =>event.date ===date);
    const timeOut = employeeRecord.timeOutEvents.find(event =>event.date ===date);

    // if (!timeIn || !timeOut){
    //     console.error('Mising timeIn or timeOut for date:',date);
    //     return 0;
    // }

    const hoursWorked = (timeOut.hour - timeIn.hour)/100;

    return hoursWorked;
}
const employeeHoursWorked = hoursWorkedOnDate(employeeRecords[0], '2024-10-09');
//console.log(employeeHoursWorked);

function wagesEarnedOnDate(employeeRecord, date){
    const hourworked =hoursWorkedOnDate(employeeRecord, date)
    const wages = hourworked * employeeRecord.payPerHour;
    return wages
}
const myWage = wagesEarnedOnDate(employeeRecords[0],'2024-10-09') 
//console.log(myWage);

function allWagesFor(employeeRecord){
    const datesWorked = employeeRecord.timeInEvents.map(event =>event.date);
    const totalWages = datesWorked.reduce((total,date) =>{
        return total + wagesEarnedOnDate(employeeRecord, date)
    },0);
    return totalWages;
}
createTimeInEvent(employeeRecords[0], '2024-10-09 0900')
createTimeOutEvent(employeeRecords[0], '2024-10-09 0900')
createTimeInEvent(employeeRecords[0], '2024-10-09 1000')
createTimeOutEvent(employeeRecords[0], '2024-10-09 1900')

const totalForWage = allWagesFor(employeeRecords[0]);
//console.log(totalForWage)

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((totalPayroll,employeeRecord) => {
        return totalPayroll + allWagesFor(employeeRecord)
    },0);
}
createTimeInEvent(employeeRecords[0], '2024-10-09 0900');
createTimeOutEvent(employeeRecords[0], '2024-10-09 1700');

createTimeInEvent(employeeRecords[1], '2024-10-09 0900');
createTimeOutEvent(employeeRecords[1], '2024-10-09 1700');

createTimeInEvent(employeeRecords[2], '2024-10-09 0900');
createTimeOutEvent(employeeRecords[2], '2024-10-09 1700');

const totalPayRoll = calculatePayroll(employeeRecords);
console.log("The total payroll is: ",totalPayRoll);

