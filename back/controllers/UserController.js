class UserController{
    async register(req, res){
       
    }

    async login(req, res){

    }

    async verify_user(req, res){
        res.json('супер контроллер проверки роли');
    }

    async getAllUsers(req, res){

    }

    async getUserByID(req, res){

    }

    async findPeople(req, res){

    }

    async updateUser(req, res){

    }

    async getAllUsersAdmin(req, res){

    }

    async getUserByIDAdmin(req, res){

    }

    async upgradeRole(req, res){

    }
}

module.exports = new UserController();