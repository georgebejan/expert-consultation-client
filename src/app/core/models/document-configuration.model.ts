export interface IDocumentConfiguration {
  consultationStartDate: Date;
  consultationDeadline: Date;
  excludedFromConsultation: boolean;
}

export class DocumentConfiguration {
  consultationStartDate: Date;
  consultationDeadline: Date;
  excludedFromConsultation: boolean;

  constructor(data: IDocumentConfiguration) {
    if (data) {
      this.fromJson(data);
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
}
