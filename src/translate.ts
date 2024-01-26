//Interface
interface Options {
    from: string;
}
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

interface Translate {
    batch: (text: string, targets: string[], options?: Options) => Promise<BatchResponse>;
    single: (text: string, targets: string, options?: Options) => Promise<SingleResponse>;
}

const translate: Translate = {} as Translate;

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

export default translate;