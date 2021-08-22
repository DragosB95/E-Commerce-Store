class UserService{
    constructor(){
        this.users = this.getUsersFromStorage();
    }

    addUser(user){
        this.users.push(user);
        this.updateStorage();
        return `${user.userName} is added!`;
    }

    removeUser(userName){
        for (let index = 0; index < this.users.length; index++) {
            const user = this.users[index];
            if(user.userName == userName){
                this.users.splice(index, 1);
                this.updateStorage();
                console.log(`${userName} has been removed`);
                return;
            }
        }
    }
    
    showLoggedUsers(){
        console.log('Users that are logged in are:')
        for (let index = 0; index < this.users.length; index++) {
            const user = this.users[index];
            if(user.isLoggedIn){
                console.log(user.userName);
            }
        }
    }
    logInUser(userName, password){
        let response = {
            message: "",
            isLoggedIn: false
        };
        var userResponse = this.getUserByUserName(userName);
        if(userResponse.user){
            let user = userResponse.user;
            if(user.password == password){
                user.isLoggedIn = true;
                response.isLoggedIn = true;
                response.message =  `${user.name} is logged in`;
                return response;
            }
        }else{
            return userResponse;
        }
    }
    logOut(userName){
        var user = this.getUserByUserName(userName);
        user.logout();
    }
    getFormatedProfileDetail(profile){

           return `
            <p>Name: ${profile.name}</p>
            <p>Email: ${profile.email}</p>
            <p>Password: ${profile.password}</p>
            <p>Gender: ${profile.gender}</p>
            <p>Age: ${profile.age}</p>
            `
    }
    updateStorage(){
        localStorage.setItem('users', JSON.stringify(this.users));
    }
    getUsersFromStorage(){
        let users = JSON.parse(localStorage.getItem('users'));
        return users ? users : [];
    }
    increaseSalary(name, amount){

    }
    decreaseSalary(name, amount){

    }
    showMessagesForUserName(name){

    }
    sendMessageTo(senderUserName, receiverUsername, msg){

    }
    showAllUsersDetails(){
        
    }
    sendMessageToAllUsers(msg){

    }

}