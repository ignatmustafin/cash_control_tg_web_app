import {MigrationInterface, QueryRunner} from "typeorm";

export class CategoriesSeed1704535335229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const categoriesData = [
            {name: 'Savings'},
            {name: 'Apartment'},
            {name: 'School'},
            {name: 'Kindergarten'},
            {name: 'Utilities (phones, internet)'},
            {name: 'Grocery and household stores'},
            {name: 'Cafes/Restaurants'},
            {name: 'Taxi and transportation'},
            {name: 'Leisure and entertainment'},
            {name: 'Health'},
            {name: 'Clothing'},
            {name: 'Children'},
            {name: 'Vacation'},
            {name: 'Gifts'},
            {name: 'Charity'},
            {name: 'Electronics'},
            {name: 'Business'},
        ];

        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('categories')
            .values(categoriesData)
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('categories')
            .execute();
    }

}
