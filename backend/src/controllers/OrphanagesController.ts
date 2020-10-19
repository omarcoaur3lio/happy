
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {

    async index(request: Request, response: Response){

        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(orphanageView.renderMany(orphanages));

    },

    async show(request: Request, response: Response){

        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        // tentará buscar o orfanato correspondente ao ID passado, caso não encontre será retornado um erro
        const orphanage = await orphanagesRepository.findOneOrFail( id, {
            relations: ['images']
        } );

        return response.json(orphanageView.render(orphanage));

    },

    async create(request: Request, response: Response){

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[]; // as Express.Multer.File[] força a tipagem do multer a  entender que serão recebidas varias imagens
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('O nome é obrigatório'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false, // Testa todos os capos e apenas no final retornará os erros
        })

        const orphanage = orphanagesRepository.create( data );
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage);
    }

};