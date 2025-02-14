
declare global {
  namespace Express {
    interface Request {
      user?: { id: string }; // Sesuaikan dengan struktur user Anda
    }
  }
}