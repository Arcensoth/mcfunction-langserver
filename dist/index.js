// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"UbUk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function resolvePaths(paths, argPath) {
  for (const path of paths) {
    if (stringArrayEqual(argPath, path.path)) {
      return path.data;
    }
  }

  return undefined;
}

exports.resolvePaths = resolvePaths;

function stringArrayEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
}

exports.stringArrayEqual = stringArrayEqual;

function startPaths(paths, argpath) {
  let best = [0, undefined];

  for (const option of paths) {
    if (option.path.length > best[0] && option.path.length <= argpath.length && option.path.every((v, i) => v === argpath[i])) {
      best = [option.path.length, option.data];
    }
  }

  return best[1];
}

exports.startPaths = startPaths;
},{}],"NmKP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Build parser info from the data required
 */

function createParserInfo(node, data, path, context, suggesting) {
  const result = {
    context,
    data,
    node_properties: node.properties || {},
    path,
    suggesting
  };
  return result;
}

exports.createParserInfo = createParserInfo;
/**
 * Convert a string into CommandLines based on newline characters
 */

function splitLines(text) {
  return createCommandLines(text.split(/\r?\n/));
}

exports.splitLines = splitLines;
/**
 * Convert the given string array into a blank CommandLine Array
 */

function createCommandLines(lines) {
  const result = [];

  for (const line of lines) {
    result.push({
      text: line
    });
  }

  return result;
}

exports.createCommandLines = createCommandLines;
},{}],"xb+0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COMMENT_START = "#";
exports.SPACE = " "; // Namespaces

exports.DEFAULT_NAMESPACE = "minecraft";
exports.NAMESPACE = ":";
exports.DATAFOLDER = "data";
exports.SLASH = "/";
exports.SLASHREGEX = /\//g;
exports.SLASHREPLACEREGEX = /\\/g;
exports.MCMETAFILE = "pack.mcmeta"; // Blocks

exports.TAG_START = "#"; // Misc

exports.JAVAMAXINT = 2147483647;
exports.JAVAMININT = -2147483648;
exports.NONWHITESPACE = /\S/;
},{}],"CWtC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const consts_1 = require("../consts");

function namespacesEqual(first, second) {
  return namesEqual(first, second) && first.path === second.path;
}

exports.namespacesEqual = namespacesEqual;

function namesEqual(first, second) {
  return first.namespace === second.namespace || isNamespaceDefault(first) && isNamespaceDefault(second);
}

exports.namesEqual = namesEqual;

function isNamespaceDefault(name) {
  return name.namespace === undefined || name.namespace === consts_1.DEFAULT_NAMESPACE;
}

exports.isNamespaceDefault = isNamespaceDefault;

function stringifyNamespace(namespace, seperator = consts_1.NAMESPACE) {
  return (namespace.namespace ? namespace.namespace : consts_1.DEFAULT_NAMESPACE) + seperator + namespace.path;
}

exports.stringifyNamespace = stringifyNamespace;
/**
 * Convert a string into a `NamespacedName`. This should only be called directly on strings which are known to be valid
 * The behaviour on invalid strings is to leave the second seperator in the path
 */

function convertToNamespace(input, splitChar = consts_1.NAMESPACE) {
  const index = input.indexOf(splitChar);

  if (index >= 0) {
    const pathContents = input.substring(index + splitChar.length, input.length); // Path contents should not have a : in the contents, however this is to be checked higher up.
    // This simplifies using the parsed result when parsing known statics
    // Related: https://bugs.mojang.com/browse/MC-91245 (Fixed)

    if (index >= 1) {
      return {
        namespace: input.substring(0, index),
        path: pathContents
      };
    } else {
      return {
        path: pathContents
      };
    }
  } else {
    return {
      path: input
    };
  }
}

exports.convertToNamespace = convertToNamespace;
},{"../consts":"xb+0"}],"23cw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const namespace_1 = require("./namespace");

function getResourcesofType(resources, type) {
  return getResourcesSplit(type, resources.globalData, resources.localData);
}

exports.getResourcesofType = getResourcesofType;

function getResourcesSplit(type, globalData, packsInfo) {
  const results = [];
  const globalResources = globalData.resources[type];

  if (!!globalResources) {
    results.push(...globalResources);
  }

  if (packsInfo) {
    for (const packId in packsInfo.packs) {
      if (packsInfo.packs.hasOwnProperty(packId)) {
        const pack = packsInfo.packs[packId];

        if (pack.data.hasOwnProperty(type)) {
          const data = pack.data[type];

          if (!!data) {
            results.push(...data);
          }
        }
      }
    }
  }

  return results;
}

exports.getResourcesSplit = getResourcesSplit;

function getMatching(resources, value) {
  const results = [];

  for (const resource of resources) {
    if (namespace_1.namespacesEqual(resource, value)) {
      results.push(resource);
    }
  }

  return results;
}

exports.getMatching = getMatching;
},{"./namespace":"CWtC"}],"aP4V":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const main_1 = require("vscode-languageserver/lib/main");

const misc_functions_1 = require("../misc-functions");
/**
 * Helper class to create command errors
 */


class CommandErrorBuilder {
  constructor(code, explanation, severity = main_1.DiagnosticSeverity.Error) {
    this.code = code;
    this.default = explanation;
    this.severity = severity;
  }

  create(start, end, ...substitutions) {
    const diagnosis = Object.assign(this.createBlank(...substitutions), {
      range: {
        start,
        end
      }
    });
    return diagnosis;
  }

  createBlank(...substitutions) {
    return {
      code: this.code,
      severity: this.severity,
      substitutions,
      text: misc_functions_1.MCFormat(this.default, ...substitutions)
    };
  }

}

exports.CommandErrorBuilder = CommandErrorBuilder;
/**
 * Transform `err` into a real command error.
 * MODIFIES `err`
 * @param err The error to transform
 * @param start The starting location in the line of the error
 * @param end The end position
 */

function fillBlankError(err, start, end) {
  return Object.assign({}, err, {
    range: {
      start,
      end
    }
  });
}

exports.fillBlankError = fillBlankError;
},{"../misc-functions":"KBGm"}],"AgEN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const __1 = require("..");

const errors_1 = require("../../brigadier/errors");

const consts_1 = require("../../consts");

const namespace_1 = require("../namespace");

const NAMESPACEEXCEPTIONS = {
  invalid_id: new errors_1.CommandErrorBuilder("argument.id.invalid", "The seperator '%s' should not be repeated in the ID '%s'")
};
exports.namespaceChars = /^[0-9a-z_:/\.-]$/;
const allowedInSections = /^[0-9a-z_/\.-]$/;

function stringArrayToNamespaces(strings) {
  // tslint:disable-next-line:no-unnecessary-callback-wrapper this is a false positive - see https://github.com/palantir/tslint/issues/2430
  return strings.map(v => __1.convertToNamespace(v));
}

exports.stringArrayToNamespaces = stringArrayToNamespaces;

function readNamespaceText(reader, seperator = consts_1.NAMESPACE, stopAfterFirst = false) {
  let found = false;
  return reader.readWhileFunction(c => {
    if (c === seperator) {
      if (found && stopAfterFirst) {
        return false;
      }

      found = true;
      return true;
    }

    return allowedInSections.test(c);
  });
}

exports.readNamespaceText = readNamespaceText;
/**
 * Does `base`(eg minecraft:stone) start with `test` (e.g. sto) [Y]
 */

function namespaceStart(base, test) {
  if (test.namespace === undefined) {
    return namespace_1.isNamespaceDefault(base) && base.path.startsWith(test.path) || !!base.namespace && base.namespace.startsWith(test.path);
  } else {
    return namespace_1.namesEqual(base, test) && base.path.startsWith(test.path);
  }
}

exports.namespaceStart = namespaceStart;

function namespaceSuggestions(options, value, start) {
  const result = [];

  for (const option of options) {
    if (namespaceStart(option, value)) {
      result.push({
        text: __1.stringifyNamespace(option),
        start
      });
    }
  }

  return result;
}

exports.namespaceSuggestions = namespaceSuggestions;

function namespaceSuggestionString(options, value, start) {
  return namespaceSuggestions(stringArrayToNamespaces(options), value, start);
}

exports.namespaceSuggestionString = namespaceSuggestionString;

function parseNamespace(reader, seperator = consts_1.NAMESPACE, stopAfterFirst = false) {
  const helper = new __1.ReturnHelper();
  const start = reader.cursor;
  const text = readNamespaceText(reader, seperator, stopAfterFirst);

  const namespace = __1.convertToNamespace(text, seperator);

  let next = 0;
  let failed = false; // Give an error for each invalid character

  while (true) {
    next = namespace.path.indexOf(seperator, next + 1);

    if (next !== -1) {
      const i = text.indexOf(seperator) + 1 + next + start;
      failed = true;
      helper.addErrors(NAMESPACEEXCEPTIONS.invalid_id.create(i, i + seperator.length, seperator, text));
    } else {
      break;
    }
  }

  if (failed) {
    return helper.fail();
  } else {
    return helper.succeed(namespace);
  }
}

exports.parseNamespace = parseNamespace;

function parseNamespaceOption(reader, options, completionKind, seperator = consts_1.NAMESPACE, stopAfterFirst = false) {
  const helper = new __1.ReturnHelper();
  const start = reader.cursor;
  const namespace = parseNamespace(reader, seperator, stopAfterFirst);

  if (helper.merge(namespace)) {
    const results = processParsedNamespaceOption(namespace.data, options, !reader.canRead(), start, completionKind, seperator);
    helper.merge(results);

    if (results.data.length > 0) {
      return helper.succeed({
        literal: namespace.data,
        values: results.data
      });
    } else {
      return helper.failWithData(namespace.data);
    }
  } else {
    return helper.failWithData(undefined);
  }
}

exports.parseNamespaceOption = parseNamespaceOption;

function processParsedNamespaceOption(namespace, options, suggest, start, completionKind, seperator = consts_1.NAMESPACE) {
  const results = [];
  const helper = new __1.ReturnHelper();

  for (const val of options) {
    if (__1.namespacesEqual(val, namespace)) {
      results.push(val);
    }

    if (suggest && namespaceStart(val, namespace)) {
      helper.addSuggestion(start, __1.stringifyNamespace(val, seperator), completionKind);
    }
  }

  return helper.succeed(results);
}

exports.processParsedNamespaceOption = processParsedNamespaceOption;
},{"..":"KBGm","../../brigadier/errors":"aP4V","../../consts":"xb+0","../namespace":"CWtC"}],"cNAA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function createExtensionFileError(filePath, expected, actual) {
  return {
    filePath,
    group: "extension",
    kind: "FileError",
    message: `File has incorrect extension: Expected ${expected}, got ${actual}.`
  };
}

exports.createExtensionFileError = createExtensionFileError;

function createJSONFileError(filePath, error) {
  return {
    filePath,
    group: "json",
    kind: "FileError",
    message: `JSON parsing failed: '${error}'`
  };
}

exports.createJSONFileError = createJSONFileError;

function createFileClear(filePath, group) {
  return {
    kind: "ClearError",
    filePath,
    group
  };
}

exports.createFileClear = createFileClear;
},{}],"UL96":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = true;
exports.failure = false; //#endregion
},{}],"p3gl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // tslint:disable:helper-return

const errors_1 = require("../brigadier/errors");

const types_1 = require("../types");
/**
 * Create an instance of the common return type
 */


function createReturn() {
  return {
    actions: [],
    errors: [],
    suggestions: [],
    misc: []
  };
}
/**
 * Test if `input` is successful
 * @param input The info to test
 */


function isSuccessful(input) {
  return input.kind === types_1.success;
}

exports.isSuccessful = isSuccessful;

function fillBlanks(data, start, end) {
  const errors = [];

  for (const err of data.errors) {
    errors.push(errors_1.fillBlankError(err, start, end));
  }

  return Object.assign({}, data, {
    errors
  });
}

exports.fillBlanks = fillBlanks;

class ReturnHelper {
  constructor(suggesting) {
    this.data = createReturn();

    if (typeof suggesting !== "undefined") {
      if (typeof suggesting === "boolean") {
        this.suggestMode = suggesting;
        return;
      }

      this.suggestMode = suggesting.suggesting;
    }
  }

  addActions(...actions) {
    if (this.suggestMode === undefined || !this.suggestMode) {
      this.data.actions.push(...actions);
    }

    return this;
  }

  addErrors(...errs) {
    if (this.suggestMode === undefined || !this.suggestMode) {
      this.data.errors.push(...errs);
    }

    return this;
  }

  addFileErrorIfFalse(option, filePath, group, message) {
    if (!option) {
      this.addMisc({
        filePath,
        group,
        kind: "FileError",
        message
      });
    } else {
      this.addMisc({
        group,
        filePath,
        kind: "ClearError"
      });
    }

    return option;
  }

  addMisc(...others) {
    if (this.suggestMode === undefined || !this.suggestMode) {
      this.data.misc.push(...others);
    }

    return this;
  }

  addSuggestion(start, text, kind, description) {
    if (this.suggestMode === undefined || this.suggestMode) {
      this.addSuggestions({
        description,
        kind,
        start,
        text
      });
    }

    return this;
  }

  addSuggestions(...suggestions) {
    if (this.suggestMode === undefined || this.suggestMode) {
      this.data.suggestions.push(...suggestions);
    }

    return this;
  }

  fail(err) {
    if (!!err && !this.suggestMode) {
      this.addErrors(err);
    }

    return Object.assign({}, this.getShared(), {
      kind: types_1.failure
    });
  }

  failWithData(data) {
    return Object.assign({}, this.getShared(), {
      data,
      kind: types_1.failure
    });
  }

  getShared() {
    return this.data;
  }

  merge(merge, suggestOverride) {
    this.mergeChain(merge, suggestOverride);
    return isSuccessful(merge);
  }

  mergeChain(merge, {
    suggestions = this.suggestMode === undefined ? true : this.suggestMode,
    errors = this.suggestMode === undefined || !this.suggestMode,
    actions = this.suggestMode === undefined || !this.suggestMode,
    misc = this.suggestMode === undefined || !this.suggestMode
  } = {}) {
    if (suggestions) {
      this.addSuggestions(...merge.suggestions);
    }

    if (errors) {
      this.addErrors(...merge.errors);
    }

    if (actions) {
      this.addActions(...merge.actions);
    }

    if (misc) {
      this.addMisc(...merge.misc);
    }

    return this;
  }

  return(other) {
    if (this.merge(other)) {
      return this.succeed(other.data);
    } else {
      return this.failWithData(other.data);
    }
  }

  succeed(data) {
    return Object.assign({}, this.getShared(), {
      data,
      kind: types_1.success
    });
  }

}

exports.ReturnHelper = ReturnHelper;

function prepareForParser(info, suggesting) {
  const helper = new ReturnHelper(suggesting);

  if (helper.merge(info)) {
    return helper.succeed();
  } else {
    return helper.fail();
  }
}

exports.prepareForParser = prepareForParser;

function getReturned(value) {
  const helper = new ReturnHelper();

  if (typeof value === "undefined") {
    return helper.fail();
  } else {
    return helper.succeed(value);
  }
}

exports.getReturned = getReturned;
},{"../brigadier/errors":"aP4V","../types":"UL96"}],"tSk9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const fs = tslib_1.__importStar(require("fs"));

const path = tslib_1.__importStar(require("path"));

const util_1 = require("util");

const file_errors_1 = require("./file-errors");

const return_helper_1 = require("./return-helper");

exports.readFileAsync = util_1.promisify(fs.readFile);
exports.saveFileAsync = util_1.promisify(fs.writeFile);
exports.mkdirAsync = util_1.promisify(fs.mkdir);
exports.readDirAsync = util_1.promisify(fs.readdir);
exports.statAsync = util_1.promisify(fs.stat);

async function readJSONRaw(filePath) {
  const buffer = await exports.readFileAsync(filePath);
  return JSON.parse(buffer.toString());
}

exports.readJSONRaw = readJSONRaw;

async function writeJSON(filepath, o) {
  await exports.saveFileAsync(filepath, JSON.stringify(o, undefined, 4));
}

exports.writeJSON = writeJSON;

async function readJSON(filePath) {
  const helper = new return_helper_1.ReturnHelper();
  let buffer;

  try {
    buffer = await exports.readFileAsync(filePath);
  } catch (error) {
    mcLangLog(`File at '${filePath}' not available: ${error}`);
    return helper.fail();
  }

  try {
    const result = JSON.parse(buffer.toString());
    return helper.succeed(result);
  } catch (e) {
    return helper.addMisc(file_errors_1.createJSONFileError(filePath, e)).fail();
  }
}

exports.readJSON = readJSON;

async function walkDir(currentPath) {
  const subFolders = [];

  try {
    subFolders.push(...(await exports.readDirAsync(currentPath)));
  } catch (error) {
    return [];
  }

  const promises = subFolders.map(async sub => {
    try {
      const files = [];
      const subFile = path.join(currentPath, sub);

      if ((await exports.statAsync(subFile)).isDirectory()) {
        files.push(...(await walkDir(subFile)));
      } else {
        files.push(subFile);
      }

      return files;
    } catch (error) {
      return [];
    }
  });
  const results = await Promise.all(promises);
  return [].concat(...results);
}

exports.walkDir = walkDir;
},{"./file-errors":"cNAA","./return-helper":"p3gl"}],"kca+":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Get the keys of the object in a way friendly to
 * the typescript compiler.
 * Taken from https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-353494273
 * @param o The object to get the keys of.
 */

function typed_keys(o) {
  return Object.keys(o);
}

exports.typed_keys = typed_keys;
},{}],"MG6C":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib"); // tslint:disable:helper-return


const defaultPath = tslib_1.__importStar(require("path"));

const consts_1 = require("../consts");

const group_resources_1 = require("./group-resources");

const namespace_1 = require("./namespace");

const namespace_2 = require("./parsing/namespace");

const promisified_fs_1 = require("./promisified-fs");

const return_helper_1 = require("./return-helper");

const typed_keys_1 = require("./third_party/typed-keys");
/**
 * Find the datapacks folder a file is in.
 * @param fileLocation The URI of the file
 * @param path The path module to use (allows for testing).
 */


function parseDataPath(fileLocation, path = defaultPath) {
  const parsed = path.parse(path.normalize(fileLocation));
  const dirs = parsed.dir.split(path.sep);
  const packsFolderIndex = dirs.findIndex(v => v.toLowerCase() === "datapacks");

  if (packsFolderIndex !== -1) {
    const remainder = dirs.slice(packsFolderIndex + 1);

    if (remainder.length >= 1) {
      let packsFolder = path.join(...dirs.slice(0, packsFolderIndex + 1)); // Ugly hack because path.join ignores a leading empty dir, leading to the result of
      // `/home/datapacks` going to `home/datapacks`

      if (path.sep === "/" && !path.isAbsolute(packsFolder)) {
        packsFolder = path.sep + packsFolder;
      }

      packsFolder = path.format({
        dir: packsFolder
      });
      const rest = path.join(...remainder.slice(1), parsed.base);
      return {
        packsFolder,
        pack: remainder[0],
        rest
      };
    }
  } else {
    const dataFolderIndex = dirs.findIndex(v => v.toLowerCase() === consts_1.DATAFOLDER); // There is at least a datapacks (or whatever) folder, and the datapack folder itself, which have indices 0 and 1 respectively (or 1 and 2 etc.)

    if (dataFolderIndex > 1) {
      const remainder = dirs.slice(dataFolderIndex - 1); // The datapack's folder name onwards

      if (remainder.length >= 1) {
        // Always true?
        let packsFolder = path.join(...dirs.slice(0, dataFolderIndex - 1)); // Ugly hack because path.join ignores a leading empty dir, leading to the result of
        // `/home/datapacks` going to `home/datapacks`

        if (path.sep === "/" && !path.isAbsolute(packsFolder)) {
          packsFolder = path.sep + packsFolder;
        }

        packsFolder = path.format({
          dir: packsFolder
        });
        const rest = path.join(...remainder.slice(1), parsed.base);
        return {
          packsFolder,
          pack: remainder[0],
          rest
        };
      }
    }
  }

  return undefined;
}

exports.parseDataPath = parseDataPath;
exports.resourceTypes = {
  advancements: {
    extension: ".json",
    mapFunction: async (v, packroot) => {
      const helper = new return_helper_1.ReturnHelper();

      try {
        const advancement = await promisified_fs_1.readJSONRaw(getPath(v, packroot, "advancements"));
        return helper.succeed(Object.assign({}, v, {
          data: Object.keys(advancement.criteria)
        }));
      } catch (e) {
        return helper.succeed(v);
      }
    },
    path: ["advancements"]
  },
  block_tags: {
    extension: ".json",
    mapFunction: async (v, packroot, globalData, packsInfo) => readTag(v, packroot, "block_tags", group_resources_1.getResourcesSplit("block_tags", globalData, packsInfo), s => globalData.blocks.hasOwnProperty(s)),
    path: ["tags", "blocks"]
  },
  entity_tags: {
    extension: ".json",
    mapFunction: async (v, packroot, globalData, packsInfo) => readTag(v, packroot, "entity_tags", group_resources_1.getResourcesSplit("entity_tags", globalData, packsInfo), s => group_resources_1.getMatching( // TODO: This is horrifically inefficient
    namespace_2.stringArrayToNamespaces([...globalData.registries["minecraft:entity_type"]]), namespace_1.convertToNamespace(s)).length > 0),
    path: ["tags", "entity_types"]
  },
  fluid_tags: {
    extension: ".json",
    mapFunction: async (v, packroot, globalData, packsInfo) => readTag(v, packroot, "fluid_tags", group_resources_1.getResourcesSplit("fluid_tags", globalData, packsInfo), s => group_resources_1.getMatching(namespace_2.stringArrayToNamespaces([...globalData.registries["minecraft:entity_type"]]), namespace_1.convertToNamespace(s)).length > 0),
    path: ["tags", "fluids"]
  },
  function_tags: {
    extension: ".json",
    mapFunction: async (v, packroot, globalData, packsInfo) => {
      const functions = group_resources_1.getResourcesSplit("functions", globalData, packsInfo);
      return readTag(v, packroot, "function_tags", group_resources_1.getResourcesSplit("function_tags", globalData, packsInfo), s => group_resources_1.getMatching(functions, namespace_1.convertToNamespace(s)).length > 0);
    },
    path: ["tags", "functions"]
  },
  functions: {
    extension: ".mcfunction",
    path: ["functions"]
  },
  item_tags: {
    extension: ".json",
    mapFunction: async (v, packroot, globalData, packsInfo) => readTag(v, packroot, "item_tags", group_resources_1.getResourcesSplit("item_tags", globalData, packsInfo), s => globalData.registries["minecraft:item"].has(s)),
    path: ["tags", "items"]
  },
  loot_tables: {
    extension: ".json",
    path: ["loot_tables"]
  },
  recipes: {
    extension: ".json",
    path: ["recipes"]
  },
  structures: {
    extension: ".nbt",
    path: ["structures"]
  }
};

function getKindAndNamespace(rest, path = defaultPath) {
  const sections = path.normalize(rest).split(path.sep);

  if (sections[0] === consts_1.DATAFOLDER && sections.length > 2) {
    // Namespace,data,
    const remainder = sections.splice(2);

    for (const kind of typed_keys_1.typed_keys(exports.resourceTypes)) {
      const typeInfo = exports.resourceTypes[kind];

      if (typeInfo.path.every((v, i) => remainder[i] === v)) {
        const namespace = sections[1];
        const further = remainder.slice(typeInfo.path.length);

        if (further.length > 0) {
          const last = further[further.length - 1];

          if (path.extname(last) === typeInfo.extension) {
            const pth = path.join(...further.slice(0, -1), last.slice(0, -typeInfo.extension.length)).replace(consts_1.SLASHREPLACEREGEX, consts_1.SLASH);
            return {
              kind,
              location: {
                namespace,
                path: pth
              }
            };
          }
        }
      }
    }
  }

  return undefined;
}

exports.getKindAndNamespace = getKindAndNamespace;

function getPath(resource, packroot, kind, path = defaultPath) {
  return path.join(packroot, consts_1.DATAFOLDER, resource.namespace, ...exports.resourceTypes[kind].path, resource.path.replace(consts_1.SLASHREGEX, path.sep).concat(exports.resourceTypes[kind].extension));
}

exports.getPath = getPath;

function buildPath(resource, packs, kind, path = defaultPath) {
  if (resource.pack !== undefined) {
    const pack = packs.packs[resource.pack];
    return getPath(resource, path.join(packs.location, pack.name), kind, path);
  } else {
    return undefined;
  }
}

exports.buildPath = buildPath;

async function readTag(resource, packRoot, type, options, isKnown) {
  const helper = new return_helper_1.ReturnHelper();
  const filePath = getPath(resource, packRoot, type);
  const tag = await promisified_fs_1.readJSON(filePath);

  if (helper.merge(tag)) {
    if (helper.addFileErrorIfFalse(!!tag.data.values, filePath, "InvalidTagNoValues", `tag does not have a values key: ${JSON.stringify(tag.data)}`)) {
      if (helper.addFileErrorIfFalse(Array.isArray(tag.data.values), filePath, "InvalidTagValuesNotArray", `tag values is not an array: ${JSON.stringify(tag.data.values)}`)) {
        if (helper.addFileErrorIfFalse( // tslint:disable-next-line:strict-type-predicates
        tag.data.values.every(v => typeof v === "string"), filePath, "InvalidTagValuesNotString", `tag values contains a non string value: ${JSON.stringify(tag.data.values)}`)) {
          const seen = new Set();
          const duplicates = new Set();
          const unknowns = new Set();

          for (const v of tag.data.values) {
            if (v.startsWith(consts_1.TAG_START)) {
              const tagText = v.slice(1);
              const tagNamespace = namespace_1.convertToNamespace(tagText);
              const tagName = namespace_1.stringifyNamespace(tagNamespace);
              const tagString = `#${tagName}`;
              const result = group_resources_1.getMatching(options, tagNamespace);

              if (result.length === 0) {
                unknowns.add(tagString);
              }

              if (seen.has(tagString)) {
                duplicates.add(tagString);
              }

              seen.add(tagString);
            } else {
              const valueNamespace = namespace_1.convertToNamespace(v);
              const value = namespace_1.stringifyNamespace(valueNamespace);

              if (seen.has(value)) {
                duplicates.add(value);
              }

              seen.add(value);

              if (!isKnown(value)) {
                unknowns.add(value);
              }
            }
          }

          helper.addFileErrorIfFalse(duplicates.size === 0, filePath, "InvalidTagValuesDuplicates", `Tag contains duplicate values: "${[...duplicates].join('", "')}"`);
          helper.addFileErrorIfFalse(unknowns.size === 0, filePath, "InvalidTagValuesUnknown", `Tag contains unknown values: "${[...unknowns].join('", "')}"`);
          return helper.succeed(Object.assign({}, resource, {
            data: tag.data
          }));
        }
      }
    }
  }

  return helper.succeed(resource);
}
},{"../consts":"xb+0","./group-resources":"23cw","./namespace":"CWtC","./parsing/namespace":"AgEN","./promisified-fs":"tSk9","./return-helper":"p3gl","./third_party/typed-keys":"kca+"}],"4xli":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const sprintf_js_1 = require("sprintf-js");

function shouldTranslate() {
  return mcLangSettings.translation.lang.toLowerCase() !== "en-us";
}

exports.shouldTranslate = shouldTranslate;

function MCFormat(base, ...substitutions) {
  return sprintf_js_1.vsprintf(base, substitutions);
}

exports.MCFormat = MCFormat;
},{}],"BiFC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const main_1 = require("vscode-languageserver/lib/main");

const creators_1 = require("./creators");

const translation_1 = require("./translation");
/**
 * Turn a command error into a language server diagnostic
 */


function commandErrorToDiagnostic(error, line) {
  const range = {
    end: {
      line,
      character: error.range.end
    },
    start: {
      line,
      character: error.range.start
    }
  }; // Run Translation stuff on the error?

  const text = translation_1.shouldTranslate() ? `'${error.text}': Translation is not yet supported` // Translate(error.code)
  : error.text;
  return main_1.Diagnostic.create(range, text, error.severity, error.code, "mcfunction");
}

exports.commandErrorToDiagnostic = commandErrorToDiagnostic;

function runChanges(changes, functionInfo) {
  const changed = [];

  for (const change of changes.contentChanges) {
    if (!!change.range) {
      // Appease the compiler, as the change interface seems to have range optional
      const {
        start,
        end
      } = change.range;
      const newLineContent = functionInfo.lines[start.line].text.substring(0, start.character).concat(change.text, functionInfo.lines[end.line].text.substring(end.character));
      const difference = end.line - start.line + 1;
      const newLines = creators_1.splitLines(newLineContent);
      functionInfo.lines.splice(start.line, difference, ...newLines);
      changed.forEach((v, i) => {
        if (v > start.line) {
          changed[i] = v - difference + newLines.length;
        }
      });
      changed.push(...Array.from(new Array(newLines.length), (_, i) => start.line + i));
    }
  }

  const unique = changed.filter((value, index, self) => self.indexOf(value) === index);
  unique.sort((a, b) => a - b);
  return unique;
}

exports.runChanges = runChanges;
},{"./creators":"NmKP","./translation":"4xli"}],"H7Mf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function followPath(tree, path) {
  // There are no protections here, because if a path is given it should be correct.
  let current = tree;

  for (const section of path) {
    if (!!current.children && !!current.children[section]) {
      current = current.children[section];
    }
  }

  return current;
}

exports.followPath = followPath;

function getNextNode(node, // Allow use of node.redirect without a tsignore
nodePath, tree) {
  const redirect = node.redirect;

  if (!!redirect) {
    return {
      node: followPath(tree, redirect),
      path: redirect
    };
  } else {
    if (!node.children && !node.executable) {
      // In this case either tree is malformed or in `execute run`
      // So we just return the entire tree
      return {
        node: tree,
        path: []
      };
    }

    return {
      node,
      path: nodePath
    };
  }
}

exports.getNextNode = getNextNode;
},{}],"tgUj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const path = tslib_1.__importStar(require("path"));

const promisified_fs_1 = require("../misc-functions/promisified-fs");

const typed_keys_1 = require("../misc-functions/third_party/typed-keys");

if (!process.env.MCFUNCTION_CACHE_DIR) {
  throw new Error("Environment variable MCFUNCTION_CACHE_DIR must be set");
}

exports.cacheFolder = process.env.MCFUNCTION_CACHE_DIR;
const cacheFileNames = {
  blocks: "blocks.json",
  commands: "commands.json",
  meta_info: "meta_info.json",
  resources: "resources.json"
};
const registriesCacheFile = "registries.json";

async function readCache() {
  const data = {};
  const keys = typed_keys_1.typed_keys(cacheFileNames);
  await Promise.all([...keys.map(async key => {
    const cacheDir = cacheFileNames[key];
    data[key] = await promisified_fs_1.readJSONRaw(path.join(exports.cacheFolder, cacheDir));
  }), readRegistries(data)]);
  return data;
}

exports.readCache = readCache;

async function readRegistries(data) {
  const read = await promisified_fs_1.readJSONRaw(path.join(exports.cacheFolder, registriesCacheFile));
  data.registries = {};

  for (const key of typed_keys_1.typed_keys(read)) {
    data.registries[key] = new Set(read[key]);
  }
}

async function cacheData(data) {
  try {
    await promisified_fs_1.mkdirAsync(exports.cacheFolder, "777");
  } catch (_) {// Don't use the error, which is normally thrown if the folder already exists
  }

  const keys = typed_keys_1.typed_keys(cacheFileNames);
  await Promise.all([...keys.map(async key => promisified_fs_1.writeJSON(path.join(exports.cacheFolder, cacheFileNames[key]), data[key])), cacheRegistry(data.registries)]);
}

exports.cacheData = cacheData;

async function cacheRegistry(registries) {
  const toWrite = {};

  for (const key of typed_keys_1.typed_keys(registries)) {
    toWrite[key] = [...registries[key]];
  }

  await promisified_fs_1.writeJSON(path.join(exports.cacheFolder, registriesCacheFile), toWrite);
}

async function storeSecurity(security) {
  await promisified_fs_1.saveFileAsync(path.join(exports.cacheFolder, "security.json"), JSON.stringify(security));
}

exports.storeSecurity = storeSecurity;

async function readSecurity() {
  try {
    return await promisified_fs_1.readJSONRaw(path.join(exports.cacheFolder, "security.json"));
  } catch (error) {
    return {};
  }
}

exports.readSecurity = readSecurity;
},{"../misc-functions/promisified-fs":"tSk9","../misc-functions/third_party/typed-keys":"kca+"}],"tvqu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const cache_1 = require("../data/cache");
/**
 * Check if the given change requires security confirmation
 */


function securityIssues(settings, security) {
  const results = [];

  if (!!settings.data) {
    if (!!settings.data.customJar && security.JarPath !== true) {
      results.push("JarPath");
    }

    if (!!settings.data.javaPath && security.JavaPath !== true) {
      results.push("JavaPath");
    }
  }

  if (!!settings.parsers
  /* && security.CustomParsers !== true */
  ) {
      /* const names = Object.keys(settings.parsers);
      if (names.length > 0) {
          results.push("CustomParsers");
      } */
      throw new Error(`Custom parsers are not supported for client implementations.
To request this feature be enabled, open an issue at https://github.com/Levertion/mcfunction-langserver`);
    }

  return results;
}

