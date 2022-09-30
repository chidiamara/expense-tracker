// # Classes

class Budget {
    constructor(budget) {
        this.budget = Number( budget );
        this.balance = this.budget;
    }

    // note: Subtract from the budgeted expense
    subBudgetedExp(amt) {
        return this.balance -= amt;
    }

}

// note: Everything related to html
class HTML{
    // note: Inserts the budget when the user submits it
    insertBudget(amount) {
        // note: Insert into HTML
        totalBudget.innerHTML = `${amount}`;
        budgetBal.innerHTML = `${amount}`;

    }

    // Displays a message to fill all the fields
    printMsg(msg, className) {
        const msgWrapper = document.createElement('div');
        msgWrapper.classList.add(className)
        const tNode = document.createTextNode(msg)
        msgWrapper.appendChild(tNode);

        // note: Insert into HTML
        document.querySelector('.first').insertBefore(msgWrapper, addExpenseForm);
        // note: Clear Error message
        setTimeout(() => {
            document.querySelector('.success-alert').remove();
            // addExpenseForm.reset(); // ? reset on incomplete field filling
        }, 2000);
        setTimeout(() => {
            document.querySelector('.danger-alert').remove();
        }, 2000);

    }

    // note: Displays the exp from the form into the exp added list
    addExpToList(name, amt){
        const expList = document.querySelector('#expenses ul');

        // note: Create an li
        const li = document.createElement('li');
        li.className = 'li-style';
        // note: Template Creation
        li.innerHTML = `
            <span class="name">${name}</span>
            <span class="bdge">₦${amt}</span>
        `;

        // note: Insert into the HTML
        expList.appendChild(li);
    }

    // note: Subtract expense amount from budgeted expense
    expTracker(amt){
        const balanceNaira = budget.subBudgetedExp(amt);
        budgetBal.innerHTML = `${balanceNaira}`;

        // note: Dictate when 25% is spent
        if ((budget.budget / 4) > balanceNaira ){
            budgetBal.parentElement.parentElement.classList.remove('num-display', 'num-warning');
            budgetBal.parentElement.parentElement.classList.add('num-danger');

        // note: Dictate when 50% is spent
        } else if((budget.budget / 2) > balanceNaira ) {
            budgetBal.parentElement.parentElement.classList.remove('num-display');
            budgetBal.parentElement.parentElement.classList.add('num-warning');

        }
        // else if((budget.budget / budget.budget * 0) > balanceNaira ) {
        //         addBtn.disabled = true;

        //     }
        }


}



// # Variables
const addExpenseForm = document.querySelector('#add-expense'),
      totalBudget = document.querySelector('span#total'),
      budgetBal = document.querySelector('span#balance');

let budget, userBudget;

let addBtn = document.querySelector('#addBtn');


// note: Instantiate the HTML class
const html = new HTML();

// # Event Listeners
listenEvent();

function listenEvent() {

    // note: App Init
    document.addEventListener('DOMContentLoaded', function() {
        // note: Request for User Expense Budget Amount
        userBudget = prompt(`What Amount ( minimum of ₦1,000 ) do you plan to spend for the week?`);
        // note: Validate the userBudget
        if(userBudget === null || userBudget === "" || userBudget <= 999.999) {
            window.location.reload();
        } else {
            // note: Instantiate the budget class when the budget is valid
            budget = new Budget(userBudget)

            // note: Instantiate the HTML Class
            html.insertBudget(budget.budget);
        }
    });

    // note: Prevent the prompt when a new expense is added
    addExpenseForm.addEventListener('submit', function(e){
        e.preventDefault();
        // Read the input values
        const expName = document.querySelector('#expense').value;
        const amt = document.querySelector('#amount').value;

        if(expName === '' || amt === '') {
            html.printMsg('Please fill all the fields', 'danger-alert');
        } else {
            // note: Add the Expenses into the expense added list
            html.printMsg('Posted!', 'success-alert');
            html.addExpToList(expName, amt);
            html.expTracker(amt);
        }

    })
}

