export interface GetDataModel {
    content: string;
}

export function getMapData(rawData: any): GetDataModel {
    return {
        content: rawData.content
    }
}

export interface PostTextPayload {
    question_type: number;
    question: string;
}

export function postMapTextPayload(data: {question_type: number, question: string}): PostTextPayload {
    return {
        question_type: data.question_type,
        question: data.question
    }
}

export interface PostTextResponse {
    content: {
        content: string;
    };
}


export function postMapTextResponse(rawData: any): PostTextResponse {
    return {
        content: {
            content: rawData.content.content,  // Access the nested content field
        }
    };
}
