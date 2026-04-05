window.addEventListener("load", function() {
    const hiddenEmail = this.document.getElementById("email");
    const email  = hiddenEmail.value;
    const levels = [1, 2, 3];
    let boards   = [];
    for (const level of levels) {
        boards.push(this.document.getElementById(level));
    }

    function getRecords(level) {
        let url = "retrieve_records.php?email=" + email + "&level=" + level;
        fetch(url)
            .then(response => response.json())
            .then(success)
            .catch(error => {
                console.log(error);
            });
    }

    function success(data) {
        (boards[data[0]["level"] - 1]).innerHTML = "<thead><tr><th>User</th><th>Record</th><th>Time</th></tr></thead><tbody>";
        if (data !== null && data != false) {
            // console.log(data);
            for (const datum of data) {
                // console.log(datum["level"])
                (boards[datum["level"] - 1]).innerHTML += "<tr><td>" + datum["email"] + "</td><td>" + datum["record"] + "</td><td>" + datum["time"] + "s</td></tr>";
            }
        }
        (boards[data[0]["level"] - 1]).innerHTML += "</tbody>";
    }

    for (const level of levels) {
        boards[level-1].innerHTML = "<p>LOADING</p><p>LOADING</p><p>LOADING</p>";
        getRecords(level);
    }
});
