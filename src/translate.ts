//Interface
interface Options {
    from: string;
}
export interface ResponseTypes {
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

const translate = async (text: string, targets: string[], options?: Options): Promise<ResponseTypes> => {
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

export default translate;