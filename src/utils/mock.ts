import User from '@entities/User';
import bcrypt from 'bcryptjs';

const mocks = async (): Promise<void> => {
  try {
    
    if (!(await User.findOne({ email: 'admin@guide.com.br' }))) {
      const pass = await bcrypt.hash('die140401', 10);
      await User.create({ name: 'admin', email: 'admin@guide.com.br', role: 'ADMIN', passwordHash: pass, picture: 'https://guide.vercel.app/logo-a.png' }).save();
      console.log('users ok');
    }

    const users = await User.find();
    if (!users.length) mocks();
  } catch (error) {
    console.log('Erro ao rodar mocks!');
  }
};

export default mocks;
