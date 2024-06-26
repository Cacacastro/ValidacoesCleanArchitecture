import express, {Request, Response, request} from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequilize/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) =>{
    const usecase = new CreateCustomerUseCase(new CustomerRepository);
    try{
        const customerDto = {
            name: req.body.name,
            address:{
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zip: req.body.address.zip,
            },
        }

        const output = await usecase.execute(customerDto);
        res.send(output);
    }catch(err){
        res.status(500).send(err);
    }
});

customerRoute.get('/', async (req: Request, res: Response) =>{
    const usecase = new ListCustomerUseCase(new CustomerRepository);
    try{
        const output = await usecase.execute({});
        res.send(output);
    }catch(err){
        res.status(500).send(err);
    }
});