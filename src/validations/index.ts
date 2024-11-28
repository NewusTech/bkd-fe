"use client";

import { z } from "zod";

export const schemaRegister = z.object({
  name: z.string().refine((val) => val !== "", "Nama lengkap harus diisi"),
  // name: z.string({ message: "Nama Lengkap tidak boleh kosong!" }),
  nip: z
    .string({ message: "NIP tidak boleh kosong!" })
    .min(18, "NIP harus terdiri dari 18 karakter"),
  telepon: z
    .string({ message: "Nomor telepon tidak boleh kosong!" })
    .min(10, "Nomor telepon harus terdiri dari minimal 12 digit")
    .max(15, "Nomor telepon harus terdiri dari maksimal 13 digit"),
  email: z
    .string({ message: "Email tidak boleh kosong!" })
    .email({ message: "Email harus sesuai dengan format email" }),
  password: z
    .string({ message: "Harap atur kata sandi anda" })
    .min(6, { message: "Kata sandi minimal 6 karakter" })
    .max(32, { message: "Kata sandi maksimal 32 karakter" }),
  kecamatan_id: z.string({ message: "Pilih Asal Kecamatan" }),
  desa_id: z.string({ message: "Pilih Asal Desa" }),
  rt: z.string().refine((val) => val !== "", "RT harus diisi"),
  // rt: z.string({ message: "RT tidak boleh kosong!" }),
  rw: z.string().refine((val) => val !== "", "RW harus diisi"),
  // rw: z.string({ message: "RW tidak boleh kosong!" }),
  alamat: z.string().refine((val) => val !== "", "Alamat harus diisi"),
  // alamat: z.string({ message: "Alamat tidak boleh kosong!" }),
  term: z
    .boolean()
    .refine((val) => val === true, "Syarat dan ketentuan harus disetujui"),
  // term: z.boolean({ message: "Syarat dan ketentuan harus disetujui" }),
});

export const schemaLogin = z.object({
  nip: z
    .string({ message: "NIP tidak boleh kosong!" })
    .length(18, "NIP harus terdiri dari 18 karakter"),
  password: z
    .string({ message: "Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Kata sandi minimal 6 karakter" }),
});

export const schemaForgotPassword = z.object({
  newPassword: z
    .string({ message: "Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Kata sandi minimal 6 karakter" })
    .max(32, { message: "Kata sandi maksimal 32 karakter" }),
  confirmNewPassword: z
    .string({ message: "Konformasi Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Konfirmasi Kata sandi minimal 6 karakter" })
    .max(32, { message: "Konformasi Kata sandi maksimal 32 karakter" }),
  oldPassword: z
    .string({ message: "Ulangi Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Ulangi Kata sandi minimal 6 karakter" })
    .max(32, { message: "Ulangi Kata sandi maksimal 32 karakter" }),
});

export const schemaPersonalProfile = z.object({
  name: z.string().refine((val) => val !== "", "Nama lengkap harus diisi"),
  nip: z
    .string({ message: "NIP tidak boleh kosong!" })
    .length(18, "NIP harus terdiri dari 18 karakter"),
  nik: z
    .string({ message: "NIK tidak boleh kosong!" })
    .length(16, "NIK harus terdiri dari 16 karakter"),
  telepon: z
    .string({ message: "Nomor telepon tidak boleh kosong!" })
    .min(10, "Nomor telepon harus terdiri dari minimal 12 digit")
    .max(15, "Nomor telepon harus terdiri dari maksimal 13 digit"),
  email: z
    .string({ message: "Email tidak boleh kosong!" })
    .email({ message: "Email harus sesuai dengan format email" }),
  unit_kerja: z
    .string({ message: "Unit kerja harus diisi" })
    .min(3, "Unit kerja harus terdiri dari minimal 3 karakter"),
  tempat_lahir: z
    .string({ message: "Tempat lahir harus diisi" })
    .min(3, "Tempat lahir harus terdiri dari minimal 3 karakter"),
  tgl_lahir: z
    .string()
    .refine((val) => val !== "", "Tanggal lahir harus diisi"),
  agama: z.string({ message: "Agama harus diisi" }),
  gender: z.string({ message: "Jenis kelamin harus diisi" }),
  goldar: z.string({ message: "Golongan darah harus diisi" }),
  rt: z.string().refine((val) => val !== "", "RT harus diisi"),
  rw: z.string().refine((val) => val !== "", "RW harus diisi"),
  alamat: z.string().refine((val) => val !== "", "Alamat harus diisi"),
  kecamatan_id: z.string({ message: "Pilih Asal Kecamatan" }),
  desa_id: z.string({ message: "Pilih Asal Desa" }),
});

