export enum PASSWORD_STRENGTH {
  TOO_SHORT = 'Too Short',
  WEAK = 'Weak',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
  VERY_STRONG = 'Very Strong',
}

export const evaluatePasswordScore = (password: string) => {
  const upper = /[A-Z]/,
    lower = /[a-z]/,
    number = /[0-9]/,
    special = /[^A-Za-z0-9]/,
    minLength = 8;
  let score = 0;

  if (password.length < minLength) {
    return 0;
  }

  if (upper.test(password)) score++;
  if (lower.test(password)) score++;
  if (number.test(password)) score++;
  if (special.test(password)) score++;

  if (score < 3) score--;

  if (password.length > minLength) {
    score += Math.floor((password.length - minLength) / 2);
  }

  return score;
};

export const authenticate = async (payload: {
  username: string;
  password: string;
}) => {
  const score = evaluatePasswordScore(payload.password);
  const isSuccessful = payload.username !== '' && score >= 3;
  if (isSuccessful) return Promise.resolve(payload.username);
  return Promise.reject();
};