exports.securityIssues = securityIssues;

async function actOnSecurity(issues, connection, security) {
  let securityChanged = false;

  const resave = async () => {
    if (securityChanged) {
      await cache_1.storeSecurity(security);
    }
  };

  for (const issue of issues) {
    const response = await Promise.resolve(connection.window.showErrorMessage(`[MCFUNCTION] You have the potentially insecure setting '${issue}' set, but no confirmation has been recieved.`, {
      title: "Yes"
    }, {
      title: "No (Stops server)"
    }));

    if (!!response && response.title === "Yes") {
      security[issue] = true;
      securityChanged = true;
    } else {
      return false;
    }
  }

  await resave();
  return true;
}

exports.actOnSecurity = actOnSecurity;
},{"../data/cache":"tgUj"}],"8ePp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function setup_logging(connection) {
  const log = message => {
    connection.console.log(message);
  }; // tslint:disable-next-line:prefer-object-spread


  global.mcLangLog = Object.assign(log, {
    internal: m => {
      if (mcLangSettings.trace.internalLogging) {
        log(`[McFunctionInternal] ${m}`);
      }
    }
  });
}

exports.setup_logging = setup_logging;
},{}],"lcVC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const main_1 = require("vscode-languageserver/lib/main");

const __1 = require("..");

const consts_1 = require("../../consts");

const namespace_1 = require("./namespace");
/**
 * Parse a namespace or tag.
 * Returned:
 *  - values are the resources which are the exact matches
 *  - resolved are the lowest level tag members
 *  - parsed is the literal tag. If parsed exists, but not resolved/values, then it was a non-tag
 *  - if not successful, if data undefined then parsing failed.
 *  - if data is a value, then a tag parsed but was unknown
 */


function parseNamespaceOrTag(reader, info, taghandling) {
  const helper = new __1.ReturnHelper(info);
  const start = reader.cursor;

  if (reader.peek() === consts_1.TAG_START) {
    reader.skip();

    if (typeof taghandling === "string") {
      const tags = __1.getResourcesofType(info.data, taghandling);

      const parsed = namespace_1.parseNamespaceOption(reader, tags, main_1.CompletionItemKind.Folder);

      if (helper.merge(parsed)) {
        const values = parsed.data.values;
        const resolved = [];

        for (const value of values) {
          resolved.push(...getLowestForTag(value, tags));
        }

        return helper.succeed({
          parsed: parsed.data.literal,
          resolved,
          values
        });
      } else {
        return helper.failWithData(parsed.data);
      }
    } else {
      namespace_1.readNamespaceText(reader);
      return helper.fail(taghandling.create(start, reader.cursor));
    }
  } else {
    if (!reader.canRead() && typeof taghandling === "string") {
      helper.addSuggestion(reader.cursor, consts_1.TAG_START, main_1.CompletionItemKind.Operator);
    }

    const parsed = namespace_1.parseNamespace(reader);

    if (helper.merge(parsed)) {
      return helper.succeed({
        parsed: parsed.data
      });
    } else {
      return helper.fail();
    }
  }
}

exports.parseNamespaceOrTag = parseNamespaceOrTag;

function getLowestForTag(tag, options) {
  if (!tag.data) {
    return [];
  }

  const results = [];

  for (const tagMember of tag.data.values) {
    if (tagMember[0] === consts_1.TAG_START) {
      const namespace = __1.convertToNamespace(tagMember.substring(1));

      for (const option of options) {
        if (__1.namespacesEqual(namespace, option)) {
          results.push(...getLowestForTag(option, options));
        }
      }
    } else {
      results.push(__1.convertToNamespace(tagMember));
    }
  }

  return results;
}

function buildTagActions(tags, low, high, type, localData) {
  const helper = new __1.ReturnHelper();

  for (const resource of tags) {
    if (resource.data) {
      helper.addActions({
        data: `\`\`\`json
${JSON.stringify(resource.data, undefined, 4)}
\`\`\``,
        high,
        low,
        type: "hover"
      });
    }

    if (localData) {
      const location = __1.buildPath(resource, localData, type);

      if (location) {
        helper.addActions({
          data: location,
          high,
          low,
          type: "source"
        });
      }
    }
  }

  return helper.succeed();
}

exports.buildTagActions = buildTagActions;
},{"..":"KBGm","../../consts":"xb+0","./namespace":"AgEN"}],"KBGm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

tslib_1.__exportStar(require("./context"), exports);

tslib_1.__exportStar(require("./creators"), exports);

tslib_1.__exportStar(require("./datapack-folder"), exports);

tslib_1.__exportStar(require("./file-errors"), exports);

tslib_1.__exportStar(require("./group-resources"), exports);

tslib_1.__exportStar(require("./lsp-conversions"), exports);

tslib_1.__exportStar(require("./namespace"), exports);

tslib_1.__exportStar(require("./node-tree"), exports);

tslib_1.__exportStar(require("./promisified-fs"), exports);

tslib_1.__exportStar(require("./return-helper"), exports);

tslib_1.__exportStar(require("./security"), exports);

tslib_1.__exportStar(require("./setup"), exports);

tslib_1.__exportStar(require("./translation"), exports);

tslib_1.__exportStar(require("./parsing/namespace"), exports);

tslib_1.__exportStar(require("./parsing/nmsp-tag"), exports);
},{"./context":"UbUk","./creators":"NmKP","./datapack-folder":"MG6C","./file-errors":"cNAA","./group-resources":"23cw","./lsp-conversions":"BiFC","./namespace":"CWtC","./node-tree":"H7Mf","./promisified-fs":"tSk9","./return-helper":"p3gl","./security":"tvqu","./setup":"8ePp","./translation":"4xli","./parsing/namespace":"AgEN","./parsing/nmsp-tag":"lcVC"}],"iLhI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const misc_functions_1 = require("../misc-functions");

const typed_keys_1 = require("../misc-functions/third_party/typed-keys");

const errors_1 = require("./errors");

const EXCEPTIONS = {
  EXPECTED_BOOL: new errors_1.CommandErrorBuilder("parsing.bool.expected", "Expected bool"),
  EXPECTED_END_OF_QUOTE: new errors_1.CommandErrorBuilder("parsing.quote.expected.end", "Unclosed quoted string"),
  EXPECTED_FLOAT: new errors_1.CommandErrorBuilder("parsing.float.expected", "Expected float"),
  EXPECTED_INT: new errors_1.CommandErrorBuilder("parsing.int.expected", "Expected integer"),
  EXPECTED_START_OF_QUOTE: new errors_1.CommandErrorBuilder("parsing.quote.expected.start", "Expected quote to start a string"),
  EXPECTED_STRING_FROM: new errors_1.CommandErrorBuilder("parsing.expected.option", "Expected string from [%s], got '%s'"),
  EXPECTED_SYMBOL: new errors_1.CommandErrorBuilder("parsing.expected", "Expected '%s'"),
  INVALID_BOOL: new errors_1.CommandErrorBuilder("parsing.bool.invalid", "Invalid bool, expected true or false but found '%s'"),
  INVALID_ESCAPE: new errors_1.CommandErrorBuilder("parsing.quote.escape", "Invalid escape sequence '\\%s' in quoted string)"),
  INVALID_FLOAT: new errors_1.CommandErrorBuilder("parsing.float.invalid", "Invalid float '%s'"),
  INVALID_INT: new errors_1.CommandErrorBuilder("parsing.int.invalid", "Invalid integer '%s'")
};
const QUOTE = '"';
const SINGLE_QUOTE = "'";
const ESCAPE = "\\";

class StringReader {
  constructor(stringToRead) {
    this.cursor = 0;
    this.string = stringToRead;
  }

  static isQuotedStringStart(char) {
    return char === QUOTE || char === SINGLE_QUOTE;
  }

  canRead(length = 1) {
    return this.cursor + length <= this.string.length;
  }
  /**
   * Require that a specific string follows
   * @param str The string which should come next
   */


  expect(str) {
    const helper = new misc_functions_1.ReturnHelper();

    if (str.startsWith(this.getRemaining())) {
      helper.addSuggestions({
        start: this.cursor,
        text: str
      });
    }

    const sub = this.string.substr(this.cursor, str.length);

    if (sub !== str) {
      return helper.fail(EXCEPTIONS.EXPECTED_SYMBOL.create(this.cursor, Math.min(this.string.length, this.cursor + str.length), str));
    }

    this.cursor += str.length;
    return helper.succeed();
  }

  expectOption(...options) {
    const helper = new misc_functions_1.ReturnHelper();
    const start = this.cursor;
    let out;

    for (const s of options) {
      if (helper.merge(this.expect(s), {
        errors: false
      })) {
        if (!out || s.length > out.length) {
          out = s;
        }

        this.cursor = start;
      }
    }

    if (!out) {
      return helper.fail(EXCEPTIONS.EXPECTED_STRING_FROM.create(start, Math.min(this.getTotalLength(), start + Math.max(...options.map(v => v.length))), options.join(), this.getRemaining()));
    }

    this.cursor += out.length;
    return helper.succeed(out);
  }

  getRead() {
    return this.string.substring(0, this.cursor);
  }

  getRemaining() {
    return this.string.substring(this.cursor);
  }

  getRemainingLength() {
    return this.string.length - this.cursor;
  }

  getTotalLength() {
    return this.string.length;
  }

  peek(offset = 0) {
    return this.string.charAt(this.cursor + offset);
  }

  read() {
    return this.string.charAt(this.cursor++);
  }
  /**
   * Read a boolean value from the string
   */


  readBoolean(quoting) {
    const helper = new misc_functions_1.ReturnHelper();
    const start = this.cursor;
    const value = this.readOption(typed_keys_1.typed_keys(StringReader.bools), quoting);

    if (!helper.merge(value)) {
      if (value.data !== undefined) {
        return helper.fail(EXCEPTIONS.INVALID_BOOL.create(start, this.cursor, value.data));
      } else {
        return helper.fail();
      }
    }

    return helper.succeed(StringReader.bools[value.data]);
  }
  /**
   * Read a float from the string
   */


  readFloat() {
    const helper = new misc_functions_1.ReturnHelper();
    const start = this.cursor;
    const readToTest = this.readWhileRegexp(StringReader.charAllowedNumber);

    if (readToTest.length === 0) {
      return helper.fail(EXCEPTIONS.EXPECTED_FLOAT.create(start, this.string.length));
    } // The Java readInt throws upon multiple `.`s, but Javascript's doesn't


    if ((readToTest.match(/\./g) || []).length > 1) {
      return helper.fail(EXCEPTIONS.INVALID_FLOAT.create(start, this.cursor, this.string.substring(start, this.cursor)));
    }

    try {
      return helper.succeed(parseFloat(readToTest));
    } catch (error) {
      return helper.fail(EXCEPTIONS.INVALID_FLOAT.create(start, this.cursor, readToTest));
    }
  }
  /**
   * Read an integer from the string
   */


  readInt() {
    const helper = new misc_functions_1.ReturnHelper();
    const start = this.cursor;
    const readToTest = this.readWhileRegexp(StringReader.charAllowedNumber);

    if (readToTest.length === 0) {
      return helper.fail(EXCEPTIONS.EXPECTED_INT.create(start, this.string.length));
    } // The Java readInt throws upon a `.`, but the regex includes one in brigadier
    // This handles this case


    if (readToTest.indexOf(".") !== -1) {
      return helper.fail(EXCEPTIONS.INVALID_INT.create(start, this.cursor, this.string.substring(start, this.cursor)));
    }

    try {
      return helper.succeed(Number.parseInt(readToTest, 10));
    } catch (error) {
      return helper.fail(EXCEPTIONS.INVALID_INT.create(start, this.cursor, readToTest));
    }
  }
  /**
   * Expect a string from a selection
   * @param quoteKind how should the string be handled.
   * - `both`: StringReader::readString()
   * - `yes`: StringReader::readQuotedString()
   * - `no`: StringReader::readUnquotedString()
   */


  readOption(options, quoteKind = StringReader.defaultQuotingInfo, completion) {
    const start = this.cursor;
    const helper = new misc_functions_1.ReturnHelper();
    const result = this.readOptionInner(quoteKind); // Reading failed, which must be due to an invalid quoted string

    if (!helper.merge(result, {
      suggestions: false
    })) {
      if (result.data && !this.canRead()) {
        const bestEffort = result.data;
        helper.addSuggestions(...options.filter(option => option.startsWith(bestEffort)).map(v => completionForString(v, start, quoteKind, completion)));
      }

      return helper.fail();
    }

    const valid = options.some(opt => opt === result.data);

    if (!this.canRead()) {
      helper.addSuggestions(...options.filter(opt => opt.startsWith(result.data)).map(v => completionForString(v, start, quoteKind, completion)));
    }

    if (valid) {
      return helper.succeed(result.data);
    } else {
      /* if (addError) {
          helper.addErrors(
              EXCEPTIONS.EXPECTED_STRING_FROM.create(
                  start,
                  this.cursor,
                  JSON.stringify(options),
                  result.data
              )
          );
      } */
      return helper.failWithData(result.data);
    }
  }
  /**
   * Read from the string, returning a string, which, in the original had been surrounded by quotes
   */


  readQuotedString() {
    const helper = new misc_functions_1.ReturnHelper();
    const start = this.cursor;

    if (!this.canRead()) {
      return helper.succeed("");
    }

    const terminator = this.peek();

    if (!StringReader.isQuotedStringStart(terminator)) {
      return helper.fail(EXCEPTIONS.EXPECTED_START_OF_QUOTE.create(this.cursor, this.string.length));
    }

    let result = "";
    let escaped = false;

    while (this.canRead()) {
      this.skip();
      const char = this.peek();

      if (escaped) {
        if (char === terminator || char === ESCAPE) {
          result += char;
          escaped = false;
        } else {
          this.skip();
          return helper.fail(EXCEPTIONS.INVALID_ESCAPE.create(this.cursor - 2, this.cursor, char)); // Includes backslash
        }
      } else if (char === ESCAPE) {
        escaped = true;
      } else if (char === terminator) {
        this.skip();
        return helper.succeed(result);
      } else {
        result += char;
      }
    }

    return helper.addSuggestion(this.cursor, terminator) // Always cannot read at this point
    .addErrors(EXCEPTIONS.EXPECTED_END_OF_QUOTE.create(start, this.string.length)).failWithData(result);
  }
  /**
   * Read a string from the string. If it surrounded by quotes, the quotes are ignored.
   * The cursor ends on the last character in the string.
   */


  readString(unquotedRegex = StringReader.charAllowedInUnquotedString) {
    const helper = new misc_functions_1.ReturnHelper();

    if (this.canRead() && StringReader.isQuotedStringStart(this.peek())) {
      return helper.return(this.readQuotedString());
    } else {
      if (!this.canRead()) {
        helper.addSuggestions({
          start: this.cursor,
          text: QUOTE
        });
      }

      return helper.succeed(this.readWhileRegexp(unquotedRegex));
    }
  }
  /**
   * Read a string which is not surrounded by quotes.
   * Can only contain alphanumerical characters, _,+,. and -
   */


  readUnquotedString() {
    return this.readWhileRegexp(StringReader.charAllowedInUnquotedString);
  }
  /**
   * Read the string until a certain regular expression matches the
   * character under the cursor.
   * @param exp The Regular expression to test against.
   */


  readUntilRegexp(exp) {
    return this.readWhileFunction(s => !exp.test(s));
  }
  /**
   * Read while a certain function returns true on each consecutive character starting with the one under the cursor.
   * In most cases, it is better to use readWhileRegexp.
   * @param callback The function to use.
   */


  readWhileFunction(callback) {
    const begin = this.cursor;

    while (callback(this.peek())) {
      if (this.canRead()) {
        this.skip();
      } else {
        return this.string.substring(begin);
      }
    }

    return this.string.substring(begin, this.cursor);
  }
  /**
   * Read the string while a certain regular expression matches the character under the cursor.
   * The cursor ends on the first character which doesn't match
   * @param exp The Regular Expression to test against
   */


  readWhileRegexp(exp) {
    return this.readWhileFunction(s => exp.test(s));
  }

  skip() {
    this.cursor++;
  }

  skipWhitespace() {
    this.readWhileRegexp(/\s/); // Whitespace
  }

  readOptionInner(info) {
    // tslint:disable:helper-return
    if (info.quote) {
      return this.readString(info.unquoted);
    } else {
      if (info.unquoted) {
        return misc_functions_1.getReturned(this.readWhileRegexp(info.unquoted));
      } else {
        throw new Error("Quoting kind which doesn't support quoting or any characters");
      }
    } // tslint:enable:helper-return

  }

}

StringReader.charAllowedInUnquotedString = /^[0-9A-Za-z_\-\.+]$/;
StringReader.charAllowedNumber = /^[0-9\-\.]$/;
StringReader.defaultQuotingInfo = {
  quote: true,
  unquoted: StringReader.charAllowedInUnquotedString
};
StringReader.bools = {
  true: true,
  false: false
};
exports.StringReader = StringReader;

function completionForString(value, start, quoting, kind) {
  return {
    kind,
    start,
    text: quoteIfNeeded(value, quoting)
  };
}

exports.completionForString = completionForString;

function quoteIfNeeded(value, quoting = StringReader.defaultQuotingInfo) {
  if (!quoting.quote) {
    return value;
  } else {
    if (quoting.unquoted) {
      for (const char of value) {
        if (!char.match(quoting.unquoted)) {
          return QUOTE + escapeQuotes(value) + QUOTE;
        }
      }

      return value;
    }

    return QUOTE + escapeQuotes(value) + QUOTE;
  }
}

exports.quoteIfNeeded = quoteIfNeeded;

function escapeQuotes(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

exports.READER_EXCEPTIONS = EXCEPTIONS;
},{"../misc-functions":"KBGm","../misc-functions/third_party/typed-keys":"kca+","./errors":"aP4V"}],"Q/Gg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const main_1 = require("vscode-languageserver/lib/main");

const misc_functions_1 = require("../../misc-functions");

exports.boolParser = {
  kind: main_1.CompletionItemKind.Keyword,
  parse: (reader, props) => misc_functions_1.prepareForParser(reader.readBoolean(), props)
};
},{"../../misc-functions":"KBGm"}],"npD7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const errors_1 = require("../../brigadier/errors");

const misc_functions_1 = require("../../misc-functions"); // tslint:disable:binary-expression-operand-order
// Approx


const JAVAMINDOUBLE = -1.8 * 10 ** 308;
const JAVAMAXDOUBLE = 1.8 * 10 ** 308; // tslint:enable:binary-expression-operand-order

const DOUBLEEXCEPTIONS = {
  TOOBIG: new errors_1.CommandErrorBuilder("argument.double.big", "Float must not be more than %s, found %s"),
  TOOSMALL: new errors_1.CommandErrorBuilder("argument.double.low", "Float must not be less than %s, found %s")
};
exports.doubleParser = {
  parse: (reader, properties) => {
    const helper = new misc_functions_1.ReturnHelper(properties);
    const start = reader.cursor;
    const result = reader.readFloat();

    if (!helper.merge(result)) {
      return helper.fail();
    }

    const maxVal = properties.node_properties.max;
    const minVal = properties.node_properties.min; // See https://stackoverflow.com/a/12957445

    const max = Math.min(typeof maxVal === "number" ? maxVal : JAVAMAXDOUBLE, JAVAMAXDOUBLE);
    const min = Math.max(typeof minVal === "number" ? minVal : JAVAMINDOUBLE, JAVAMINDOUBLE);

    if (result.data > max) {
      helper.addErrors(DOUBLEEXCEPTIONS.TOOBIG.create(start, reader.cursor, max.toString(), result.data.toString()));
    }

    if (result.data < min) {
      helper.addErrors(DOUBLEEXCEPTIONS.TOOSMALL.create(start, reader.cursor, min.toString(), result.data.toString()));
    }

    return helper.succeed();
  }
};
},{"../../brigadier/errors":"aP4V","../../misc-functions":"KBGm"}],"2AVt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const errors_1 = require("../../brigadier/errors");

const misc_functions_1 = require("../../misc-functions"); // tslint:disable:binary-expression-operand-order
// Approx


const JAVAMINFLOAT = -3.4 * 10 ** 38;
const JAVAMAXFLOAT = 3.4 * 10 ** 38; // tslint:enable:binary-expression-operand-order

const FLOATEXCEPTIONS = {
  TOOBIG: new errors_1.CommandErrorBuilder("argument.float.big", "Float must not be more than %s, found %s"),
  TOOSMALL: new errors_1.CommandErrorBuilder("argument.float.low", "Float must not be less than %s, found %s")
};
exports.floatParser = {
  parse: (reader, properties) => {
    const helper = new misc_functions_1.ReturnHelper(properties);
    const start = reader.cursor;
    const result = reader.readFloat();

    if (!helper.merge(result)) {
      return helper.fail();
    }

    const maxVal = properties.node_properties.max;
    const minVal = properties.node_properties.min; // See https://stackoverflow.com/a/12957445

    const max = Math.min(typeof maxVal === "number" ? maxVal : JAVAMAXFLOAT, JAVAMAXFLOAT);
    const min = Math.max(typeof minVal === "number" ? minVal : JAVAMINFLOAT, JAVAMINFLOAT);

    if (result.data > max) {
      helper.addErrors(FLOATEXCEPTIONS.TOOBIG.create(start, reader.cursor, max.toString(), result.data.toString()));
    }

    if (result.data < min) {
      helper.addErrors(FLOATEXCEPTIONS.TOOSMALL.create(start, reader.cursor, min.toString(), result.data.toString()));
    }

    return helper.succeed();
  }
};
},{"../../brigadier/errors":"aP4V","../../misc-functions":"KBGm"}],"IAMg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const errors_1 = require("../../brigadier/errors");

const consts_1 = require("../../consts");

const misc_functions_1 = require("../../misc-functions");

const INTEGEREXCEPTIONS = {
  TOOBIG: new errors_1.CommandErrorBuilder("argument.integer.big", "Integer must not be more than %s, found %s"),
  TOOSMALL: new errors_1.CommandErrorBuilder("argument.integer.low", "Integer must not be less than %s, found %s")
};
exports.intParser = {
  parse: (reader, properties) => {
    const helper = new misc_functions_1.ReturnHelper(properties);
    const start = reader.cursor;
    const result = reader.readInt();

    if (!helper.merge(result)) {
      return helper.fail();
    }

    const maxVal = properties.node_properties.max;
    const minVal = properties.node_properties.min; // See https://stackoverflow.com/a/12957445

    const max = Math.min(typeof maxVal === "number" ? maxVal : consts_1.JAVAMAXINT, consts_1.JAVAMAXINT);
    const min = Math.max(typeof minVal === "number" ? minVal : consts_1.JAVAMININT, consts_1.JAVAMININT);

    if (result.data > max) {
      helper.addErrors(INTEGEREXCEPTIONS.TOOBIG.create(start, reader.cursor, max.toString(), result.data.toString()));
    }

    if (result.data < min) {
      helper.addErrors(INTEGEREXCEPTIONS.TOOSMALL.create(start, reader.cursor, min.toString(), result.data.toString()));
    }

    return helper.succeed();
  }
};
},{"../../brigadier/errors":"aP4V","../../consts":"xb+0","../../misc-functions":"KBGm"}],"oM/0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const misc_functions_1 = require("../../misc-functions");

exports.stringParser = {
  parse: (reader, properties) => {
    const helper = new misc_functions_1.ReturnHelper(properties);

    switch (properties.node_properties.type) {
      case "greedy":
        reader.cursor = reader.string.length;
        return helper.succeed();

      case "word":
        reader.readUnquotedString();
        return helper.succeed();

      default:
        if (helper.merge(reader.readString())) {
          return helper.succeed();
        } else {
          return helper.fail();
        }

    }
  }
};
},{"../../misc-functions":"KBGm"}],"GcLj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

tslib_1.__exportStar(require("./bool"), exports);

tslib_1.__exportStar(require("./double"), exports);

tslib_1.__exportStar(require("./float"), exports);

tslib_1.__exportStar(require("./integer"), exports);

tslib_1.__exportStar(require("./string"), exports);
},{"./bool":"Q/Gg","./double":"npD7","./float":"2AVt","./integer":"IAMg","./string":"oM/0"}],"38DR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const main_1 = require("vscode-languageserver/lib/main");

const misc_functions_1 = require("../misc-functions");

exports.literalParser = {
  kind: main_1.CompletionItemKind.Method,
  parse: (reader, properties) => {
    const helper = new misc_functions_1.ReturnHelper(properties);
    const begin = reader.cursor;
    const literal = properties.path[properties.path.length - 1];

    if (properties.suggesting && literal.startsWith(reader.getRemaining())) {
      helper.addSuggestions(literal);
    }

    if (reader.canRead(literal.length)) {
      const end = begin + literal.length;

      if (reader.string.substring(begin, end) === literal) {
        reader.cursor = end;

        if (reader.peek() === " " || !reader.canRead()) {
          return helper.succeed();
        }
      }
    }

    return helper.fail();
  }
};
},{"../misc-functions":"KBGm"}],"7iV1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Blank items for testing
 */
// tslint:disable-next-line:variable-name This allows for the property declaration shorthand

exports.pack_segments = {
  pack: "",
  packsFolder: "",
  rest: ""
};
exports.succeeds = {
  succeeds: true
};

exports.emptyRange = () => ({
  start: 0,
  end: 0
});

exports.blankproperties = {
  context: {},
  data: {},
  node_properties: {},
  path: ["test"]
};
const set = new Set();
exports.emptyGlobal = {
  blocks: {},
  commands: {
    type: "root"
  },
  jsonService: undefined,
  meta_info: {
    version: ""
  },
  nbt_docs: new Map(),
  registries: {
    // tslint:disable:object-literal-sort-keys - very little value
    "minecraft:block": set,
    "minecraft:fluid": set,
    "minecraft:sound_event": set,
    "minecraft:mob_effect": set,
    "minecraft:enchantment": set,
    "minecraft:entity_type": set,
    "minecraft:item": set,
    "minecraft:potion": set,
    "minecraft:carver": set,
    "minecraft:surface_builder": set,
    "minecraft:feature": set,
    "minecraft:decorator": set,
    "minecraft:biome": set,
    "minecraft:particle_type": set,
    "minecraft:biome_source_type": set,
    "minecraft:block_entity_type": set,
    "minecraft:chunk_generator_type": set,
    "minecraft:dimension_type": set,
    "minecraft:motive": set,
    "minecraft:custom_stat": set,
    "minecraft:chunk_status": set,
    "minecraft:structure_feature": set,
    "minecraft:structure_piece": set,
    "minecraft:rule_test": set,
    "minecraft:structure_processor": set,
    "minecraft:structure_pool_element": set,
    "minecraft:menu": set,
    "minecraft:recipe_type": set,
    "minecraft:recipe_serializer": set,
    "minecraft:stat_type": set,
    "minecraft:villager_type": set,
    "minecraft:villager_profession": set // tslint:enable:object-literal-sort-keys

  },
  resources: {}
};
exports.blankRange = {
  end: {
    line: 0,
    character: 0
  },
  start: {
    line: 0,
    character: 0
  }
};
},{}],"8FMe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const errors_1 = require("../../../../brigadier/errors");

const misc_functions_1 = require("../../../../misc-functions");

const tag_parser_1 = require("../tag-parser");

const nbt_util_1 = require("../util/nbt-util");

const nbt_tag_1 = require("./nbt-tag");

const NOVAL = new errors_1.CommandErrorBuilder("argument.nbt.list.noval", "Expected ']'");

class BaseList extends nbt_tag_1.NBTTag {
  constructor() {
    super(...arguments);
    this.values = [];
  }

  getValue() {
    return this.values;
  }

  parseInner(reader) {
    const helper = new misc_functions_1.ReturnHelper();

    if (helper.merge(reader.expect(nbt_util_1.LIST_END), {
      errors: false
    })) {
      return helper.succeed();
    }

    let index = 0;

    while (true) {
      this.unclosed = reader.cursor;
      const start = reader.cursor;
      reader.skipWhitespace();

      if (!reader.canRead()) {
        helper.addErrors(NOVAL.create(start, reader.cursor));
        return helper.fail();
      }

      const value = tag_parser_1.parseAnyNBTTag(reader, [...this.path, `[${index++}]`]);

      if (helper.merge(value)) {
        this.values.push(value.data.tag);
      } else {
        if (value.data) {
          this.values.push(value.data.tag);
          this.unclosed = undefined;
        }

        return helper.fail();
      }

      this.unclosed = undefined;
      const preEnd = reader.cursor;
      reader.skipWhitespace();

      if (helper.merge(reader.expect(nbt_util_1.LIST_VALUE_SEP), {
        errors: false
      })) {
        continue;
      }

      if (helper.merge(reader.expect(nbt_util_1.LIST_END), {
        errors: false
      })) {
        this.end = {
          start: preEnd,
          end: reader.cursor
        };
        return helper.succeed();
      }

      return helper.fail(NOVAL.create(preEnd, reader.cursor));
    }
  }

  setValue(val) {
    this.values = val;
    return this;
  }

  validateWith(node, children, walker) {
    const helper = new misc_functions_1.ReturnHelper();
    helper.addActions({
      data: nbt_util_1.getHoverText(node.node),
      high: this.start.end,
      low: this.start.start,
      type: "hover"
    });

    for (const value of this.values) {
      helper.merge(value.validate(children, walker));
    }

    if (typeof this.unclosed === "number") {
      helper.merge(nbt_util_1.getNBTSuggestions(children.node, this.unclosed));
    }

    if (this.end) {
      helper.addActions({
        data: nbt_util_1.getHoverText(node.node),
        high: this.start.end,
        low: this.start.start,
        type: "hover"
      });
    }

    return helper.succeed();
  }

}

exports.BaseList = BaseList;
},{"../../../../brigadier/errors":"aP4V","../../../../misc-functions":"KBGm","../tag-parser":"4pIN","../util/nbt-util":"OoHl","./nbt-tag":"8yQQ"}],"km+2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const path = tslib_1.__importStar(require("path"));

const url = tslib_1.__importStar(require("url"));

const main_1 = require("vscode-languageserver/lib/main");

const errors_1 = require("../../../../brigadier/errors");

exports.parseRefPath = (ref, currentPath) => {
  const cpd = path.dirname(currentPath);
  const refurl = url.parse(ref);
  const fragPath = (refurl.hash || "#").substring(1).split("/").filter(v => v !== "");
  const nextPath = path.posix.join(cpd, refurl.path || path.basename(currentPath));
  return [nextPath, fragPath];
};

function getNBTTagFromTree(tag, nbtPath) {
  let lastTag = tag;

  for (const s of nbtPath) {
    // tslint:disable:no-require-imports This fixes a circular dependency issue
    if (lastTag instanceof require("../tag/lists").BaseList && /\d+/.test(s)) {
      lastTag = lastTag.getValue()[parseInt(s, 10)];
    } else if (lastTag instanceof require("../tag/compound-tag").BaseList) {
      lastTag = lastTag.getValue().get(s);
    } else {
      return undefined;
    } // tslint:enable:no-require-imports

  }

  return lastTag;
}

exports.getNBTTagFromTree = getNBTTagFromTree;

function isRefNode(node) {
  return node.hasOwnProperty("ref");
}

exports.isRefNode = isRefNode;

function isFunctionNode(node) {
  return node.hasOwnProperty("function");
}

exports.isFunctionNode = isFunctionNode;

function isTypedNode(node) {
  return node.hasOwnProperty("type");
}

exports.isTypedNode = isTypedNode;

function isCompoundNode(node) {
  return isTypedNode(node) && node.type === "compound";
}

exports.isCompoundNode = isCompoundNode;

function isRootNode(node) {
  return isTypedNode(node) && node.type === "root";
}

exports.isRootNode = isRootNode;

function isListNode(node) {
  return isTypedNode(node) && node.type === "list";
}

exports.isListNode = isListNode; // Return type is a lie to allow using the convert function below

function isNoNBTNode(node) {
  return isTypedNode(node) && node.type === "no-nbt";
}

exports.isNoNBTNode = isNoNBTNode;
exports.isRefInfo = convert(isRefNode);
exports.isFunctionInfo = convert(isFunctionNode);
exports.isTypedInfo = convert(isTypedNode);
exports.isCompoundInfo = convert(isCompoundNode);
exports.isRootInfo = convert(isRootNode);
exports.isListInfo = convert(isListNode);
exports.isNoNBTInfo = convert(isNoNBTNode);

function convert(f) {
  return info => f(info.node);
}

exports.VALIDATION_ERRORS = {
  badIndex: new errors_1.CommandErrorBuilder("argument.nbt.validation.list.badpath", "The index '%s' is not a valid index"),
  noSuchChild: new errors_1.CommandErrorBuilder("argument.nbt.validation.compound.nochild", "The tag does not have a child named '%s'", main_1.DiagnosticSeverity.Warning),
  wrongType: new errors_1.CommandErrorBuilder("argument.nbt.validation.wrongtype", "Expected nbt value to be %s, got %s")
};
},{"../../../../brigadier/errors":"aP4V","../tag/lists":"8FMe","../tag/compound-tag":"SAEX"}],"8yQQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const misc_functions_1 = require("../../../../misc-functions");

