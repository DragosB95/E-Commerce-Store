class User{
    constructor(name, grade, userName, password, salary){
        this.name = name;
        this.grade = grade;
        this.userName = userName;
        this.password = password;
        this.salary = salary;
        this.isLoggedIn = false;
        this.messages = [];
        this.productId = 5;
    }
    logIn(userName, password){
        //obiect care contine raspunsul
        let response = {
            message: "",
            isLoggedIn: false
        };

        //daca esti deja logat atunci pe obiectul raspuns seteaza un mesaj de eroare
        if(this.isLoggedIn){
            response.message = "You're already logged in";
            return response;
        }
        //daca nu esti logat verificam credentialele
        //si pe obiectul de raspuns setam mesajul ca esti logat
        //si isLoggedIn ca sa vedem in script.js daca o fost cu success logarea
        if(this.userName == userName && this.password == password){
            this.isLoggedIn = true;

            response.message = `${this.name} is logged in`;
            response.isLoggedIn = true;

            return response;
        }else{
            //daca credentialele nu sunt corect returnam un raspuns 
            //cu un mesaj de eroare si isLoggedIn neschimbat adica false
            response.message = `Authorization denied ${this.name}, credentials are wrong`;

            return response;
        }
    }
    logout(){
        if(!this.isLoggedIn){//  if isNotLoggedIn
            console.log("You're not logged in DUUUDE!");
        }else{
            this.isLoggedIn = false;
            console.log("You're logged out, we're glad!");
        }
    }
    describe(){
        console.log(`${this.name} ${this.userName} ${this.grade} ${this.salary} ${this.isLoggedIn} ${this.password}`);
    }
    addMessage(from, message){
        this.messages.push(`${from}: ${message}`);//Petru: haha
        console.log('Message received');
    }
    increaseSalary(salary){
        this.salary += salary;
        console.log(`${this.name} got salary increased by ${salary}`)
    }
    decreaseSalary(salary){
        if(this.salary < salary){
            console.log("Man, he's got child to raise, you're broke");
        }else{
            this.salary-=salary;
            console.log(`${this.name} got salary decreased by ${salary}`);
        }
    }
    showMessages(){
        console.log(`${this.name} messages are:`);
        for (const msg in this.messages) {
            console.log(msg);
        }
    }
}