import Page from '@entities/Page';
import queryBuilder from '@utils/queryBuilder';
import { Request, Response } from 'express';

interface PageInterface {
  id?: string;
  name?: string;
}

class PageController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const pages = (await Page.find(queryBuilder(req.query))).reverse();

      return res.status(200).json(pages);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find pages, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a page id' });

      const page = await Page.findOne(id, queryBuilder(req.query));

      return res.status(200).json(page);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find pages, try again' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name }: PageInterface = req.body;

      if (!name) return res.status(400).json({ message: 'Invalid page name' });

      const page = await Page.create({ name }).save();

      if (!page) return res.status(400).json({ message: 'Cannot create page' });

      return res.status(201).json({ id: page.id, message: 'Page created successfully' });
    } catch (error) {
      return res.status(404).json({ message: 'Create failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name }: PageInterface = req.body;
      const id = req.params.id;

      const page = await Page.findOne(id);

      if (!page) return res.status(404).json({ message: 'Page does not exist' });

      const valuesToUpdate: PageInterface = {
        name: name || page.name,
      };

      await Page.update(id, { ...valuesToUpdate });

      return res.status(200).json({ message: 'Page updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a page id' });

      const page = await Page.findOne(id);

      if (!page) return res.status(404).json({ message: 'Cannot find page' });

      await Page.softRemove(page);

      return res.status(200).json({ message: 'Page deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new PageController();
