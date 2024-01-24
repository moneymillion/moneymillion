document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('input-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Read user inputs
        const maxCompound = parseFloat(document.getElementById('max-compound').value);
        const minCompound = parseFloat(document.getElementById('min-compound').value);
        const startingBalance = parseFloat(document.getElementById('starting-balance').value);
        const supplementAmount = parseFloat(document.getElementById('supplement-amount').value);
        
        // Show the duration selection buttons
        document.getElementById('duration-selection').classList.remove('hidden');
        
        // Setup duration buttons with proper calculation and display logic
        setupDurationButtons(minCompound, maxCompound, startingBalance, supplementAmount);
    });

    function setupDurationButtons(minCompound, maxCompound, startingBalance, supplementAmount) {
        ['12m', '24m', '36m'].forEach(term => {
            const btn = document.getElementById(`btn-${term}`);
            btn.onclick = () => {
                hideAllResultTables();
                calculateAndDisplayResults(parseInt(term), minCompound, maxCompound, startingBalance, supplementAmount);
                // Show the supplement question section
                document.getElementById('supplement-question').classList.remove('hidden');
            };
        });
    }

    function calculateAndDisplayResults(months, minCompound, maxCompound, startingBalance, supplementAmount) {
        const table = document.getElementById(`table-${months}m`);
        table.innerHTML = ''; // Clear previous content

        // Create table headers
        let headerRow = table.insertRow(0);
        ['Month', 'Starting Balance', 'Compound Percentage', 'Interest', 'Ending Balance'].forEach(header => {
            let th = document.createElement('th');
            th.innerText = header;
            headerRow.appendChild(th);
        });

        let currentBalance = startingBalance;
        let totalInterest = 0;
        
        for (let month = 1; month <= months; month++) {
            let startingBalanceForMonth = currentBalance;
            let compoundPercentage = (month === 1 ? minCompound : Math.random() * (maxCompound - minCompound) + minCompound);
            let interest = currentBalance * (compoundPercentage / 100);
            currentBalance += interest;
            totalInterest += interest;

            // Add supplement amount to the ending balance
            currentBalance += supplementAmount;

            let row = table.insertRow(-1);
            row.insertCell(0).innerText = month;
            row.insertCell(1).innerText = startingBalanceForMonth.toFixed(2);
            row.insertCell(2).innerText = compoundPercentage.toFixed(2);
            row.insertCell(3).innerText = interest.toFixed(2);
            row.insertCell(4).innerText = currentBalance.toFixed(2);
        }

        // Add a row for the final ending balance
        let endingBalanceRow = table.insertRow(-1);
        endingBalanceRow.insertCell(0).innerText = 'Final Ending Balance';
        endingBalanceRow.insertCell(1).innerText = '';
        endingBalanceRow.insertCell(2).innerText = '';
        endingBalanceRow.insertCell(3).innerText = '';
        endingBalanceRow.insertCell(4).innerText = currentBalance.toFixed(2);

        let totalRow = table.insertRow(-1);
        totalRow.insertCell(0).innerText = 'Total Interest';
        totalRow.insertCell(1).innerText = '';
        totalRow.insertCell(2).innerText = '';
        totalRow.insertCell(3).innerText = '';
        totalRow.insertCell(4).innerText = totalInterest.toFixed(2);
        
        // Ensure the result section for the selected term is visible
        document.getElementById(`results-${months}m`).classList.remove('hidden');
    }

    function hideAllResultTables() {
        ['12m', '24m', '36m'].forEach(term => {
            document.getElementById(`results-${term}`).classList.add('hidden');
        });
    }

    // Handle the supplement question responses
    document.getElementById('supplement-yes').onclick = () => {
        // Logic to handle the 'Yes' response
        console.log('User chose to add a supplement.');
        // You can add logic here to ask for the supplement amount and recalculate the results
    };

    document.getElementById('supplement-no').onclick = () => {
        // Logic to handle the 'No' response
        console.log('User chose not to add a supplement.');
        // You can add logic here to simply continue showing the current results
    };
});