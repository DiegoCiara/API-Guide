import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import Router from 'express';
import AuthRoutes from './auth.routes';
import PageRoutes from './page.routes';
import SectionRoutes from './section.routes';
import UserRoutes from './user.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ API: 'Terceiro Semetre' });
});

// prefix
routes.use('/auth', AuthRoutes);
routes.use('/user', UserRoutes);
routes.use('/page', PageRoutes); 
routes.use('/section', SectionRoutes); 

export default routes;
