// class SystemLog {
//     constructor(logId, activity, timestamp) {
//         this.logId = logId;       
//         this.activity = activity;
//         this.timestamp = timestamp; 
//     }

//     printLog() {
//         console.log(`${this.timestamp}: ${this.activity}`);
//     }
// }

// // Example: store logs in an array
// let logs = [];

// // Function to add a log entry
// function addLog(activity) {
//     let logId = logs.length + 1;
//     let timestamp = new Date().toISOString(); // current date/time
//     let logEntry = new SystemLog(logId, activity, timestamp);
//     logs.push(logEntry);
//     logEntry.printLog(); // optional: print to console
// }

// function placeOrder(customerId, orderId) {
//     // code to place the order...
//     addLog(`Customer ${customerId} placed order #${orderId}`);
// }

// function addMenuItem(adminId, itemName) {
//     // code to add menu item...
//     addLog(`Admin ${adminId} added new menu item '${itemName}'`);
// }

let MAX_DAYS = 30;
function cleanOldLogs() {
    let logs = JSON.parse(localStorage.getItem("systemLogs")) || [];
    let now = Date.now();
    let limit = 1000 * 60 * 60 * 24 * MAX_DAYS;

    let filtered = logs.filter(log => {
        return now - new Date(log.timestamp).getTime() <= limit;
    });

    localStorage.setItem("systemLogs", JSON.stringify(filtered));
}

function displayLogs() {
    cleanOldLogs();

    let logs = JSON.parse(localStorage.getItem("systemLogs")) || [];

    let allBox = document.getElementById("allLogs");
    let allHTML = "";

    logs.forEach(log => {
        let entry = `
            <div class="logEntry  "adminLog" : "userLog"}">
                <div class="timestamp">${log.timestamp}</div>
                <div>${log.activity}</div>
            </div>
        `;

        allHTML += entry;
    });

    allBox.innerHTML = allHTML || "<p>No logs.</p>";
}

setInterval(displayLogs, 3000);
window.addEventListener("load", displayLogs);