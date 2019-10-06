export class Enumeration {
  id: number;
  name: string;
  label: string;

  constructor(id: number, name: string, label?: string) {
    this.id = id;
    this.name = name;
    this.label = name;
  }
}
