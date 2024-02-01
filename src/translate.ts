//Interface
interface Options {
    from: string;
}
type TextObject = Record<string, string>;

// Response For Batch Translate
export interface BatchResponse {
    data: {
        source: {
            lan: string;
            text: string;
        },
        target: {
            lan: string;
            text: string;
        }[];
    }
}

//Response For Single Translate
export interface SingleResponse {
    data: {
        source: {
            lan: string;
            text: string;
        },
        target: {
            lan: string;
            text: string;
        };
    }
}


//Response For multi
type TranslatedText<T extends TextObject, U extends string[]> = {
    languageCode: U[number];
} & {
        [K in keyof T]: string;
    };

export type MultiResponse<T extends TextObject, U extends string[]> = {
    data: {
        source: {
            lan: string;
        };
        target: TranslatedText<T, U>[];
    };
};



interface Translate {
    batch: (text: string, targets: string[], options?: Options) => Promise<BatchResponse>;
    single: (text: string, targets: string, options?: Options) => Promise<SingleResponse>;
    multi: <T extends TextObject>(text: T, targets: string[], options?: Options) => Promise<MultiResponse<T, typeof targets>>
}

//Constructing translate
const translate: Translate = {} as Translate;

//Translating Batch
translate.batch = async (text: string, targets: string[], options?: Options): Promise<BatchResponse> => {
    const translationPromises = targets.map(async (target) => {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${options?.from ?? "auto"}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await response.json();
        return {
            lan: target,
            text: data[0][0][0]
        };
    });

    const translations = await Promise.all(translationPromises);
    return {
        data: {
            source: {
                lan: options?.from ?? "auto",
                text: text
            },
            target: translations
        }
    };
}

//Translating Single
translate.single = async (text: string, target: string, options?: Options): Promise<SingleResponse> => {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${options?.from ?? "auto"}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await response.json();
    return {
        data: {
            source: {
                lan: options?.from ?? "auto",
                text: text
            },
            target: {
                lan: target,
                text: data[0][0][0]
            }
        }
    };
}

//Translating Multiple
translate.multi = async <T extends TextObject>(text: T, targets: string[], options?: Options): Promise<MultiResponse<T, typeof targets>> => {
    const translationPromises = targets.map(async (target) => {
        const translatedFieldsPromises = Object.entries(text).map(async ([fieldName, fieldValue]) => {
            const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${"auto"}&tl=${options?.from ?? "auto"}&dt=t&q=${encodeURIComponent(fieldValue)}`);
            const data = await response.json();
            return {
                [fieldName]: data[0][0][0]
            };
        });

        const translatedFields = await Promise.all(translatedFieldsPromises);
        const translatedObject = Object.assign({}, ...translatedFields);

        return {
            languageCode: target,
            ...translatedObject
        } as TranslatedText<T, typeof targets>;
    });

    const translations = await Promise.all(translationPromises);

    return {
        data: {
            source: {
                lan: options?.from ?? "auto"
            },
            target: translations
        }
    };
}

export default translate;