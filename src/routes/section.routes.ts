import SectionController from '@controllers/SectionController'
import Router from 'express';

const routes = Router();

routes.get('/:id', SectionController.findAll);
routes.get('/section/:id', SectionController.findById);
routes.post('/:id', SectionController.create);
routes.put('/:id', SectionController.update);
routes.delete('/:id', SectionController.delete);

export default routes;