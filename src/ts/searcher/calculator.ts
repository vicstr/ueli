import { Config } from "../config";
import { SearchResultItem } from "../search-result-item";
import { Searcher } from "./searcher";
// const math = require("mathjs").create();
import * as math from "mathjs"

export class Calculator implements Searcher {
    private icon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                        <path xmlns="http://www.w3.org/2000/svg" d="M26.133,0c1.177,0 2.134,0.957 2.134,2.133l0,27.734c0,1.176 -0.957,2.133 -2.134,2.133l-20.266,0c-1.177,0 -2.134,-0.957 -2.134,-2.133l0,-27.734c0,-1.176 0.957,-2.133 2.134,-2.133l20.266,0Zm1.067,29.867l0,-27.734c0,-0.588 -0.478,-1.066 -1.067,-1.066l-20.266,0c-0.589,0 -1.067,0.478 -1.067,1.066l0,27.734c0,0.588 0.478,1.066 1.067,1.066l20.266,0c0.589,0 1.067,-0.478 1.067,-1.066l0,0Zm-17.6,-4.267c0.294,0 0.533,0.238 0.533,0.533l0,2.667c0,0.295 -0.239,0.533 -0.533,0.533l-3.2,0c-0.294,0 -0.533,-0.238 -0.533,-0.533l0,-2.667c0,-0.295 0.239,-0.533 0.533,-0.533l3.2,0Zm5.333,0c0.295,0 0.534,0.238 0.534,0.533l0,2.667c0,0.295 -0.239,0.533 -0.534,0.533l-3.2,0c-0.294,0 -0.533,-0.238 -0.533,-0.533l0,-2.667c0,-0.295 0.239,-0.533 0.533,-0.533l3.2,0Zm5.334,0c0.295,0 0.533,0.238 0.533,0.533l0,2.667c0,0.295 -0.238,0.533 -0.533,0.533l-3.2,0c-0.295,0 -0.534,-0.238 -0.534,-0.533l0,-2.667c0,-0.295 0.239,-0.533 0.534,-0.533l3.2,0Zm5.333,0c0.295,0 0.533,0.238 0.533,0.533l0,2.667c0,0.295 -0.238,0.533 -0.533,0.533l-3.2,0c-0.295,0 -0.533,-0.238 -0.533,-0.533l0,-2.667c0,-0.295 0.238,-0.533 0.533,-0.533l3.2,0Zm-16.533,2.667l0,-1.6l-2.134,0l0,1.6l2.134,0Zm5.333,0l0,-1.6l-2.133,0l0,1.6l2.133,0Zm5.333,0l0,-1.6l-2.133,0l0,1.6l2.133,0Zm5.334,0l0,-1.6l-2.134,0l0,1.6l2.134,0Zm-15.467,-7.467c0.294,0 0.533,0.238 0.533,0.533l0,2.667c0,0.295 -0.239,0.533 -0.533,0.533l-3.2,0c-0.294,0 -0.533,-0.238 -0.533,-0.533l0,-2.667c0,-0.295 0.239,-0.533 0.533,-0.533l3.2,0Zm5.333,0c0.295,0 0.534,0.238 0.534,0.533l0,2.667c0,0.295 -0.239,0.533 -0.534,0.533l-3.2,0c-0.294,0 -0.533,-0.238 -0.533,-0.533l0,-2.667c0,-0.295 0.239,-0.533 0.533,-0.533l3.2,0Zm5.334,0c0.295,0 0.533,0.238 0.533,0.533l0,2.667c0,0.295 -0.238,0.533 -0.533,0.533l-3.2,0c-0.295,0 -0.534,-0.238 -0.534,-0.533l0,-2.667c0,-0.295 0.239,-0.533 0.534,-0.533l3.2,0Zm5.333,0c0.295,0 0.533,0.238 0.533,0.533l0,2.667c0,0.295 -0.238,0.533 -0.533,0.533l-3.2,0c-0.295,0 -0.533,-0.238 -0.533,-0.533l0,-2.667c0,-0.295 0.238,-0.533 0.533,-0.533l3.2,0Zm-16.533,2.667l0,-1.6l-2.134,0l0,1.6l2.134,0Zm5.333,0l0,-1.6l-2.133,0l0,1.6l2.133,0Zm5.333,0l0,-1.6l-2.133,0l0,1.6l2.133,0Zm5.334,0l0,-1.6l-2.134,0l0,1.6l2.134,0Zm-15.467,-7.467c0.294,0 0.533,0.238 0.533,0.533l0,2.667c0,0.295 -0.239,0.533 -0.533,0.533l-3.2,0c-0.294,0 -0.533,-0.238 -0.533,-0.533l0,-2.667c0,-0.295 0.239,-0.533 0.533,-0.533l3.2,0Zm16,0c0.295,0 0.533,0.238 0.533,0.533l0,2.667c0,0.295 -0.238,0.533 -0.533,0.533l-3.2,0c-0.295,0 -0.533,-0.238 -0.533,-0.533l0,-2.667c0,-0.295 0.238,-0.533 0.533,-0.533l3.2,0Zm-10.667,0c0.295,0 0.534,0.238 0.534,0.533l0,2.667c0,0.295 -0.239,0.533 -0.534,0.533l-3.2,0c-0.294,0 -0.533,-0.238 -0.533,-0.533l0,-2.667c0,-0.295 0.239,-0.533 0.533,-0.533l3.2,0Zm5.334,0c0.295,0 0.533,0.238 0.533,0.533l0,2.667c0,0.295 -0.238,0.533 -0.533,0.533l-3.2,0c-0.295,0 -0.534,-0.238 -0.534,-0.533l0,-2.667c0,-0.295 0.239,-0.533 0.534,-0.533l3.2,0Zm-11.2,2.667l0,-1.6l-2.134,0l0,1.6l2.134,0Zm5.333,0l0,-1.6l-2.133,0l0,1.6l2.133,0Zm5.333,0l0,-1.6l-2.133,0l0,1.6l2.133,0Zm5.334,0l0,-1.6l-2.134,0l0,1.6l2.134,0Zm-16.534,-6.934c0.882,0 1.6,0.718 1.6,1.6c0,0.882 -0.718,1.6 -1.6,1.6l-1.066,0c-0.882,0 -1.6,-0.718 -1.6,-1.6c0,-0.882 0.717,-1.6 1.6,-1.6l1.066,0Zm5.334,0c0.882,0 1.6,0.718 1.6,1.6c0,0.882 -0.718,1.6 -1.6,1.6l-1.067,0c-0.882,0 -1.6,-0.718 -1.6,-1.6c0,-0.882 0.718,-1.6 1.6,-1.6l1.067,0Zm5.333,0c0.882,0 1.6,0.718 1.6,1.6c0,0.882 -0.718,1.6 -1.6,1.6l-1.067,0c-0.882,0 -1.6,-0.718 -1.6,-1.6c0,-0.882 0.718,-1.6 1.6,-1.6l1.067,0Zm5.333,0c0.882,0 1.6,0.718 1.6,1.6c0,0.882 -0.718,1.6 -1.6,1.6l-1.066,0c-0.882,0 -1.6,-0.718 -1.6,-1.6c0,-0.882 0.717,-1.6 1.6,-1.6l1.066,0Zm-16,1.067l-1.066,0c-0.294,0 -0.534,0.24 -0.534,0.533c0,0.294 0.24,0.534 0.534,0.534l1.066,0c0.294,0 0.534,-0.24 0.534,-0.534c0,-0.293 -0.24,-0.533 -0.534,-0.533Zm5.334,1.067c0.294,0 0.533,-0.24 0.533,-0.534c0,-0.294 -0.239,-0.533 -0.533,-0.533l-1.067,0c-0.294,0 -0.533,0.239 -0.533,0.533c0,0.294 0.239,0.534 0.533,0.534l1.067,0Zm5.333,-1.067l-1.067,0c-0.294,0 -0.533,0.24 -0.533,0.533c0,0.294 0.239,0.534 0.533,0.534l1.067,0c0.294,0 0.533,-0.24 0.533,-0.534c0,-0.293 -0.239,-0.533 -0.533,-0.533Zm5.333,1.067c0.295,0 0.534,-0.24 0.534,-0.534c0,-0.294 -0.239,-0.533 -0.534,-0.533l-1.066,0c-0.295,0 -0.534,0.239 -0.534,0.533c0,0.294 0.239,0.534 0.534,0.534l1.066,0Zm1.067,-10.667c0.295,0 0.533,0.239 0.533,0.533l0,6.4c0,0.295 -0.238,0.534 -0.533,0.534l-19.2,0c-0.294,0 -0.533,-0.239 -0.533,-0.534l0,-6.4c0,-0.294 0.239,-0.533 0.533,-0.533l19.2,0Zm-0.533,6.4l0,-5.333l-18.134,0l0,5.333l18.134,0Zm-2.134,-2.133l1.067,0l0,1.066l-1.067,0l0,-1.066Zm-2.133,0l1.067,0l0,1.066l-1.067,0l0,-1.066Zm-2.133,0l1.066,0l0,1.066l-1.066,0l0,-1.066Zm-1.067,0l0,1.066l-1.067,0l0,-1.066l1.067,0Z" style="fill:#fff;"/>
                    </svg>`;

    public getSearchResult(userInput: string): SearchResultItem[] {
        const result = math.eval(userInput);
        return [
            {
                executionArgument: "",
                icon: this.icon,
                name: `= ${result}`,
                tags: [],
            } as SearchResultItem,
        ];
    }
}
