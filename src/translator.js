"use strict";
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
exports.__esModule = true;
var axios_1 = require("axios");
/**
 * Translate text to target language from source language.
 *
 * @param {String} source - Original language code(text)
 * @param {String} target - Target language code(result)
 * @param {String} text - A text to be translated
 *
 * @returns {String} Translated result
 *
 * @param {String} source - Original language code(text)
 * @param {String} target - Target language code(result)
 * @param {Array} content - The array includes texts to be translated.
 *
 * @returns {Array} Translated result array
 *
 * @example
 * (async () => console.log(await new Translator().translate('en', 'ko', 'Hi.')))();
 * (async () => console.log(await new Translator().multiTranslate('en', 'ko', ['apple', 'banana', 'orange', 'computer', 'laptop', 'cellphone', 'school', 'promise'])))();
 */
var Translator = /** @class */ (function () {
    function Translator() {
    }
    Translator.prototype.request = function (url, data, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(url, data, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Translator.prototype.translate = function (source, target, text) {
        return __awaiter(this, void 0, void 0, function () {
            var data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = "data=" + encodeURIComponent(JSON.stringify({
                            "source": source,
                            "target": target,
                            "text": text
                        }));
                        result = '';
                        return [4 /*yield*/, this.request("https://papago.naver.com/apis/n2mt/translate", data, {
                                headers: {
                                    'device-type': 'pc',
                                    'origin': 'https://papago.naver.com',
                                    'accept-encoding': 'gzip, deflate, br',
                                    'accept-language': 'ko',
                                    'authority': 'papago.naver.com',
                                    'pragma': 'no-cache',
                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko)\
                        Chrome/75.0.3770.100 Safari/537.36',
                                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                    'accept': 'application/json',
                                    'cache-control': 'no-cache',
                                    'x-apigw-partnerid': 'papago',
                                    'referer': 'https://papago.naver.com/',
                                    'dnt': '1',
                                    'Connection': 'keep-alive'
                                }
                            }).then(function (response) {
                                result += response.data.translatedText;
                            })["catch"](function (error) { return console.log(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Translator.prototype.multiTranslate = function (source, target, content) {
        return __awaiter(this, void 0, void 0, function () {
            var result, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        promises = content.map(function (element, index) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.translate(source, target, element)
                                            .then(function (res) { return result[index] = res; })["catch"](function (error) { return console.log(error); })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises).then(function (res) { return res; })["catch"](function (error) { return console.log(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return Translator;
}());
exports["default"] = Translator;