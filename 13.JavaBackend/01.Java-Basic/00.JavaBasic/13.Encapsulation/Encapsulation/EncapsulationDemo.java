class BankAccount {
    private double balance;        // Private variable
    private String accountNumber;
    
    // Getter method - to read private data
    public double getBalance() {
        return balance;
    }
    
    // Setter method - to modify private data with validation
    public void setBalance(double balance) {
        if (balance >= 0) {           // Validation
            this.balance = balance;
        } else {
            System.out.println("Balance cannot be negative");
        }
    }
    
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public void setAccountNumber(String accountNumber) {
        if (accountNumber != null && accountNumber.length() == 10) {
            this.accountNumber = accountNumber;
        } else {
            System.out.println("Invalid account number");
        }
    }
    
    // Business methods
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: " + amount);
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: " + amount);
        } else {
            System.out.println("Invalid withdrawal amount");
        }
    }
}
public class EncapsulationDemo {
    public static void main(String[] args){
                BankAccount account = new BankAccount();
        
        // Cannot access directly (compilation error):
        // account.balance = 1000;  // Error: balance is private
        
        // Must use setter methods:
        account.setBalance(1000);          // Valid
        account.setAccountNumber("1234567890");
        
        // Use getter methods to read:
        System.out.println("Balance: " + account.getBalance());
        
        // Use business methods:
        account.deposit(500);
        account.withdraw(200);
        
        System.out.println("Final Balance: " + account.getBalance());

    }
}
