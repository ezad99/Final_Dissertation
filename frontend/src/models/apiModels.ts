export interface DataModel {
    content: string;
}

export function mapData(rawData: any): DataModel {
    return {
        content: rawData.content
    }
}