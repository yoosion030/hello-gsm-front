export interface ProfileType {
  user: UserType;
  application: ApplicantType;
  applicationDetails: ApplicationDetailsType;
}

interface UserType {
  name: string;
  birth: string;
  gender: '남자' | '여자';
  cellphoneNumber: string;
}

interface ApplicantType {
  registrationNumber: number;
  isDocumentReception: boolean;
  isFinalSubmission: boolean;
  isFirstResult: boolean;
  isFinalResult: boolean;
  idPhotoUrl: string;
  guardianName: string;
  guardianCellphoneNumber: string;
  teacherName: string;
  teacherCellphoneNumber: string;
  schoolLocation: string;
  schoolName: string;
  screening: '일반전형' | '사회특별전형' | '특별전형';
  socialScreening: '기회균등전형' | '사회다양성전형';
}

interface ApplicationDetailsType {
  address: string;
  telephoneNumber?: string;
  guardianRelation: string;
  educationStatus: string;
  schoolTelephoneNumber: string;
  score1_1: number;
  score1_2: number;
  score2_1: number;
  score2_2: number;
  score3_1: number;
  generalCurriculumScoreSubtotal: number;
  artSportsScore: number;
  curriculumScoreSubtotal: number;
  attendanceScore: number;
  volunteerScore: number;
  nonCurriculumScoreSubtotal: number;
  scoreTotal: number;
  firstWantedMajor: '소프트웨어 개발과' | '스마트 IOT과' | '인공지능과';
  secondWantedMajor: '소프트웨어 개발과' | '스마트 IOT과' | '인공지능과';
  thirdWantedMajor: '소프트웨어 개발과' | '스마트 IOT과' | '인공지능과';
}
