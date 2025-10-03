import { RequestHandler } from "express";
import { JadwalService } from "../services/jadwal.service";
import { CreateJadwalSchema, UpdateJadwalSchema } from "../dto/jadwal.validation";
import { handleError } from "../utils/errorHandler";

const jadwalService = new JadwalService();

export const getAllJadwal: RequestHandler = async (_req, res) => {
  try {
    const jadwals = await jadwalService.getAllJadwal();
    res.status(200).json({
      success: true,
      message: "Jadwals fetched successfully",
      statusCode: 200,
      data: jadwals,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getJadwalByGuru : RequestHandler = async (req, res) => {
  try {
    const jadwals = await jadwalService.getJadwalByGuru(req.params.id);
    res.status(200).json({
      success: true,
      message: "Jadwals fetched successfully",
      statusCode: 200,
      data: jadwals,
    });
  } catch (error) {
    handleError(error, res);
  }
}

export const getJadwal: RequestHandler = async (req, res) => {
  try {
    const jadwal = await jadwalService.getJadwalById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Jadwal fetched successfully",
      statusCode: 200,
      data: jadwal,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// export const createJadwal: RequestHandler = async (req, res) => {
//   try {
//     if (!req.userId) {
//       res.status(401).json({ success: false, message: "Unauthorized" });
//       return;
//     }

//     const validatedData = CreateJadwalSchema.parse(req.body);
//     const jadwal = await jadwalService.createJadwal(validatedData, req.userId);

//     res.status(201).json({
//       success: true,
//       message: "Jadwal created successfully",
//       statusCode: 201,
//       data: jadwal,
//     });
//   } catch (error: any) {
//     if (error?.code === 11000) {
//       res.status(409).json({
//         success: false,
//         message: "Slot jadwal sudah ada untuk kombinasi kelas/hari/jamKe.",
//         statusCode: 409,
//       });
//       return;
//     }
//     handleError(error, res);
//   }
// };

export const createJadwal: RequestHandler = async (req, res) => {
  try {
    if (!req.userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const validated = CreateJadwalSchema.parse(req.body); // includes createdBy
    const jadwal = await jadwalService.createJadwal(validated, req.userId); // CHANGED: second arg ⇒ updater

    res.status(201).json({
      success: true,
      message: "Jadwal created successfully",
      statusCode: 201,
      data: jadwal,
    });
  } catch (error: any) {
    if (error?.code === 11000) {
      res.status(409).json({
        success: false,
        message: "Slot jadwal sudah ada untuk kombinasi kelas/hari/jamKe.",
        statusCode: 409,
      });
      return;
    }
    handleError(error, res);
  }
};

export const updateJadwal: RequestHandler = async (req, res) => {
  try {
    if (!req.userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const validatedData = UpdateJadwalSchema.parse(req.body);
    const jadwal = await jadwalService.updateJadwal(req.params.id, validatedData, req.userId);

    res.status(200).json({
      success: true,
      message: "Jadwal updated successfully",
      statusCode: 200,
      data: jadwal,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteJadwal: RequestHandler = async (req, res) => {
  try {
    const jadwal = await jadwalService.deleteJadwal(req.params.id);
    res.status(200).json({
      success: true,
      message: "Jadwal deleted successfully",
      statusCode: 200,
      data: jadwal,
    });
  } catch (error) {
    handleError(error, res);
  }
};
