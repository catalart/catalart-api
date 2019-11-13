import { Injectable } from '@nestjs/common';

import { Option } from '@business/models/option.model';
import { ReferenceEntity } from '@dal/entity/reference/reference-entity.interface';
import { Enumeration } from '@business/models/enumeration.model';

@Injectable()
export class ReferenceMappingService {
  mapToOption(referenceEntity: ReferenceEntity): Option {
    return new Option(referenceEntity.id, referenceEntity.name);
  }

  mapToOptions(referenceEntities: ReferenceEntity[]): Option[] {
    return referenceEntities.map(this.mapToOption);
  }

  mapToEnumeration(referenceEntity: ReferenceEntity): Enumeration {
    return new Enumeration(referenceEntity.id, referenceEntity.label, referenceEntity.label);
  }
}
