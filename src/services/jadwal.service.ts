import { Jadwal } from "../models/Jadwal";
import { CreateJadwalDto, UpdateJadwalDto } from "../dto/jadwal.validation";
import { Types } from "mongoose";

const userSelect = "_id username name role email"; // sesuaikan field User yang ada

export class JadwalService {
  async getAllJadwal() {
    return Jadwal.find()
      .populate({ path: "createdBy", select: userSelect })
      .populate({ path: "updatedBy", select: userSelect })
      .populate('kelas', 'namaKelas') 
      .lean();
  }

  async getJadwalById(id: string) {
    return Jadwal.findById(new Types.ObjectId(id))
      .populate({ path: "createdBy", select: userSelect })
      .populate({ path: "updatedBy", select: userSelect })
      .populate('kelas', 'namaKelas') 
      .lean();
  }

  // async createJadwal(data: CreateJadwalDto, userId: string) {
  //   // normalisasi mapel kosong → null (opsional)
  //   const payload: any = { ...data };
  //   if (payload.mapel === "") payload.mapel = null;

  //   const doc = await Jadwal.create({
  //     ...payload,
  //     createdBy: userId,
  //     updatedBy: userId,
  //   });

  //   // balikan versi populated untuk FE
  //   return Jadwal.findById(doc._id)
  //     .populate({ path: "createdBy", select: userSelect })
  //     .populate({ path: "updatedBy", select: userSelect })
  //     .lean();
  // }

  async createJadwal(data: CreateJadwalDto, updaterId: string) {
    const payload: any = { ...data };
    if (payload.mapel === "") payload.mapel = null;
  
    const doc = await Jadwal.create({
      kelas: payload.kelas,
      hari: payload.hari,
      jamKe: payload.jamKe,
      mapel: payload.mapel ?? null,
      createdBy: payload.createdBy, // CHANGED: dari body (dropdown FE)
      updatedBy: updaterId,         // yang eksekusi (admin/guru login)
    });
  
    return Jadwal.findById(doc._id)
      .populate({ path: "createdBy", select: userSelect })
      .populate({ path: "updatedBy", select: userSelect })
      .lean();
  }

  async updateJadwal(id: string, data: UpdateJadwalDto, userId: string) {
    const payload: any = { ...data, updatedBy: userId };
    if (payload.mapel === "") payload.mapel = null;

    return Jadwal.findByIdAndUpdate(
      new Types.ObjectId(id),
      { $set: payload },
      { new: true, runValidators: true }
    )
      .populate({ path: "createdBy", select: userSelect })
      .populate({ path: "updatedBy", select: userSelect })
      .lean();
  }

  async deleteJadwal(id: string) {
    // kembalikan dokumen yang dihapus (sudah populated) agar FE bisa tampilkan siapa yg buat/ubah
    return Jadwal.findByIdAndDelete(new Types.ObjectId(id))
      .populate({ path: "createdBy", select: userSelect })
      .populate({ path: "updatedBy", select: userSelect })
      .lean();
  }

  async getJadwalByGuru(guruId: string) {
    return Jadwal.find({ createdBy: new Types.ObjectId(guruId) })
      .populate({ path: "createdBy", select: userSelect })
      .populate({ path: "updatedBy", select: userSelect })
      .populate('kelas', 'namaKelas')
      .populate('mapel', 'namaMapel')  
      .lean();
  }
}
