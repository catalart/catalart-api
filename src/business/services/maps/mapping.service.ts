export abstract class MappingService {
  private setOfMaps: Map<string, (input: any) => any>;

  constructor() {
    this.setOfMaps = new Map();
    this.initialize();
  }

  abstract initialize(): void;

  createMap(fromModel: new () => any, toModel: new () => any) {
    const fromKey = new fromModel().constructor.name;
    const toKey = new toModel().constructor.name;
    return {
      setup: (map: (input: any) => any): void => {
        const combinedKey = `${fromKey}-${toKey}`;
        if (this.setOfMaps.has(combinedKey)) {
          throw new Error('There is an existing map for this combination.');
        } else {
          this.setOfMaps.set(combinedKey, map);
        }
      },
      setupReverse: (map: (input: any) => any): void => {
        const combinedKey = `${toKey}-${fromKey}`;
        if (this.setOfMaps.has(combinedKey)) {
          throw new Error('There is an existing map for this combination.');
        } else {
          this.setOfMaps.set(combinedKey, map);
        }
      }
    };
  }

  determineMap(fromModel: new () => any, toModel: new () => any) {
    const fromKey = new fromModel().constructor.name;
    const toKey = new toModel().constructor.name;
    return {
      map: (input: any): any => {
        const combinedKey = `${fromKey}-${toKey}`;
        if (this.setOfMaps.has(combinedKey)) {
          const map = this.setOfMaps.get(combinedKey);
          return map(input);
        }
        throw new Error('Unable to find map for input/output types');
      }
    };
  }
}