const blanks_1 = require("../../../../test/blanks");

const doc_walker_util_1 = require("../util/doc-walker-util");

const nbt_util_1 = require("../util/nbt-util");

class NBTTag {
  constructor(path) {
    this.range = blanks_1.emptyRange();
    this.path = path;
  }

  getRange() {
    return this.range;
  }

  parse(reader) {
    this.range.start = reader.cursor;
    const out = this.readTag(reader);
    this.range.end = reader.cursor; // tslint:disable:helper-return

    return out;
  }

  validate(node, // tslint:disable-next-line:variable-name
  _walker) {
    const helper = new misc_functions_1.ReturnHelper();
    const result = this.sameType(node);

    if (!helper.merge(result)) {
      return helper.succeed();
    }

    helper.addActions(this.rangeHover(node.node));
    return helper.succeed();
  }

  rangeHover(node, range = this.range) {
    return {
      data: nbt_util_1.getHoverText(node),
      high: range.end,
      low: range.start,
      type: "hover"
    };
  }

  sameType(node, type = this.tagType || "") {
    const helper = new misc_functions_1.ReturnHelper();

    if (!doc_walker_util_1.isTypedInfo(node) || node.node.type !== type) {
      return helper.fail(doc_walker_util_1.VALIDATION_ERRORS.wrongType.create(this.range.start, this.range.end, node.node.type || "", type));
    }

    return helper.succeed();
  }

}

exports.NBTTag = NBTTag;
},{"../../../../misc-functions":"KBGm","../../../../test/blanks":"7iV1","../util/doc-walker-util":"km+2","../util/nbt-util":"OoHl"}],"6/JO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const string_reader_1 = require("../../../../brigadier/string-reader");

const misc_functions_1 = require("../../../../misc-functions");

const nbt_util_1 = require("../util/nbt-util");

const nbt_tag_1 = require("./nbt-tag");

class NBTTagString extends nbt_tag_1.NBTTag {
  constructor() {
    super(...arguments);
    this.tagType = "string";
    this.value = "";
  }

  getValue() {
    return this.value;
  }

  setValue(val) {
    this.value = val;
    return this;
  }

  readTag(reader) {
    const helper = new misc_functions_1.ReturnHelper();
    const quoted = string_reader_1.StringReader.isQuotedStringStart(reader.peek());
    const str = reader.readString();

    if (helper.merge(str)) {
      this.value = str.data;

      if (quoted) {
        return helper.succeed(nbt_util_1.Correctness.CERTAIN);
      }

      if (str.data.length === 0) {
        // E.g. `{`, clearly it is not an unquoted string
        return helper.failWithData(nbt_util_1.Correctness.NO);
      }

      return helper.succeed(nbt_util_1.Correctness.MAYBE);
    } else {
      if (quoted) {
        return helper.failWithData(nbt_util_1.Correctness.CERTAIN);
      }

      return helper.failWithData(nbt_util_1.Correctness.NO);
    }
  }

}

exports.NBTTagString = NBTTagString;
},{"../../../../brigadier/string-reader":"iLhI","../../../../misc-functions":"KBGm","../util/nbt-util":"OoHl","./nbt-tag":"8yQQ"}],"51vC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const path = tslib_1.__importStar(require("path"));

const sprintf_js_1 = require("sprintf-js");

const string_tag_1 = require("./tag/string-tag");

const doc_walker_util_1 = require("./util/doc-walker-util");

const pathsFuncs = {
  insertStringNBT
};

function runNodeFunction(nbtPath, node, parsed) {
  return pathsFuncs[node.function.id](parsed, nbtPath, node, node.function.params);
}

exports.runNodeFunction = runNodeFunction;
const suggestFuncs = {};

function insertStringNBT(parsed, nbtPath, _, args) {
  if (!parsed) {
    return args.default;
  }

  const newRef = path.posix.join(path.dirname(nbtPath.join("/")), args.tag_path).split("/");
  const out = doc_walker_util_1.getNBTTagFromTree(parsed, newRef);
  return !out || !(out instanceof string_tag_1.NBTTagString) ? args.default : sprintf_js_1.sprintf(args.ref, out.getValue());
} // Suggest function


function runSuggestFunction(func, args) {
  return suggestFuncs[func](func, args);
}

exports.runSuggestFunction = runSuggestFunction;
},{"./tag/string-tag":"6/JO","./util/doc-walker-util":"km+2"}],"OoHl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const misc_functions_1 = require("../../../../misc-functions");

const doc_walker_func_1 = require("../doc-walker-func");

const doc_walker_util_1 = require("./doc-walker-util");

exports.ARRAY_START = "[";
exports.ARRAY_END = "]";
exports.ARRAY_PREFIX_SEP = ";";
exports.ARRAY_VALUE_SEP = ",";
exports.LIST_START = "[";
exports.LIST_END = "]";
exports.LIST_VALUE_SEP = ",";
exports.COMPOUND_START = "{";
exports.COMPOUND_END = "}";
exports.COMPOUND_KEY_VALUE_SEP = ":";
exports.COMPOUND_PAIR_SEP = ",";
var Correctness;

(function (Correctness) {
  Correctness[Correctness["NO"] = 0] = "NO";
  Correctness[Correctness["MAYBE"] = 1] = "MAYBE";
  Correctness[Correctness["CERTAIN"] = 2] = "CERTAIN";
})(Correctness = exports.Correctness || (exports.Correctness = {}));

function tryExponential(reader) {
  const helper = new misc_functions_1.ReturnHelper();
  const f = reader.readFloat();

  if (!helper.merge(f, {
    errors: false
  })) {
    return helper.fail();
  }

  const cur = reader.peek();

  if (!(cur === "e" || cur === "E")) {
    return helper.fail();
  }

  reader.skip(); // Returns beyond here because it must be scientific notation

  const exp = reader.readInt();

  if (helper.merge(exp)) {
    return helper.succeed(f.data * Math.pow(10, exp.data));
  } else {
    return helper.fail();
  }
}

exports.tryExponential = tryExponential;
const suggestTypes = {
  byte_array: "[B;",
  compound: "{",
  int_array: "[I;",
  list: "[",
  long_array: "[L;"
};

function getStartSuggestion(node) {
  if (doc_walker_util_1.isTypedNode(node) && suggestTypes.hasOwnProperty(node.type)) {
    return suggestTypes[node.type];
  }

  return undefined;
}

exports.getStartSuggestion = getStartSuggestion;

function getNBTSuggestions(node, cursor) {
  const helper = new misc_functions_1.ReturnHelper();

  if (node.suggestions) {
    const sugg = node.suggestions;

    if (sugg) {
      sugg.forEach(v => {
        if (typeof v === "string") {
          helper.addSuggestions({
            start: cursor,
            text: v
          });
        } else if ("function" in v) {
          doc_walker_func_1.runSuggestFunction(v.function.id, v.function.params).forEach(v2 => helper.addSuggestions({
            start: cursor,
            text: v2
          }));
        } else {
          helper.addSuggestions({
            description: v.description,
            start: cursor,
            text: v.value
          });
        }
      });
    }
  } else {
    const start = getStartSuggestion(node);

    if (start) {
      helper.addSuggestion(cursor, start);
    }
  }
  /* if (isCompoundNode(node) && node.children) {
      helper.addSuggestions(
          ...Object.keys(node.children).map<SuggestResult>(v => ({
              // @ts-ignore
              description: node.children[v].description,
              start: cursor,
              text: v
          }))
      );
  } else if (isListNode(node) && node.item) {
      helper.mergeChain(getNBTSuggestions(node.item, cursor));
  } */


  return helper.succeed();
}

exports.getNBTSuggestions = getNBTSuggestions;

function createSuggestions(node, cursor) {
  const helper = new misc_functions_1.ReturnHelper();
  const sugg = node.suggestions;

  if (sugg) {
    sugg.forEach(v => {
      if (typeof v === "string") {
        helper.addSuggestion(cursor, v);
      } else if ("function" in v) {
        doc_walker_func_1.runSuggestFunction(v.function.id, v.function.params).forEach(v2 => helper.addSuggestion(cursor, v2));
      } else {
        helper.addSuggestion(cursor, v.value, undefined, v.description);
      }
    });
  }

  return helper.succeed();
}

exports.createSuggestions = createSuggestions;
exports.tagid2Name = {
  byte: "byte",
  byte_array: "byte[]",
  compound: "compound",
  double: "double",
  float: "float",
  int: "int",
  int_array: "int[]",
  list: "list",
  long: "long",
  long_array: "long[]",
  short: "short",
  string: "string"
};

exports.getHoverText = node => {
  const desc = node.description || "";

  if (!doc_walker_util_1.isTypedNode(node)) {
    return desc;
  }

  if (doc_walker_util_1.isRootNode(node)) {
    return desc;
  }

  if (doc_walker_util_1.isNoNBTNode(node)) {
    return desc;
  }

  return `(${exports.tagid2Name[node.type]}) ${desc}`;
};
},{"../../../../misc-functions":"KBGm","../doc-walker-func":"51vC","./doc-walker-util":"km+2"}],"SAEX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode_languageserver_1 = require("vscode-languageserver");

const errors_1 = require("../../../../brigadier/errors");

const string_reader_1 = require("../../../../brigadier/string-reader");

const misc_functions_1 = require("../../../../misc-functions");

const tag_parser_1 = require("../tag-parser");

const nbt_util_1 = require("../util/nbt-util");

const nbt_tag_1 = require("./nbt-tag");

const NO_KEY = new errors_1.CommandErrorBuilder("argument.nbt.compound.nokey", "Expected key");
const NO_VAL = new errors_1.CommandErrorBuilder("argument.nbt.compound.noval", "Expected value");
const UNKNOWN = new errors_1.CommandErrorBuilder("argument.nbt.compound.unknown", "Unknown child '%s'");
const DUPLICATE = new errors_1.CommandErrorBuilder("argument.nbt.compound.duplicate", "'%s' is already defined");
const UNCLOSED = new errors_1.CommandErrorBuilder("argument.nbt.compound.unclosed", "Compound is not closed, expected `}`");
/**
 * TODO: refactor (again)!
 * Help welcome
 */

class NBTTagCompound extends nbt_tag_1.NBTTag {
  constructor() {
    super(...arguments);
    this.tagType = "compound";
    this.value = new Map();
    this.openIndex = -1;
    /**
     * If empty => no values, closed instantly (e.g. `{}`, `{ }`)
     * If last has no key => no key straight after the `{` or `,`
     * (with spaces) or key could not be parsed (e.g. `{"no-close-quote`)
     * If last has key but no closed, then it is the last item (e.g. `{"key"`,{key)
     * If last has key but closed, it has been unparseable either due to an invalid
     * character after or within the strin
     */

    this.parts = [];
  }

  getValue() {
    return this.value;
  }

  setValue(val) {
    this.value = val;
    return this;
  }

  validate(anyInfo, walker) {
    const helper = new misc_functions_1.ReturnHelper();

    if (this.openIndex === -1) {
      // This should never happen
      nbt_util_1.createSuggestions(anyInfo.node, this.range.end);
      return helper.succeed();
    }

    const result = this.sameType(anyInfo);

    if (!helper.merge(result)) {
      return helper.succeed();
    }

    const info = anyInfo;
    const hoverText = nbt_util_1.getHoverText(anyInfo.node);

    if (this.parts.length === 0) {
      helper.addActions({
        // Add the hover over the entire object
        data: hoverText,
        high: this.range.end,
        low: this.openIndex,
        type: "hover"
      });
      return helper.succeed();
    }

    helper.addActions({
      // Add hover to the open `{`
      data: hoverText,
      high: this.openIndex + 1,
      low: this.openIndex,
      type: "hover"
    });
    const children = walker.getChildren(info);

    for (let index = 0; index < this.parts.length; index++) {
      const part = this.parts[index];
      const final = index === this.parts.length - 1;

      if (part.key) {
        if (part.value) {
          const child = children[part.key];

          if (child) {
            helper.merge(part.value.validate(child, walker));
            helper.addActions(getKeyHover(part.keyRange, child.node));
          } else if (!walker.allowsUnknowns(info)) {
            const error = Object.assign({}, UNKNOWN.create(part.keyRange.start, part.keyRange.end, part.key), {
              path: [...this.path, part.key]
            });
            helper.addErrors(error);
          }
        } else {
          helper.merge(handleNoValue(part));
        }
      } else {
        helper.merge(handleNoValue(part));
      }

      if (final && part.value && typeof part.closeIdx === "number") {
        helper.addActions({
          // Add hover to the close `}`
          data: hoverText,
          high: part.closeIdx,
          low: part.closeIdx - 1,
          type: "hover"
        });
      }
    }

    return helper.succeed();

    function handleNoValue(part) {
      const keyHelper = new misc_functions_1.ReturnHelper();
      const key = part.key || "";

      if (part.closeIdx === undefined) {
        for (const childName of Object.keys(children)) {
          if (childName.startsWith(key)) {
            const thisChild = children[childName];
            const text = thisChild && nbt_util_1.getStartSuggestion(thisChild.node);
            keyHelper.addSuggestions({
              description: nbt_util_1.getHoverText(children[childName].node),
              kind: vscode_languageserver_1.CompletionItemKind.Field,
              label: childName,
              start: part.keyRange.start,
              text: string_reader_1.quoteIfNeeded(childName) + (text ? `: ${text}` : "")
            });
          }
        }
      }

      const child = children[key];

      if (child) {
        // Not sure what this would have ever done, feels like a bug

        /* if (part.closeIdx && part.closeIdx >= 0) {
            keyHelper.merge(
                getNBTSuggestions(child.node, part.closeIdx)
            );
        }*/
        keyHelper.addActions(getKeyHover(part.keyRange, child.node));
      } // tslint:disable-next-line:helper-return


      return keyHelper.succeed();
    }

    function getKeyHover(range, child) {
      return {
        data: nbt_util_1.getHoverText(child),
        high: range.end,
        low: range.start,
        type: "hover"
      };
    }
  }

  readTag(reader) {
    const helper = new misc_functions_1.ReturnHelper();
    const start = reader.cursor;

    if (!helper.merge(reader.expect(nbt_util_1.COMPOUND_START))) {
      return helper.failWithData(nbt_util_1.Correctness.NO);
    }

    this.openIndex = start;
    reader.skipWhitespace();

    if (helper.merge(reader.expect(nbt_util_1.COMPOUND_END), {
      errors: false
    })) {
      return helper.succeed(nbt_util_1.Correctness.CERTAIN);
    }

    while (true) {
      reader.skipWhitespace();
      const kvstart = reader.cursor;
      const keyStart = reader.cursor;

      if (!reader.canRead()) {
        helper.addErrors(NO_KEY.create(kvstart, reader.cursor));
        this.parts.push({
          keyRange: {
            end: reader.cursor,
            start: reader.cursor
          }
        });
        return helper.failWithData(nbt_util_1.Correctness.CERTAIN);
      }

      const key = reader.readString();
      const keyEnd = reader.cursor;

      if (!helper.merge(key)) {
        const keypart = {
          key: key.data,
          keyRange: {
            end: keyEnd,
            start: keyStart
          }
        };

        if (reader.canRead()) {
          // Support suggesting for an unclosed quoted string otherwise
          keypart.closeIdx = reader.cursor; // I'm not sure that this does anything :P
        }

        this.parts.push(keypart);
        return helper.failWithData(nbt_util_1.Correctness.CERTAIN);
      }

      reader.skipWhitespace();

      if (this.value.has(key.data)) {
        helper.addErrors(DUPLICATE.create(keyStart, keyEnd, key.data));
      }

      if (!reader.canRead()) {
        this.parts.push({
          key: key.data,
          keyRange: {
            end: keyEnd,
            start: keyStart
          }
        });
        helper.addErrors(NO_VAL.create(keyStart, reader.cursor));
        return helper.addSuggestion(reader.cursor, nbt_util_1.COMPOUND_KEY_VALUE_SEP).failWithData(nbt_util_1.Correctness.CERTAIN);
      }

      if (!helper.merge(reader.expect(nbt_util_1.COMPOUND_KEY_VALUE_SEP))) {
        // E.g. '{"hello",' etc.
        this.parts.push({
          closeIdx: -1,
          key: key.data,
          keyRange: {
            end: keyEnd,
            start: keyStart
          }
        });
        return helper.failWithData(nbt_util_1.Correctness.CERTAIN);
      }

      const afterSep = reader.cursor;
      reader.skipWhitespace();

      if (!reader.canRead()) {
        this.parts.push({
          closeIdx: afterSep,
          key: key.data,
          keyRange: {
            start: keyStart,
            end: keyEnd
          }
        });
        helper.addErrors(NO_VAL.create(keyStart, reader.cursor));
        return helper.failWithData(nbt_util_1.Correctness.CERTAIN);
      }

      const valResult = tag_parser_1.parseAnyNBTTag(reader, [...this.path, key.data]);
      const part = {
        key: key.data,
        keyRange: {
          start: keyStart,
          end: keyEnd
        },
        value: valResult.data && valResult.data.tag
      };

      if (!helper.merge(valResult)) {
        this.parts.push(part);
        return helper.failWithData(nbt_util_1.Correctness.CERTAIN);
      }

      const preEnd = reader.cursor;
      reader.skipWhitespace();
      this.value.set(key.data, valResult.data.tag);

      if (helper.merge(reader.expect(nbt_util_1.COMPOUND_PAIR_SEP), {
        errors: false
      })) {
        part.closeIdx = reader.cursor;
        this.parts.push(part);
        continue;
      } else if (helper.merge(reader.expect(nbt_util_1.COMPOUND_END), {
        errors: false
      })) {
        part.closeIdx = reader.cursor;
        this.parts.push(part);
        return helper.succeed(nbt_util_1.Correctness.CERTAIN);
      }

      this.parts.push(part);
      helper.addErrors(UNCLOSED.create(preEnd, reader.cursor));
      return helper.failWithData(nbt_util_1.Correctness.CERTAIN);
    }
  }

}

exports.NBTTagCompound = NBTTagCompound;
},{"../../../../brigadier/errors":"aP4V","../../../../brigadier/string-reader":"iLhI","../../../../misc-functions":"KBGm","../tag-parser":"4pIN","../util/nbt-util":"OoHl","./nbt-tag":"8yQQ"}],"UpNo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const misc_functions_1 = require("../../../../misc-functions");

const blanks_1 = require("../../../../test/blanks");

const nbt_util_1 = require("../util/nbt-util");

const lists_1 = require("./lists");

class NBTTagList extends lists_1.BaseList {
  constructor() {
    super(...arguments);
    this.tagType = "list"; // The open square bracket

    this.start = blanks_1.emptyRange();
  }

  validate(anyInfo, walker) {
    const helper = new misc_functions_1.ReturnHelper();
    const result = this.sameType(anyInfo);

    if (!helper.merge(result)) {
      return helper.succeed();
    }

    const info = anyInfo;
    helper.merge(this.validateWith(info, walker.getItem(info), walker));
    return helper.succeed();
  }

  readTag(reader) {
    const helper = new misc_functions_1.ReturnHelper();
    const start = reader.cursor;

    if (!helper.merge(reader.expect(nbt_util_1.LIST_START))) {
      return helper.failWithData(nbt_util_1.Correctness.NO);
    }

    reader.skipWhitespace();
    this.start = {
      start,
      end: reader.cursor
    };
    const result = this.parseInner(reader);

    if (helper.merge(result)) {
      return helper.succeed(nbt_util_1.Correctness.CERTAIN);
    } else {
      return helper.failWithData(nbt_util_1.Correctness.CERTAIN);
    }
  }

}

exports.NBTTagList = NBTTagList;
},{"../../../../misc-functions":"KBGm","../../../../test/blanks":"7iV1","../util/nbt-util":"OoHl","./lists":"8FMe"}],"0nxn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const errors_1 = require("../../../../brigadier/errors");

const string_reader_1 = require("../../../../brigadier/string-reader");

const misc_functions_1 = require("../../../../misc-functions");

const typed_keys_1 = require("../../../../misc-functions/third_party/typed-keys");

const doc_walker_util_1 = require("../util/doc-walker-util");

const nbt_util_1 = require("../util/nbt-util");

const nbt_tag_1 = require("./nbt-tag");

const exceptions = {
  BOOL_SHORTHAND: new errors_1.CommandErrorBuilder("argument.nbt.number.shorthand", "The boolean shorthand was used for value %s, which is not supported by %s"),
  FLOAT: new errors_1.CommandErrorBuilder("argument.nbt.number.float", "%s is not a float type, but the given text is a float"),
  SUFFIX: new errors_1.CommandErrorBuilder("argument.nbt.number.suffix", "Expected suffix '%s' for %s, got %s"),
  TOO_BIG: new errors_1.CommandErrorBuilder("argument.nbt.number.big", "%s must not be more than %s, found %s"),
  TOO_LOW: new errors_1.CommandErrorBuilder("argument.nbt.number.low", "%s must not be less than %s, found '%s'")
};

const intnumberInfo = (pow, suffix) => ({
  float: false,
  max: 2 ** pow - 1,
  min: -(2 ** pow),
  suffix
});

const ranges = {
  byte: Object.assign({}, intnumberInfo(7, "b"), {
    bool: true
  }),
  // tslint:disable:binary-expression-operand-order
  double: {
    float: true,
    max: 1.8 * 10 ** 308,
    min: -1.8 * 10 ** 308,
    suffix: "d"
  },
  float: {
    float: true,
    max: 3.4 * 10 ** 38,
    min: -3.4 * 10 ** 38,
    suffix: "f"
  },
  // tslint:enable:binary-expression-operand-order
  int: intnumberInfo(31, ""),
  long: intnumberInfo(63, "l"),
  short: intnumberInfo(15, "s")
};

function typeForSuffix(rawsuffix) {
  const suffix = rawsuffix.toLowerCase();

  for (const type of typed_keys_1.typed_keys(ranges)) {
    if (ranges[type].suffix === suffix) {
      return ranges[type];
    }
  }

  return undefined;
}

class NBTTagNumber extends nbt_tag_1.NBTTag {
  constructor() {
    super(...arguments);
    this.tagType = undefined;
    this.value = 0;
    this.endsString = true;
    this.float = false;
  }

  getValue() {
    return this.value;
  }

  readTag(reader) {
    const helper = new misc_functions_1.ReturnHelper();
    const start = reader.cursor;
    const exp = nbt_util_1.tryExponential(reader);

    if (helper.merge(exp)) {
      this.float = true;
      this.value = exp.data;
      this.checkSuffix(reader);
      return helper.succeed(nbt_util_1.Correctness.CERTAIN);
    }

    reader.cursor = start;
    const int = reader.readInt();

    if (misc_functions_1.isSuccessful(int)) {
      helper.merge(int);
      this.value = int.data;
      this.checkSuffix(reader);
      return helper.succeed(nbt_util_1.Correctness.CERTAIN);
    }

    reader.cursor = start;
    const float = reader.readFloat();

    if (misc_functions_1.isSuccessful(float)) {
      helper.merge(float);
      this.float = true;
      this.value = float.data;
      this.checkSuffix(reader);
      return helper.succeed(nbt_util_1.Correctness.CERTAIN);
    } else {
      reader.cursor = start;
      const bool = reader.readBoolean({
        quote: false,
        unquoted: string_reader_1.StringReader.charAllowedInUnquotedString
      });

      if (misc_functions_1.isSuccessful(bool)) {
        // We do not merge as this does not do anything
        this.value = bool.data;
        return helper.succeed(nbt_util_1.Correctness.CERTAIN);
      }

      helper.merge(float);
      return helper.failWithData(nbt_util_1.Correctness.NO);
    }
  }

  setValue(val) {
    this.value = val;
    return this;
  } // HERE BE DRAGONS:
  // Unhandled special cases abound!
  // Contributions welcome, at yer own risk


  validate(node) {
    const helper = new misc_functions_1.ReturnHelper();

    if (doc_walker_util_1.isTypedInfo(node)) {
      const actualType = node.node.type;

      if (!ranges.hasOwnProperty(actualType)) {
        return helper.mergeChain(this.sameType(node, "number")).succeed();
      }

      const typeInfo = ranges[actualType];

      if (typeof this.value === "boolean") {
        if (!typeInfo.bool) {
          helper.addErrors(exceptions.BOOL_SHORTHAND.create(this.range.start, this.range.end, this.value.toString(), actualType));
        }

        return helper.succeed();
      } else {
        if (typeInfo.min > this.value) {
          helper.addErrors(exceptions.TOO_LOW.create(this.range.start, this.range.end, actualType, typeInfo.min.toString(), this.value.toString()));
        } else if (typeInfo.max < this.value) {
          helper.addErrors(exceptions.TOO_BIG.create(this.range.start, this.range.end, actualType, typeInfo.min.toString(), this.value.toString()));
        }

        if (this.float && !typeInfo.float) {
          helper.addErrors(exceptions.FLOAT.create(this.range.start, this.range.end, actualType));
        }

        if (this.suffix) {
          if (this.suffix !== typeInfo.suffix) {
            helper.addErrors(exceptions.SUFFIX.create(this.range.end - 1, this.range.end, typeInfo.suffix, actualType, this.suffix));
          }
        } else if (this.endsString) {
          helper.addSuggestion(this.range.end, typeInfo.suffix);
        }

        return helper.succeed();
      }
    } else {
      // Will always add the error in this case
      return helper.mergeChain(this.sameType(node)).succeed();
    }
  }

  checkSuffix(reader) {
    // Not convinced that this is correct
    if (reader.canRead()) {
      const suffix = reader.peek();
      const type = typeForSuffix(suffix);

      if (type) {
        this.suffix = suffix;
        reader.skip();
      }
    } else {
      this.endsString = true;
    }
  }

}

exports.NBTTagNumber = NBTTagNumber;
},{"../../../../brigadier/errors":"aP4V","../../../../brigadier/string-reader":"iLhI","../../../../misc-functions":"KBGm","../../../../misc-functions/third_party/typed-keys":"kca+","../util/doc-walker-util":"km+2","../util/nbt-util":"OoHl","./nbt-tag":"8yQQ"}],"QKwA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const misc_functions_1 = require("../../../../misc-functions");

const blanks_1 = require("../../../../test/blanks");

const nbt_util_1 = require("../util/nbt-util");

const lists_1 = require("./lists");

const types = [["B", "byte", "byte_array"], ["I", "int", "int_array"], ["L", "long", "long_array"]];

class NBTTagTypedList extends lists_1.BaseList {
  constructor() {
    super(...arguments);
    this.start = blanks_1.emptyRange();
    this.tagType = undefined;
    this.startIndex = -1;
  }

  validate(anyInfo, walker) {
    const helper = new misc_functions_1.ReturnHelper();
    const result = this.sameType(anyInfo);

    if (!helper.merge(result)) {
      return helper.succeed();
    }

    const info = anyInfo;
    const type = types.find(v => v["2"] === this.tagType
    /* === info.type */
    );

    if (type) {
      helper.merge(this.validateWith(info, {
        node: {
          type: type["1"]
        },
        path: info.path
      }, walker));
      const toCheck = `[${type["0"]};`;

      if (this.remaining) {
        if (toCheck.startsWith(this.remaining)) {
          helper.addSuggestion(this.startIndex, toCheck);
        }
      }
    }

    return helper.succeed();
  }

  readTag(reader) {
    const start = reader.cursor;
    this.startIndex = start;
    const helper = new misc_functions_1.ReturnHelper();
    const remaining = reader.getRemaining();
    const result = remaining.match(/^\[([BIL]);/);

    if (result) {
      reader.skipWhitespace();
      this.start = {
        start,
        end: reader.cursor
      };
      const type = types.find(v => v[0] === result[1]);

      if (type) {
        this.tagType = type[2];
      } else {// `unreachable!`
      }

      const innerResult = this.parseInner(reader);

      if (helper.merge(innerResult)) {
        return helper.succeed(nbt_util_1.Correctness.CERTAIN);
      } else {
        return helper.failWithData(nbt_util_1.Correctness.CERTAIN);
      }
    } else {
      this.remaining = remaining;
      return helper.failWithData(nbt_util_1.Correctness.NO);
    }
  }

}

exports.NBTTagTypedList = NBTTagTypedList;
},{"../../../../misc-functions":"KBGm","../../../../test/blanks":"7iV1","../util/nbt-util":"OoHl","./lists":"8FMe"}],"4pIN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const misc_functions_1 = require("../../../misc-functions");

const compound_tag_1 = require("./tag/compound-tag");

const list_tag_1 = require("./tag/list-tag");

const number_1 = require("./tag/number");

const string_tag_1 = require("./tag/string-tag");

const typed_list_tag_1 = require("./tag/typed-list-tag");

const nbt_util_1 = require("./util/nbt-util");

const parsers = [number_1.NBTTagNumber, typed_list_tag_1.NBTTagTypedList, compound_tag_1.NBTTagCompound, list_tag_1.NBTTagList, string_tag_1.NBTTagString];

function parseAnyNBTTag(reader, path) {
  let info;
  let last;
  const helper = new misc_functions_1.ReturnHelper();
  const start = reader.cursor;

  for (const parserContructor of parsers) {
    reader.cursor = start;
    const tag = new parserContructor(path);
    const out = tag.parse(reader);

    if (out.data === nbt_util_1.Correctness.CERTAIN || out.data > (info && info.correctness || nbt_util_1.Correctness.NO)) {
      info = {
        correctness: out.data,
        tag
      };
      last = out;
    }

    if (out.data === nbt_util_1.Correctness.CERTAIN) {
      break;
    }
  } // Maybe add could not parse nbt tag error


  if (info === undefined || last === undefined) {
    return helper.fail();
  }

  reader.cursor = info.tag.getRange().end;

  if (helper.merge(last)) {
    return helper.succeed(info);
  } else {
    return helper.failWithData(info);
  }
}

exports.parseAnyNBTTag = parseAnyNBTTag;
},{"../../../misc-functions":"KBGm","./tag/compound-tag":"SAEX","./tag/list-tag":"UpNo","./tag/number":"0nxn","./tag/string-tag":"6/JO","./tag/typed-list-tag":"QKwA","./util/nbt-util":"OoHl"}],"PoZp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class ArrayReader {
  constructor(arr) {
    this.index = 0;
    this.inner = arr;
  }

  canRead(length = 1) {
    return this.index + length <= this.inner.length;
  }

  getArray() {
    return this.inner;
  }

  getIndex() {
    return this.index;
  }

  getRead() {
    return this.inner.slice(0, this.index);
  }

  insert(vals, index = 0) {
    this.inner.splice(index, 0, ...vals);
  }

  peek() {
    return this.inner[this.index];
  }

  read() {
    return this.inner[this.index++];
  }

  setIndex(val) {
    this.index = val;
  }

  skip() {
    this.index++;
  }

}

exports.ArrayReader = ArrayReader;
},{}],"YMNQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const assert_1 = require("assert");

const doc_walker_func_1 = require("./doc-walker-func");

const array_reader_1 = require("./util/array-reader");

const doc_walker_util_1 = require("./util/doc-walker-util");

function walkUnwrap(node) {
  if (!node) {
    throw new Error("Expected node to be defined, got undefined node. This is an internal error.");
  }

  return node;
}

class NBTWalker {
  constructor(docs) {
    this.docs = docs;
  }

  allowsUnknowns(info) {
    const {
      node
    } = info;

    if (node.additionalChildren !== undefined) {
      return node.additionalChildren;
    }

    if (node.child_ref) {
      for (const ref of node.child_ref) {
        const refInfo = walkUnwrap(this.resolveRef(ref, info.path));

        if (doc_walker_util_1.isCompoundInfo(refInfo)) {
          const result = this.allowsUnknowns(refInfo);

          if (result !== undefined) {
            return result;
          }
        }
      }
    }

    return undefined;
  }

  followNodePath(info, reader, parsed, useReferences) {
    if (!info) {
      return {
        path: "",
        node: {
          type: "no-nbt"
        }
      };
    }

    if (useReferences && info.node.references && reader.canRead() && info.node.references.hasOwnProperty(reader.peek())) {
      return this.followNodePath({
        node: info.node.references[reader.read()],
        path: info.path
      }, reader, parsed, useReferences);
    }

    if (doc_walker_util_1.isRefInfo(info)) {
      return this.followNodePath(this.resolveRef(info.node.ref, info.path), reader, parsed, useReferences);
    }

    if (doc_walker_util_1.isFunctionInfo(info)) {
      return this.followNodePath(this.resolveRef(doc_walker_func_1.runNodeFunction(reader.getRead(), info.node, parsed), info.path), reader, parsed, useReferences);
    }

    if (!reader.canRead()) {
      return info;
    }

    if (doc_walker_util_1.isCompoundInfo(info)) {
      return this.followNodePath(this.getChildWithName(info, reader.read()), reader, parsed, useReferences);
    }

    if (doc_walker_util_1.isRootInfo(info)) {
      return this.followNodePath(this.getChildOfRoot(info, reader.read()), reader, parsed, useReferences);
    }

    if (doc_walker_util_1.isListInfo(info)) {
      assert_1.ok(reader.peek().match(/\d+/));
      reader.read();
      return this.followNodePath({
        node: info.node.item,
        path: info.path
      }, reader, parsed, useReferences);
    }

    throw new Error(`Could not get next path after ${reader.peek()} in ${reader.getArray()} with info: ${JSON.stringify(info)}`);
  }

