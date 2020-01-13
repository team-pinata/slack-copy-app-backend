const Controller = require('./Controller');

class DefaultController {
  constructor(Service) {
    this.service = Service;
  }

  async usersGET(request, response) {
    await Controller.handleRequest(request, response, this.service.usersGET);
  }

  async usersPOST(request, response) {
    await Controller.handleRequest(request, response, this.service.usersPOST);
  }

}

module.exports = DefaultController;
