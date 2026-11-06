import * as api from '@lp-labs/html-entity-codec';
import { encodeEntities, decodeEntities } from '@lp-labs/html-entity-codec';
const encoded = encodeEntities('<safe & sound>');
console.log(decodeEntities(encoded));
// @ts-expect-error invalid argument must be rejected by declarations
api.encodeEntities(4);