  getChildOfRoot(info, name) {
    if (info.node.children.hasOwnProperty(name)) {
      return Object.assign({}, info, {
        node: info.node.children[name]
      });
    } else {
      for (const key of Object.keys(info.node.children)) {
        if (key.startsWith("$")) {
          const ref = key.substring(1);
          const [nextPath] = doc_walker_util_1.parseRefPath(ref, info.path);
          const list = walkUnwrap(this.docs.get(nextPath));

          if (list.find(v => typeof v === "string" ? v === name : v.value === name)) {
            return Object.assign({}, info, {
              node: info.node.children[key]
            });
          }
        }
      }
    }

    return undefined;
  }

  getChildren(info) {
    const {
      node
    } = info;
    const result = {};

    if (node.child_ref) {
      for (const ref of node.child_ref.reverse()) {
        const refInfo = walkUnwrap(this.resolveRef(ref, info.path));

        if (doc_walker_util_1.isCompoundInfo(refInfo)) {
          Object.assign(result, this.getChildren(refInfo));
        }
      }
    }

    if (node.children) {
      for (const key of Object.keys(node.children)) {
        result[key] = this.followNodePath(Object.assign({}, info, {
          node: node.children[key]
        }), new array_reader_1.ArrayReader([]));
      }
    }

    return result;
  }

  getChildWithName(info, name) {
    const {
      node
    } = info;

    if (node.children && node.children.hasOwnProperty(name)) {
      return Object.assign({}, info, {
        node: node.children[name]
      });
    }

    if (node.child_ref) {
      for (const ref of node.child_ref) {
        const refInfo = walkUnwrap(this.resolveRef(ref, info.path));

        if (doc_walker_util_1.isCompoundInfo(refInfo)) {
          const result = this.getChildWithName(refInfo, name);

          if (result) {
            return result;
          }
        }
      }
    }

    return undefined;
  }
  /**
   * @param startPath A path which is known to be valid
   */


  getInitialNode(startPath) {
    const path = NBTWalker.root;
    const node = walkUnwrap(this.docs.get(path));
    const reader = new array_reader_1.ArrayReader(startPath);
    return this.followNodePath({
      node,
      path
    }, reader, undefined);
  }

  getItem(info) {
    return this.followNodePath(Object.assign({}, info, {
      node: info.node.item
    }), new array_reader_1.ArrayReader([]));
  }

  resolveRef(refText, curPath) {
    const [path, fragPath] = doc_walker_util_1.parseRefPath(refText, curPath);
    const reader = new array_reader_1.ArrayReader(fragPath);
    const node = this.docs.get(path);

    if (node) {
      return this.followNodePath({
        node: node,
        path
      }, reader, undefined, true);
    }

    return undefined;
  }

}

NBTWalker.root = "root.json";
exports.NBTWalker = NBTWalker; // Old version
// #interface ContextData<
// #    N extends NBTNode = NBTNode,
// #    T extends NBTTag<any> = NBTTag<any>
// #> {
// #    readonly finalValidation: boolean;
// #    readonly node: N;
// #    readonly path: string;
// #    readonly reader: ArrayReader;
// #    readonly tag?: T;
// #    readonly useReferences: boolean;
// #}
// #
// #// tslint:disable:cyclomatic-complexity
// #// tslint:disable-next-line:max-classes-per-file
// #export class NBTValidator {
// #    private readonly docs: NBTDocs;
// #    private readonly extraChildren: boolean;
// #    private readonly parsed: NBTTag<any>;
// #    private readonly root: string;
// #    private readonly validateNBT: boolean;
// #
// #    public constructor(
// #        parsed: NBTTag<any>,
// #        docs: NBTDocs,
// #        extraChild: boolean,
// #        nbtvalidation: boolean = true,
// #        root: string = "root.json"
// #    ) {
// #        this.docs = docs;
// #        this.parsed = parsed;
// #        this.extraChildren = extraChild;
// #        this.root = root;
// #        this.validateNBT = nbtvalidation;
// #    }
// #
// #    public walkThenValidate(nbtpath: string[]): ReturnedInfo<NBTNode> {
// #        const node = this.docs.get(this.root) as RootNode;
// #        const reader = new ArrayReader(nbtpath);
// #        // tslint:disable-next-line:helper-return
// #        return this.walkNextNode({
// #            finalValidation: true,
// #            node,
// #            path: this.root,
// #            reader,
// #            tag: this.validateNBT ? this.parsed : undefined,
// #            useReferences: false
// #        });
// #    }
// #
// #    private mergeChildRef(data: ContextData<CompoundNode>): CompoundNode {
// #        const { node, path: currentPath } = data;
// #        if (!node.child_ref) {
// #            return node;
// #        }
// #        const helper = new ReturnHelper();
// #        const newChildren = JSON.parse(
// #            JSON.stringify(node.children || {})
// #        ) as Exclude<CompoundNode["children"], undefined>;
// #        for (const ref of node.child_ref) {
// #            const [nextPath] = parseRefPath(ref, currentPath);
// #            const refNode = this.walkRef(ref, currentPath, data);
// #            if (!helper.merge(refNode)) {
// #                continue;
// #            } else if (isCompoundNode(refNode.data)) {
// #                const evalNode = this.mergeChildRef({
// #                    ...data,
// #                    node: refNode.data,
// #                    path: nextPath
// #                });
// #                if (evalNode.children) {
// #                    for (const child of Object.keys(evalNode.children)) {
// #                        newChildren[child] = evalNode.children[child];
// #                    }
// #                }
// #            }
// #        }
// #        return {
// #            children: newChildren,
// #            description: node.description,
// #            suggestions: node.suggestions,
// #            type: "compound"
// #        };
// #    }
// #
// #    private walkCompoundNode(
// #        data: ContextData<CompoundNode, NBTTagCompound>
// #    ): ReturnedInfo<NBTNode> {
// #        const { node, reader, path, tag } = data;
// #        const helper = new ReturnHelper();
// #        const next = reader.read();
// #        if (node.children && next in node.children) {
// #            /*
// #             * It is safe to assume that next is in the tag
// #             * val because the path is based off of the tag
// #             */
// #            return helper.return(
// #                this.walkNextNode({
// #                    ...data,
// #                    node: node.children[next],
// #                    tag: tag ? tag.getVal()[next] : undefined
// #                })
// #            );
// #        } else if (node.child_ref) {
// #            for (const c of node.child_ref) {
// #                const [nextPath] = parseRefPath(c, path);
// #                const cnode = this.walkRef(c, path, data);
// #                if (
// #                    helper.merge(cnode) &&
// #                    isCompoundNode(cnode.data) &&
// #                    cnode.data.children &&
// #                    next in cnode.data.children
// #                ) {
// #                    return helper.return(
// #                        this.walkNextNode({
// #                            ...data,
// #                            node: cnode.data.children[next],
// #                            path: nextPath,
// #                            tag: tag ? tag.getVal()[next] : undefined
// #                        })
// #                    );
// #                }
// #            }
// #        }
// #        return helper.fail();
// #    }
// #
// #    private walkFunctionNode(
// #        data: ContextData<FunctionNode>
// #    ): ReturnedInfo<NBTNode> {
// #        const { node, reader, path } = data;
// #        const helper = new ReturnHelper();
// #        const ref = runNodeFunction(this.parsed, reader.getRead(), node);
// #        const [nextPath] = parseRefPath(ref, path);
// #        const newNode = this.walkRef(ref, path, data);
// #        if (!helper.merge(newNode)) {
// #            return helper.fail();
// #        }
// #        return helper.return(
// #            this.walkNextNode({
// #                ...data,
// #                node: newNode.data,
// #                path: nextPath
// #            })
// #        );
// #    }
// #
// #    private walkListNode(
// #        data: ContextData<ListNode, NBTTagList>
// #    ): ReturnedInfo<NBTNode> {
// #        const { node, reader, tag } = data;
// #        const next = reader.read();
// #        const helper = new ReturnHelper();
// #        if (!/\d+/.test(next)) {
// #            return helper.fail(
// #                tag
// #                    ? VALIDATION_ERRORS.badIndex.create(
// #                          tag.getRange().start,
// #                          tag.getRange().end
// #                      )
// #                    : undefined
// #            );
// #        }
// #        const nextTag = tag
// #            ? tag.getVal()[Number.parseInt(next, 10)]
// #            : undefined;
// #        return helper.return(
// #            this.walkNextNode({
// #                ...data,
// #                node: node.item,
// #                tag: nextTag
// #            })
// #        );
// #    }
// #
// #    private walkNextNode(data: ContextData): ReturnedInfo<NBTNode> {
// #        const { reader, node, tag, useReferences, finalValidation } = data;
// #        const helper = new ReturnHelper();
// #        if (reader.onLast()) {
// #            if (isRefNode(node)) {
// #                return helper.return(
// #                    this.walkRefNode(data as ContextData<RefNode>)
// #                );
// #            } else if (isFunctionNode(node)) {
// #                return helper.return(
// #                    this.walkFunctionNode(data as ContextData<FunctionNode>)
// #                );
// #            } else if (isCompoundNode(node)) {
// #                if (finalValidation && this.validateNBT && tag) {
// #                    const valres = tag.valideAgainst(node, {
// #                        compoundMerge: () =>
// #                            this.mergeChildRef(data as ContextData<
// #                                CompoundNode,
// #                                NBTTagCompound
// #                            >),
// #                        extraChildren: this.extraChildren
// #                    });
// #                    if (!helper.merge(valres)) {
// #                        return helper.fail();
// #                    }
// #                }
// #                return helper.succeed(
// #                    finalValidation
// #                        ? this.mergeChildRef(data as ContextData<CompoundNode>)
// #                        : node
// #                );
// #            } else {
// #                if (finalValidation && this.validateNBT && tag) {
// #                    const valres = tag.valideAgainst(node);
// #                    if (!helper.merge(valres)) {
// #                        return helper.fail();
// #                    }
// #                }
// #                return helper.succeed(node);
// #            }
// #        } else if (
// #            useReferences &&
// #            node.references &&
// #            reader.peek() in node.references
// #        ) {
// #            const next = reader.read();
// #            return helper.return(
// #                this.walkNextNode({
// #                    ...data,
// #                    node: node.references[next]
// #                })
// #            );
// #        } else if (isTypedNode(node)) {
// #            if (isCompoundNode(node)) {
// #                if (this.validateNBT && tag) {
// #                    const valres = tag.valideAgainst(node, {
// #                        compoundMerge: () =>
// #                            this.mergeChildRef(data as ContextData<
// #                                CompoundNode
// #                            >),
// #                        extraChildren: this.extraChildren
// #                    });
// #                    if (!helper.merge(valres)) {
// #                        return helper.fail();
// #                    }
// #                }
// #                if (tag && !(tag instanceof NBTTagCompound)) {
// #                    return helper.fail();
// #                }
// #                return helper.return(
// #                    this.walkCompoundNode(data as ContextData<
// #                        CompoundNode,
// #                        NBTTagCompound
// #                    >)
// #                );
// #            } else if (isListNode(node)) {
// #                if (this.validateNBT && tag) {
// #                    const valres = tag.valideAgainst(node);
// #                    if (!helper.merge(valres)) {
// #                        return helper.fail();
// #                    }
// #                }
// #                if (tag && !(tag instanceof NBTTagList)) {
// #                    return helper.fail();
// #                }
// #                return helper.return(
// #                    this.walkListNode(data as ContextData<ListNode, NBTTagList>)
// #                );
// #            } else if (isRootNode(node)) {
// #                return helper.return(
// #                    this.walkRootNode(data as ContextData<RootNode>)
// #                );
// #            } else {
// #                if (tag) {
// #                    const valres = tag.valideAgainst(node);
// #                    helper.merge(valres);
// #                }
// #                return helper.fail();
// #            }
// #        } else {
// #            if (isRefNode(node)) {
// #                return helper.return(
// #                    this.walkRefNode(data as ContextData<RefNode>)
// #                );
// #            } else if (isFunctionNode(node)) {
// #                return helper.return(
// #                    this.walkFunctionNode(data as ContextData<FunctionNode>)
// #                );
// #            }
// #        }
// #        return helper.fail();
// #    }
// #
// #    private walkRef(
// #        ref: string,
// #        path: string,
// #        data: ContextData
// #    ): ReturnedInfo<NBTNode> {
// #        const [nextPath, fragPath] = parseRefPath(ref, path);
// #        const reader = new ArrayReader(fragPath);
// #        const node = this.docs.get(nextPath) as NBTNode;
// #        // tslint:disable-next-line:helper-return
// #        return this.walkNextNode({
// #            useReferences: true,
// #            finalValidation: false,
// #            node,
// #            path: nextPath,
// #            reader,
// #            tag: data.tag
// #        });
// #    }
// #
// #    private walkRefNode(data: ContextData<RefNode>): ReturnedInfo<NBTNode> {
// #        const { node, path } = data;
// #        const helper = new ReturnHelper();
// #        const [nextPath] = parseRefPath(node.ref, path);
// #        const nnode = this.walkRef(node.ref, path, data);
// #        if (helper.merge(nnode)) {
// #            const out = this.walkNextNode({
// #                ...data,
// #                node: nnode.data,
// #                path: nextPath
// #            });
// #            if (helper.merge(out)) {
// #                return helper.succeed(out.data);
// #            } else {
// #                return helper.fail();
// #            }
// #        } else {
// #            return helper.fail();
// #        }
// #    }
// #
// #    private walkRootNode(data: ContextData<RootNode>): ReturnedInfo<NBTNode> {
// #        const { node, reader, path } = data;
// #        const next = reader.read();
// #        const helper = new ReturnHelper();
// #        if (next in node.children) {
// #            return helper.return(
// #                this.walkNextNode({
// #                    ...data,
// #                    node: node.children[next]
// #                })
// #            );
// #        } else {
// #            for (const key of Object.keys(node.children)) {
// #                if (key.startsWith("$")) {
// #                    const ref = key.substring(1);
// #                    const [nextPath] = parseRefPath(ref, path);
// #                    const list = (this.docs.get(nextPath) as any) as ValueList;
// #                    if (
// #                        list.find(
// #                            v => (isString(v) ? v === next : v.value === next)
// #                        )
// #                    ) {
// #                        return helper.return(
// #                            this.walkNextNode({
// #                                ...data,
// #                                node: node.children[key]
// #                            })
// #                        );
// #                    }
// #                }
// #            }
// #        }
// #        return helper.fail();
// #    }
// #}
// #
},{"./doc-walker-func":"51vC","./util/array-reader":"PoZp","./util/doc-walker-util":"km+2"}],"JpDU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const misc_functions_1 = require("../../../misc-functions");

const context_1 = require("../../../misc-functions/context");

const tag_parser_1 = require("./tag-parser");

const doc_walker_util_1 = require("./util/doc-walker-util");

const nbt_util_1 = require("./util/nbt-util");

const walker_1 = require("./walker");

const paths = [{
  data: () => ({
    kind: "entity"
  }),
  path: ["data", "merge", "entity"]
}, {
  data: () => ({
    kind: "block"
  }),
  path: ["data", "merge", "block"]
}, {
  data: args => ({
    ids: args.otherEntity && args.otherEntity.ids && // tslint:disable-next-line:no-unnecessary-callback-wrapper
    args.otherEntity.ids.map(v => misc_functions_1.stringifyNamespace(v)) || [],
    kind: "entity"
  }),
  path: ["summon", "entity"] // TODO - handle nbt_tag in /data modify

}];

function validateParse(reader, info, data) {
  const helper = new misc_functions_1.ReturnHelper();
  const docs = info.data.globalData.nbt_docs;
  const parseResult = tag_parser_1.parseAnyNBTTag(reader, []);
  const datum = parseResult.data;
  const walker = new walker_1.NBTWalker(docs);

  if (datum && ( // This is to appease the type checker
  helper.merge(parseResult) || datum.correctness > nbt_util_1.Correctness.NO)) {
    if (!!data) {
      const asNBTIDInfo = data;
      const asNodeInfo = data;
      const unknowns = new Set();

      if (asNBTIDInfo.kind) {
        if (Array.isArray(asNBTIDInfo.ids)) {
          for (const id of asNBTIDInfo.ids) {
            const root = walker.getInitialNode([asNBTIDInfo.kind, id]);

            if (!doc_walker_util_1.isNoNBTInfo(root)) {
              const result = datum.tag.validate(root, walker);
              helper.merge(result, {
                errors: false
              });
              helper.merge(solveUnkownErrors(result.errors, unknowns, `${asNBTIDInfo.kind} '${id}'`));
            }
          }
        } else {
          const root = walker.getInitialNode([asNBTIDInfo.kind, asNBTIDInfo.ids || "none"]);

          if (!doc_walker_util_1.isNoNBTInfo(root)) {
            const result = datum.tag.validate(root, walker);
            helper.merge(result, {
              errors: false
            });
            helper.merge(solveUnkownErrors(result.errors, unknowns, `${asNBTIDInfo.kind} '${asNBTIDInfo.ids || "unspecified"}'`));
          }
        }
      } else {
        if (!doc_walker_util_1.isNoNBTInfo(asNodeInfo)) {
          const result = datum.tag.validate(asNodeInfo, walker);
          helper.merge(result, {
            errors: false
          });
          helper.merge(solveUnkownErrors(result.errors));
        }
      }
    }

    return helper.succeed();
  } else {
    if (!!data && !reader.canRead()) {
      const asNodeInfo = data;
      const asNBTIDInfo = data;
      const root = asNBTIDInfo.kind ? walker.getInitialNode([asNBTIDInfo.kind].concat(asNBTIDInfo.ids || "none")) : asNodeInfo;
      const suggestion = nbt_util_1.getStartSuggestion(root.node);

      if (suggestion) {
        helper.addSuggestion(reader.cursor, suggestion);
      }
    }

    return helper.fail();
  }
}

exports.validateParse = validateParse;

function solveUnkownErrors(errors, unknowns = new Set(), name) {
  const helper = new misc_functions_1.ReturnHelper();

  for (const error of errors) {
    if (Array.isArray(error.path)) {
      const unknownError = error;
      const pathKey = unknownError.path.join(":");

      if (!unknowns.has(pathKey)) {
        const {
          path
        } = unknownError,
              allowed = tslib_1.__rest(unknownError, ["path"]);

        helper.addErrors(Object.assign({}, allowed, {
          // This will break when translations are added, not sure how best to do this
          text: name ? `${error.text} for ${name}` : error.text
        }));
        unknowns.add(pathKey);
      }
    } else {
      helper.addErrors(error);
    }
  }

  return helper.succeed();
}

function parseThenValidate(reader, walker, node) {
  const helper = new misc_functions_1.ReturnHelper();
  const parseResult = tag_parser_1.parseAnyNBTTag(reader, []);
  const parseData = parseResult.data;

  if (parseData && (helper.merge(parseResult) || parseData.correctness > nbt_util_1.Correctness.NO)) {
    if (node) {
      if (!doc_walker_util_1.isNoNBTInfo(node)) {
        const result = parseData.tag.validate(node, walker);
        helper.merge(result, {
          errors: false
        });
        helper.merge(solveUnkownErrors(result.errors));
      }
    }

    return helper.succeed();
  } else {
    if (node && !reader.canRead()) {
      const suggestion = nbt_util_1.getStartSuggestion(node.node);

      if (suggestion) {
        helper.addSuggestion(reader.cursor, suggestion);
      }
    }

    return helper.fail();
  }
}

exports.parseThenValidate = parseThenValidate;
exports.nbtParser = {
  parse: (reader, info) => {
    const helper = new misc_functions_1.ReturnHelper(info);
    const ctxdatafn = context_1.startPaths(paths, info.path || []);
    const data = ctxdatafn && ctxdatafn(info.context);
    return helper.return(validateParse(reader, info, data));
  }
};
},{"../../../misc-functions":"KBGm","../../../misc-functions/context":"UbUk","./tag-parser":"4pIN","./util/doc-walker-util":"km+2","./util/nbt-util":"OoHl","./walker":"YMNQ"}],"wRSu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const main_1 = require("vscode-languageserver/lib/main");

const errors_1 = require("../../brigadier/errors");

const misc_functions_1 = require("../../misc-functions");

const nmsp_tag_1 = require("../../misc-functions/parsing/nmsp-tag");

const nbt_1 = require("./nbt/nbt");

exports.predicateParser = {
  parse: (reader, info) => parseBlockArgument(reader, info, true)
};
exports.stateParser = {
  parse: (reader, info) => parseBlockArgument(reader, info, false)
};
const exceptions = {
  block_properties: {
    duplicate: new errors_1.CommandErrorBuilder("argument.block.property.duplicate", "Property '%s' can only be set once for block %s"),
    invalid: new errors_1.CommandErrorBuilder("argument.block.property.invalid", "Block %s does not accept '%s' for %s property"),
    novalue: new errors_1.CommandErrorBuilder("argument.block.property.novalue", "Expected value for property '%s' on block %s"),
    unknown: new errors_1.CommandErrorBuilder("argument.block.property.unknown", "Block %s does not have property '%s'")
  },
  invalid_block: new errors_1.CommandErrorBuilder("argument.block.id.invalid", "Unknown block type '%s'"),
  no_tags: new errors_1.CommandErrorBuilder("argument.block.tag.disallowed", "Tags aren't allowed here, only actual blocks"),
  tag_properties: {
    duplicate: new errors_1.CommandErrorBuilder("argument.block_tag.property.duplicate", "Property '%s' can only be set once for block tag %s"),
    invalid: new errors_1.CommandErrorBuilder("argument.block_tag.property.invalid", "Block tag %s does not accept '%s' for %s property"),
    novalue: new errors_1.CommandErrorBuilder("argument.block_tag.property.novalue", "Expected value for property '%s' on block tag %s"),
    unknown: new errors_1.CommandErrorBuilder("argument.block_tag.property.unknown", "Block tag %s does not have property '%s'")
  },
  unknown_properties: {
    duplicate: new errors_1.CommandErrorBuilder("argument.unknown_block_tag.property.duplicate", "Property '%s' can only be set once for unknown block tag %s"),
    invalid: new errors_1.CommandErrorBuilder("argument.unknown_block_tag.property.invalid", "Unknown block tag %s might not accept '%s' for %s property", main_1.DiagnosticSeverity.Warning),
    novalue: new errors_1.CommandErrorBuilder("argument.unknown_block_tag.property.novalue", "Expected value for property '%s' on unknown block tag %s"),
    unknown: new errors_1.CommandErrorBuilder("argument.unknown_block_tag.property.unknown", "Unknown block tag %s might not have property '%s'", main_1.DiagnosticSeverity.Warning)
  },
  unclosed_props: new errors_1.CommandErrorBuilder("argument.block.property.unclosed", "Expected closing ] for block state properties"),
  unknown_tag: new errors_1.CommandErrorBuilder("arguments.block.tag.unknown", // Argument_s_ [sic]
  "Unknown block tag '%s'")
}; // tslint:disable:cyclomatic-complexity

function parseBlockArgument(reader, info, tags) {
  const helper = new misc_functions_1.ReturnHelper(info);
  const start = reader.cursor;
  const tagHandling = tags ? "block_tags" : exceptions.no_tags;
  const parsed = nmsp_tag_1.parseNamespaceOrTag(reader, info, tagHandling);
  let stringifiedName;

  if (helper.merge(parsed)) {
    const parsedResult = parsed.data;

    if (parsedResult.resolved && parsedResult.values) {
      stringifiedName = `#${misc_functions_1.stringifyNamespace(parsedResult.parsed)}`;
      helper.merge(nmsp_tag_1.buildTagActions(parsedResult.values, start + 1, reader.cursor, "block_tags", info.data.localData));
      const props = constructProperties(parsedResult.resolved, info.data.globalData.blocks);
      const propsResult = parseProperties(reader, props || {}, exceptions.tag_properties, stringifiedName);

      if (!helper.merge(propsResult)) {
        return helper.fail();
      }

      if (reader.peek() === "{") {
        const nbt = nbt_1.validateParse(reader, info, {
          // tslint:disable-next-line:no-unnecessary-callback-wrapper
          ids: (parsedResult.resolved || []).map(v => misc_functions_1.stringifyNamespace(v)),
          kind: "block"
        });

        if (!helper.merge(nbt)) {
          return helper.fail();
        }
      } else {
        helper.addSuggestion(reader.cursor, "{");
      }
    } else {
      stringifiedName = misc_functions_1.stringifyNamespace(parsed.data.parsed);

      if (info.suggesting && !reader.canRead()) {
        helper.addSuggestions(...misc_functions_1.namespaceSuggestionString(Object.keys(info.data.globalData.blocks), parsed.data.parsed, start));
      }

      const props = info.data.globalData.blocks[stringifiedName];

      if (!props) {
        helper.addErrors(exceptions.invalid_block.create(start, reader.cursor));
      }

      const result = parseProperties(reader, props || {}, exceptions.block_properties, stringifiedName);

      if (!helper.merge(result)) {
        return helper.fail();
      }

      if (reader.peek() === "{") {
        const nbt = nbt_1.validateParse(reader, info, {
          ids: props ? stringifiedName : "none",
          kind: "block"
        });

        if (!helper.merge(nbt)) {
          return helper.fail();
        }
      } else {
        helper.addSuggestion(reader.cursor, "{");
      }
    }
  } else {
    if (parsed.data) {
      helper.addErrors(exceptions.unknown_tag.create(start, reader.cursor, misc_functions_1.stringifyNamespace(parsed.data)));
      stringifiedName = `#${misc_functions_1.stringifyNamespace(parsed.data)}`;
      const propsResult = parseProperties(reader, {}, exceptions.unknown_properties, stringifiedName);

      if (!helper.merge(propsResult)) {
        return helper.fail();
      }

      if (reader.peek() === "{") {
        const nbt = nbt_1.validateParse(reader, info, {
          ids: "none",
          kind: "block"
        });

        if (!helper.merge(nbt)) {
          return helper.fail();
        }
      } else {
        helper.addSuggestion(reader.cursor, "{");
      }
    } else {
      // Parsing of the namespace failed
      return helper.fail();
    }
  }

  return helper.succeed();
}

exports.parseBlockArgument = parseBlockArgument; // Ugly call signature. Need to see how upstream handles tag properties.
// At the moment, it is very broken

function parseProperties(reader, options, errors, name) {
  const helper = new misc_functions_1.ReturnHelper();
  const result = new Map();
  const start = reader.cursor;

  if (helper.merge(reader.expect("["), {
    errors: false
  })) {
    const props = Object.keys(options);
    reader.skipWhitespace();

    if (helper.merge(reader.expectOption("]"), {
      errors: false
    })) {
      return helper.succeed(result);
    }

    while (true) {
      reader.skipWhitespace();
      const propStart = reader.cursor;
      const isUnclosed = !reader.canRead();
      const propParse = reader.readOption(props, undefined, main_1.CompletionItemKind.Property);
      const propKey = propParse.data;
      const propSuccessful = helper.merge(propParse);

      if (propKey === undefined) {
        // Strange order allows better type checker reasoning
        // Parsing failed
        return helper.fail();
      }

      if (isUnclosed) {
        return helper.fail(exceptions.unclosed_props.create(start, reader.cursor));
      }

      if (!propSuccessful) {
        helper.addErrors(errors.unknown.create(propStart, reader.cursor, name, propKey));
      }

      if (result.has(propKey)) {
        helper.addErrors(errors.duplicate.create(propStart, reader.cursor, propKey, name));
      }

      reader.skipWhitespace();

      if (!helper.merge(reader.expect("="), {
        errors: false
      })) {
        return helper.fail(errors.novalue.create(propStart, reader.cursor, propKey, name));
      }

      reader.skipWhitespace();
      const valueStart = reader.cursor;
      const valueParse = reader.readOption(options[propKey] || [], undefined, main_1.CompletionItemKind.EnumMember);
      const valueSuccessful = helper.merge(valueParse);
      const value = valueParse.data;

      if (value === undefined) {
        return helper.fail();
      }

      const error = errors.invalid.create(valueStart, reader.cursor, name, value, propKey);

      const adderrorIf = b => b && propSuccessful && !valueSuccessful ? helper.addErrors(error) : undefined;

      adderrorIf(value.length > 0);
      result.set(propKey, value);
      reader.skipWhitespace();

      if (helper.merge(reader.expect(","), {
        errors: false
      })) {
        adderrorIf(value.length === 0);
        continue;
      }

      if (helper.merge(reader.expect("]"), {
        errors: false
      })) {
        adderrorIf(value.length === 0);
        return helper.succeed(result);
      }

      return helper.fail(exceptions.unclosed_props.create(start, reader.cursor));
    }
  }

  return helper.succeed(result);
}

function constructProperties(options, blocks) {
  const result = {};

  for (const blockName of options) {
    const stringified = misc_functions_1.stringifyNamespace(blockName);
    const block = blocks[stringified];

    if (block) {
      for (const prop in block) {
        if (block.hasOwnProperty(prop)) {
          result[prop] = Array.from(new Set((result[prop] || []).concat(block[prop])));
        }
      }
    }
  }

  return result;
}
},{"../../brigadier/errors":"aP4V","../../misc-functions":"KBGm","../../misc-functions/parsing/nmsp-tag":"lcVC","./nbt/nbt":"JpDU"}],"3ZZw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode_languageserver_1 = require("vscode-languageserver");

const misc_functions_1 = require("../../misc-functions");

exports.jsonParser = {
  parse: (reader, info) => {
    const helper = new misc_functions_1.ReturnHelper();
    const remaining = reader.getRemaining();
    const start = reader.cursor;
    reader.cursor = reader.string.length;
    const text = {
      getText: () => remaining,
      languageId: "json",
      lineCount: 1,
      offsetAt: pos => pos.character,
      positionAt: offset => ({
        line: 0,
        character: offset
      }),
      uri: "file://text-component.json",
      version: 0
    };
    const service = info.data.globalData.jsonService; // tslint:disable-next-line:no-inferred-empty-object-type

    const json = service.parseJSONDocument(text);
    service.doValidation(text, json).then(diagnostics => {
      /* Because we use SynchronousPromise this is called before the next statement runs*/
      helper.addErrors(...diagnostics.map(diag => ({
        code: typeof diag.code === "string" ? diag.code : "json",
        range: {
          end: start + diag.range.end.character,
          start: start + diag.range.start.character
        },
        severity: diag.severity || vscode_languageserver_1.DiagnosticSeverity.Error,
        text: diag.message
      })));
    });
    service.doComplete(text, {
      line: 0,
      character: remaining.length
    }, json).then(completionList => {
      if (completionList) {
        completionList.items.forEach(item => {
          if (item.textEdit) {
            helper.addSuggestions({
              description: item.documentation,
              insertTextFormat: item.insertTextFormat,
              kind: item.kind,
              label: item.label,
              start: start + item.textEdit.range.start.character,
              text: item.textEdit.newText.replace(/\s*\n\s*/g, "")
            });
          } else {
            helper.addSuggestions({
              description: item.documentation,
              insertTextFormat: item.insertTextFormat,
              kind: item.kind,
              label: item.label,
              start: reader.cursor,
              text: item.label.replace(/\s*\n\s*/g, "")
            });
          }
        });
      }
    });
    helper.addActions({
      data: {
        json,
        text
      },
      high: reader.cursor,
      low: start,
      type: "json"
    });
    return helper.succeed();
  }
};
},{"../../misc-functions":"KBGm"}],"5Pa8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const errors_1 = require("../../brigadier/errors");

const misc_functions_1 = require("../../misc-functions");

const MIXED = new errors_1.CommandErrorBuilder("argument.pos.mixed", "Cannot mix world & local coordinates (everything must either use ^ or not)");
const INCOMPLETE = new errors_1.CommandErrorBuilder("argument.pos.incomplete", "Incomplete position argument. Only %s coords are present, when %s should be");
const NO_LOCAL = new errors_1.CommandErrorBuilder("argument.pos.nolocal", "Local coords are not allowed");
const LOCAL = "^";
const RELATIVE = "~";

const fail = (reader, count, hasWorld, hasLocal, start, i) => {
  const helper = new misc_functions_1.ReturnHelper();

  if (!hasWorld) {
    helper.addSuggestions({
      start: reader.cursor,
      text: LOCAL
    });
  }

  if (!hasLocal) {
    helper.addSuggestions({
      start: reader.cursor,
      text: RELATIVE
    });
  }

  return helper.fail(INCOMPLETE.create(start, reader.cursor, (i + 1).toString(), count.toString()));
};

class CoordParser {
  constructor(rules) {
    this.rules = rules;
  }

