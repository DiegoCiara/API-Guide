import PageController from '@controllers/PageController';
import Pages from '@entities/Page';
import User from '@entities/User';
import bcrypt from 'bcryptjs';
import { pages } from './dataMock';

const mocks = async (): Promise<void> => {
  try {
    
    if (!(await User.findOne({ email: 'admin@guide.com.br' }))) {
      const pass = await bcrypt.hash('die140401', 10);
      await User.create({ name: 'admin', email: 'admin@guide.com.br', role: 'ADMIN', passwordHash: pass, picture: 'https://guide.vercel.app/logo-a.png' }).save();
      console.log('users ok');
    }

    if (!(await Pages.findOne({ name: 'Bem Vindo' }))) {
      for (const page of pages) {
        // const userFind = await User.findOne({ email: 'admin@wavecrm.com.br'});
        // const pipelineFind = await Pipeline.findOne({ name: 'Não iniciado'});
        const newPages = await Pages.create({ ...page }).save();
        console.log(`Canal ${page.name}, de id: ${newPages.id} criada`);
      }
      console.log('companies ok');
    }
    const users = await User.find();
    if (!users.length) mocks();
  } catch (error) {
    console.log('Erro ao rodar mocks!');
  }
};

export default mocks;
