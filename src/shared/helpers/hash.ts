import * as crypto from 'node:crypto';

export const createSHA256 = (line: string, salt: string): string => {
  const SHAHmac = crypto.createHmac('sha256', salt);
  return SHAHmac.update(line).digest('hex');
};