export const schemaUserComplaints = z.object({
  judul_pengaduan: z
    .string({ message: "Judul Pengaduan tidak boleh kosong!" })
    .min(5, "Judul Pengaduan minimal harus terdiri dari 5 karakter"),
  isi_pengaduan: z
    .string({ message: "Isi Pengaduan tidak boleh kosong!" })
    .min(10, "Isi Pengaduan minimal harus terdiri dari 10 karakter"),
});

export const schemaCoupleData = z.object({
  nama: z
    .string({ message: "Nama lengkap harus diisi" })
    .min(3, "Nama lengkap harus terdiri dari minimal 3 karakter"),
  tempat_lahir: z
    .string({ message: "Tempat lahir harus diisi" })
    .min(3, "Tempat lahir harus terdiri dari minimal 3 karakter"),
  pekerjaan: z
    .string({ message: "Pekerjaan harus diisi" })
    .min(3, "Pekerjaan harus terdiri dari minimal 3 karakter"),
  status: z.number({ message: "Status harus diisi" }),
});

export const schemaChildrenData = z.object({
  nama: z
    .string({ message: "Nama lengkap harus diisi" })
    .min(3, "Nama lengkap harus terdiri dari minimal 3 karakter"),
  tempat_lahir: z
    .string({ message: "Tempat lahir harus diisi" })
    .min(3, "Tempat lahir harus terdiri dari minimal 3 karakter"),
  jenis_kelamin: z.number({ message: "Jenis kelamin harus diisi" }),
  pekerjaan: z
    .string({ message: "Pekerjaan harus diisi" })
    .min(3, "Pekerjaan harus terdiri dari minimal 3 karakter"),
  status: z.number({ message: "Status harus diisi" }),
});

export const schemaGradeData = z.object({
  no_sk_pangkat: z
    .string({ message: "Nomor SK Pangkat harus diisi" })
    .min(3, "Nomor SK Pangkat minimal 3 karakter"),
});

export const schemaKGBData = z.object({
  uraian_berkala: z
    .string({ message: "Uraian berkala harus diisi" })
    .min(3, "Uraian berkala minimal 3 karakter"),
  no_sk_pangkat: z
    .string({ message: "Nomor SK Pangkat harus diisi" })
    .min(3, "Nomor SK Pangkat minimal 3 karakter"),
});

export const schemaPositionData = z.object({
  nama_jabatan: z
    .string({ message: "Nama jabatan harus diisi" })
    .min(3, "Nama jabatan harus terdiri dari minimal 3 karakter"),
  no_sk_pangkat: z
    .string({ message: "Nomor SK Pangkat harus diisi" })
    .min(3, "Nomor SK Pangkat minimal 3 karakter"),
});

export const schemaEducationData = z.object({
  tingkat_pendidikan: z
    .string({ message: "Tingkat pendidikan harus diisi" })
    .min(3, "Tingkat pendidikan harus terdiri dari minimal 3 karakter"),
  program_study: z
    .string({ message: "Program studi harus diisi" })
    .min(3, "Program studi harus terdiri dari minimal 3 karakter"),
  institut: z
    .string({ message: "Institut harus diisi" })
    .min(3, "Institut harus terdiri dari minimal 3 karakter"),
  no_ijazah: z
    .string({ message: "Nomor Ijazah harus diisi" })
    .min(3, "Nomor Ijazah harus terdiri dari minimal 3 karakter"),
});

export const schemaTrainingData = z.object({
  lama_pelatihan: z
    .string({ message: "Lama pelatihan harus diisi" })
    .min(3, "Lama pelatihan harus terdiri dari minimal 3 karakter"),
  no_surat_pelatihan: z
    .string({ message: "Nomor surat pelatihan harus diisi" })
    .min(3, "Nomor surat pelatihan harus terdiri dari minimal 3 karakter"),
  tempat_pelatihan: z
    .string({ message: "Tempat pelatihan harus diisi" })
    .min(3, "Tempat pelatihan harus terdiri dari minimal 3 karakter"),
  uraian_pelatihan: z
    .string({ message: "Uraian pelatihan harus diisi" })
    .min(3, "Uraian pelatihan harus terdiri dari minimal 3 karakter"),
});

export const schemaAwardData = z.object({
  uraian_penghargaan: z
    .string({ message: "Uraian penghargaan harus diisi" })
    .min(3, "Uraian penghargaan harus terdiri dari minimal 3 karakter"),
  instansi_penghargaan: z
    .string({ message: "Instansi penghargaan harus diisi" })
    .min(3, "Instansi penghargaan harus terdiri dari minimal 3 karakter"),
});

export const schemaChangePassword = z.object({
  newPassword: z
    .string({ message: "Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Kata sandi minimal 6 karakter" })
    .max(32, { message: "Kata sandi maksimal 32 karakter" }),
  confirmNewPassword: z
    .string({ message: "Konformasi Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Konfirmasi Kata sandi minimal 6 karakter" })
    .max(32, { message: "Konformasi Kata sandi maksimal 32 karakter" }),
});