  parse(reader, info) {
    const helper = new misc_functions_1.ReturnHelper(info);
    let hasLocal = false;
    let hasWorld = false;
    const start = reader.cursor;

    for (let i = 0; i < this.rules.count; i++) {
      if (!reader.canRead()) {
        return helper.return(fail(reader, this.rules.count, hasWorld, hasLocal, start, 0));
      }

      const cstart = reader.cursor;

      switch (reader.peek()) {
        case RELATIVE:
          hasWorld = true;
          reader.skip();

          if (!helper.merge(this.parseNumber(reader))) {
            return helper.fail();
          }

          if (hasLocal) {
            helper.addErrors(MIXED.create(cstart, reader.cursor));
          }

          break;

        case LOCAL:
          if (!this.rules.local) {
            helper.addErrors(NO_LOCAL.create(reader.cursor, reader.cursor + 1));
          }

          hasLocal = true;
          reader.skip();

          if (!helper.merge(this.parseNumber(reader))) {
            return helper.fail();
          }

          if (hasWorld) {
            helper.addErrors(MIXED.create(cstart, reader.cursor));
          }

          break;

        default:
          hasWorld = true;

          if (!helper.merge(this.parseNumber(reader, false))) {
            return helper.fail();
          }

          if (hasLocal) {
            helper.addErrors(MIXED.create(cstart, reader.cursor));
          }

      }

      if (i < this.rules.count - 1) {
        if (!reader.canRead()) {
          return helper.fail(INCOMPLETE.create(start, reader.cursor, (i + 1).toString(), this.rules.count.toString()));
        }

        if (!helper.merge(reader.expect(" "), {
          suggestions: false
        })) {
          return helper.return(fail(reader, this.rules.count, hasWorld, hasLocal, start, i));
        }
      }
    }

    return helper.succeed();
  }

  parseNumber(reader, allowBlank = true) {
    if ((!reader.canRead() || reader.peek().match(/\s/)) && allowBlank) {
      // tslint:disable-next-line:helper-return
      return new misc_functions_1.ReturnHelper().succeed(0);
    } // tslint:disable-next-line:helper-return


    return this.rules.float ? reader.readFloat() : reader.readInt();
  }

}

exports.CoordParser = CoordParser;
exports.rotation = new CoordParser({
  count: 2,
  float: true,
  local: false
});
exports.vec2 = new CoordParser({
  count: 2,
  float: true,
  local: true
});
exports.vec3 = new CoordParser({
  count: 3,
  float: true,
  local: true
});
exports.blockPos = new CoordParser({
  count: 3,
  float: false,
  local: true
});
exports.columnPos = new CoordParser({
  count: 2,
  float: false,
  local: false
});
},{"../../brigadier/errors":"aP4V","../../misc-functions":"KBGm"}],"suMb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const errors_1 = require("../../brigadier/errors");

const misc_functions_1 = require("../../misc-functions");

class NamespaceListParser {
  constructor(registryType, errorBuilder, context) {
    this.registryType = registryType;
    this.error = errorBuilder;
    this.resultFunction = context;
  }

  parse(reader, info) {
    const helper = new misc_functions_1.ReturnHelper(info);
    const start = reader.cursor;
    const result = misc_functions_1.parseNamespaceOption(reader, misc_functions_1.stringArrayToNamespaces([...info.data.globalData.registries[this.registryType]]));

    if (helper.merge(result)) {
      if (this.resultFunction) {
        this.resultFunction(info.context, result.data.values);
        return helper.succeed();
      } else {
        return helper.succeed();
      }
    } else {
      if (result.data) {
        return helper.addErrors(this.error.create(start, reader.cursor, misc_functions_1.stringifyNamespace(result.data))).succeed();
      } else {
        return helper.fail();
      }
    }
  }

}

exports.NamespaceListParser = NamespaceListParser;
exports.summonError = new errors_1.CommandErrorBuilder("entity.notFound", "Unknown entity: %s");
exports.summonParser = new NamespaceListParser("minecraft:entity_type", exports.summonError, (context, ids) => context.otherEntity = {
  ids
});
const enchantmentError = new errors_1.CommandErrorBuilder("enchantment.unknown", "Unknown enchantment: %s");
exports.enchantmentParser = new NamespaceListParser("minecraft:enchantment", enchantmentError);
const mobEffectError = new errors_1.CommandErrorBuilder("effect.effectNotFound", "Unknown effect: %s");
exports.mobEffectParser = new NamespaceListParser("minecraft:mob_effect", mobEffectError);
const particleError = new errors_1.CommandErrorBuilder("particle.notFound", "Unknown particle: %s");
exports.particleParser = new NamespaceListParser("minecraft:particle_type", particleError);
const dimensionError = new errors_1.CommandErrorBuilder("argument.dimension.invalid", "Unknown dimension: '%s'");
exports.dimensionParser = new NamespaceListParser("minecraft:dimension_type", dimensionError);
},{"../../brigadier/errors":"aP4V","../../misc-functions":"KBGm"}],"1Kfp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode_languageserver_1 = require("vscode-languageserver");

const errors_1 = require("../../brigadier/errors");

const string_reader_1 = require("../../brigadier/string-reader");

const misc_functions_1 = require("../../misc-functions");

const swapped = new errors_1.CommandErrorBuilder("argument.range.swapped", "Min cannot be bigger than max");
const equalEnds = new errors_1.CommandErrorBuilder("argument.range.equal", "Min and max are eqaul and can be replaced by '%s'", vscode_languageserver_1.DiagnosticSeverity.Hint);
const digregex = /\d/;

function readIntLimited(reader) {
  const helper = new misc_functions_1.ReturnHelper();
  const start = reader.cursor;
  const neg = reader.peek() === "-";

  if (neg) {
    reader.skip();
  }

  const num = reader.readWhileRegexp(digregex);

  if (num.length === 0) {
    if (neg) {
      return helper.fail(string_reader_1.READER_EXCEPTIONS.INVALID_INT.create(start, reader.cursor));
    } else {
      return helper.fail(string_reader_1.READER_EXCEPTIONS.EXPECTED_INT.create(start, reader.cursor));
    }
  }

  return helper.succeed(parseInt(`${neg ? "-" : ""}${num}`, 10));
}

function readFloatLimited(reader) {
  const helper = new misc_functions_1.ReturnHelper();
  const start = reader.cursor;
  const neg = reader.peek() === "-";

  if (neg) {
    reader.skip();
  }

  let hasDecPoint = false;
  const num = reader.readWhileFunction(v => {
    if (v === ".") {
      if (hasDecPoint) {
        return false;
      } else {
        hasDecPoint = true;
        return true;
      }
    } else if (/\d/.test(v)) {
      return true;
    }

    return false;
  });

  if (num.length === 0) {
    if (neg) {
      return helper.fail(string_reader_1.READER_EXCEPTIONS.INVALID_FLOAT.create(start, reader.cursor));
    } else {
      return helper.fail(string_reader_1.READER_EXCEPTIONS.EXPECTED_FLOAT.create(start, reader.cursor));
    }
  }

  return helper.succeed(parseFloat(`${neg ? "-" : ""}${num}`));
}

function parseRange(reader, float = false) {
  const helper = new misc_functions_1.ReturnHelper();
  const start = reader.cursor;

  if (helper.merge(reader.expect(".."), {
    errors: false
  })) {
    const max = float ? readFloatLimited(reader) : readIntLimited(reader);

    if (!helper.merge(max)) {
      return helper.fail();
    }

    return helper.succeed({
      max: max.data
    });
  } else {
    const min = float ? readFloatLimited(reader) : readIntLimited(reader);

    if (!helper.merge(min)) {
      return helper.fail();
    }

    if (!helper.merge(reader.expect(".."), {
      errors: false
    })) {
      return helper.succeed({
        max: min.data,
        min: min.data
      });
    } else if (string_reader_1.StringReader.charAllowedNumber.test(reader.peek())) {
      const max = float ? readFloatLimited(reader) : readIntLimited(reader);

      if (!helper.merge(max)) {
        return helper.fail();
      }

      if (max.data < min.data) {
        helper.addErrors(swapped.create(start, reader.cursor));
        helper.addActions({
          data: `${max.data}..${min.data}`,
          high: reader.cursor,
          low: start,
          type: "format"
        });
        return helper.succeed({
          max: min.data,
          min: max.data
        });
      }

      if (max.data === min.data) {
        helper.addErrors(equalEnds.create(start, reader.cursor, min.data.toString()));
        helper.addActions({
          data: `${min.data}`,
          high: reader.cursor,
          low: start,
          type: "format"
        });
      }

      return helper.succeed({
        max: max.data,
        min: min.data
      });
    } else {
      return helper.succeed({
        min: min.data
      });
    }
  }
}

exports.parseRange = parseRange;
exports.floatRange = {
  parse: (reader, info) => {
    const helper = new misc_functions_1.ReturnHelper(info);
    const res = parseRange(reader, true);
    return helper.merge(res) ? helper.succeed() : helper.fail();
  }
};
exports.intRange = {
  parse: (reader, info) => {
    const helper = new misc_functions_1.ReturnHelper(info);
    const res = parseRange(reader, false);
    return helper.merge(res) ? helper.succeed() : helper.fail();
  }
};
},{"../../brigadier/errors":"aP4V","../../brigadier/string-reader":"iLhI","../../misc-functions":"KBGm"}],"1kly":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode_languageserver_1 = require("vscode-languageserver");

const errors_1 = require("../../brigadier/errors");

const string_reader_1 = require("../../brigadier/string-reader");

const consts_1 = require("../../consts");

const misc_functions_1 = require("../../misc-functions");

const typed_keys_1 = require("../../misc-functions/third_party/typed-keys");

const namespace_list_1 = require("./namespace-list");

const nbt_1 = require("./nbt/nbt");

const range_1 = require("./range"); // tslint:disable:cyclomatic-complexity


const uuidregex = /^[a-fA-F0-9]{1,8}-[a-fA-F0-9]{1,4}-[a-fA-F0-9]{1,4}-[a-fA-F0-9]{1,4}-[a-fA-F0-9]{1,12}$/;
/* Should be disabled if not wanted
https://github.com/Levertion/mcfunction-langserver/issues/89 */

const uuidwarn = new errors_1.CommandErrorBuilder("argument.entity.uuid", "Selecting an entity based on its UUID may cause instability [This warning can be disabled in the settings (Although not at the moment)]", vscode_languageserver_1.DiagnosticSeverity.Warning);
const contexterr = {
  oneEntity: new errors_1.CommandErrorBuilder("argument.entity.toomany", "Only one entity is allowed, but the provided selector allows more than one"),
  onePlayer: new errors_1.CommandErrorBuilder("argument.player.toomany", "Only one player is allowed, but the provided selector allows more than one"),
  onlyPlayer: new errors_1.CommandErrorBuilder("argument.player.entities", "Only players may be affected by this command, but the provided selector includes entities")
};
const errors = {
  duplicate: new errors_1.CommandErrorBuilder("argument.entity.option.duplicate", "Duplicate argument '%s'"),
  gamemode: {
    expected: new errors_1.CommandErrorBuilder("argument.entity.option.gamemode.expected", "Expected gamemode"),
    invalid: new errors_1.CommandErrorBuilder("argument.entity.option.gamemode.invalid", "Invalid gamemode '%s'")
  },
  impossible: new errors_1.CommandErrorBuilder("argument.entity.option.nointersect", "Argument '%s' cannot match any entity"),
  intOpt: {
    aboveMax: new errors_1.CommandErrorBuilder("argument.entity.option.number.abovemax", "Argument '%s' is greater than %s"),
    belowMin: new errors_1.CommandErrorBuilder("argument.entity.option.number.belowmin", "Argument '%s' is less than %s")
  },
  invalidSort: new errors_1.CommandErrorBuilder("argument.entity.option.sort.invalid", "Invalid sort type '%s'"),
  noInfo: new errors_1.CommandErrorBuilder("argument.entity.option.noinfo", "Argument '%s' is redundant"),
  unknownArg: new errors_1.CommandErrorBuilder("argument.entity.argument.unknown", "Unknown argument type '%s'"),
  unknown_tag: new errors_1.CommandErrorBuilder("arguments.entity.tag.unknown", "Unknown entity tag '%s'")
};

function getContextError(context, prop) {
  if (prop.type === "player" && context.type && context.type.set && context.type.set.size === 1 && context.type.set.has("minecraft:player")) {
    return contexterr.onlyPlayer;
  }

  if (prop.amount === "single" && context.limit !== 1) {
    return prop.type === "player" ? contexterr.onePlayer : contexterr.oneEntity;
  }

  return undefined;
} // tslint:disable-next-line:no-unnecessary-callback-wrapper it gives an error if it isn't wrapped


const gamemodes = ["survival", "creative", "adventure", "spectator"];

function isNegated(reader, helper) {
  return helper.merge(reader.expect("!"), {
    errors: false
  });
}

exports.numOptParser = (float, min, max, key) => (reader, _, context, argStart) => {
  const helper = new misc_functions_1.ReturnHelper();
  const start = reader.cursor;
  const res = float ? reader.readFloat() : reader.readInt();

  if (!helper.merge(res)) {
    return helper.fail();
  }

  const num = res.data;

  if (max && num > max) {
    helper.addErrors(errors.intOpt.aboveMax.create(start, reader.cursor, key, max.toString()));
    return helper.succeed();
  }

  if (min && num < min) {
    helper.addErrors(errors.intOpt.belowMin.create(start, reader.cursor, key, min.toString()));
    return helper.succeed();
  } // The entity context already has a value


  if (!!context[key]) {
    helper.addErrors(errors.duplicate.create(argStart, reader.cursor, key));
    return helper.succeed();
  }

  context[key] = num;
  return helper.succeed();
};

exports.rangeOptParser = (float, min, max, key) => (reader, _, context, argStart) => {
  const helper = new misc_functions_1.ReturnHelper();
  const start = reader.cursor;
  const res = range_1.parseRange(reader, float);

  if (!helper.merge(res)) {
    return helper.fail();
  }

  const range = res.data;

  if (range.max) {
    if (max && range.max > max) {
      helper.addErrors(errors.intOpt.aboveMax.create(start, reader.cursor, key, max.toString()));
      return helper.succeed();
    }

    if (min && range.max < min) {
      helper.addErrors(errors.intOpt.belowMin.create(start, reader.cursor, key, min.toString()));
      return helper.succeed();
    }
  }

  if (range.min) {
    if (max && range.min > max) {
      helper.addErrors(errors.intOpt.aboveMax.create(start, reader.cursor, key, max.toString()));
      return helper.succeed();
    }

    if (min && range.min < min) {
      helper.addErrors(errors.intOpt.belowMin.create(start, reader.cursor, key, min.toString()));
      return helper.succeed();
    }
  }

  if (!!context[key]) {
    helper.addErrors(errors.duplicate.create(argStart, reader.cursor, key));
    return helper.succeed();
  }

  context[key] = range;
  return helper.succeed();
};

function parseScores(reader, scoreboard) {
  const helper = new misc_functions_1.ReturnHelper();

  if (!helper.merge(reader.expect("{"))) {
    return helper.fail();
  }

  const objnames = scoreboard ? scoreboard.data.Objectives.map(v => v.Name) : [];
  const out = {};

  if (!helper.merge(reader.expect("}"), {
    errors: false
  })) {
    while (true) {
      const res = scoreboard ? reader.readOption(objnames, {
        quote: false,
        unquoted: string_reader_1.StringReader.charAllowedInUnquotedString
      }) : misc_functions_1.getReturned(reader.readUnquotedString());
      const data = res.data;

      if (!helper.merge(res) && data === undefined) {
        return helper.fail();
      }

      if (!helper.merge(reader.expect("="))) {
        return helper.fail();
      }

      const range = range_1.parseRange(reader);

      if (!helper.merge(range)) {
        return helper.fail();
      }

      out[data] = range.data;

      if (helper.merge(reader.expect(","), {
        errors: false
      })) {
        continue;
      } else if (helper.merge(reader.expect("}"), {
        errors: false
      })) {
        break;
      } else {
        const error = reader.expectOption(",", "}"); // Get the error for expected option

        return helper.mergeChain(error, {
          suggestions: false
        }).fail();
      }
    }
  }

  return helper.succeed(out);
}

exports.parseScores = parseScores;

function parseAdvancements(reader, info) {
  const advancements = misc_functions_1.getResourcesofType(info.data, "advancements");
  const helper = new misc_functions_1.ReturnHelper();

  if (!helper.merge(reader.expect("{"))) {
    return helper.fail();
  }

  const out = {};

  while (true) {
    let advname;
    const criteriaOptions = [];
    const res = misc_functions_1.parseNamespaceOption(reader, advancements);

    if (!helper.merge(res)) {
      if (!res.data) {
        return helper.fail();
      } else {
        advname = misc_functions_1.stringifyNamespace(res.data);
      }
    } else {
      advname = misc_functions_1.stringifyNamespace(res.data.literal);
      res.data.values.map(v => v.data).filter(v => !!v).forEach(v => criteriaOptions.push(...v));
    }

    if (!helper.merge(reader.expect("="))) {
      return helper.fail();
    }

    if (helper.merge(reader.expect("{"), {
      errors: false
    })) {
      const criteria = {};

      while (true) {
        const criterion = reader.readOption(criteriaOptions, {
          quote: false,
          unquoted: string_reader_1.StringReader.charAllowedInUnquotedString
        });

        if (!helper.merge(criterion)) {
          if (!criterion.data) {
            return helper.fail();
          }
        }

        if (!helper.merge(reader.expect("="))) {
          return helper.fail();
        }

        const critval = reader.readBoolean();

        if (!helper.merge(critval)) {
          return helper.fail();
        }

        criteria[criterion.data] = critval.data;

        if (helper.merge(reader.expect(","), {
          errors: false
        })) {
          continue;
        } else if (helper.merge(reader.expect("}"), {
          errors: false
        })) {
          break;
        } else {
          const error = reader.expectOption(",", "}"); // Get the error for expected option

          return helper.mergeChain(error, {
            suggestions: false
          }).fail();
        }
      }

      out[advname] = criteria;
    } else {
      const bool = reader.readBoolean();

      if (!helper.merge(bool)) {
        return helper.fail();
      }

      out[advname] = bool.data;
    }

    if (helper.merge(reader.expect(","), {
      errors: false
    })) {
      continue;
    } else if (helper.merge(reader.expect("}"), {
      errors: false
    })) {
      break;
    } else {
      const error = reader.expectOption(",", "}"); // Get the error for expected option

      return helper.mergeChain(error, {
        suggestions: false
      }).fail();
    }
  }

  return helper.succeed(out);
}

exports.parseAdvancements = parseAdvancements;
exports.argParsers = {
  advancements: (reader, info, context, argStart) => {
    const helper = new misc_functions_1.ReturnHelper();
    const res = parseAdvancements(reader, info);

    if (!helper.merge(res)) {
      return helper.fail();
    }

    if (context.advancements) {
      helper.addErrors(errors.duplicate.create(argStart, reader.cursor, "advancements"));
      Object.assign(context.advancements, res.data);
    } else {
      context.advancements = res.data;
    }

    return helper.succeed();
  },
  distance: exports.rangeOptParser(true, 0, 3e7, "distance"),
  dx: exports.numOptParser(true, undefined, undefined, "dx"),
  dy: exports.numOptParser(true, undefined, undefined, "dy"),
  dz: exports.numOptParser(true, undefined, undefined, "dz"),
  gamemode: (reader, _, context) => {
    const helper = new misc_functions_1.ReturnHelper();
    const start = reader.cursor;
    const negated = isNegated(reader, helper);
    const res = reader.readOption(gamemodes, {
      quote: false,
      unquoted: string_reader_1.StringReader.charAllowedInUnquotedString
    });

    if (!helper.merge(res)) {
      if (res.data) {
        helper.addErrors(errors.gamemode.invalid.create(start, reader.cursor, res.data));
        return helper.succeed();
      } else {
        return helper.fail(errors.gamemode.expected.create(start, reader.cursor));
      }
    }

    const neglist = negated ? gamemodes.filter(v => v !== res.data) : [res.data];

    if (context.gamemode && misc_functions_1.stringArrayEqual(neglist, context.gamemode)) {
      helper.addErrors(errors.noInfo.create(start, reader.cursor));
      return helper.succeed();
    }

    const intTypes = context.gamemode ? context.gamemode.filter(v => neglist.indexOf(v) !== -1) : neglist;

    if (intTypes.length === 0) {
      helper.addErrors(errors.impossible.create(start, reader.cursor, "gamemode"));
      context.gamemode = [];
      return helper.succeed();
    } else {
      context.gamemode = intTypes;
      return helper.succeed();
    }
  },
  level: exports.rangeOptParser(false, 0, undefined, "level"),
  limit: exports.numOptParser(false, 1, undefined, "limit"),
  name: (reader, _, context) => {
    const helper = new misc_functions_1.ReturnHelper();
    const start = reader.cursor;
    const negated = isNegated(reader, helper);
    const restag = reader.readString();

    if (!helper.merge(restag)) {
      return helper.fail();
    }

    const name = restag.data;
    const fullname = `${negated ? "!" : ""}${name}`;

    if (context.name && context.name.has(fullname)) {
      helper.addErrors(errors.noInfo.create(start, reader.cursor, "name"));
      return helper.succeed();
    }

    const newNames = context.name || new Set();
    newNames.add(fullname);
    context.name = newNames;
    return helper.succeed();
  },
  nbt: (reader, info, context) => {
    const helper = new misc_functions_1.ReturnHelper();
    isNegated(reader, helper);
    const res = nbt_1.validateParse(reader, info, {
      ids: context.type && context.type.set && [...context.type.set.values()],
      kind: "entity"
    });

    if (!helper.merge(res)) {
      return helper.fail();
    } else {
      return helper.succeed();
    }
  },
  scores: (reader, info, context, argStart) => {
    const helper = new misc_functions_1.ReturnHelper();
    const obj = parseScores(reader, info.data.localData ? info.data.localData.nbt.scoreboard : undefined);

    if (!helper.merge(obj)) {
      return helper.fail();
    }

    if (context.scores) {
      helper.addErrors(errors.duplicate.create(argStart, reader.cursor, "scores"));
      return helper.succeed();
    } else {
      context.scores = obj.data;
      return helper.succeed();
    }
  },
  sort: (reader, _, context, argStart) => {
    const helper = new misc_functions_1.ReturnHelper();
    const start = reader.cursor;
    const res = reader.readOption(["arbitrary", "furthest", "nearest", "random"], {
      quote: false,
      unquoted: string_reader_1.StringReader.charAllowedInUnquotedString
    });

    if (!helper.merge(res)) {
      if (!res.data) {
        return helper.fail();
      } else {
        helper.addErrors(errors.invalidSort.create(start, reader.cursor, res.data));
      }
    }

    if (context.sort) {
      helper.addErrors(errors.duplicate.create(argStart, reader.cursor, "scores"));
      return helper.succeed();
    }

    context.sort = res.data;
    return helper.succeed();
  },
  tag: (reader, _, context) => {
    const helper = new misc_functions_1.ReturnHelper();
    const start = reader.cursor;
    const negated = isNegated(reader, helper);
    const tag = reader.readUnquotedString();
    const result = context.tag || {
      set: new Set(),
      unset: new Set()
    };

    if (tag === "") {
      if (result.all !== undefined) {
        if (result.all === negated) {
          helper.addErrors(errors.noInfo.create(start, reader.cursor, "tag"));
        } else {
          helper.addErrors(errors.impossible.create(start, reader.cursor, "tag"));
        }
      } else {
        result.all = negated;
      }

      if (result.unset.size > 0) {
        if (!negated) {
          helper.addErrors(errors.duplicate.create(start, reader.cursor, "type"));
        }
      }

      if (result.set.size > 0) {
        if (negated) {
          helper.addErrors(errors.duplicate.create(start, reader.cursor, "type"));
        } else {
          helper.addErrors(errors.impossible.create(start, reader.cursor, "type"));
        }
      }
    } else {
      if (result.set.has(tag)) {
        if (negated) {
          helper.addErrors(errors.impossible.create(start, reader.cursor, "tag"));
        } else {
          helper.addErrors(errors.noInfo.create(start, reader.cursor, "tag"));
        }
      }

      if (result.unset.has(tag)) {
        if (negated) {
          helper.addErrors(errors.noInfo.create(start, reader.cursor, "tag"));
        } else {
          helper.addErrors(errors.impossible.create(start, reader.cursor, "tag"));
        }
      }

      if (result.all === false) {
        if (negated) {
          helper.addErrors(errors.noInfo.create(start, reader.cursor, "tag"));
        } else {
          helper.addErrors(errors.impossible.create(start, reader.cursor, "tag"));
        }
      }

      if (negated) {
        result.unset.add(tag);
      } else {
        result.set.add(tag);
      }
    }

    context.tag = result;
    return helper.succeed();
  },
  team: (reader, info, context) => {
    const helper = new misc_functions_1.ReturnHelper();
    const start = reader.cursor;
    const negated = isNegated(reader, helper);
    const teamnames = info.data.localData && info.data.localData.nbt.scoreboard && info.data.localData.nbt.scoreboard.data.Teams.map(v => v.Name) || [];
    const res = reader.readOption(teamnames, {
      quote: false,
      unquoted: string_reader_1.StringReader.charAllowedInUnquotedString
    });

    if (!helper.merge(res)) {
      if (res.data === undefined) {
        return helper.succeed();
      } else {
        return helper.fail();
      }
    }

    const teamInfo = context.team || {
      unset: new Set()
    };

    if (res.data === "") {
      if (teamInfo.all !== undefined) {
        if (teamInfo.all === !negated) {
          helper.addErrors(errors.noInfo.create(start, reader.cursor, "team"));
        } else {
          helper.addErrors(errors.impossible.create(start, reader.cursor, "team"));
        }
      }

      teamInfo.all = !negated;
    } else {
      if (negated) {
        if (teamInfo.unset.has(res.data) || teamInfo.all === false || teamInfo.set !== undefined) {
          helper.addErrors(errors.noInfo.create(start, reader.cursor, "team"));
        }

        teamInfo.unset.add(res.data);
      } else {
        if (teamInfo.set !== undefined || teamInfo.unset.has(res.data) || teamInfo.all === false) {
          helper.addErrors(errors.impossible.create(start, reader.cursor, "team"));
        }

        teamInfo.set = res.data;
      }
    }

    context.team = teamInfo;
    return helper.succeed();
  },
  type: (reader, info, context) => {
    const helper = new misc_functions_1.ReturnHelper();
    const start = reader.cursor;
    const negated = isNegated(reader, helper);
    const parsedType = misc_functions_1.parseNamespaceOrTag(reader, info, "entity_tags");

    if (!helper.merge(parsedType)) {
      if (parsedType.data) {
        helper.addErrors(errors.unknown_tag.create(start, reader.cursor, misc_functions_1.stringifyNamespace(parsedType.data)));
        return helper.succeed();
      }

      return helper.fail();
    }

    if (!parsedType.data.resolved) {
      const postProcess = misc_functions_1.processParsedNamespaceOption(parsedType.data.parsed, misc_functions_1.stringArrayToNamespaces([...info.data.globalData.registries["minecraft:entity_type"]]), info.suggesting && !reader.canRead(), start, vscode_languageserver_1.CompletionItemKind.Event);
      helper.merge(postProcess);

      if (postProcess.data.length === 0) {
        helper.addErrors(namespace_list_1.summonError.create(start, reader.cursor, misc_functions_1.stringifyNamespace(parsedType.data.parsed)));
      }
    }

    const parsedTypes = parsedType.data.resolved || [parsedType.data.parsed];
    const typeInfo = context.type || {
      set: new Set(),
      unset: new Set()
    };
    const {
      set,
      unset
    } = typeInfo; // tslint:disable-next-line:no-unnecessary-callback-wrapper

    const stringifiedTypes = parsedTypes.map(v => misc_functions_1.stringifyNamespace(v));

    if (!negated) {
      if (stringifiedTypes.every(set.has.bind(set))) {
        helper.addErrors(errors.noInfo.create(start, reader.cursor, "type"));
      } else if (set.size > 0 && !stringifiedTypes.some(set.has.bind(set))) {
        helper.addErrors(errors.impossible.create(start, reader.cursor, "type"));
      }

      if (stringifiedTypes.every(unset.has.bind(unset))) {
        helper.addErrors(errors.impossible.create(start, reader.cursor, "type"));
      }

      for (const name of stringifiedTypes) {
        set.add(name);
      }
    } else {
      if (stringifiedTypes.every(set.has.bind(set))) {
        helper.addErrors(errors.impossible.create(start, reader.cursor, "type"));
      }

      if (stringifiedTypes.every(unset.has.bind(unset))) {
        helper.addErrors(errors.noInfo.create(start, reader.cursor, "type"));
      }

      for (const name of stringifiedTypes) {
        unset.add(name);
      }
    }

    context.type = Object.assign({}, typeInfo, {
      set,
      unset
    });
    return helper.succeed();
  },
  x: exports.numOptParser(true, -3e7, 3e7 - 1, "x"),
  x_rotation: exports.rangeOptParser(true, undefined, undefined, "x_rotation"),
  y: exports.numOptParser(true, 0, 255, "y"),
  y_rotation: exports.rangeOptParser(true, undefined, undefined, "y_rotation"),
  z: exports.numOptParser(true, -3e7, 3e7 - 1, "z")
};

class EntityBase {
  constructor(fakePlayer, selector) {
    this.fakePlayer = fakePlayer;
    this.selector = selector;
  }

  parse(reader, info) {
    const helper = new misc_functions_1.ReturnHelper(info);
    const start = reader.cursor;
    const playerSet = new Set();
    const blankSet = new Set();
    playerSet.add("minecraft:player");

    if (this.selector && helper.merge(reader.expect("@"), {
      errors: false
    })) {
      const context = {};
      const selectors = {
        a: {
          type: {
            set: playerSet,
            unset: blankSet
          }
        },
        e: {},
        p: {
          limit: 1,
          type: {
            set: playerSet,
            unset: blankSet
          }
        },
        r: {
          limit: 1,
          type: {
            set: playerSet,
            unset: blankSet
          }
        },
        s: {
          limit: 1,
          type: {
            set: new Set( // tslint:disable-next-line:no-unnecessary-callback-wrapper
            ((info.context.executor || {}).ids || []).map(v => misc_functions_1.stringifyNamespace(v))),
            unset: blankSet
          }
        }
      };
      const exp = reader.expectOption(...typed_keys_1.typed_keys(selectors));

      if (!helper.merge(exp)) {
        // TODO, possibly better error message here
        return helper.fail();
      }

      Object.assign(context, selectors[exp.data]);

      if (helper.merge(reader.expect("["), {
        errors: false
      })) {
        const closeBracket = reader.expect("]");

        if (!helper.merge(closeBracket, {
          errors: false
        })) {
          while (true) {
            const argStart = reader.cursor;
            const arg = reader.readOption(typed_keys_1.typed_keys(exports.argParsers), {
              quote: false,
              unquoted: string_reader_1.StringReader.charAllowedInUnquotedString
            });

            if (!helper.merge(arg, {
              errors: false
            })) {
              helper.addErrors(errors.unknownArg.create(argStart, reader.cursor));
              return helper.fail();
            }

            if (!helper.merge(reader.expect("="))) {
              return helper.fail();
            }

            const opt = exports.argParsers[arg.data];
            const conc = opt(reader, info, context, argStart);

            if (!helper.merge(conc)) {
              return helper.fail();
            }

            if (conc.data) {
              Object.assign(context, conc.data);
            }

            if (helper.merge(reader.expect("]"), {
              errors: false
            })) {
              break;
            } else if (helper.merge(reader.expect(","), {
              errors: false
            })) {
              continue;
            } else {
              // TODO: a custom error for this case?
              return helper.fail();
            }
          }
        }
      }

      const conterr = getContextError(context, info.node_properties);

      if (conterr) {
        helper.addErrors(conterr.create(start, reader.cursor));
      }

      return helper.succeed(getContextChange(context, info.path));
    } else if (uuidregex.test(reader.readWhileRegexp(/[0-9a-fA-F\-]/))) {
      helper.addErrors(uuidwarn.create(start, reader.cursor));
      const conterr = getContextError({
        limit: 1
      }, info.node_properties);

      if (conterr) {
        helper.addErrors(conterr.create(reader.cursor - 36, reader.cursor));
      }

      return helper.succeed();
    } else {
      reader.cursor = start;

      if (this.fakePlayer) {
        const result = reader.readOption((info.data.localData && info.data.localData.nbt.scoreboard && info.data.localData.nbt.scoreboard.data.PlayerScores || []).map(score => score.Name), {
          quote: false,
          unquoted: consts_1.NONWHITESPACE
        });
        const context = {
          limit: 1,
          type: {
            set: playerSet,
            unset: new Set()
          }
        };
        const contextErr = getContextError(context, info.node_properties);

        if (contextErr) {
          helper.addErrors(contextErr.create(start, reader.cursor));
        }

        if (helper.merge(result) || result.data) {
          return helper.succeed(getContextChange(context, info.path));
        } else {
          // #unreachable!()
          return helper.fail();
        }
      } else {
        const result = reader.readUnquotedString();

        if (result === "") {
          return helper.fail();
        }

        const context = {
          limit: 1,
          type: {
            set: playerSet,
            unset: new Set()
          }
        };
        const contextErr = getContextError(context, info.node_properties);

        if (contextErr) {
          helper.addErrors(contextErr.create(start, reader.cursor));
        }

        return helper.succeed(getContextChange(context, info.path));
      }
    }
  }

}

