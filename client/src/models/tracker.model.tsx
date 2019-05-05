
export interface ITrackerModel {
    name: string;
    id: number;
}

export class TrackerModel implements ITrackerModel {

    constructor(
        public name: string,
        public id: number,
    ) { }
    
    static create(dataItem: any): ITrackerModel {
        return new TrackerModel(
            dataItem.name,
            dataItem.id
        );
    }
}