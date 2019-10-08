class SingletonQueryableMap {
  private static instance: SingletonQueryableMap;
  private propertyMap: any = {};

  private constructor() {}

  static getInstance(): SingletonQueryableMap {
    if (!SingletonQueryableMap.instance) {
      SingletonQueryableMap.instance = new SingletonQueryableMap();
    }

    return SingletonQueryableMap.instance;
  }

  getValue(key: string): string[] {
    if (!!this.propertyMap[key]) {
      return this.propertyMap[key];
    } else {
      return [];
    }
  }

  addToMap(key: string, value: string): void {
    if (!!this.propertyMap[key]) {
      this.propertyMap[key].push(value);
    } else {
      this.propertyMap[key] = [value];
    }
  }
}

export function Queryable(target: any, propertyKey: any) {
  const queryableMapInstance = SingletonQueryableMap.getInstance();
  queryableMapInstance.addToMap(target.constructor.name, propertyKey);
}

export function determineAllQueryableFields<T>(type: any): string[] {
  const name = type.name;
  const queryableMapInstance = SingletonQueryableMap.getInstance();
  return queryableMapInstance.getValue(name);
}
