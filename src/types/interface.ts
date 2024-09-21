export interface debounceInterface {
  value: string;
  delay: number;
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
  createdAt: string;
}

export interface StructureOrganizationInterface {
  id: number;
  nama: string;
  slug: string;
  jabatan: string;
  image: string;
  createdAt: string;
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
  pangkats: UserGradesInterface[];
  pelatihan: UserTrainingInterface[];
  pendidikans: UserEducationInterface[];
  penghargaan: UserAwardsInterface[];
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
