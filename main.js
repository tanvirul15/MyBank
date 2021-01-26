//UI Class----------

class UI {
    constructor() {}
    matchPassword() {
        //UI Input Reading
        const username_input = document.getElementById("username").value;
        const password_input = document.getElementById("password").value;
        return (username_input == "example" && password_input == "example");
    }

    showDashboard() {
        document.querySelector("#login-area").style.display = "none";
        document.querySelector("#diposit-area").style.display = "block";
    }

    updateDisplay(displayID, inputID, sign) {
        //Read Existing Display Value and Input Amount
        var display_element = document.getElementById(displayID);
        var display_current_value = parseFloat(display_element.innerText);
        var input_amount = parseFloat(document.getElementById(inputID).value);
        var total_balance_element = document.getElementById("balance-display");
        var existing_total = parseFloat(total_balance_element.innerText);

        //Validation if string or empty input
        if (isNaN(input_amount)) {
            alert("Enter a valid input.");
            return;
        }
        //validate if User want to withdraw more that balance
        if (sign == "-" && input_amount > existing_total) {
            alert("Processing failed..!! You can not withdraw more than balance");
            return;
        }

        //confirm if user want to withdraw or deposit
        if (!confirm("Are you sure to confirm the transection?")) return;

        //Update Deposit/Withdraw Display
        display_element.innerText = (display_current_value + input_amount).toFixed(2);





        // Update Total Balance..
        input_amount = parseFloat(sign + input_amount);
        total_balance_element.innerText = (existing_total + input_amount).toFixed(2);

        //Clearing input
        document.getElementById(inputID).value = null;
    }
}

//Event Listener for Log In
document.getElementById("login").addEventListener("submit", e => {
    e.preventDefault();
    const ui = new UI();

    if (ui.matchPassword()) {
        ui.showDashboard();
    } else {
        alert("Username or Password Wrong..")
    }
});

//Event Listener for Deposit
document.getElementById("deposite").addEventListener("submit", e => {
    e.preventDefault();
    const ui = new UI();
    ui.updateDisplay("deposit-display", "deposit-amount", "+");
});


//Event Listener for Withdraw
document.getElementById("withdraw").addEventListener("submit", e => {
    //withdraw-amount
    e.preventDefault();
    const ui = new UI();
    ui.updateDisplay("withdraw-display", "withdraw-amount", "-");
});