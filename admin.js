//nobody touch this i was abt to pull my hair out doing this
let MAX_DAYS = 30; //max amount of days the logs are kept in
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
            <div class="logEntry">
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