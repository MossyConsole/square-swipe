window.addEventListener("load", function(event) {
    const email = this.document.getElementById("email");
    const confirm = this.document.getElementById("confirm");

    // validate email
    confirm.addEventListener("click", function(event) {
        let em = String(email.value);
        let lastChar = '';
        let passed_at = false;
        let has_prev_dot = false;

        for (const char of em) {
            if (char === '@' && !passed_at) {
                passed_at = true;
            }
            else if (passed_at && lastChar === '.') {
                has_prev_dot = true;
            }
            lastChar = char;
        }
        // Case of invalid email
        if (!has_prev_dot) {
            email.style["background-color"] = "#fdcbd4";
            event.preventDefault();
        }
    });

    email.addEventListener("input", function() {
        email.style["background-color"] = "#ffffff";
    });
});