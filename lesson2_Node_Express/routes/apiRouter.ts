import {Request, Response, Router} from "express";

import userService from "../services/userService";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.json(await userService.getAll());
});

router.get('/:email', async (req: Request, res: Response) => {
    const {email} = req.params;
    res.json(await userService.getOneByEmail(email));
});

router.post('/', async (req: Request, res: Response) => {
    res.json(await userService.createOne(req.body));
});

router.put('/:email', async (req: Request, res: Response) => {
    const {email} = req.params;
    res.json(await userService.updateByEmail(email, req.body));
});

router.delete('/:email', async (req: Request, res: Response) => {
    const {email} = req.params;
    try {
        res.json(await userService.deleteByEmail(email));
    } catch (e: any) {
        res.status(404).json(e.message);
    }
});

export const apiRouter = router;
