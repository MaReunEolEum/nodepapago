import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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
 * @example
 * (async () => console.log(await new Translator().translate('en', 'ko', 'Hi.')))();
 * (async () => console.log(await new Translator().multiTranslate('en', 'ko', ['apple', 'banana', 'orange', 'computer', 'laptop', 'cellphone', 'school', 'promise'])))();
 */

export default class Translator {

    constructor() { }

    private async request(url: string, data: string, config: AxiosRequestConfig) {
        return await Axios.post(url, data, config);
    }

    public async translate(source: string, target: string, text: string) {
        const data: string = "data=" + encodeURIComponent(JSON.stringify({
            "source": source,
            "target": target,
            "text": text
        }));

        let result: string = '';

        await this.request("https://papago.naver.com/apis/n2mt/translate", data, {
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
        }).then(function (response: AxiosResponse) {
            result += response.data.translatedText;
        }).catch(error => console.log(error));

        return result;
    }

    public async multiTranslate(source: string, target: string, content: string[]) {
        let result: string[] = [];

        const promises = content.map(async (element, index) => await this.translate(source, target, element)
            .then(res => result[index] = res)
            .catch(error => console.log(error)));

        await Promise.all(promises).then(res => res).catch(error => console.log(error));

        return result;
    }
}