export interface debounceInterface {
  value: string;
  delay: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SubDistrictInterface {
  id: number;
  nama: string;
}

export interface VillageInterface {
  id: number;
  nama: string;
}

export interface NewUserInterface {
  name: string;
  nip: string;
  email: string;
  telepon: string;
  password: string;
  kecamatan_id: string;
  desa_id: string;
  rt: string;
  rw: string;
  alamat: string;
  role_id: number;
}

export interface LoginUserInterface {
  nip: string;
  password: string;
}

export interface ForgotPasswordUserInterface {
  newPassword: string;
  confirmNewPassword: string;
  oldPassword: string;
}

export interface PaginationInterface {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

// export interface SearchInterface {
//   search: string;
//   change: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   props: any;
// }

export interface AreasInterface {
  id: number;
  nama: string;
  slug: string;
  desc: string;
  pj: string;
  nip_pj: string;
  createdAt: string;
  jmlLayanan: number;
}

export interface OutputServiceInterface {
  status: number;
  message: string;
  data: ServiceInterface[];
  bidang: AreasInterface;
}

export interface ServiceInterface {
  id: number;
  nama: string;
  slug: string;
  desc: string;
  penanggung_jawab: string;
  syarat: string;
  ketentuan: string;
  langkah: string;
  bidang_id: number;
  createdAt: string;
  Bidang_nama: string;
}

export interface TermConditionInterface {
  id: number;
  desc: string;
}

export interface AdminApplicationHistoryInterface {
  startDate: Date;
  setStartDate: (e: Date | undefined) => void;
  endDate: Date;
  setEndDate: (e: Date | undefined) => void;
  search: string;
  setSearch: (e: string) => void;
}

export interface CarouselSliderInterface {
  id: number;
  image: string;
  image_potrait: string;
  createdAt: string;
  updatedAt: string;
}

export interface StructureOrganizationInterface {
  id: number;
  nama: string;
  slug: string;
  jabatan: string;
  image: string;
  createdAt: string;
}

export interface StructureOrganizationMainInterface {
  select_id: number;
  bkdstruktur_id: number;
  nama: string;
  slug: string;
  jabatan: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsInterface {
  id: number;
  title: string;
  slug: string;
  desc: string;
  image: string;
  createdAt: string;
}

export interface GalleryActivitiesInterface {
  id: number;
  title: string;
  slug: string;
  image: string;
  createdAt: string;
}

export interface FaqsInterface {
  id: number;
  answer: string;
  question: string;
}

export interface InformationBKdInterface {
  id: number;
  about_bkd: string;
  image_bkd: string;
  visi: string;
  misi: string;
  kontak: string;
  long: string;
  lang: string;
  logo: string;
  createdAt: string;
}

export interface UploadBKDInterface {
  id: number;
  title: string;
  file: string;
  createdAt: string;
  updatedAt: string;
}

export interface MissionInterface {
  id: number;
  value: string;
}

export interface UserPositionInterface {
  id: number;
  createdAt: string;
  nama_jabatan: string;
  no_sk_pangkat: string;
  tgl_sk_pangkat: string;
  tmt: string;
}

export interface UserKGBInterface {
  id: number;
  no_sk_pangkat: string;
  tgl_sk_pangkat: string;
  tmt: string;
  uraian_berkala: string;
}

export interface UserGradesInterface {
  id: number;
  jenjang_kepangkatan: string;
  no_sk_pangkat: string;
  tgl_sk_pangkat: string;
  tmt: string;
  nama_pangkat: string;
  pangkat_id: number;
}

export interface UserTrainingInterface {
  id: number;
  lama_pelatihan: string;
  no_surat_pelatihan: string;
  tanggal_pelatihan: string;
  tempat_pelatihan: string;
  uraian_pelatihan: string;
}

export interface UserEducationInterface {
  id: number;
  institut: string;
  no_ijazah: string;
  program_study: string;
  tgl_ijazah: string;
  tingkat_pendidikan: string;
}

export interface UserAwardsInterface {
  id: number;
  instansi_penghargaan: string;
  tanggal_penghargaan: string;
  uraian_penghargaan: string;
}

export interface UserCouplesInterface {
  id: number;
  nama: string;
  pekerjaan: string;
  status: string;
  tanggal_lahir: string;
  tanggal_pernikahan: string;
  tempat_lahir: string;
}

export interface UserChildrenInterface {
  id: number;
  jenis_kelamin: string;
  nama: string;
  pekerjaan: string;
  status: string;
  tanggal_lahir: string;
  tempat_lahir: string;
}

export interface UserProfileInterface {
  id: number;
  agama: string;
  alamat: string;
  createdAt: string;
  desa_id: number;
  desa_nama: string;
  email: string;
  gender: string;
  goldar: string;
  image_profile: string;
  jabatans: UserPositionInterface[];
  kecamatan_id: number;
  kecamatan_nama: string;
  kgb: UserKGBInterface[];
  nik: string;
  nip: string;
  name: string;
  pasangan: UserCouplesInterface[];
  anak: UserChildrenInterface[];
  pangkats: UserGradesInterface[];
  pelatihan: UserTrainingInterface[];
  pendidikans: UserEducationInterface[];
  penghargaan: UserAwardsInterface[];
  unit_kerja: string;
  role_id: number;
  role_name: string;
  rt: string;
  rw: string;
  slug: string;
  telepon: string;
  tempat_lahir: string;
  tgl_lahir: string;
}

export interface PopUpButtonInterface {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name?: string;
  title?: string;
  inputName?: string;
  labelName?: string;
  htmlFor?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  nameInput?: string;
  isLoadingAdd: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface GradeListsInterface {
  id: number;
  nama: string;
  createdAt: string;
}

export interface DataJsonServiceForm {
  id: number;
  key: string;
}

export interface FormServiceInterface {
  id: number;
  field: string;
  tipedata: string;
  datajson: DataJsonServiceForm[] | null;
  maxinput: number;
  mininput: number;
  layanan_id: number;
  isrequired: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationFormServiceInterface {
  nama: string;
  slug: string;
  desc: string;
  Layanan_forms: FormServiceInterface[];
}

export interface ApplicationFormInputInterface {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  placeholder: string;
  id: string;
  label: string;
  isRequired?: boolean;
}

export interface ApplicationFormServiceDocInterface {
  nama: string;
  slug: string;
  desc: string;
  Layanan_forms: FormServiceInterface[];
}

export interface DataInputItemInterface {
  layananform_id: string;
  data: string | string[number];
}

export interface UserComplaintInterface {
  id: number;
  bidang_id: number;
  layanan_id: number;
  userinfo_id: number;
  status: number;
  isi_pengaduan: string;
  judul_pengaduan: string;
  jawaban: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  Layanan: {
    id: number;
    nama: string;
  };
  Bidang: {
    id: number;
    nama: string;
  };
  User_info: {
    id: number;
    name: string;
    nip: string;
  };
}

export interface FeedBackUserInterface {
  id: number;
  userinfo_id: number;
  layanan_id: number;
  bidang_id: number;
  question_1: number;
  question_2: number;
  question_3: number;
  question_4: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

export interface SatisfactionHistoryInterface {
  id: number;
  userinfo_id: number;
  layanan_id: number;
  layanan_name: string;
  bidang_name: string;
  question_1: number;
  question_2: number;
  question_3: number;
  question_4: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

export interface SatisfactionHistoryDetailInterface {
  id: number;
  question_1: number;
  question_2: number;
  question_3: number;
  question_4: number;
  feedback: string;
  date: string;
  layanan_name: string;
  bidang_name: string;
}

export interface UserApplicationHistoryInterface {
  id: number;
  userinfo_id: number;
  name: string;
  nip: string;
  pesan: string;
  admin_updated: string;
  status: number;
  tgl_selesai: string;
  fileoutput: string;
  no_request: string;
  layanan_id: number;
  layanan_name: string;
  bidang_id: number;
  bidang_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserApplicationHistoryAreaInterface {
  id: number;
  nama: string;
  desc: string;
}

export interface UserApplicationHistoryServiceInterface {
  id: number;
  nama: string;
  desc: string;
  Bidang: UserApplicationHistoryAreaInterface;
}

export interface UserApplicationHistoryUserInfoSubDIstrictInterface {
  id: number;
  nama: string;
}

export interface UserApplicationHistoryUserInfoVillageInterface {
  id: number;
  nama: string;
}

export interface UserApplicationHistoryUserInfoInterface {
  id: number;
  name: string;
  nip: string;
  nik: string;
  slug: string;
  email: string;
  telepon: string;
  image_profile: string;
  kecamatan_id: number;
  desa_id: number;
  rt: string;
  rw: string;
  alamat: string;
  agama: string;
  tempat_lahir: string;
  tgl_lahir: string;
  gender: string;
  goldar: string;
  user_id: number;
  unit_kerja: string;
  createdAt: string;
  updatedAt: string;
  Desa: UserApplicationHistoryUserInfoVillageInterface;
  Kecamatan: UserApplicationHistoryUserInfoSubDIstrictInterface;
}

export interface UserApplicationHistoryFormServiceInputJsonDataInterface {
  id: number;
  key: string;
}

export interface UserApplicationHistoryFormServiceInputInterface {
  id: number;
  data: string;
  layananform_id: number;
  layananformnum_id: number;
  layananform_name: string;
  layananform_datajson: UserApplicationHistoryFormServiceInputJsonDataInterface[];
  layananform_tipedata: string;
  data_key: string[];
}

export interface UserApplicationHistoryDetailInterface {
  id: number;
  no_request: string;
  layanan_id: number;
  layanan: UserApplicationHistoryServiceInterface;
  tgl_selesai: string;
  userinfo_id: number;
  userinfo: UserApplicationHistoryUserInfoInterface;
  admin_updated: string;
  createdAt: string;
  updatedAt: string;
  Layanan_form_inputs: UserApplicationHistoryFormServiceInputInterface[];
  status: number;
  fileoutput: string;
  user_feedback: boolean;
  pesan: string;
}

export interface UserDocumentInterface {
  id: number;
  Bidang: number;
  Role: number;
  createdAt: string;
  kartu_pegawai: string;
  kk: string;
  ktp: string;
  npwp: string;
  sk_80: string;
  sk_100: string;
  updatedAt: string;
  user_id: number;
}

export type UserRegulationsInterface = {
  id: number;
  title: string;
  file: string;
};
