import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from './Image';

// Esse decorator associa a classe à tabela 
@Entity('orphanages')
export default class Orphanages {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;
    
    @Column()
    opening_hours: string;
    
    @Column()
    open_on_weekends: boolean;

    // Realização do relacionamento entre as tabelas para salvamento das imagens
    @OneToMany( () => Image, image => image.orphanage, {
        cascade: ['insert', 'update'] 
    } )
    @JoinColumn({ name: 'orphanage_id' })
    images: Image[];
}