
export interface IApplicationModel {
    name: string,
    handle: string,
    uaid: string,
    version_name: string,
    version_code: string,
    permissions: string[],
    libraries: string[]
}

export class ApplicationModel implements IApplicationModel {

    constructor(
        public name: string,
        public handle: string,
        public uaid: string,
        public version_name: string,
        public version_code: string,
        public permissions: string[],
        public libraries: string[]
    ) { }
    
    static create(dataItem: any): IApplicationModel {
        return new ApplicationModel(
            dataItem.name,
            dataItem.handle,
            dataItem.uaid,
            dataItem.version_name,
            dataItem.version_code,
            dataItem.permissions,
            dataItem.libraries
        );
    }
}