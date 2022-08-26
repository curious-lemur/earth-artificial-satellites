var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { readFile, writeFile } from 'fs/promises';
var FileDataModifier = /** @class */ (function () {
    function FileDataModifier(collectionName) {
        this.collectionName = collectionName;
    }
    FileDataModifier.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, readFile("./data/".concat(this.collectionName, ".json"), 'utf8')
                        .catch(function (err) { console.error(err); })
                        .then(function (data) {
                        if (data) {
                            console.log("Read ".concat(_this.collectionName, " data successfully"));
                            return data;
                        }
                        else {
                            throw new Error('No data found in ' + _this.collectionName + '.json file');
                        }
                    })];
            });
        });
    };
    FileDataModifier.prototype.parse = function (data) {
        try {
            return JSON.parse(data);
        }
        catch (err) {
            console.error(new Error('Error while parsing file data'));
            console.error(err);
        }
    };
    FileDataModifier.prototype.applyChanges = function (modification, parsedData) {
        return modifications[modification](parsedData);
    };
    FileDataModifier.prototype.write = function (changedData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                writeFile("./data/".concat(this.collectionName, "-new.json"), JSON.stringify(changedData))
                    .then(function () { console.log("Wrote data to ".concat(_this.collectionName, "-new.json file successfully")); })
                    .catch(function (err) {
                    console.error(new Error("Error while writing data to ".concat(_this.collectionName, ".-new.json file")));
                    console.error(err);
                });
                return [2 /*return*/];
            });
        });
    };
    FileDataModifier.prototype.modify = function (modification) {
        var _this = this;
        this.read()
            .then(function (data) { return _this.parse(data); })
            .then(function (parsedData) { return _this.applyChanges(modification, parsedData); })
            .then(function (changedData) { return _this.write(changedData); });
    };
    return FileDataModifier;
}());
var modifications = {
    'removeAllIdsInCollection': function (parsedData) {
        try {
            if (!parsedData) {
                throw new Error('parsedData is undefined, so modification is not possible');
            }
            return parsedData.docs.map(function (doc) { delete doc._id; return doc; });
        }
        catch (err) {
            console.error(err);
        }
    },
    'wrapSatellitesDocumentsIntoDocs': function (parsedData) {
        try {
            return { docs: parsedData };
        }
        catch (err) {
            console.error(err);
        }
    }
};
var fileDataModifier = new FileDataModifier('satellites');
fileDataModifier.modify('wrapSatellitesDocumentsIntoDocs');
