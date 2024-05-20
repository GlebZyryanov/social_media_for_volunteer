class ChatsController{

    async getAllChats(req, res){}

    async getChatByID(req, res){}

    async createPrivateChat(req, res){}

    async createGroupChat(req, res){}

    async createMessage(req, res){}

    async addMemberToChat(req, res){}

    async leaveChat(req, res){}

    async deleteChat(req, res){}
}

module.exports = new ChatsController()