exports.EntityBase = EntityBase;

function getContextChange(context, path) {
  if (context.type) {
    const result = [];

    for (const item of context.type.set.values()) {
      if (!context.type.unset.has(item)) {
        result.push(misc_functions_1.convertToNamespace(item));
      }
    }

    if (misc_functions_1.stringArrayEqual(path, ["execute", "as", "entity"])) {
      return {
        executor: {
          ids: result
        }
      };
    } else {
      return {
        otherEntity: {
          ids: result
        }
      };
    }
  }

  return undefined;
}

exports.entity = new EntityBase(false, true);
exports.scoreHolder = new EntityBase(true, true);
exports.gameProfile = new EntityBase(false, false);
},{"../../brigadier/errors":"aP4V","../../brigadier/string-reader":"iLhI","../../consts":"xb+0","../../misc-functions":"KBGm","../../misc-functions/third_party/typed-keys":"kca+","./namespace-list":"suMb","./nbt/nbt":"JpDU","./range":"1Kfp"}],"LoiV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const errors_1 = require("../../brigadier/errors");

const misc_functions_1 = require("../../misc-functions");

const nbt_1 = require("./nbt/nbt");

const NOTAG = new errors_1.CommandErrorBuilder("argument.item.tag.disallowed", "Tags aren't allowed here, only actual items");
const UNKNOWNTAG = new errors_1.CommandErrorBuilder("arguments.item.tag.unknown", "Unknown item tag '%s'");
const UNKNOWNITEM = new errors_1.CommandErrorBuilder("argument.item.id.invalid", "Unknown item '%s'");

class ItemParser {
  constructor(useTags) {
    this.useTags = useTags;
  }

  parse(reader, properties) {
    const helper = new misc_functions_1.ReturnHelper(properties);
    const start = reader.cursor;
    const parsed = misc_functions_1.parseNamespaceOrTag(reader, properties, this.useTags ? "item_tags" : NOTAG);

    if (helper.merge(parsed)) {
      const items = [];

      if (parsed.data.resolved && parsed.data.values) {
        helper.merge(misc_functions_1.buildTagActions(parsed.data.values, start + 1, reader.cursor, "item_tags", properties.data.localData));
        parsed.data.values.forEach(v => {
          items.push(...(v.data || {
            values: []
          }).values);
        });
      } else {
        if (properties.suggesting && !reader.canRead()) {
          helper.addSuggestions(...misc_functions_1.namespaceSuggestionString([...properties.data.globalData.registries["minecraft:item"]], parsed.data.parsed, start));
        }

        const name = misc_functions_1.stringifyNamespace(parsed.data.parsed);

        if (!properties.data.globalData.registries["minecraft:item"].has(name)) {
          helper.addErrors(UNKNOWNITEM.create(start, reader.cursor, name));
        }

        items.push(name);
      }

      if (reader.peek() === "{") {
        const nbt = nbt_1.validateParse(reader, properties, {
          ids: items,
          kind: "item"
        });
        helper.merge(nbt);
      } else {
        helper.addSuggestion(reader.cursor, "{");
      }
    } else {
      if (parsed.data) {
        helper.addErrors(UNKNOWNTAG.create(start, reader.cursor, misc_functions_1.stringifyNamespace(parsed.data)));

        if (reader.peek() === "{") {
          const nbt = nbt_1.validateParse(reader, properties, {
            ids: "none",
            kind: "item"
          });
          helper.merge(nbt);
        } else {
          helper.addSuggestion(reader.cursor, "{");
        }
      } else {
        return helper.fail();
      }
    }

    return helper.succeed();
  }

}

exports.ItemParser = ItemParser;
exports.stack = new ItemParser(false);
exports.predicate = new ItemParser(true);
},{"../../brigadier/errors":"aP4V","../../misc-functions":"KBGm","./nbt/nbt":"JpDU"}],"Td8d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COLORS = ["black", "dark_blue", "dark_green", "dark_aqua", "dark_red", "dark_purple", "gold", "gray", "dark_gray", "blue", "green", "aqua", "red", "light_purple", "yellow", "white", "reset"];
},{}],"TytA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemSlots = slotsBuilder();

function slotsBuilder() {
  const slots = [];
  slots.push("armor.chest", "armor.feet", "armor.head", "armor.legs");

  for (let i = 0; i < 54; i++) {
    slots.push(`container.${i}`);
  }

  for (let i = 0; i < 27; i++) {
    slots.push(`enderchest.${i}`);
  }

  for (let i = 0; i < 25; i++) {
    slots.push(`horse.${i}`);
  }

  slots.push("horse.armor", "horse.chest", "horse.saddle");

  for (let i = 0; i < 9; i++) {
    slots.push(`hotbar.${i}`);
  }

  for (let i = 0; i < 27; i++) {
    slots.push(`inventory.${i}`);
  }

  for (let i = 0; i < 8; i++) {
    slots.push(`villager.${i}`);
  }

  slots.push("weapon", "weapon.mainhand", "weapon.offhand");
  return slots;
}
},{}],"TZ8Y":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const colors_1 = require("../../colors");

exports.scoreboardSlots = createSlots();

function createSlots() {
  const slots = [];
  slots.push("list", "sidebar", "belowName");

  for (const s of colors_1.COLORS) {
    slots.push(`sidebar.team.${s}`);
  }

  return slots;
}
},{"../../colors":"Td8d"}],"e3ir":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const colors_1 = require("../../colors");

exports.anchors = ["feet", "eyes"];
exports.operations = ["+=", "-=", "*=", "/=", "%=", "=", ">", "<", "><"];
exports.colors = colors_1.COLORS;
},{"../../colors":"Td8d"}],"kr6k":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode_languageserver_1 = require("vscode-languageserver");

const errors_1 = require("../../brigadier/errors");

const string_reader_1 = require("../../brigadier/string-reader");

const colors_1 = require("../../colors");

const consts_1 = require("../../consts");

const item_slot_1 = require("../../data/lists/item-slot");

const scoreboard_slot_1 = require("../../data/lists/scoreboard-slot");

const statics_1 = require("../../data/lists/statics");

const misc_functions_1 = require("../../misc-functions");

class ListParser {
  constructor(options, err, regex = string_reader_1.StringReader.charAllowedInUnquotedString) {
    this.options = options;
    this.error = err;
    this.regex = regex;
  }

  parse(reader, info) {
    const start = reader.cursor;
    const helper = new misc_functions_1.ReturnHelper(info);
    const optResult = reader.readOption(this.options, {
      quote: false,
      unquoted: this.regex
    }, vscode_languageserver_1.CompletionItemKind.EnumMember);

    if (helper.merge(optResult)) {
      return helper.succeed();
    } else {
      return helper.fail(this.error.create(start, reader.cursor, optResult.data || ""));
    }
  }

}

exports.ListParser = ListParser;
const colorError = new errors_1.CommandErrorBuilder("argument.color.invalid", "Unknown color '%s'");
exports.colorParser = new ListParser(colors_1.COLORS, colorError);
const entityAnchorError = new errors_1.CommandErrorBuilder("argument.anchor.invalid", "Invalid entity anchor position %s");
exports.entityAnchorParser = new ListParser(statics_1.anchors, entityAnchorError);
const slotError = new errors_1.CommandErrorBuilder("slot.unknown", "Unknown slot '%s'");
exports.itemSlotParser = new ListParser(item_slot_1.itemSlots, slotError);
const operationError = new errors_1.CommandErrorBuilder("arguments.operation.invalid", "Invalid operation");
exports.operationParser = new ListParser(statics_1.operations, operationError, consts_1.NONWHITESPACE);
const scoreboardSlotError = new errors_1.CommandErrorBuilder("argument.scoreboardDisplaySlot.invalid", "Unknown display slot '%s'");
exports.scoreBoardSlotParser = new ListParser(scoreboard_slot_1.scoreboardSlots, scoreboardSlotError);
},{"../../brigadier/errors":"aP4V","../../brigadier/string-reader":"iLhI","../../colors":"Td8d","../../consts":"xb+0","../../data/lists/item-slot":"TytA","../../data/lists/scoreboard-slot":"TZ8Y","../../data/lists/statics":"e3ir","../../misc-functions":"KBGm"}],"VDDC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const misc_functions_1 = require("../../misc-functions");

exports.messageParser = {
  parse: reader => {
    reader.cursor = reader.getTotalLength(); // tslint:disable:helper-return

    return new misc_functions_1.ReturnHelper().succeed();
  }
};
},{"../../misc-functions":"KBGm"}],"wccY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode_languageserver_1 = require("vscode-languageserver");

const errors_1 = require("../../brigadier/errors");

const string_reader_1 = require("../../brigadier/string-reader");

const misc_functions_1 = require("../../misc-functions");

const tag_parser_1 = require("./nbt/tag-parser");

const doc_walker_util_1 = require("./nbt/util/doc-walker-util");

const nbt_util_1 = require("./nbt/util/nbt-util");

const walker_1 = require("./nbt/walker");

const DOT = ".";
const ARROPEN = "[";
const ARRCLOSE = "]";
const exceptions = {
  BAD_CHAR: new errors_1.CommandErrorBuilder("argument.nbt_path.badchar", "Bad character '%s'"),
  INCORRECT_PROPERTY: new errors_1.CommandErrorBuilder("argument.nbt_path.incorrect", "Unknown property '%s'"),
  START_SEGMENT: new errors_1.CommandErrorBuilder("argument.nbt_path.array_start", "Cannot start an nbt path with an array reference"),
  UNEXPECTED_INDEX: new errors_1.CommandErrorBuilder("argument.nbt_path.index", "Path segment should not be array, expected type is '%s'"),
  UNEXPECTED_PROPERTY: new errors_1.CommandErrorBuilder("argument.nbt_path.property", "Node of type '%s' cannot have string properties, but one is here"),
  WRONG_TYPE: new errors_1.CommandErrorBuilder("argument.nbt_path.type", "Expected node to have type %s, actual is %s")
};

function entityDataPath(path) {
  return {
    data: c => ({
      contextInfo: {
        ids: c.otherEntity && c.otherEntity.ids && // tslint:disable-next-line:no-unnecessary-callback-wrapper
        c.otherEntity.ids.map(v => misc_functions_1.stringifyNamespace(v)) || "none",
        kind: "entity"
      },
      resultType: c.nbt_path
    }),
    path
  };
}

const pathInfo = [entityDataPath(["execute", "if", "data", "entity"]), entityDataPath(["execute", "store", "result", "entity"]), entityDataPath(["execute", "store", "success", "entity"]), entityDataPath(["execute", "unless", "data", "entity"]), entityDataPath(["data", "modify", "entity", "target", "targetPath"]), entityDataPath(["data", "remove", "entity"]), entityDataPath(["data", "modify", "block", "targetPos", "targetPath", "insert", "before", "index", "from", "entity"]), entityDataPath(["data", "get", "entity"]), entityDataPath(["data", "modify", "entity", "target", "targetPath", "set", "from", "entity"]), entityDataPath(["data", "modify", "entity", "target", "targetPath", "prepend", "from", "entity"]), entityDataPath(["data", "modify", "entity", "target", "targetPath", "merge", "from", "entity"]), entityDataPath(["data", "modify", "entity", "target", "targetPath", "insert", "before", "index", "from", "entity"]), entityDataPath(["data", "modify", "block", "targetPos", "targetPath", "set", "from", "entity"]), entityDataPath(["data", "modify", "block", "targetPos", "targetPath", "prepend", "from", "entity"]), entityDataPath(["data", "modify", "block", "targetPos", "targetPath", "merge", "from", "entity"]), entityDataPath(["data", "modify", "block", "targetPos", "targetPath", "append", "from", "entity"]), entityDataPath(["data", "modify", "block", "targetPos", "targetPath", "insert", "after", "index", "from", "entity"]), entityDataPath(["data", "modify", "entity", "target", "targetPath", "insert", "after", "index", "from", "entity"]), entityDataPath(["data", "modify", "entity", "target", "targetPath", "append", "from", "entity"])]; // We do not currently support blocks with autocomplete/validation

const unvalidatedPaths = [//#region /data
["data", "get", "block"], ["data", "modify", "block", "targetPos", "targetPath"], ["data", "modify", "block", "targetPos", "targetPath", "append", "from", "block"], ["data", "modify", "block", "targetPos", "targetPath", "insert", "after", "index", "from", "block"], ["data", "modify", "block", "targetPos", "targetPath", "insert", "before", "index", "from", "block"], ["data", "modify", "block", "targetPos", "targetPath", "merge", "from", "block"], ["data", "modify", "block", "targetPos", "targetPath", "prepend", "from", "block"], ["data", "modify", "block", "targetPos", "targetPath", "set", "from", "block"], ["data", "modify", "entity", "target", "targetPath", "append", "from", "block"], ["data", "modify", "entity", "target", "targetPath", "insert", "after", "index", "from", "block"], ["data", "modify", "entity", "target", "targetPath", "insert", "before", "index", "from", "block"], ["data", "modify", "entity", "target", "targetPath", "merge", "from", "block"], ["data", "modify", "entity", "target", "targetPath", "prepend", "from", "block"], ["data", "modify", "entity", "target", "targetPath", "set", "from", "block"], ["data", "remove", "block"], //#endregion /data
//#region /execute
["execute", "if", "data", "block"], ["execute", "store", "result", "block"], ["execute", "store", "success", "block"], ["execute", "unless", "data", "block"] //#endregion /execute
].map(v => ({
  path: v,
  data: {}
}));
const typedArrayTypes = new Set(["byte_array", "int_array", "long_array"]);
var SegmentKind;

(function (SegmentKind) {
  SegmentKind[SegmentKind["NBT"] = 0] = "NBT";
  SegmentKind[SegmentKind["INDEX"] = 1] = "INDEX";
  SegmentKind[SegmentKind["STRING"] = 2] = "STRING";
})(SegmentKind || (SegmentKind = {}));

exports.pathParser = {
  parse: (reader, info) => {
    const helper = new misc_functions_1.ReturnHelper();
    const path = parsePath(reader);

    if (helper.merge(path)) {
      const contextFunction = misc_functions_1.startPaths(pathInfo, info.path);
      const context = contextFunction && contextFunction(info.context);

      if (context) {
        const walker = new walker_1.NBTWalker(info.data.globalData.nbt_docs);

        if (Array.isArray(context.contextInfo.ids)) {
          for (const id of context.contextInfo.ids) {
            const result = validatePath(path.data, [context.contextInfo.kind, id], walker, reader.cursor, info.context.nbt_path);
            helper.merge(result);
          }

          const errors = helper.getShared().errors;

          for (let i = 0; i < errors.length; i++) {
            const error = errors[i];
            const sliced = [...errors.slice(i).entries()];

            for (const [index, followingError] of sliced) {
              if (followingError.range.start === error.range.start && followingError.range.end === error.range.end && followingError.text === error.text) {
                errors.splice(index, 1);
              }
            }
          }
        } else {
          const result = validatePath(path.data, [context.contextInfo.kind, context.contextInfo.ids || "none"], walker, reader.cursor, info.context.nbt_path);
          helper.merge(result);
        }
      } else {
        const unvalidatedInfo = misc_functions_1.startPaths(unvalidatedPaths, info.path);

        if (typeof unvalidatedInfo === "undefined") {
          // TODO: Centralise this checking
          mcLangLog(`Unexpected unsupported nbt path '${info.path}'. Please report this error at https://github.com/levertion/mcfunction-langserver/issues`);
        }
      }

      return helper.succeed();
    }

    return helper.fail();
  }
};
const unquotedNBTStringRegex = /^[0-9A-Za-z_\-+]$/; // tslint:disable-next-line:cyclomatic-complexity TODO: Fix or disable globally

function validatePath(path, nbtPath, walker, // tslint:disable-next-line:variable-name underscore name as a temp measure
cursor, expectedType) {
  const helper = new misc_functions_1.ReturnHelper();
  let node = walker.getInitialNode(nbtPath);

  if (path.length === 0) {
    if (doc_walker_util_1.isCompoundInfo(node)) {
      helper.addSuggestions(...Object.keys(walker.getChildren(node)).map(v => string_reader_1.completionForString(v, cursor, {
        quote: true,
        unquoted: unquotedNBTStringRegex
      }, vscode_languageserver_1.CompletionItemKind.Field)));
    }

    return helper.succeed();
  }

  for (const segment of path) {
    const {
      value,
      range
    } = segment;

    switch (value.kind) {
      case SegmentKind.INDEX:
        if (node) {
          if (doc_walker_util_1.isListInfo(node)) {
            node = walker.getItem(node);
          } else if (doc_walker_util_1.isTypedInfo(node) && typedArrayTypes.has(node.node.type)) {
            node = undefined;
          } else {
            const toDisplay = doc_walker_util_1.isTypedInfo(node) ? node.node.type : "unknown";
            helper.addErrors(exceptions.UNEXPECTED_INDEX.create(range.start, range.end, toDisplay));
            node = undefined;
          }
        }

        break;

      case SegmentKind.NBT:
        if (node) {
          if (doc_walker_util_1.isListInfo(node)) {
            node = walker.getItem(node);
            helper.merge(value.tag.validate(node, walker));
          } else {
            const toDisplay = doc_walker_util_1.isTypedInfo(node) ? node.node.type : "unknown";
            helper.addErrors(exceptions.UNEXPECTED_INDEX.create(range.start, range.end, toDisplay));
            node = undefined;
          }
        }

        break;

      case SegmentKind.STRING:
        if (node) {
          if (doc_walker_util_1.isCompoundInfo(node)) {
            const children = walker.getChildren(node);

            if (range.end === cursor) {
              helper.addSuggestions(...Object.keys(children).filter(opt => opt.startsWith(value.string)).map(v => string_reader_1.completionForString(v, range.start, {
                quote: true,
                unquoted: unquotedNBTStringRegex
              }, vscode_languageserver_1.CompletionItemKind.Field)));
            }

            if (children.hasOwnProperty(value.string)) {
              node = children[value.string];
            } else {
              if (!node.node.additionalChildren) {
                helper.addErrors(exceptions.INCORRECT_PROPERTY.create(range.start, range.end, value.string));
              }

              node = undefined;
            }
          } else {
            const toDisplay = doc_walker_util_1.isTypedInfo(node) ? node.node.type : "unknown";
            helper.addErrors(exceptions.UNEXPECTED_PROPERTY.create(range.start, range.end, toDisplay));
            node = undefined;
          }
        }

        break;

      default:
    }

    if (cursor === segment.range.end && node && (doc_walker_util_1.isListInfo(node) || doc_walker_util_1.isTypedInfo(node) && typedArrayTypes.has(node.node.type))) {
      helper.addSuggestion(cursor, "[", vscode_languageserver_1.CompletionItemKind.Operator);
    }
  }

  if (node && expectedType && !(doc_walker_util_1.isTypedInfo(node) && node.node.type === expectedType)) {
    helper.addErrors(exceptions.WRONG_TYPE.create(path[0].range.start, path[path.length - 1].range.end, expectedType));
  }

  return helper.succeed();
}

function parsePath(reader) {
  const helper = new misc_functions_1.ReturnHelper();
  const result = [];
  let first = true;

  while (reader.canRead()) {
    const start = reader.cursor;

    if (reader.peek() === ARROPEN) {
      const range = {
        start,
        end: 0
      };
      reader.skip();

      if (reader.peek() === nbt_util_1.COMPOUND_START) {
        const val = tag_parser_1.parseAnyNBTTag(reader, []);
        range.end = reader.cursor;

        if (helper.merge(val)) {
          result.push({
            range,
            value: {
              tag: val.data.tag,
              kind: SegmentKind.NBT
            }
          });
        } else {
          if (val.data) {
            result.push({
              range,
              value: {
                tag: val.data.tag,
                kind: SegmentKind.NBT
              }
            });
          }

          return helper.fail();
        }
      } else {
        const int = reader.readInt();
        range.end = reader.cursor;

        if (helper.merge(int)) {
          result.push({
            range,
            value: {
              number: int.data,
              kind: SegmentKind.INDEX
            }
          });
        } else {
          return helper.fail();
        }
      }

      if (!helper.merge(reader.expect(ARRCLOSE))) {
        range.end = reader.cursor;
        return helper.fail();
      }

      range.end = reader.cursor;
    } else if (!first && reader.peek() === DOT || first) {
      if (!first) {
        reader.skip();
      }

      const range = {
        start: reader.cursor,
        end: 0
      };
      const res = reader.readString( // = StringReader.charAllowedInUnquotedString without '\.'
      unquotedNBTStringRegex);
      range.end = reader.cursor;

      if (helper.merge(res)) {
        result.push({
          range,
          value: {
            kind: SegmentKind.STRING,
            string: res.data
          }
        });
      } else {
        if (res.data !== undefined) {
          result.push({
            range,
            value: {
              kind: SegmentKind.STRING,
              string: res.data
            }
          });
        }

        return helper.fail();
      }
    } else {
      return helper.fail(exceptions.BAD_CHAR.create(reader.cursor - 1, reader.cursor, reader.peek()));
    }

    first = false;
  }

  return helper.succeed(result);
}
},{"../../brigadier/errors":"aP4V","../../brigadier/string-reader":"iLhI","../../misc-functions":"KBGm","./nbt/tag-parser":"4pIN","./nbt/util/doc-walker-util":"km+2","./nbt/util/nbt-util":"OoHl","./nbt/walker":"YMNQ"}],"ELUu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode_languageserver_1 = require("vscode-languageserver");

const errors_1 = require("../../brigadier/errors");

const misc_functions_1 = require("../../misc-functions");

const exceptions = {
  advancement_notfound: new errors_1.CommandErrorBuilder("advancement.advancementNotFound", "Unknown advancement: %s"),
  nobossbar: new errors_1.CommandErrorBuilder("commands.bossbar.unknown", "No bossbar exists with the ID '%s'"),
  recipe_notfound: new errors_1.CommandErrorBuilder("recipe.notFound", "Unkown recipe: %s"),
  unknown_function: new errors_1.CommandErrorBuilder("arguments.function.unknown", "Unknown function '%s'"),
  unknown_loot: new errors_1.CommandErrorBuilder("argument.loot_table.unknown", "Unkown loot table '%s'"),
  unknown_tag: new errors_1.CommandErrorBuilder("arguments.function.tag.unknown", "Unknown function tag '#%s'")
};
exports.functionParser = {
  parse: (reader, info) => {
    const helper = new misc_functions_1.ReturnHelper(info);
    const start = reader.cursor;
    const parsed = misc_functions_1.parseNamespaceOrTag(reader, info, "function_tags");
    const localData = info.data.localData;

    if (helper.merge(parsed)) {
      const data = parsed.data;

      if (data.resolved && data.values) {
        helper.merge(misc_functions_1.buildTagActions(data.values, start, reader.cursor, "function_tags", localData));
        return helper.succeed();
      } else {
        const options = misc_functions_1.getResourcesofType(info.data, "functions");
        const postProcess = misc_functions_1.processParsedNamespaceOption(data.parsed, options, info.suggesting && !reader.canRead(), start, vscode_languageserver_1.CompletionItemKind.Method);

        if (postProcess.data.length === 0) {
          helper.addErrors(exceptions.unknown_function.create(start, reader.cursor, misc_functions_1.stringifyNamespace(data.parsed)));
        }

        if (localData) {
          for (const func of postProcess.data) {
            const location = misc_functions_1.buildPath(func, localData, "functions");

            if (location) {
              helper.addActions({
                data: location,
                high: reader.cursor,
                low: start,
                type: "source"
              });
            }
          }
        }

        return helper.mergeChain(postProcess).succeed();
      }
    } else {
      if (!parsed.data) {
        return helper.fail();
      } else {
        return helper.addErrors(exceptions.unknown_tag.create(start, reader.cursor, misc_functions_1.stringifyNamespace(parsed.data))).succeed();
      }
    }
  }
};
const idParser = {
  parse: (reader, info) => misc_functions_1.prepareForParser(misc_functions_1.parseNamespace(reader), info)
};
const bossbarParser = {
  parse: (reader, info) => {
    const helper = new misc_functions_1.ReturnHelper(info);

    if (info.data.localData && info.data.localData.nbt.level) {
      const start = reader.cursor;
      const bars = info.data.localData.nbt.level.Data.CustomBossEvents;
      const options = misc_functions_1.stringArrayToNamespaces(Object.keys(bars));
      const result = misc_functions_1.parseNamespaceOption(reader, options);

      if (helper.merge(result)) {
        return helper.succeed();
      } else {
        if (result.data) {
          return helper.addErrors(exceptions.nobossbar.create(start, reader.cursor, misc_functions_1.stringifyNamespace(result.data))).succeed();
        } else {
          return helper.fail();
        }
      }
    } else {
      // tslint:disable-next-line:helper-return
      return misc_functions_1.prepareForParser(helper.return(misc_functions_1.parseNamespace(reader)), info);
    }
  }
};
const resourceKinds = [{
  data: {
    issue: exceptions.advancement_notfound,
    resource: "advancements"
  },
  path: ["advancement"]
}, {
  data: {
    resource: idParser
  },
  path: ["bossbar", "add"]
}, {
  data: {
    resource: bossbarParser
  },
  path: ["bossbar"]
}, {
  data: {
    resource: bossbarParser
  },
  path: ["execute", "store", "result"]
}, // Worrying about sounds is not in scope for initial release
{
  data: {
    resource: idParser
  },
  path: ["playsound"]
}, {
  data: {
    resource: idParser
  },
  path: ["stopsound"]
}, {
  data: {
    resource: "recipes",
    issue: exceptions.advancement_notfound
  },
  path: ["recipe"]
}, {
  data: {
    issue: exceptions.unknown_loot,
    resource: "loot_tables"
  },
  path: ["loot"]
}];
exports.resourceParser = {
  parse: (reader, info) => {
    const start = reader.cursor;
    const helper = new misc_functions_1.ReturnHelper(info);
    const kind = misc_functions_1.startPaths(resourceKinds, info.path);

    if (kind) {
      if (typeof kind.resource === "object") {
        return helper.return(kind.resource.parse(reader, info));
      } else {
        const result = misc_functions_1.parseNamespaceOption(reader, misc_functions_1.getResourcesofType(info.data, kind.resource));

        if (helper.merge(result)) {
          return helper.succeed();
        } else {
          if (result.data) {
            return helper.addErrors( // @ts-ignore type inference failure
            kind.issue.create(start, reader.cursor, misc_functions_1.stringifyNamespace(result.data))).succeed();
          } else {
            return helper.fail();
          }
        }
      }
    } else {
      throw new Error(`Resource at path ${info.path} does not have a supported resource`);
    }
  }
};
},{"../../brigadier/errors":"aP4V","../../misc-functions":"KBGm"}],"heCz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const misc_functions_1 = require("../../misc-functions");

exports.verbatimCriteria = new Set(["air", "armor", "deathCount", "dummy", "food", "health", "level", "playerKillCount", "totalKillCount", "trigger", "xp"]);
exports.colorCriteria = ["teamkill.", "killedByTeam."];
exports.itemCriteria = misc_functions_1.stringArrayToNamespaces(["minecraft:broken", "minecraft:crafted", "minecraft:dropped", "minecraft:picked_up", "minecraft:used"]);
exports.blockCriteria = misc_functions_1.stringArrayToNamespaces(["minecraft:mined"]);
exports.entityCriteria = misc_functions_1.stringArrayToNamespaces(["minecraft:killed_by", "minecraft:killed"]);
},{"../../misc-functions":"KBGm"}],"tZ+1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode_languageserver_1 = require("vscode-languageserver");

const errors_1 = require("../../brigadier/errors");

const string_reader_1 = require("../../brigadier/string-reader");

const colors_1 = require("../../colors");

const consts_1 = require("../../consts");

const criteria_1 = require("../../data/lists/criteria");

const misc_functions_1 = require("../../misc-functions");

const typed_keys_1 = require("../../misc-functions/third_party/typed-keys");

const exceptions = {
  unknown_objective: new errors_1.CommandErrorBuilder("arguments.objective.notFound", "Unknown scoreboard objective '%s'"),
  unknown_team: new errors_1.CommandErrorBuilder("team.notFound", "Unknown team '%s'")
};
const slotPurposes = {
  slot_0: "list",
  slot_1: "sidebar",
  slot_10: "sidebar.team.gray",
  slot_11: "sidebar.team.dark_gray",
  slot_12: "sidebar.team.blue",
  slot_13: "sidebar.team.green",
  slot_14: "sidebar.team.aqua",
  slot_15: "sidebar.team.red",
  slot_16: "sidebar.team.light_purple",
  slot_17: "sidebar.team.yellow",
  slot_18: "sidebar.team.white",
  slot_2: "belowName",
  slot_3: "sidebar.team.black",
  slot_4: "sidebar.team.dark_blue",
  slot_5: "sidebar.team.dark_green",
  slot_6: "sidebar.team.dark_aqua",
  slot_7: "sidebar.team.dark_red",
  slot_8: "sidebar.team.dark_purple",
  slot_9: "sidebar.team.gold"
};
exports.objectiveParser = {
  parse: (reader, info) => {
    const helper = new misc_functions_1.ReturnHelper(info);
    const start = reader.cursor;

    if (info.data.localData) {
      const scoreboardData = info.data.localData.nbt.scoreboard;

      if (scoreboardData) {
        const options = scoreboardData.data.Objectives.map(v => v.Name);
        const result = reader.readOption(options, {
          quote: false,
          unquoted: string_reader_1.StringReader.charAllowedInUnquotedString
        });

        if (helper.merge(result)) {
          if (!info.suggesting) {
            for (const objective of scoreboardData.data.Objectives) {
              if (objective.Name === result.data) {
                helper.addActions({
                  data: `Displayed as: ${objective.DisplayName}

Criteria: ${objective.CriteriaName}`,
                  high: reader.cursor,
                  low: start,
                  type: "hover"
                });
                break;
              }
            }

            if (scoreboardData.data.DisplaySlots) {
              for (const slot of typed_keys_1.typed_keys(scoreboardData.data.DisplaySlots)) {
                if (scoreboardData.data.DisplaySlots[slot] === result.data) {
                  helper.addActions({
                    data: `Displayed in ${slotPurposes[slot]}`,
                    high: reader.cursor,
                    low: start,
                    type: "hover"
                  });
                }
              }
            }
          }
        } else {
          if (result.data) {
            helper.addErrors(exceptions.unknown_objective.create(start, reader.cursor, result.data));
          } else {
            return helper.fail();
          }
        }

        return helper.succeed();
      }
    }

    reader.readUnquotedString();
    return helper.succeed();
  }
};
exports.teamParser = {
  parse: (reader, info) => {
    const helper = new misc_functions_1.ReturnHelper();
    const start = reader.cursor;

    if (info.data.localData) {
      const scoreboardData = info.data.localData.nbt.scoreboard;

      if (scoreboardData) {
        const options = scoreboardData.data.Teams;
        const result = reader.readOption(options.map(v => v.Name), {
          quote: false,
          unquoted: string_reader_1.StringReader.charAllowedInUnquotedString
        });

        if (helper.merge(result)) {
          for (const team of options) {
            if (team.Name === result.data) {
              helper.addActions({
                data: `\`\`\`json
${JSON.stringify(team, undefined, 4)}
\`\`\``,
                high: reader.cursor,
                low: start,
                type: "hover"
              });
              break;
            }
          }
        } else {
          if (result.data) {
            helper.addErrors(exceptions.unknown_objective.create(start, reader.cursor, result.data));
          } else {
            return helper.fail();
          }
        }
      }
    } else {
      reader.readUnquotedString();
    }

    return helper.succeed();
  }
};
const UNKNOWN_CRITERIA = new errors_1.CommandErrorBuilder("argument.criteria.invalid", "Unknown criteria '%s'");
const customPrefix = misc_functions_1.convertToNamespace("minecraft:custom");
exports.criteriaParser = {
  parse: (reader, info) => {
    // tslint:disable:no-shadowed-variable
    const start = reader.cursor;
    const helper = new misc_functions_1.ReturnHelper(info);
    const optionResult = reader.readOption([...criteria_1.verbatimCriteria, ...criteria_1.colorCriteria], {
      quote: false,
      unquoted: consts_1.NONWHITESPACE
    }, vscode_languageserver_1.CompletionItemKind.EnumMember);
    const text = optionResult.data;

    if (!text) {
      return helper.fail(); // `unreachable!()`
    }

    if (helper.merge(optionResult)) {
      if (criteria_1.verbatimCriteria.has(optionResult.data)) {
        return helper.succeed();
      }
    }

    for (const choice of criteria_1.colorCriteria) {
      if (text.startsWith(choice)) {
        reader.cursor = start + choice.length;
        const result = reader.readOption(colors_1.COLORS, {
          quote: false,
          unquoted: consts_1.NONWHITESPACE
        }, vscode_languageserver_1.CompletionItemKind.Color);

        if (helper.merge(result)) {
          return helper.succeed();
        }
      }
    }

    const namespaceCriteria = [...criteria_1.blockCriteria, ...criteria_1.entityCriteria, ...criteria_1.itemCriteria, customPrefix];
    reader.cursor = start;
    const res = misc_functions_1.parseNamespaceOption(reader, namespaceCriteria, vscode_languageserver_1.CompletionItemKind.Module, ".", true);

    if (!helper.merge(res)) {
      reader.readUntilRegexp(/\s/);
      helper.addErrors(UNKNOWN_CRITERIA.create(start, reader.cursor, text));
      return helper.fail();
    }

    const data = res.data;

    if (reader.read() !== ":") {
      reader.readUntilRegexp(/\s/);
      helper.addErrors(UNKNOWN_CRITERIA.create(start, reader.cursor, text));
      return helper.succeed();
    }

    const postStart = reader.cursor;

    for (const choice of criteria_1.entityCriteria) {
      reader.cursor = postStart;

      if (misc_functions_1.namespacesEqual(data.literal, choice)) {
        const result = misc_functions_1.parseNamespaceOption(reader, misc_functions_1.stringArrayToNamespaces([...info.data.globalData.registries["minecraft:entity_type"]]), vscode_languageserver_1.CompletionItemKind.Reference, ".");

        if (helper.merge(result)) {
          return helper.succeed();
        }
      }
    }

    for (const choice of criteria_1.blockCriteria) {
      reader.cursor = postStart;

      if (misc_functions_1.namespacesEqual(data.literal, choice)) {
        const result = misc_functions_1.parseNamespaceOption(reader, misc_functions_1.stringArrayToNamespaces([...info.data.globalData.registries["minecraft:block"]]), vscode_languageserver_1.CompletionItemKind.Reference, ".");

        if (helper.merge(result)) {
          return helper.succeed();
        }
      }
    }

    for (const choice of criteria_1.itemCriteria) {
      reader.cursor = postStart;

      if (misc_functions_1.namespacesEqual(data.literal, choice)) {
        const result = misc_functions_1.parseNamespaceOption(reader, misc_functions_1.stringArrayToNamespaces([...info.data.globalData.registries["minecraft:entity_type"]]), vscode_languageserver_1.CompletionItemKind.Reference, ".");

        if (helper.merge(result)) {
          return helper.succeed();
        }
      }
    }

    if (misc_functions_1.namespacesEqual(data.literal, customPrefix)) {
      const result = misc_functions_1.parseNamespaceOption(reader, misc_functions_1.stringArrayToNamespaces([...info.data.globalData.registries["minecraft:custom_stat"]]), vscode_languageserver_1.CompletionItemKind.Reference, ".");

      if (helper.merge(result)) {
        return helper.succeed();
      }
    }

    reader.readUntilRegexp(/\s/);
    helper.addErrors(UNKNOWN_CRITERIA.create(start, reader.cursor, text));
    return helper.succeed(); // tslint:enable:no-shadowed-variable
  }
};
},{"../../brigadier/errors":"aP4V","../../brigadier/string-reader":"iLhI","../../colors":"Td8d","../../consts":"xb+0","../../data/lists/criteria":"heCz","../../misc-functions":"KBGm","../../misc-functions/third_party/typed-keys":"kca+"}],"0R/b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const js_combinatorics_1 = require("js-combinatorics");

