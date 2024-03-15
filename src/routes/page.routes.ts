import PageController from '@controllers/PageController'
import Router from 'express';

const routes = Router();

routes.get('/', PageController.findAll);
routes.get('/:id', PageController.findById);
routes.post('/', PageController.create);
routes.put('/:id', PageController.update);
routes.delete('/:id', PageController.delete);

export default routes;
