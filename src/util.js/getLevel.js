import A1 from '../components/ProgressAvatar/A1.gif';
import A2 from '../components/ProgressAvatar/A2.gif';
import A3 from '../components/ProgressAvatar/A3.gif';
import B1 from '../components/ProgressAvatar/B1.gif';
import B2 from '../components/ProgressAvatar/B2.gif';
import B3 from '../components/ProgressAvatar/B3.gif';
import P1 from '../components/ProgressAvatar/P1.gif';
import P2 from '../components/ProgressAvatar/P2.gif';
import P3 from '../components/ProgressAvatar/P3.gif';
import S1 from '../components/ProgressAvatar/S1.gif';
import S2 from '../components/ProgressAvatar/S2.gif';
import S3 from '../components/ProgressAvatar/S3.gif';

export const getLevel = (score) => {
  switch (true) {
    case score >= 0 && score <= 10:
      return { level: 'Beginner', min: 0, max: 10, avatar: A1 };
    case score >= 11 && score <= 20:
      return { level: 'Beginner', min: 11, max: 20, avatar: A2 };
    case score >= 21 && score <= 30:
      return { level: 'Beginner', min: 20, max: 30, avatar: A3 };
    case score >= 31 && score <= 40:
      return { level: 'Intermediate', min: 31, max: 40, avatar: B1 };
    case score >= 41 && score <= 50:
      return { level: 'Intermediate', min: 41, max: 50, avatar: B2 };
    case score >= 51 && score <= 60:
      return { level: 'Intermediate', min: 51, max: 60, avatar: B3 };
    case score >= 61 && score <= 70:
      return { level: 'Semipro', min: 61, max: 70, avatar: S1 };
    case score >= 71 && score <= 80:
      return { level: 'Semipro', min: 71, max: 80, avatar: S2 };
    case score >= 81 && score <= 90:
      return { level: 'Semipro', min: 81, max: 90, avatar: S3 };
    case score >= 91 && score <= 100:
      return { level: 'Advanced', min: 91, max: 100, avatar: P1 };
    case score >= 101 && score <= 110:
      return { level: 'Advanced', min: 110, max: 110, avatar: P2 };
    default:
      return { level: 'Advanced', min: 120, max: score, avatar: P3 };
  }
};
