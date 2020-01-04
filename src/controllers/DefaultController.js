const Controller = require('./Controller');

class DefaultController {
  constructor(Service) {
    this.service = Service;
  }

  async pingGET(request, response) {
    await Controller.handleRequest(request, response, this.service.pingGET);
  }

}

module.exports = DefaultController;
