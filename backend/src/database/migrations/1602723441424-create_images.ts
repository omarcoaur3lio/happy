import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1602723441424 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true, // indica que sera a Primary Key
          isGenerated: true, // indica que será gerado automaticamente
          generationStrategy: 'increment' // indica que será gerado de forma incremental 
        },
        {
          name: 'path',
          type: 'varchar',
        },
        {
          name: 'orphanage_id',
          type: 'integer',
        }
      ],

      // chaves estrangeiras para realização do relacionamento entre as tabelas
      foreignKeys: [
        {
          name: 'ImageOrphanage',
          columnNames: [ 'orphanage_id' ],
          referencedTableName: 'orphanages',
          referencedColumnNames: [ 'id' ],
          onUpdate: 'CASCADE', // define o que acontecerá quando houver alguma atualização na tabela relacionada
          onDelete: 'CASCADE',  // define o que acontecerá quando a tabela relacionada for deletada (nesse caso, as imagens serão deletadas também)
        }
      ]

    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
