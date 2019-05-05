import { TrackerModel } from './tracker.model';
import { ApplicationModel } from './application.model';
import { ApkModel } from './apk.model';

export interface IApkAnalysisModel {
    trackers: TrackerModel[];
    application: ApplicationModel;
    apk: ApkModel;
}

export class ApkAnalysisModel implements IApkAnalysisModel {

    constructor(
        public trackers: TrackerModel[],
        public application: ApplicationModel,
        public apk: ApkModel,
    ) { }

    static create(dataItem: any): IApkAnalysisModel {
        return new ApkAnalysisModel(
            dataItem.trackers.map((t: any) => TrackerModel.create(t)),
            ApplicationModel.create(dataItem.application),
            ApkModel.create(dataItem.apk)
        );
    }
}