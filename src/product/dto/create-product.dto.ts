export class CreateProductDto {
  readonly description: string;
  readonly pulbication_date: Date;
  readonly expiration_date: Date;
  readonly price: number;
}