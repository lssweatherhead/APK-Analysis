
export interface IApkModel {
    checksum: string;
    path: string;
}

export class ApkModel implements IApkModel {

    constructor(
        public checksum: string,
        public path: string
    ) { }
    
    static create(dataItem: any): IApkModel {
        return new ApkModel(
            dataItem.checksum,
            dataItem.path
        );
    }
}