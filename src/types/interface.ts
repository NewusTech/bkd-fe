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
  id: 1;
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
