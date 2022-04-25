export const getLevel = (score) => {
  switch (true) {
    case score >= 0 && score <= 10:
      return { level: 'Beginner', min: 0, max: 10, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/A1.gif?alt=media&token=184c74d1-8432-4ec3-adcb-00b3db2a5283' };
    case score >= 11 && score <= 20:
      return { level: 'Beginner', min: 11, max: 20, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/A2.gif?alt=media&token=c008afa9-f42e-435d-b514-eae4f9ce7033' };
    case score >= 21 && score <= 30:
      return { level: 'Beginner', min: 20, max: 30, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/A3.gif?alt=media&token=50963eeb-5b27-4aac-995c-a8324dadd5ac' };
    case score >= 31 && score <= 40:
      return { level: 'Intermediate', min: 31, max: 40, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/B1.gif?alt=media&token=cd0473b2-3c36-4311-999d-7ad2f16f0955' };
    case score >= 41 && score <= 50:
      return { level: 'Intermediate', min: 41, max: 50, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/B2.gif?alt=media&token=67fde7eb-0ed4-4d8f-928d-d97027e84b68' };
    case score >= 51 && score <= 60:
      return { level: 'Intermediate', min: 51, max: 60, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/B3.gif?alt=media&token=081ef42d-14c2-41b8-8626-9bd747561a5e' };
    case score >= 61 && score <= 70:
      return { level: 'Semipro', min: 61, max: 70, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/S1.gif?alt=media&token=f2beb236-986c-486f-9dfc-0d1187da5896' };
    case score >= 71 && score <= 80:
      return { level: 'Semipro', min: 71, max: 80, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/S2.gif?alt=media&token=1d62e851-91e6-4b8d-baa2-4a79efb4e4a2' };
    case score >= 81 && score <= 90:
      return { level: 'Semipro', min: 81, max: 90, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/S3.gif?alt=media&token=2be6340d-74a3-4761-b145-ce5a0f016f7e' };
    case score >= 91 && score <= 100:
      return { level: 'Advanced', min: 91, max: 100, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/P1.gif?alt=media&token=123c85a9-f144-4f19-bd3c-0b5c1478b8ab' };
    case score >= 101 && score <= 110:
      return { level: 'Advanced', min: 110, max: 110, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/P2.gif?alt=media&token=3b6826bf-e37e-429c-abfc-d2aee92bae8e' };
    default:
      return { level: 'Advanced', min: 120, max: score, avatar: 'https://firebasestorage.googleapis.com/v0/b/pomodee-f07cf.appspot.com/o/P3.gif?alt=media&token=e1de8a9a-dbab-4f5c-9b5f-119371a92bbd' };
  }
};
