import { parseLibraries } from "./parser";
import { writeLibrary } from "./writer";

const library = parseLibraries();
writeLibrary(library);
