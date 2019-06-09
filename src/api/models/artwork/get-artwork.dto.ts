export class GetArtWorkDto {
  readonly id: number;
  readonly classificationTerm: string;
  readonly title: string;
  // creator: Creator = new Creator();
  // creationDate: CreationDate = new CreationDate();
  readonly dimensions: string;
  readonly materialsAndTechniquesDescription: string;
  // generalSubjectTerms: string[];
  readonly currentLocation: string;
  readonly preview: string; // url
  readonly citation: string;
}
