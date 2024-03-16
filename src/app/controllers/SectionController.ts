import Pages from '@entities/Page';
import Section from '@entities/Section';
import queryBuilder from '@utils/queryBuilder';
import { Request, Response } from 'express';

interface SectionInterface {
  id?: string;
  head?: string;
  isCard: boolean;
  divisor: boolean;
  icon: string;
  title: string;
  subtitle: string;
  paragraph:string;
  phrase: string;
  code: string;
  page?: Pages;
}

class SectionController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const sections = (await Section.find(queryBuilder(req.query))).reverse();

      return res.status(200).json(sections);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find sections, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a section id' });

      const section = await Section.findOne(id, queryBuilder(req.query));

      return res.status(200).json(section);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find sections, try again' });
    }
  }
  public async create(req: Request, res: Response): Promise<Response> {
    try {
        const { 

          head,
          isCard,
          divisor,
          icon,
          title,
          subtitle,
          paragraph,
          phrase,
          code,
         }: SectionInterface = req.body;
        const id = req.params.id;

        // if (!head) return res.status(400).json({ message: 'Invalid section head' });
        
        // Certifique-se de aguardar a resolução da Promise antes de usá-la
        const page = await Pages.findOne(id); // Agora 'page' é do tipo 'Pages' e não 'Promise<Pages>'

        // Agora você pode passar 'page' diretamente, pois ela já está resolvida
        const section = await Section.create({
           head, 
           isCard,
           divisor,
           icon,
           title,
           subtitle,
           paragraph,
           phrase,
           code,
           page 
        }).save();

        if (!section) return res.status(400).json({ message: 'Cannot create section' });

        return res.status(201).json({ id: section.id, message: 'Section created successfully' });
    } catch (error) {
        return res.status(404).json({ message: 'Create failed, try again' });
    }
}

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { 
        head, 
        isCard,
        divisor,
        icon,
        title,
        subtitle,
        paragraph,
        phrase,
        code
       }: SectionInterface = req.body;
      const id = req.params.id;

      const section = await Section.findOne(id);

      if (!section) return res.status(404).json({ message: 'Section does not exist' });

      const valuesToUpdate: SectionInterface = {
        head: head || section.head,
        isCard: isCard == true ? true : false,
        divisor: divisor == true ? true : false,
        icon: icon || section.icon,
        title: title || section.title,
        subtitle: subtitle || section.subtitle,
        paragraph: paragraph || section.paragraph,
        phrase: phrase || section.phrase,
        code: code || section.code,
      };

      await Section.update(id, { ...valuesToUpdate });

      return res.status(200).json({ message: 'Section updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a section id' });

      const section = await Section.findOne(id);

      if (!section) return res.status(404).json({ message: 'Cannot find section' });

      await Section.softRemove(section);

      return res.status(200).json({ message: 'Section deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new SectionController();
