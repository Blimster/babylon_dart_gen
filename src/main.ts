import { classByName, implementedInterfaces, missingGettersAndSetters } from "./helper";
import { parseLibraries } from "./parser";
import { writeLibrary } from "./writer";

const library = parseLibraries();
const clazz = classByName("PointLight", library);
const properties = missingGettersAndSetters(library, clazz, implementedInterfaces(library, clazz, new Map()), new Map());
console.log(properties);
writeLibrary(library);
