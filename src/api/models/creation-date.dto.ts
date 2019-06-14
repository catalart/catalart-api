export class CreationDateDto {
  readonly earliestDate: string;
  readonly latestDate: string;

  static to(creationDate: CreationDateDto): string {
    return `${creationDate.earliestDate} - ${creationDate.latestDate}`;
  }

  static from(creationDate: string): CreationDateDto {
    const splitDate = creationDate.split(' - ');
    return {
      earliestDate: splitDate[0],
      latestDate: splitDate[1]
    };
  }
}
