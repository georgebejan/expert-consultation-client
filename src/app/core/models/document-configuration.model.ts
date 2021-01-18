export interface IDocumentConfiguration {
  consultationStartDate: Date;
  consultationDeadline: Date;
  excludedFromConsultation: boolean;
}

export class DocumentConfiguration {
  consultationStartDate: Date;
  consultationDeadline: Date;
  excludedFromConsultation: boolean;
  inConsultation: boolean;

  constructor(data: IDocumentConfiguration) {
    if (data) {
      this.fromJson(data);
      this.inConsultation = this.isDocumentInConsultation();
    }
  }

  fromJson(data: IDocumentConfiguration) {
    if (data.consultationStartDate) {
      this.consultationStartDate = new Date(data.consultationStartDate);
    }
    if (data.consultationDeadline) {
      this.consultationDeadline = new Date(data.consultationDeadline);
    }
    this.excludedFromConsultation = data.excludedFromConsultation;
  }

  toJson(): IDocumentConfiguration {
    return {
      consultationStartDate: this.consultationStartDate,
      consultationDeadline: this.consultationDeadline,
      excludedFromConsultation: this.excludedFromConsultation
    };
  }

  private isDocumentInConsultation(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayAtStartOfDay = today.getTime();

    const consultationStartDate = this.consultationStartDate ? this.consultationStartDate.getTime() : null;
    const consultationEndDate = this.consultationDeadline ? this.consultationDeadline.getTime() : null;
    return consultationStartDate <= todayAtStartOfDay && todayAtStartOfDay <= consultationEndDate;
  }
}