const errors_1 = require("../../brigadier/errors");

const misc_functions_1 = require("../../misc-functions");

const values = ["x", "y", "z"];
const INVALID_CHAR = new errors_1.CommandErrorBuilder("argument.swizzle.invalid", "Invalid character '%s'");
const DUPLICATE = new errors_1.CommandErrorBuilder("argument.swizzle.duplicate", "Duplicate character '%s'");
exports.swizzleParer = {
  parse: reader => {
    const helper = new misc_functions_1.ReturnHelper();
    const start = reader.cursor;
    const arr = reader.readUnquotedString().split("");

    for (const s of arr) {
      if (values.indexOf(s) === -1) {
        return helper.fail(INVALID_CHAR.create(start, reader.cursor, s));
      }
    }

    for (const v of values) {
      if (arr.indexOf(v) !== arr.lastIndexOf(v)) {
        return helper.fail(DUPLICATE.create(start, reader.cursor, v));
      }
    }

    const text = reader.string.substring(start, reader.cursor);
    const suggestions = js_combinatorics_1.power(values.filter(v => text.indexOf(v) === -1)).map(v => text + v.join("")).filter(v => v !== "");
    suggestions.forEach(v => helper.addSuggestion(0, v));
    return helper.succeed();
  }
};
},{"../../brigadier/errors":"aP4V","../../misc-functions":"KBGm"}],"Av8O":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const vscode_languageserver_1 = require("vscode-languageserver");

const errors_1 = require("../../brigadier/errors");

const string_reader_1 = require("../../brigadier/string-reader");

const misc_functions_1 = require("../../misc-functions");

const typed_keys_1 = require("../../misc-functions/third_party/typed-keys");

const EXCEPTIONS = {
  invalid_unit: new errors_1.CommandErrorBuilder("argument.time.invalid_unit", "Invalid unit '%s'"),
  // This is not tested
  not_integer: new errors_1.CommandErrorBuilder("argument.time.not_nonnegative_integer", "Not a non-negative integer number of ticks: %s (Due to differences in the representation of floating point numbers, Minecraft Java Edition might not fail for this value)", vscode_languageserver_1.DiagnosticSeverity.Warning),
  not_nonegative_integer: new errors_1.CommandErrorBuilder("argument.time.not_nonnegative_integer", "Not a non-negative integer number of ticks: %s")
};
exports.times = {
  d: 24000,
  s: 20,
  t: 1
};
exports.timeParser = {
  parse: (reader, info) => {
    const helper = new misc_functions_1.ReturnHelper(info);
    const start = reader.cursor;
    const float = reader.readFloat();

    if (!helper.merge(float)) {
      return helper.fail();
    }

    const suffixStart = reader.cursor;
    const suffix = reader.readOption(typed_keys_1.typed_keys(exports.times), {
      quote: false,
      unquoted: string_reader_1.StringReader.charAllowedInUnquotedString
    });

    if (!helper.merge(suffix)) {
      if (suffix.data !== "") {
        return helper.addErrors(EXCEPTIONS.invalid_unit.create(suffixStart, reader.cursor, suffix.data || "none")).succeed();
      }
    }

    const unit = exports.times[suffix.data] || 1;
    const result = unit * float.data;

    if (result < 0) {
      return helper.addErrors(EXCEPTIONS.not_nonegative_integer.create(start, reader.cursor, result.toString())).succeed();
    }

    if (!Number.isInteger(result)) {
      return helper.addErrors(EXCEPTIONS.not_integer.create(start, reader.cursor, result.toString())).succeed();
    }

    return helper.succeed();
  }
};
},{"../../brigadier/errors":"aP4V","../../brigadier/string-reader":"iLhI","../../misc-functions":"KBGm","../../misc-functions/third_party/typed-keys":"kca+"}],"0nBp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const brigadierParsers = tslib_1.__importStar(require("./brigadier"));

const literal_1 = require("./literal");

const blockParsers = tslib_1.__importStar(require("./minecraft/block"));

const component_1 = require("./minecraft/component");

const coordParsers = tslib_1.__importStar(require("./minecraft/coordinates"));

const entityParser = tslib_1.__importStar(require("./minecraft/entity"));

const itemParsers = tslib_1.__importStar(require("./minecraft/item"));

const listParsers = tslib_1.__importStar(require("./minecraft/lists"));

const message_1 = require("./minecraft/message");

const namespaceParsers = tslib_1.__importStar(require("./minecraft/namespace-list"));

const nbt_path_1 = require("./minecraft/nbt-path");

const nbt_1 = require("./minecraft/nbt/nbt");

const range_1 = require("./minecraft/range");

const resources_1 = require("./minecraft/resources");

const scoreboard_1 = require("./minecraft/scoreboard");

const swizzle_1 = require("./minecraft/swizzle");

const time_1 = require("./minecraft/time");
/**
 * Incomplete:
 * https://github.com/Levertion/mcfunction-langserver/projects/1
 */


const implementedParsers = {
  "brigadier:bool": brigadierParsers.boolParser,
  "brigadier:double": brigadierParsers.doubleParser,
  "brigadier:float": brigadierParsers.floatParser,
  "brigadier:integer": brigadierParsers.intParser,
  "brigadier:string": brigadierParsers.stringParser,
  "minecraft:block_pos": coordParsers.blockPos,
  "minecraft:block_predicate": blockParsers.predicateParser,
  "minecraft:block_state": blockParsers.stateParser,
  "minecraft:color": listParsers.colorParser,
  "minecraft:column_pos": coordParsers.columnPos,
  "minecraft:component": component_1.jsonParser,
  "minecraft:dimension": namespaceParsers.dimensionParser,
  "minecraft:entity": entityParser.entity,
  "minecraft:entity_anchor": listParsers.entityAnchorParser,
  "minecraft:entity_summon": namespaceParsers.summonParser,
  "minecraft:function": resources_1.functionParser,
  "minecraft:game_profile": entityParser.gameProfile,
  "minecraft:int_range": range_1.intRange,
  "minecraft:item_enchantment": namespaceParsers.enchantmentParser,
  "minecraft:item_predicate": itemParsers.predicate,
  "minecraft:item_slot": listParsers.itemSlotParser,
  "minecraft:item_stack": itemParsers.stack,
  "minecraft:message": message_1.messageParser,
  "minecraft:mob_effect": namespaceParsers.mobEffectParser,
  "minecraft:nbt_compound_tag": nbt_1.nbtParser,
  "minecraft:nbt_path": nbt_path_1.pathParser,
  "minecraft:nbt_tag": nbt_1.nbtParser,
  "minecraft:objective": scoreboard_1.objectiveParser,
  "minecraft:objective_criteria": scoreboard_1.criteriaParser,
  "minecraft:operation": listParsers.operationParser,
  "minecraft:particle": namespaceParsers.particleParser,
  "minecraft:resource_location": resources_1.resourceParser,
  "minecraft:rotation": coordParsers.rotation,
  "minecraft:score_holder": entityParser.scoreHolder,
  "minecraft:scoreboard_slot": listParsers.scoreBoardSlotParser,
  "minecraft:swizzle": swizzle_1.swizzleParer,
  "minecraft:team": scoreboard_1.teamParser,
  "minecraft:time": time_1.timeParser,
  "minecraft:vec2": coordParsers.vec2,
  "minecraft:vec3": coordParsers.vec3
};

function getParser(node) {
  switch (node.type) {
    case "literal":
      return literal_1.literalParser;

    case "argument":
      if (!!node.parser) {
        return getArgParser(node.parser);
      }

      break;

    default:
  }

  return undefined;
}

exports.getParser = getParser;

function getArgParser(id) {
  if (!!global.mcLangSettings && !!global.mcLangSettings.parsers && global.mcLangSettings.parsers.hasOwnProperty(id)) {
    try {
      return global.mcLangSettings.parsers[id];
    } catch (_) {
      mcLangLog(`${global.mcLangSettings.parsers[id]} could not be loaded`);
    }
  }

  if (implementedParsers.hasOwnProperty(id)) {
    return implementedParsers[id];
  }

  mcLangLog(`Argument with parser id ${id} has no associated parser.
Please consider reporting this at https://github.com/Levertion/mcfunction-language-server/issues`);
  return undefined;
}
},{"./brigadier":"GcLj","./literal":"38DR","./minecraft/block":"wRSu","./minecraft/component":"3ZZw","./minecraft/coordinates":"5Pa8","./minecraft/entity":"1kly","./minecraft/item":"LoiV","./minecraft/lists":"kr6k","./minecraft/message":"VDDC","./minecraft/namespace-list":"suMb","./minecraft/nbt-path":"wccY","./minecraft/nbt/nbt":"JpDU","./minecraft/range":"1Kfp","./minecraft/resources":"ELUu","./minecraft/scoreboard":"tZ+1","./minecraft/swizzle":"0R/b","./minecraft/time":"Av8O"}],"aDYY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const main_1 = require("vscode-languageserver/lib/main");

const string_reader_1 = require("./brigadier/string-reader");

const consts_1 = require("./consts");

const creators_1 = require("./misc-functions/creators");

const node_tree_1 = require("./misc-functions/node-tree");

const get_parser_1 = require("./parsers/get-parser");

function computeCompletions(linenum, character, document, data) {
  const line = document.lines[linenum];

  if (line.parseInfo === undefined || line.text.startsWith(consts_1.COMMENT_START)) {
    return main_1.CompletionList.create([], true);
  }

  const commandData = {
    globalData: data.globalData,
    localData: data.getPackFolderData(document.pack_segments)
  };
  const nodes = line.parseInfo ? line.parseInfo.nodes : [];

  if (nodes.length === 0) {
    return main_1.CompletionList.create(getCompletionsFromNode(linenum, 0, character, line.text, [], commandData, {}), true);
  }

  const {
    finals,
    internals
  } = getAllNodes(nodes, character);
  const completions = [];

  for (const finalNode of finals) {
    completions.push(...getCompletionsFromNode(linenum, finalNode.high + 1, character, line.text, finalNode.path, commandData, // N.B. finalNode.final is defined by defition of getAllNodes
    finalNode.final));
  }

  for (const insideNode of internals) {
    const newPath = insideNode.path.slice();
    const parentPath = newPath.slice(0, -1);
    completions.push(...getCompletionsFromNode(linenum, insideNode.low, character, line.text, parentPath, commandData, insideNode.context));
  }

  return main_1.CompletionList.create(completions, true);
}

exports.computeCompletions = computeCompletions;

function getAllNodes(nodes, character) {
  const finals = [];
  const internals = [];

  for (const node of nodes) {
    if (node.high < character) {
      if (node.final !== undefined) {
        finals.push(node);
      }
    } else {
      if (node.low <= character) {
        internals.push(node);
      }
    }
  }

  return {
    finals,
    internals
  };
}

exports.getAllNodes = getAllNodes;

function getCompletionsFromNode(line, start, end, text, nodepath, data, context) {
  const parent = node_tree_1.getNextNode(node_tree_1.followPath(data.globalData.commands, nodepath), nodepath, data.globalData.commands).node;
  const result = [];

  if (!!parent.children) {
    for (const childKey in parent.children) {
      if (parent.children.hasOwnProperty(childKey)) {
        const child = parent.children[childKey];
        const childPath = [...nodepath, childKey];
        const info = creators_1.createParserInfo(child, data, childPath, context, true);
        const parser = get_parser_1.getParser(child);

        if (!!parser) {
          const reader = new string_reader_1.StringReader(text.substring(start, end));

          try {
            const parseResult = parser.parse(reader, info);

            if (!!parseResult) {
              result.push(...suggestionsToCompletions(parseResult.suggestions, line, start, end, parser.kind));
            }
          } catch (error) {
            mcLangLog(`Error thrown whilst parsing: ${error} - ${error.stack}`);
          }
        }
      }
    }
  }

  return result;
}

function suggestionsToCompletions(suggestions, line, start, end, defaultKind = main_1.CompletionItemKind.Keyword) {
  const result = [];

  for (const suggestion of suggestions) {
    if (typeof suggestion === "string") {
      result.push({
        kind: defaultKind,
        label: suggestion,
        textEdit: {
          newText: suggestion,
          range: {
            end: {
              character: end,
              line
            },
            start: {
              character: start,
              line
            }
          }
        }
      });
    } else {
      const completion = {
        insertTextFormat: suggestion.insertTextFormat || main_1.InsertTextFormat.PlainText,
        kind: suggestion.kind || defaultKind,
        label: suggestion.label || suggestion.text,
        textEdit: {
          newText: suggestion.text,
          range: {
            end: {
              character: end,
              line
            },
            start: {
              character: start + suggestion.start,
              line
            }
          }
        }
      };

      if (!!suggestion.description) {
        completion.documentation = suggestion.description;
      }

      result.push(completion);
    }
  }

  return result;
}
},{"./brigadier/string-reader":"iLhI","./consts":"xb+0","./misc-functions/creators":"NmKP","./misc-functions/node-tree":"H7Mf","./parsers/get-parser":"0nBp"}],"0A+1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const node_interval_tree_1 = require("node-interval-tree");

const vscode_languageserver_1 = require("vscode-languageserver");

const vscode_uri_1 = tslib_1.__importDefault(require("vscode-uri"));

const completions_1 = require("./completions");

const consts_1 = require("./consts");

const misc_functions_1 = require("./misc-functions");

const typed_keys_1 = require("./misc-functions/third_party/typed-keys");

const blanks_1 = require("./test/blanks");

