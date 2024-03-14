import Section from '@entities/Section';
import queryBuilder from '@utils/queryBuilder';
import { Request, Response } from 'express';

interface SectionInterface {
  id?: string;
  head?: string;
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
      const { head }: SectionInterface = req.body;

      if (!head) return res.status(400).json({ message: 'Invalid section head' });

      const section = await Section.create({ head }).save();

      if (!section) return res.status(400).json({ message: 'Cannot create section' });

      return res.status(201).json({ id: section.id, message: 'Section created successfully' });
    } catch (error) {
      return res.status(404).json({ message: 'Create failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { head }: SectionInterface = req.body;
      const id = req.params.id;

      const section = await Section.findOne(id);

      if (!section) return res.status(404).json({ message: 'Section does not exist' });

      const valuesToUpdate: SectionInterface = {
        head: head || section.head,
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
