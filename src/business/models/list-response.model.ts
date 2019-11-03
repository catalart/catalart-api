export class ListResponse<T> {
  results: T[];
  totalNumberOfResults: number;

  constructor(results: T[], totalNumberOfResults: number) {
    this.results = results;
    this.totalNumberOfResults = totalNumberOfResults;
  }
}