function hoverProvider(docLine, pos, _, manager) {
  function computeIntervalHovers(intervals, commandLine, line, map) {
    const end = {
      character: intervals.reduce((acc, v) => Math.max(acc, v.high), 0),
      line
    };
    const start = {
      character: intervals.reduce((acc, v) => Math.min(acc, v.low), commandLine.text.length),
      line
    };
    return {
      contents: map(intervals),
      range: {
        start,
        end
      }
    };
  }

  const json = getActionsOfKind(docLine, pos, "json");

  if (json.length > 0) {
    const doc = json[0].data;
    let result;
    const position = {
      character: pos.character - json[0].low,
      line: 0
    };
    manager.globalData.jsonService.doHover(doc.text, position, doc.json).then(v => result = v);

    if (result) {
      if (result.range) {
        result.range.start.line = pos.line;
        result.range.end.line = pos.line;
        result.range.start.character += json[0].low;
        result.range.end.character += json[0].low;
      }

      return result;
    }
  }

  const hovers = getActionsOfKind(docLine, pos, "hover");

  if (hovers.length > 0) {
    return computeIntervalHovers(hovers, docLine, pos.line, i => ({
      kind: "markdown",
      value: i.map(v => v.data).join("\n\n---\n")
    }));
  } else {
    const tree = getNodeTree(docLine);

    if (tree) {
      const matching = tree.search(pos.character, pos.character);

      if (matching.length > 0) {
        return computeIntervalHovers(matching, docLine, pos.line, i => ({
          kind: "markdown",
          value: i.map(node => {
            const data = misc_functions_1.followPath(manager.globalData.commands, node.path);
            return `${data.type === "literal" ? "literal" : `\`${data.parser}\` parser`} on path '${node.path.join(", ")}'`;
          }).join("\n\n---\n")
        }));
      }
    }
  }

  return undefined;
}

exports.hoverProvider = hoverProvider;

function definitionProvider(docLine, pos) {
  if (docLine) {
    const actions = getActionsOfKind(docLine, pos, "source");
    const start = {
      line: 0,
      character: 0
    };
    return actions.map(a => ({
      range: {
        start,
        end: start
      },
      uri: vscode_uri_1.default.file(a.data).toString()
    }));
  }

  return [];
}

exports.definitionProvider = definitionProvider;

function signatureHelpProvider(line, pos, _, manager) {
  if (line.parseInfo === undefined || line.text.startsWith(consts_1.COMMENT_START)) {
    return undefined;
  }

  const nodes = line.parseInfo ? line.parseInfo.nodes : [];

  if (nodes.length === 0) {
    const sigs = getSignatureHelp([], manager);

    if (sigs) {
      const activeSignature = line.text.length > 0 ? Math.max(sigs.findIndex(v => v.label.startsWith(line.text)), 0) : 0;
      return {
        activeParameter: 0,
        activeSignature,
        signatures: sigs
      };
    } else {
      return undefined;
    }
  }

  let text = "";
  const {
    finals,
    internals
  } = completions_1.getAllNodes(nodes, pos.character);
  const signatures = [];

  for (const finalNode of finals) {
    const result = getSignatureHelp(finalNode.path, manager);

    if (result) {
      signatures.push(...result);
    }

    const currentText = line.text.slice(finalNode.high + 1);

    if (currentText.length > text.length) {
      text = currentText;
    }
  }

  for (const internalNode of internals) {
    const pth = internalNode.path.slice();

    if (pth.length > 0) {
      pth.splice(pth.length - 1);
      const result = getSignatureHelp(pth, manager);

      if (result) {
        signatures.push(...result);
      }

      const currentText = line.text.slice(internalNode.low, internalNode.high);

      if (currentText.length > text.length) {
        text = currentText;
      }
    }
  }

  if (signatures.length > 0) {
    const activeSignature = text.length > 0 ? Math.max(signatures.findIndex(v => v.label.startsWith(text)), 0) : 0;
    return {
      signatures,
      activeParameter: 0,
      activeSignature
    };
  }

  return undefined;
}

exports.signatureHelpProvider = signatureHelpProvider;

function buildSignatureHelpForChildren(node, path, commands, depth) {
  if (node.children) {
    const result = [];

    for (const childName of Object.keys(node.children)) {
      const child = node.children[childName];
      const childPath = [...path, childName];
      const childNode = misc_functions_1.getNextNode(child, childPath, commands);
      const parameterInfo = buildParameterInfoForNode(child, childName);

      if (depth > 0) {
        const next = buildSignatureHelpForChildren(childNode.node, childNode.path, commands, node.executable ? depth - 1 : 0);

        if (next.length > 0) {
          if (parameterInfo) {
            result.push([parameterInfo, ...next.map(v => node.executable ? `[${v}]` : v)].join(" "));
          } else {
            result.push(next.map(v => node.executable ? `[${v}]` : v).join(" "));
          }

          continue;
        }
      }

      if (parameterInfo) {
        result.push(parameterInfo);
      }
    }

    if (depth === 0) {
      return [result.join("|")];
    }

    return result;
  }

  return [];
}

function buildParameterInfoForNode(node, name) {
  return node.type === "literal" ? name : node.type === "argument" ? `<${name}: ${node.parser}>` : undefined;
} // Arbritrary number used to calculate the max length of the line


const SIZE = 50;

function getSignatureHelp(path, manager) {
  const commands = manager.globalData.commands;
  const next = misc_functions_1.getNextNode(misc_functions_1.followPath(commands, path), path, commands);
  const options = buildSignatureHelpForChildren(next.node, next.path, commands, 2);
  const result = [];

  for (const option of options) {
    result.push(buildSignature(option, path));
  }

  return result;
}

function buildSignature(option, path) {
  if (option.length > SIZE) {
    let index = option.lastIndexOf("|", SIZE);

    if (index === -1) {
      index = SIZE;
    }

    return {
      documentation: `${option.slice(index).replace("|", "\t(pipe) ").replace(/\|/g, "\n\t| ").replace("(pipe)", "|")}\n\nCommand at path ${path.join()}`,
      label: `${option.slice(0, SIZE)}...`
    };
  } else {
    return {
      documentation: `Command at path '${path.join()}'`,
      label: option
    };
  }
}

function getActionsOfKind(line, position, kind) {
  if (line.parseInfo) {
    if (!line.actions) {
      line.actions = new node_interval_tree_1.IntervalTree();

      for (const action of line.parseInfo.actions) {
        line.actions.insert(action);
      }
    }

    const tree = line.actions;
    return tree.search(position.character, position.character).filter(v => v.type === kind);
  }

  return [];
}

function getNodeTree(line) {
  if (line.nodes) {
    return line.nodes;
  }

  if (line.parseInfo) {
    const tree = new node_interval_tree_1.IntervalTree();

    for (const node of line.parseInfo.nodes) {
      tree.insert(node);
    }

    return tree;
  }

  return undefined;
}

function getWorkspaceSymbols(manager, query) {
  const result = [];
  const worlds = manager.packData;
  const namespace = misc_functions_1.convertToNamespace(query);

  for (const worldPath of Object.keys(worlds)) {
    const world = worlds[worldPath];

    for (const packID in world.packs) {
      if (world.packs.hasOwnProperty(packID)) {
        const pack = world.packs[packID];

        for (const type of typed_keys_1.typed_keys(pack.data)) {
          const val = pack.data[type];

          if (val) {
            for (const item of val) {
              if (misc_functions_1.namespaceStart(item, namespace)) {
                result.push({
                  kind: symbolKindForResource(type),
                  location: {
                    range: blanks_1.blankRange,
                    uri: vscode_uri_1.default.file(misc_functions_1.buildPath(item, world, type)).toString()
                  },
                  name: misc_functions_1.stringifyNamespace(item)
                });
              }
            }
          }
        }
      }
    }
  }

  return result;
}

exports.getWorkspaceSymbols = getWorkspaceSymbols;

function symbolKindForResource(resource) {
  switch (resource) {
    case "block_tags":
    case "function_tags":
    case "item_tags":
      return vscode_languageserver_1.SymbolKind.Namespace;

    case "advancements":
    case "functions":
    case "loot_tables":
    case "recipes":
    case "structures":
      break;

    default:
  }

  return vscode_languageserver_1.SymbolKind.Variable;
}

exports.symbolKindForResource = symbolKindForResource;
},{"./completions":"aDYY","./consts":"xb+0","./misc-functions":"KBGm","./misc-functions/third_party/typed-keys":"kca+","./test/blanks":"7iV1"}],"hLCE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const path_1 = require("path");

const misc_functions_1 = require("../../misc-functions");

const typed_keys_1 = require("../../misc-functions/third_party/typed-keys");

async function runMapFunctions(resources, globalData, packRoot, localData) {
  const result = {};
  const helper = new misc_functions_1.ReturnHelper();
  const promises = [];

  for (const type of typed_keys_1.typed_keys(resources)) {
    const val = result[type] = [];
    const data = resources[type]; // tslint:disable-next-line:no-unbound-method We control this function, so we know it won't use the this keyword.

    const mapFunction = misc_functions_1.resourceTypes[type].mapFunction;

    if (mapFunction) {
      promises.push(...data.map(async v => {
        const res = await mapFunction(v, packRoot, globalData, localData);
        helper.merge(res);
        val.push(res.data);
      }));
    } else {
      val.push(...data);
    }
  }

  await Promise.all(promises);
  return helper.succeed(result);
}

exports.runMapFunctions = runMapFunctions;

async function mapPacksInfo(packsInfo, global) {
  const helper = new misc_functions_1.ReturnHelper();
  const result = Object.assign({}, packsInfo, {
    packs: {}
  });
  const promises = typed_keys_1.typed_keys(packsInfo.packs).map(async packID => {
    const element = packsInfo.packs[packID];
    const subresult = await runMapFunctions(element.data, global, path_1.join(packsInfo.location, element.name), packsInfo);
    helper.merge(subresult);
    result.packs[packID] = Object.assign({}, element, {
      data: subresult.data
    });
  });
  await Promise.all(promises);
  return helper.succeed(result);
}

exports.mapPacksInfo = mapPacksInfo;
},{"../../misc-functions":"KBGm","../../misc-functions/third_party/typed-keys":"kca+"}],"1cH9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const Long = tslib_1.__importStar(require("long"));

class BufferStream {
  constructor(buffer) {
    this.index = 0;
    this.buf = buffer;
  }

  getByte() {
    const out = this.buf.readInt8(this.index);
    this.index++;
    return out;
  }

  getDouble() {
    const out = this.buf.readDoubleBE(this.index);
    this.index += 8;
    return out;
  }

  getFloat() {
    const out = this.buf.readFloatBE(this.index);
    this.index += 4;
    return out;
  }

  getInt() {
    const out = this.buf.readInt32BE(this.index);
    this.index += 4;
    return out;
  }

  getLong() {
    const arr = this.buf.subarray(this.index, this.index + 8);
    this.index += 8;
    return Long.fromBytesBE([...arr]);
  }

  getShort() {
    const out = this.buf.readInt16BE(this.index);
    this.index += 2;
    return out;
  }

  getUTF8() {
    const len = this.getShort();
    const out = this.buf.toString("utf8", this.index, this.index + len);
    this.index += len;
    return out;
  }

}

exports.BufferStream = BufferStream;
},{}],"xmc2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const util_1 = require("util");

const zlib = tslib_1.__importStar(require("zlib"));

const buffer_stream_1 = require("./buffer-stream");

const unzipAsync = util_1.promisify(zlib.unzip);
let tags;

const nbtbyte = buffer => buffer.getByte();

const nbtshort = buffer => buffer.getShort();

const nbtint = buffer => buffer.getInt();

const nbtlong = buffer => buffer.getLong();

const nbtfloat = buffer => buffer.getFloat();

const nbtdouble = buffer => buffer.getDouble();

const nbtbytearray = buffer => {
  const len = buffer.getInt();
  const out = [];

  for (let i = 0; i < len; i++) {
    out.push(buffer.getByte());
  }

  return out;
};

const nbtstring = buffer => buffer.getUTF8();

const nbtlist = buffer => {
  const id = buffer.getByte();
  const len = buffer.getInt();
  const parser = tags[id];
  const out = [];

  for (let i = 0; i < len; i++) {
    out.push(parser(buffer));
  }

  return out;
};

const nbtcompound = buffer => {
  let tag = buffer.getByte();
  const out = {};

  while (tag !== 0) {
    const name = buffer.getUTF8();
    const parser = tags[tag];
    out[name] = parser(buffer);
    tag = buffer.getByte();
  }

  return out;
};

const nbtintarray = buffer => {
  const len = buffer.getInt();
  const out = [];

  for (let i = 0; i < len; i++) {
    out.push(buffer.getInt());
  }

  return out;
};

const nbtlongarray = buffer => {
  const len = buffer.getInt();
  const out = [];

  for (let i = 0; i < len; i++) {
    out.push(buffer.getLong());
  }

  return out;
};

tags = {
  // Need to redeclare because of TSLint
  1: nbtbyte,
  2: nbtshort,
  3: nbtint,
  4: nbtlong,
  5: nbtfloat,
  6: nbtdouble,
  7: nbtbytearray,
  8: nbtstring,
  9: nbtlist,
  10: nbtcompound,
  11: nbtintarray,
  12: nbtlongarray
};

async function parse(buffer, named = true) {
  let unzipbuf;

  try {
    unzipbuf = await unzipAsync(buffer);
  } catch (e) {
    unzipbuf = buffer;
  }

  const stream = new buffer_stream_1.BufferStream(unzipbuf);
  const id = stream.getByte();

  if (named) {
    stream.getUTF8(); // Name
  }

  const parser = tags[id];
  return parser(stream);
}

exports.parse = parse;
},{"./buffer-stream":"1cH9"}],"6rms":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const path = tslib_1.__importStar(require("path"));

const misc_functions_1 = require("../../misc-functions");

const parser_1 = require("./parser");

async function loadNBT(worldLoc) {
  const nbt = {};
  const levelpath = path.resolve(worldLoc, "./level.dat");

  try {
    const levelbuf = await misc_functions_1.readFileAsync(levelpath);
    nbt.level = await parser_1.parse(levelbuf);
  } catch (e) {// Level doesn't exist
  }

  const scpath = path.resolve(worldLoc, "./data/scoreboard.dat");

  try {
    const scoreboardbuf = await misc_functions_1.readFileAsync(scpath);
    nbt.scoreboard = await parser_1.parse(scoreboardbuf);
  } catch (e) {// Scoreboard file doesn't exist
  }

  return nbt;
}

exports.loadNBT = loadNBT;
},{"../../misc-functions":"KBGm","./parser":"xmc2"}],"SO8f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const path = tslib_1.__importStar(require("path"));

const consts_1 = require("../consts");

const misc_functions_1 = require("../misc-functions");

const file_errors_1 = require("../misc-functions/file-errors");

const promisified_fs_1 = require("../misc-functions/promisified-fs");

const typed_keys_1 = require("../misc-functions/third_party/typed-keys");

const mapfunctions_1 = require("./extractor/mapfunctions");

const nbt_cache_1 = require("./nbt/nbt-cache");

async function getNamespaceResources(namespace, dataFolder, id, result = {}) {
  const helper = new misc_functions_1.ReturnHelper();
  const namespaceFolder = path.join(dataFolder, namespace);
  const subDirs = await subDirectories(namespaceFolder);
  await Promise.all(typed_keys_1.typed_keys(misc_functions_1.resourceTypes).map(async type => {
    const resourceInfo = misc_functions_1.resourceTypes[type];

    if (subDirs.indexOf(resourceInfo.path[0]) === -1) {
      return;
    }

    const dataContents = path.join(namespaceFolder, ...resourceInfo.path);
    const files = await promisified_fs_1.walkDir(dataContents);

    if (files.length === 0) {
      return;
    }

    const nameSpaceContents = result[type] || [];
    await Promise.all(files.map(async file => {
      const realExtension = path.extname(file);

      if (realExtension !== resourceInfo.extension) {
        helper.addMisc(file_errors_1.createExtensionFileError(file, resourceInfo.extension, realExtension));
      }

      const internalUri = path.relative(dataContents, file);
      const newResource = {
        namespace,
        pack: id,
        path: internalUri.slice(0, -realExtension.length).replace(consts_1.SLASHREPLACEREGEX, consts_1.SLASH)
      };
      nameSpaceContents.push(newResource);
    }));
    result[type] = nameSpaceContents;
  }));
  return helper.succeed(result);
}

exports.getNamespaceResources = getNamespaceResources;

async function buildDataPack(packFolder, id, packName) {
  const helper = new misc_functions_1.ReturnHelper();
  const dataFolder = path.join(packFolder, consts_1.DATAFOLDER);
  const [mcmeta, packResources] = await Promise.all([promisified_fs_1.readJSON(path.join(packFolder, consts_1.MCMETAFILE)), getPackResources(dataFolder, id)]);
  const result = {
    id,
    data: packResources.data,
    name: packName
  };
  helper.merge(packResources);

  if (helper.merge(mcmeta)) {
    result.mcmeta = mcmeta.data;
  }

  return helper.succeed(result);
}

async function getPackResources(dataFolder, id) {
  const helper = new misc_functions_1.ReturnHelper();
  const namespaces = await subDirectories(dataFolder);
  const result = {};
  await Promise.all(namespaces.map(async namespace => {
    const resources = await getNamespaceResources(namespace, dataFolder, id, result);
    helper.merge(resources);
    return resources.data;
  }));
  return helper.succeed(result);
}

async function getPacksInfo(location, globalData) {
  const packNames = await subDirectories(location);
  const helper = new misc_functions_1.ReturnHelper();
  const packs = [...packNames.entries()];
  const nbt = await nbt_cache_1.loadNBT(path.resolve(location, "../"));
  const result = {
    location,
    packnamesmap: {},
    packs: {},
    nbt
  };
  const promises = packs.map(async ([packID, packName]) => {
    const loc = path.join(location, packName);
    const packData = await buildDataPack(loc, packID, packName);
    helper.merge(packData);
    result.packs[packID] = packData.data;
    result.packnamesmap[packName] = packID;
  });
  await Promise.all(promises);
  const otherResult = await mapfunctions_1.mapPacksInfo(result, globalData);
  return helper.mergeChain(otherResult).succeed(otherResult.data);
}

exports.getPacksInfo = getPacksInfo;

async function subDirectories(baseFolder) {
  let files = [];

  try {
    files = await promisified_fs_1.readDirAsync(baseFolder);
  } catch (_a) {
    return [];
  }

  const promises = files.map(async name => {
    try {
      return (await promisified_fs_1.statAsync(path.join(baseFolder, name))).isDirectory();
    } catch (_a) {
      return false;
    }
  });
  const results = await Promise.all(promises);
  return files.filter((_, i) => results[i]);
}
},{"../consts":"xb+0","../misc-functions":"KBGm","../misc-functions/file-errors":"cNAA","../misc-functions/promisified-fs":"tSk9","../misc-functions/third_party/typed-keys":"kca+","./extractor/mapfunctions":"hLCE","./nbt/nbt-cache":"6rms"}],"yWts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const fs = tslib_1.__importStar(require("fs"));

const path = tslib_1.__importStar(require("path"));

const util_1 = require("util");

const consts_1 = require("../../consts");

const misc_functions_1 = require("../../misc-functions");

const typed_keys_1 = require("../../misc-functions/third_party/typed-keys");

const datapack_resources_1 = require("../datapack-resources");

const mapfunctions_1 = require("./mapfunctions");

const readFileAsync = util_1.promisify(fs.readFile);

async function collectData(version, dataDir) {
  const helper = new misc_functions_1.ReturnHelper();
  const result = {
    meta_info: {
      version
    }
  };
  const cleanups = await Promise.all([getBlocks(dataDir), getRegistries(dataDir), getCommands(dataDir), getResources(dataDir)]);

  for (const dataType of cleanups) {
    result[dataType[0]] = dataType[1];
  }

  const resources = await mapfunctions_1.runMapFunctions(result.resources, result, dataDir);
  return helper.mergeChain(resources).succeed(Object.assign({}, result, {
    resources: resources.data
  }));
}

exports.collectData = collectData; //#region Resources

async function getRegistries(dataDir) {
  const registries = JSON.parse((await readFileAsync(path.join(dataDir, "reports", "registries.json"))).toString());
  const result = {};

  for (const key of typed_keys_1.typed_keys(registries)) {
    const registry = registries[key];

    if (registry.entries) {
      const set = new Set();

      for (const entry of Object.keys(registry.entries)) {
        set.add(entry);
      }

      result[key] = set;
    }
  }

  return ["registries", result];
}

async function getResources(dataDir) {
  const dataFolder = path.join(dataDir, consts_1.DATAFOLDER);
  const resources = await datapack_resources_1.getNamespaceResources("minecraft", dataFolder, undefined);
  return ["resources", resources.data];
} //#endregion


async function getCommands(dataDir) {
  const tree = JSON.parse((await readFileAsync(path.join(dataDir, "reports", "commands.json"))).toString());
  return ["commands", tree];
} //#region Blocks


async function getBlocks(dataDir) {
  function cleanBlocks(blocks) {
    const result = {};

    for (const blockName in blocks) {
      if (blocks.hasOwnProperty(blockName)) {
        const blockInfo = blocks[blockName];
        result[blockName] = {};

        if (!!blockInfo.properties) {
          Object.assign(result[blockName], blockInfo.properties);
        }
      }
    }

    return result;
  }

  const blocksData = JSON.parse((await readFileAsync(path.join(dataDir, "reports", "blocks.json"))).toString());
  return ["blocks", cleanBlocks(blocksData)];
} //#endregion
},{"../../consts":"xb+0","../../misc-functions":"KBGm","../../misc-functions/third_party/typed-keys":"kca+","../datapack-resources":"SO8f","./mapfunctions":"hLCE"}],"S/g2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib"); // tslint:disable:no-require-imports


const fs = tslib_1.__importStar(require("fs"));

const path = tslib_1.__importStar(require("path")); // @ts-ignore `import *` syntax is broken in this case as requestPromise would be a function


const request_promise_native_1 = tslib_1.__importDefault(require("request-promise-native"));

async function getPathToJar(tempdir, currentversion) {
  if (!!mcLangSettings.data.customJar) {
    return {
      jarPath: mcLangSettings.data.customJar,
      version: ""
    };
  } else {
    return downloadJar(currentversion, tempdir);
  }
}

exports.getPathToJar = getPathToJar;

async function downloadJar(currentversion, tmpDirName) {
  const versionInfo = await getLatestVersionInfo();

  if (versionInfo.id !== currentversion) {
    const singleVersion = await request_promise_native_1.default(versionInfo.url, {
      json: true
    }).promise();
    const jarPath = path.join(tmpDirName, `minecraft-function-${versionInfo.id}.jar`);
    const requestPromised = request_promise_native_1.default(singleVersion.downloads.server.url);
    requestPromised.pipe(fs.createWriteStream(jarPath));
    await Promise.resolve(requestPromised);
    return {
      jarPath,
      version: versionInfo.id
    };
  } else {
    return undefined;
  }
}

exports.downloadJar = downloadJar;

async function getLatestVersionInfo() {
  const manifest = await request_promise_native_1.default("https://launchermeta.mojang.com/mc/game/version_manifest.json", {
    json: true
  }).promise();
  const version = findVersion(getVersionId(manifest), manifest);
  return version;
}

function getVersionId(manifest) {
  if (mcLangSettings.data.snapshots) {
    return manifest.latest.snapshot;
  } else {
    return manifest.latest.release;
  }
}

function findVersion(version, manifest) {
  return manifest.versions.find(verInfo => verInfo.id === version);
} //#endregion
},{}],"w208":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const child_process_1 = require("child_process");

const path = tslib_1.__importStar(require("path"));

const util_1 = require("util");

const cache_1 = require("../cache");

const execFileAsync = util_1.promisify(child_process_1.execFile);
/**
 * Get the command used to execute a java version
 */

async function checkJavaPath() {
  const javaPath = mcLangSettings.data.javaPath || "java";

  try {
    await execFileAsync(javaPath, ["-version"], {
      env: process.env
    });
    return javaPath;
  } catch (error) {
    throw new Error(`Could not find Java executable. Got message: '${error}'`);
  }
}

exports.checkJavaPath = checkJavaPath;

async function runGenerator(javapath, tempdir, jarpath) {
  const resultFolder = path.join(tempdir, "generated");
  await execFileAsync(javapath, ["-cp", jarpath, "net.minecraft.data.Main", "--output", resultFolder, "--all"], {
    cwd: path.join(cache_1.cacheFolder, "..") // For log output to go in the extension folder

  });
  return resultFolder;
}

exports.runGenerator = runGenerator;
},{"../cache":"tgUj"}],"Th+u":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const fs = tslib_1.__importStar(require("fs"));

const os_1 = require("os");

const path = tslib_1.__importStar(require("path"));

const util_1 = require("util");

const misc_functions_1 = require("../../misc-functions");

const cache_1 = require("../cache");

const collect_data_1 = require("./collect-data");

const download_1 = require("./download");

const extract_data_1 = require("./extract-data");

const mkdtmpAsync = util_1.promisify(fs.mkdtemp);
/**
 * Will throw an error if something goes wrong.
 * Steps:
 * - Check if enabled in settings. ✓
 * - Check versions manifest. Compare with cached if available ✓
 *  - At the same time, check if java is installed ✓
 * - Get single version information ✓
 * - Download the jar into a temporary folder ✓
 * - Run the exposed data generator. ✓
 * - Collect the data exposed
 *  - Blocks and states
 *  - Items
 *  - (Entities)?
 *  - Commands
 *  - Advancements, recipes, structures, tags, etc
 * - Cache that data
 * - Return the data
 */

async function collectGlobalData(currentversion = "") {
  if (mcLangSettings.data.enabled) {
    const javaPath = await extract_data_1.checkJavaPath();
    mcLangLog(`Using java at path ${javaPath}`);
    const dir = await mkdtmpAsync(path.join(os_1.tmpdir(), "mcfunction"));
    const jarInfo = await download_1.getPathToJar(dir, currentversion);

    if (jarInfo) {
      mcLangLog(`Running generator`);
      const datadir = await extract_data_1.runGenerator(javaPath, dir, jarInfo.jarPath);
      mcLangLog("Generator Finished, collecting data");
      const helper = new misc_functions_1.ReturnHelper();
      const data = await collect_data_1.collectData(jarInfo.version, datadir);
      mcLangLog("Data collected, caching data");
      await cache_1.cacheData(data.data);
      mcLangLog("Caching complete");
      return helper.mergeChain(data).succeed(data.data);
    } else {
      return undefined;
    }
  } else {
    throw new Error("Data Obtainer disabled in settings. To obtain data automatically, please enable it.");
  }
}

exports.collectGlobalData = collectGlobalData;
},{"../../misc-functions":"KBGm","../cache":"tgUj","./collect-data":"yWts","./download":"S/g2","./extract-data":"w208"}],"vz+j":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const mc_nbt_paths_1 = require("mc-nbt-paths");

const synchronous_promise_1 = require("synchronous-promise");

const vscode_json_languageservice_1 = require("vscode-json-languageservice");

function loadNBTDocs() {
  const nbtData = new Map();
  Object.keys(mc_nbt_paths_1.nbtDocs).forEach(k => nbtData.set(k, mc_nbt_paths_1.nbtDocs[k]));
  return nbtData;
}

exports.loadNBTDocs = loadNBTDocs;
const textComponentSchema = "https://raw.githubusercontent.com/Levertion/minecraft-json-schema/master/java/shared/text_component.json";

async function loadNonCached() {
  const schemas = {
    [textComponentSchema]: JSON.stringify( // FIXME: parcel breaks require.resolve so we need to use plain require to get the correct path
    // tslint:disable-next-line:no-require-imports
    require("minecraft-json-schemas/java/shared/text_component"))
  };

  const schemaRequestService = url => schemas.hasOwnProperty(url) ? synchronous_promise_1.SynchronousPromise.resolve(schemas[url]) : synchronous_promise_1.SynchronousPromise.reject(`Schema at url ${url} not supported`);

  const jsonService = vscode_json_languageservice_1.getLanguageService({
    promiseConstructor: synchronous_promise_1.SynchronousPromise,
    schemaRequestService
  });
  jsonService.configure({
    allowComments: false,
    schemas: [{
      fileMatch: ["text-component.json"],
      uri: textComponentSchema
    }],
    validate: true
  });
  return {
    jsonService,
    nbt_docs: loadNBTDocs()
  };
}

exports.loadNonCached = loadNonCached;
},{}],"oucB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const assert_1 = require("assert");

const path_1 = require("path");

const vscode_languageserver_1 = require("vscode-languageserver");

const consts_1 = require("../consts");

const misc_functions_1 = require("../misc-functions");

const file_errors_1 = require("../misc-functions/file-errors");

const promisified_fs_1 = require("../misc-functions/promisified-fs");

const cache_1 = require("./cache");

const datapack_resources_1 = require("./datapack-resources");

const extractor_1 = require("./extractor");

const noncached_1 = require("./noncached");

class DataManager {
  constructor() {
    //#region Data Management
    this.globalDataInternal = {};
    this.packDataComplete = {};
    this.packDataPromises = {};
  }
  /**
   * Create a datamanager using Dummy Data for running tests.
   */


  static newWithData(dummyGlobal, dummyPacks) {
    const manager = new DataManager();
    manager.globalDataInternal = dummyGlobal || manager.globalDataInternal;
    Object.assign(manager.packDataComplete, dummyPacks);
    return manager;
  }

  get globalData() {
    return this.globalDataInternal;
  }

  get packData() {
    return this.packDataComplete;
  } //#endregion
  //#region Constructor
  //#endregion


  getPackFolderData(folder) {
    if (!!folder && this.packDataComplete.hasOwnProperty(folder.packsFolder)) {
      const info = this.packDataComplete[folder.packsFolder];
      return Object.assign({}, info, {
        current: info.packnamesmap[folder.pack]
      });
    }

    return undefined;
  }

  async handleChanges(event) {
    const helper = new misc_functions_1.ReturnHelper(false);
    const firsts = new Set();
    const promises = event.changes.map(async change => {
      try {
        const parsedPath = misc_functions_1.parseDataPath(change.uri);

        if (parsedPath) {
          const getData = async () => {
            const first = await this.readPackFolderData(parsedPath.packsFolder);

            if (first) {
              firsts.add(parsedPath.packsFolder);
            }

            const data = this.getPackFolderData(parsedPath);

            if (!data) {
              throw new Error("Could not load data from datapacks folder");
            }

            const packID = data.packnamesmap[parsedPath.pack];
            const pack = data.packs[packID];
            return {
              data,
              pack,
              packID
            };
          };

          if (parsedPath.rest === consts_1.MCMETAFILE) {
            const {
              pack
            } = await getData();

            if (!firsts.has(parsedPath.packsFolder)) {
              const res = await promisified_fs_1.readJSON(change.uri);
              pack.mcmeta = helper.merge(res) ? res.data : undefined;
            }
          } else {
            const namespace = misc_functions_1.getKindAndNamespace(parsedPath.rest);

            if (namespace) {
              const {
                pack,
                packID,
                data
              } = await getData();

              if (!firsts.has(parsedPath.packsFolder)) {
                const shouldUpdateContents = change.type === vscode_languageserver_1.FileChangeType.Changed && misc_functions_1.resourceTypes[namespace.kind].mapFunction;
                let contents = pack.data[namespace.kind];

                if ((change.type === vscode_languageserver_1.FileChangeType.Deleted || shouldUpdateContents) && !!contents) {
                  for (let i = 0; i < contents.length; i++) {
                    const element = contents[i];

                    if (misc_functions_1.namespacesEqual(element, namespace.location)) {
                      contents.splice(i, 1);
                      break;
                    }
                  }
                }

                if (change.type === vscode_languageserver_1.FileChangeType.Created || shouldUpdateContents) {
                  if (!contents) {
                    contents = pack.data[namespace.kind] = [];
                  }

                  const newResource = Object.assign({}, namespace.location, {
                    pack: packID
                  });
                  const actual = path_1.extname(change.uri);
                  const expected = misc_functions_1.resourceTypes[namespace.kind].extension;

                  if (actual === expected) {
                    const mapFunction = // tslint:disable-next-line:no-unbound-method We control this function, so we know it won't use the this keyword.
                    misc_functions_1.resourceTypes[namespace.kind].mapFunction;

                    if (mapFunction) {
                      const result = await mapFunction(newResource, path_1.join(parsedPath.packsFolder, parsedPath.pack), this.globalData, data);

                      if (helper.merge(result)) {
                        contents.push(result.data);
                      }
                    } else {
                      contents.push(newResource);
                    }
                  } else {
                    helper.addMisc(file_errors_1.createExtensionFileError(change.uri, expected, actual));
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        mcLangLog(`Change ${JSON.stringify(change)} could not be completed, due to '${JSON.stringify(error)}'`);
      }
    });
    await Promise.all(promises);
    return helper.succeed();
  }

  async loadGlobalData() {
    let version;

    if (!!this.globalData.meta_info) {
      version = this.globalData.meta_info.version;
    }

    try {
      const helper = new misc_functions_1.ReturnHelper();
      const data = await extractor_1.collectGlobalData(version);

      if (data) {
        helper.merge(data);

        if (this.globalDataInternal) {
          this.globalDataInternal = Object.assign({}, this.globalDataInternal, data.data);
        } else {
          this.globalDataInternal = Object.assign({}, (await noncached_1.loadNonCached()), data.data);
        }
      }

      assert_1.ok(this.globalDataInternal);
      return false;
    } catch (error) {
      return `Error loading global data: ${error.stack || error.toString()}`;
    }
  }

  async readCache() {
    try {
      const cache = await cache_1.readCache();
      const noncache = await noncached_1.loadNonCached();
      this.globalDataInternal = Object.assign({}, cache, noncache);
      mcLangLog("Cache Successfully read");
      return true;
    } catch (error) {
      mcLangLog(`Reading cache failed with error ${JSON.stringify(error)}`);
      return false;
    }
  }
  /**
   * @returns Whether this is the first request for this folder
   */


  async readPackFolderData(folder) {
    const helper = new misc_functions_1.ReturnHelper();

    if (!this.packDataPromises.hasOwnProperty(folder)) {
      this.packDataPromises[folder] = datapack_resources_1.getPacksInfo(folder, this.globalData);
      const result = await this.packDataPromises[folder];
      this.packDataComplete[folder] = result.data;
      helper.merge(result);
      return helper.succeed();
    } else {
      await this.packDataPromises[folder];
      return helper.fail();
    }
  }

}

exports.DataManager = DataManager;
},{"../consts":"xb+0","../misc-functions":"KBGm","../misc-functions/file-errors":"cNAA","../misc-functions/promisified-fs":"tSk9","./cache":"tgUj","./datapack-resources":"SO8f","./extractor":"Th+u","./noncached":"vz+j"}],"6zjI":[function(require,module,exports) {
"use strict";
/**
 * merge_deep function adapted from:
 *
 * https://stackoverflow.com/a/34749873/8728461
 *
 * Originally, non-typescript code by: https://github.com/salakar
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Simple object check.
 * @param item the item
 */

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

exports.isObject = isObject;
/**
 * Deep merge two objects.
 */

function mergeDeep(target, ...sources) {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, {
            [key]: {}
          });
        }

        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

exports.mergeDeep = mergeDeep;
},{}],"X+eG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const main_1 = require("vscode-languageserver/lib/main");

const errors_1 = require("./brigadier/errors");

const string_reader_1 = require("./brigadier/string-reader");

const consts_1 = require("./consts");

const misc_functions_1 = require("./misc-functions");

const get_parser_1 = require("./parsers/get-parser");

const parseExceptions = {
  Ambiguity: new errors_1.CommandErrorBuilder("parsing.command.ambiguous", "Command text is possibly ambiguous", main_1.DiagnosticSeverity.Information),
  NoSuccesses: new errors_1.CommandErrorBuilder("command.parsing.matchless", "No nodes which matched '%s' found"),
  NotRunnable: new errors_1.CommandErrorBuilder("parsing.command.executable", "The command '%s' cannot be run.", main_1.DiagnosticSeverity.Warning)
};

function parseCommand(text, globalData, localData) {
  const reader = new string_reader_1.StringReader(text);
  reader.skipWhitespace();

  if (!reader.canRead() || reader.peek() === consts_1.COMMENT_START) {
    return undefined;
  }

  const data = {
    globalData,
    localData
  };
  const startingcontext = {};
  const recurse = parsechildren(reader, globalData.commands, [], data, startingcontext);
  const nodes = [];

  if (misc_functions_1.isSuccessful(recurse)) {
    nodes.push(...recurse.data);
  }

  return {
    actions: recurse.actions,
    nodes,
    errors: recurse.errors
  };
}

exports.parseCommand = parseCommand;

function parsechildren(reader, node, path, data, context) {
  const parent = misc_functions_1.getNextNode(node, path, data.globalData.commands);
  const helper = new misc_functions_1.ReturnHelper();
  const children = parent.node.children;

  if (children) {
    const nodes = [];
    const start = reader.cursor;
    let successCount = 0;
    let min = reader.getTotalLength();
    const originalErrorCount = helper.getShared().errors.length;

    for (const childKey of Object.keys(children)) {
      const child = children[childKey];
      const childpath = [...parent.path, childKey];
      const result = parseAgainstNode(reader, child, childpath, data, context);

      if (helper.merge(result)) {
        const childdata = result.data;
        const newContext = childdata.newContext ? childdata.newContext : context;
        const newNode = {
          context,
          final: newContext,
          high: reader.cursor,
          low: start,
          path: childpath
        };

        function checkRead() {
          if (reader.canRead()) {
            return true;
          } else {
            if (!childdata.node.executable) {
              helper.addErrors(parseExceptions.NotRunnable.create(0, reader.cursor, reader.string));
            }

            return false;
          }
        }

        if (checkRead()) {
          if (reader.peek() === consts_1.SPACE) {
            successCount++;
            reader.skip();

            if (checkRead()) {
              const recurse = parsechildren(reader, childdata.node, childpath, data, newContext);

              if (helper.merge(recurse)) {
                min = Math.min(min, reader.cursor);
                nodes.push(...recurse.data);
                newNode.final = undefined;
              }
            }

            nodes.push(newNode);
          }
        } else {
          successCount++;
          nodes.push(newNode);
        }
      }

      reader.cursor = start;
    }

    if (successCount === 0) {
      if (helper.getShared().errors.length === originalErrorCount) {
        helper.addErrors(parseExceptions.NoSuccesses.create(reader.cursor, reader.getTotalLength(), reader.getRemaining()));
      }

      return helper.fail();
    }

    if (successCount > 1) {
      helper.addErrors(parseExceptions.Ambiguity.create(start, min));
    }

    return helper.succeed(nodes);
  } else {
    if (!parent.node.executable) {
      mcLangLog(`Malformed tree at path ${JSON.stringify(path)}. No children and not executable`);
    }

    return helper.fail();
  }
}

function parseAgainstNode(reader, node, path, data, context) {
  const parser = get_parser_1.getParser(node);
  const helper = new misc_functions_1.ReturnHelper(false);

  if (!!parser) {
    try {
      const result = parser.parse(reader, misc_functions_1.createParserInfo(node, data, path, context, false));

      if (!!result) {
        if (helper.merge(result)) {
          const newContext = Object.assign({}, context, result.data);
          return helper.succeed({
            max: reader.cursor,
            newContext,
            node
          });
        } else {
          return helper.fail();
        }
      } else {
        return helper.succeed({
          max: reader.cursor,
          node
        });
      }
    } catch (error) {
      mcLangLog(`Error thrown whilst parsing: ${error} - ${error.stack}`);
    }
  }

  return helper.fail();
}

function parseLines(document, data, emitter, documentUri, lines) {
  for (const lineNo of lines) {
    const line = document.lines[lineNo];
    const packsInfo = data.getPackFolderData(document.pack_segments);
    let localData;

    if (packsInfo && document.pack_segments) {
      localData = Object.assign({}, packsInfo, {
        current: packsInfo.packnamesmap[document.pack_segments.pack]
      });
    }

    const result = parseCommand(line.text, data.globalData, localData);
    line.parseInfo = result ? result : false;
    line.actions = undefined;
    line.nodes = undefined;
    emitter.emit(`${documentUri}:${lineNo}`);
  }
}

exports.parseLines = parseLines;

function parseDocument(document, data, emitter, documentUri) {
  const lines = document.lines.map((_, i) => i);
  parseLines(document, data, emitter, documentUri, lines);
}

exports.parseDocument = parseDocument;
},{"./brigadier/errors":"aP4V","./brigadier/string-reader":"iLhI","./consts":"xb+0","./misc-functions":"KBGm","./parsers/get-parser":"0nBp"}],"7QCb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = require("tslib");

const events_1 = require("events");

const util_1 = require("util");

const main_1 = require("vscode-languageserver/lib/main");

const vscode_uri_1 = tslib_1.__importDefault(require("vscode-uri"));

const actions_1 = require("./actions");

const completions_1 = require("./completions");

const cache_1 = require("./data/cache");

const manager_1 = require("./data/manager");

const misc_functions_1 = require("./misc-functions");

const merge_deep_1 = require("./misc-functions/third_party/merge-deep");

const parse_1 = require("./parse");

const blanks_1 = require("./test/blanks");

const connection = main_1.createConnection(new main_1.IPCMessageReader(process), new main_1.IPCMessageWriter(process));
connection.listen(); //#region Data Storage

let manager;
const documents = new Map();
const fileErrors = new Map(); // Avoids race condition between parsing after change and getting completions

const parseCompletionEvents = new events_1.EventEmitter();
let security;
let started = false;
let starting = false; //#endregion
// For Server Startup logic, see: https://github.com/Microsoft/language-server-protocol/issues/246

connection.onInitialize(() => {
  misc_functions_1.setup_logging(connection);
  manager = new manager_1.DataManager();
  return {
    capabilities: {
      completionProvider: {
        resolveProvider: false,
        triggerCharacters: [" "]
      },
      definitionProvider: true,
      hoverProvider: true,
      signatureHelpProvider: {
        triggerCharacters: [" "]
      },
      textDocumentSync: {
        change: main_1.TextDocumentSyncKind.Incremental,
        openClose: true
      },
      workspaceSymbolProvider: true
    }
  };
}); // Handles the starting of the server

connection.onDidChangeConfiguration(async params => {
  let startinglocal = false;

  if (!starting) {
    starting = true;
    startinglocal = true;
    global.mcLangSettings = {};
    security = cache_1.readSecurity();
  }

  await ensureSecure(params.settings);

  const reparseall = () => {
    for (const [uri, doc] of documents.entries()) {
      loadData(uri);
      parse_1.parseDocument(doc, manager, parseCompletionEvents, uri);
      sendDiagnostics(uri);
    }
  };

  if (startinglocal) {
    const cacheread = await manager.readCache();

    if (cacheread) {
      started = true;
      reparseall();
    }

    const getDataResult = await manager.loadGlobalData();

    if (typeof getDataResult === "boolean") {
      started = true;
      reparseall();
    } else if (!cacheread) {
      connection.sendNotification("mcfunction/shutdown", getDataResult);
      return;
    }
  }
});

async function ensureSecure(settings) {
  const secure = await security;
  const newsettings = merge_deep_1.mergeDeep({}, global.mcLangSettings, settings.mcfunction);

  try {
    const issues = misc_functions_1.securityIssues(newsettings, secure);

    if (issues.length > 0) {
      // Failed security checkup challenge
      const safeToContinue = await misc_functions_1.actOnSecurity(issues, connection, secure);

      if (!safeToContinue) {
        connection.sendNotification("mcfunction/shutdown", `Shutting down because of insecure settings: '${issues.join("', '")}'`);
        return;
      }
    }
  } catch (error) {
    connection.sendNotification("mcfunction/shutdown", `Shutting down because of insecure settings: '${error}'`);
    return;
  }

  global.mcLangSettings = newsettings;
}

function loadData(uri) {
  const doc = documents.get(uri);

  if (doc && doc.pack_segments) {
    const segments = doc.pack_segments;
    manager.readPackFolderData(segments.packsFolder).then(first => {
      if (misc_functions_1.isSuccessful(first)) {
        connection.client.register(main_1.DidChangeWatchedFilesNotification.type, {
          watchers: [{
            globPattern: `${segments.packsFolder}/**/*`
          }]
        });
      }

      parse_1.parseDocument(doc, manager, parseCompletionEvents, uri);
      sendDiagnostics(uri);
      handleMiscInfo(first.misc);
    }).catch(e => {
      mcLangLog(`Getting pack folder data failed for reason: '${e}'`);
    });
  }
}

connection.onDidOpenTextDocument(params => {
  const uri = params.textDocument.uri;
  const uriClass = vscode_uri_1.default.parse(uri);

  const parsethis = () => {
    // Sanity check
    if (started && documents.has(uri)) {
      parse_1.parseDocument(documents.get(uri), manager, parseCompletionEvents, uri);
      sendDiagnostics(uri);
    }
  };

  if (uriClass.scheme === "file") {
    const fsPath = uriClass.fsPath;
    const dataPackSegments = misc_functions_1.parseDataPath(fsPath);
    documents.set(uri, {
      lines: misc_functions_1.splitLines(params.textDocument.text),
      pack_segments: dataPackSegments
    });

    if (started) {
      loadData(uri);
    }

    parsethis();
  } else {
    documents.set(uri, {
      lines: misc_functions_1.splitLines(params.textDocument.text),
      pack_segments: undefined
    });
  }

  parsethis();
});
connection.onDidChangeTextDocument(params => {
  const uri = params.textDocument.uri;
  const document = documents.get(uri);
  const changedlines = misc_functions_1.runChanges(params, document);

  if (started) {
    parse_1.parseLines(document, manager, parseCompletionEvents, uri, changedlines);
    sendDiagnostics(uri);
  }
});

function sendDiagnostics(uri) {
  const doc = documents.get(uri);
  const diagnostics = [];

  for (let line = 0; line < doc.lines.length; line++) {
    const lineContent = doc.lines[line];

    if (!!lineContent.parseInfo && !!lineContent.parseInfo.errors) {
      diagnostics.push(...lineContent.parseInfo.errors.map(error => misc_functions_1.commandErrorToDiagnostic(error, line)));
    }
  }

  connection.sendDiagnostics({
    uri,
    diagnostics
  });
}

connection.onDidCloseTextDocument(params => {
  // Clear diagnostics - might not be needed
  connection.sendDiagnostics({
    diagnostics: [],
    uri: params.textDocument.uri
  });
  documents.delete(params.textDocument.uri);
});
connection.onDidChangeWatchedFiles(async e => {
  const result = await manager.handleChanges(e);
  handleMiscInfo(result.misc);
});

function handleMiscInfo(miscInfos) {
  const changedFileErrors = new Set();

  for (const misc of miscInfos) {
    if (misc.kind === "FileError") {
      changedFileErrors.add(misc.filePath);
      const value = fileErrors.get(misc.filePath);

      if (value) {
        fileErrors.set(misc.filePath, Object.assign({}, value, {
          [misc.group]: misc.message
        }));
      } else {
        fileErrors.set(misc.filePath, {
          group: misc.message
        });
      }
    }

    if (misc.kind === "ClearError") {
      changedFileErrors.add(misc.filePath);
      const group = misc.group;

      if (group) {
        const value = fileErrors.get(misc.filePath);

        if (value) {
          const _a = group,
                _ = value[_a],
                rest = tslib_1.__rest(value, [typeof _a === "symbol" ? _a : _a + ""]);

          fileErrors.set(misc.filePath, Object.assign({}, rest));
        }
      } else {
        fileErrors.delete(misc.filePath);
      }
    }
  }

  for (const uri of changedFileErrors) {
    const value = fileErrors.get(uri);

    if (value) {
      const diagnostics = [];

      for (const group of Object.keys(value)) {
        diagnostics.push({
          message: value[group],
          range: blanks_1.blankRange
        });
      }

      connection.sendDiagnostics({
        uri,
        diagnostics
      });
    }
  }
}

connection.onCompletion(params => {
  const doc = documents.get(params.textDocument.uri);
  const line = doc.lines[params.position.line];

  const computeCompletionsLocal = () => completions_1.computeCompletions(params.position.line, params.position.character, doc, manager);

  if (!started) {
    return [];
  }

  if (line.hasOwnProperty("parseInfo")) {
    return computeCompletionsLocal();
  } else {
    return util_1.promisify(cb => parseCompletionEvents.once(`${params.textDocument.uri}:${params.position.line}`, cb))().then(computeCompletionsLocal);
  }
}); // #connection.onCodeAction(); // Research what this means

connection.onDefinition(prepare(actions_1.definitionProvider, [])); // #connection.onDocumentHighlight();
// #connection.onDocumentSymbol(); // This is for sections - there are none in mcfunctions

connection.onWorkspaceSymbol(query => actions_1.getWorkspaceSymbols(manager, query.query));
connection.onHover(prepare(actions_1.hoverProvider, undefined));
connection.onSignatureHelp(prepare(actions_1.signatureHelpProvider));

function prepare(func, fallback) {
  return params => {
    if (started) {
      const doc = documents.get(params.textDocument.uri);

      if (doc) {
        const docLine = doc.lines[params.position.line];
        return func(docLine, params.position, doc, manager);
      }
    }

    return fallback;
  };
}
},{"./actions":"0A+1","./completions":"aDYY","./data/cache":"tgUj","./data/manager":"oucB","./misc-functions":"KBGm","./misc-functions/third_party/merge-deep":"6zjI","./parse":"X+eG","./test/blanks":"7iV1"}]},{},["7QCb"], null)
//# sourceMappingURL=/index.map