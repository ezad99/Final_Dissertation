// The interfaces & models for our API Responses & Payloads

export interface GetDataModel {
    content: string;
}

// Maps rawData to GetDataModel
export function getMapData(rawData: any): GetDataModel {
    return {
        content: rawData.content
    }
}

export interface PostTextPayloadModel {
    question_type: number;
    question: string;
}

// Maps data to PostTextPayloadModel
export function postMapTextPayload(data: {question_type: number, question: string}): PostTextPayloadModel {
    return {
        question_type: data.question_type,
        question: data.question
    }
}

export interface PostTextResponseModel {
    content: {
        content: string;
    };
}

// Maps rawData to PostTextResponseModel
export function postMapTextResponse(rawData: any): PostTextResponseModel {
    return {
        content: {
            content: rawData.content.content,  // Access the nested content field
        }
    };
}
